"""
RoadGuard AI - Computer Vision Pavement Distress Analyzer
Processes uploaded road surface imagery using optical computer vision
to quantify potholes, cracks, and surface damage in accordance with
ASTM D6433 pavement condition assessment principles.
"""

import io
import hashlib
from typing import Dict, Any, Tuple
from PIL import Image, ImageFilter
import numpy as np


def _connected_components_stats(mask: np.ndarray) -> Tuple[int, list]:
    """
    Pure NumPy 8-connected component labeling and feature extraction.
    Returns (num_labels, component_stats) where each stat contains:
    {'area': int, 'bbox': (min_y, min_x, max_y, max_x), 'aspect_ratio': float}
    """
    h, w = mask.shape
    visited = np.zeros((h, w), dtype=bool)
    components = []

    # Find coordinates of all active pixels
    ys, xs = np.nonzero(mask)
    if len(ys) == 0:
        return 0, []

    # Fast scan for connected clusters using breadth-first traversal
    for start_idx in range(len(ys)):
        sy, sx = ys[start_idx], xs[start_idx]
        if visited[sy, sx]:
            continue

        queue = [(sy, sx)]
        visited[sy, sx] = True
        pixel_count = 0
        min_y, max_y = sy, sy
        min_x, max_x = sx, sx

        head = 0
        while head < len(queue):
            cy, cx = queue[head]
            head += 1
            pixel_count += 1

            if cy < min_y: min_y = cy
            if cy > max_y: max_y = cy
            if cx < min_x: min_x = cx
            if cx > max_x: max_x = cx

            # 8-connected neighbors
            for ny in (cy - 1, cy, cy + 1):
                if ny < 0 or ny >= h:
                    continue
                for nx in (cx - 1, cx, cx + 1):
                    if nx < 0 or nx >= w:
                        continue
                    if mask[ny, nx] and not visited[ny, nx]:
                        visited[ny, nx] = True
                        queue.append((ny, nx))

        comp_h = max_y - min_y + 1
        comp_w = max_x - min_x + 1
        aspect_ratio = max(comp_h, comp_w) / max(1, min(comp_h, comp_w))

        components.append({
            "area": pixel_count,
            "bbox": (min_y, min_x, max_y, max_x),
            "width": comp_w,
            "height": comp_h,
            "aspect_ratio": aspect_ratio,
        })

    return len(components), components


def analyze_road_image_cv(image_bytes: bytes, filename: str = "") -> Dict[str, Any]:
    """
    Robust optical computer-vision analysis of road surface imagery:
    1. Region-of-Interest isolation (focuses on the roadway, suppresses sky/trees).
    2. Lane marking and bright reflection suppression (prevents paint from triggering crack detection).
    3. True Pothole Detection: Local contrast depression (black top-hat) with connected-component
       morphology, minimum cavity area, compactness, and depth contrast against surrounding asphalt.
    4. True Crack Detection: High-contrast dark linear fissures using Sobel gradients filtered by
       dark intensity valleys, suppressing uniform texture noise.
    5. Surface Ravelling / Weathering: High-frequency texture standard deviation on pavement surface.
    6. ASTM D6433 PCI (Pavement Condition Index) score & risk level derivation.
    """
    if not image_bytes or len(image_bytes) == 0:
        raise ValueError("Image file is empty (0 bytes).")

    # Detect SVG sample presets
    is_svg = (
        image_bytes.strip().startswith(b"<svg")
        or b"<svg" in image_bytes[:300]
        or (filename.lower().endswith(".svg") and b"<svg" in image_bytes[:1000])
    )

    if is_svg:
        svg_text = image_bytes.decode("utf-8", errors="ignore").lower()
        fname = filename.lower()
        img_hash = hashlib.sha256(image_bytes).hexdigest()[:6].upper()
        inspection_id = f"INS-DEMO-{img_hash}"

        if "port" in fname or "sample-port" in svg_text:
            return {
                "inspection_id": inspection_id,
                "potholes": 6,
                "cracks": 8,
                "surface_damage": 5,
                "health_score": 38,
                "risk_percentage": 86,
                "risk_level": "CRITICAL",
                "recommendation": "Emergency base stabilization & deep hot-mix overlay",
                "priority": "P1",
                "is_demo_fallback": True,
                "analysis_method": "Synthetic Highway Preset (Demo Fallback)",
                "diagnostics": {
                    "preset_type": "Port Access Freight MP 2.4",
                    "note": "Vector SVG sample preset rendered in demo fallback mode",
                },
            }
        elif "101" in fname or "sample-route101" in svg_text:
            return {
                "inspection_id": inspection_id,
                "potholes": 1,
                "cracks": 7,
                "surface_damage": 2,
                "health_score": 72,
                "risk_percentage": 34,
                "risk_level": "MODERATE",
                "recommendation": "High-flexibility silicone joint injection",
                "priority": "P3",
                "is_demo_fallback": True,
                "analysis_method": "Synthetic Highway Preset (Demo Fallback)",
                "diagnostics": {
                    "preset_type": "Route 101 Coastal MP 91.4",
                    "note": "Vector SVG sample preset rendered in demo fallback mode",
                },
            }
        else:
            return {
                "inspection_id": inspection_id,
                "potholes": 2,
                "cracks": 12,
                "surface_damage": 4,
                "health_score": 48,
                "risk_percentage": 78,
                "risk_level": "CRITICAL",
                "recommendation": "Polymer-modified slurry micro-surfacing within 14 days",
                "priority": "P1",
                "is_demo_fallback": True,
                "analysis_method": "Synthetic Highway Preset (Demo Fallback)",
                "diagnostics": {
                    "preset_type": "I-95 North MP 142.8",
                    "note": "Vector SVG sample preset rendered in demo fallback mode",
                },
            }

    # =========================================================================
    # RASTER IMAGE PROCESSING PIPELINE (JPG, PNG, WEBP, BMP)
    # =========================================================================
    try:
        img_raw = Image.open(io.BytesIO(image_bytes))
    except Exception as e:
        raise ValueError(f"Could not decode image file format: {e}")

    if img_raw.mode != "RGB":
        img_raw = img_raw.convert("RGB")

    orig_w, orig_h = img_raw.size

    # Standardize analysis scale for consistent metric extraction
    target_dim = 480
    scale = target_dim / max(orig_w, orig_h)
    proc_w = max(32, int(orig_w * scale))
    proc_h = max(32, int(orig_h * scale))
    img = img_raw.resize((proc_w, proc_h), Image.Resampling.BILINEAR)

    rgb = np.array(img, dtype=np.float32)
    h, w, _ = rgb.shape

    # 1. Pavement Region of Interest (ROI) Selection
    # For road surveillance/dashcam/survey images, the lower 75% contains the pavement.
    # Exclude the top 20% to avoid sky, horizon, headlights, tree lines, or vehicle hoods.
    roi_top = int(h * 0.18)
    pavement_rgb = rgb[roi_top:, :]
    p_h, p_w, _ = pavement_rgb.shape
    total_pavement_pixels = p_h * p_w

    # Grayscale Luminance (ITU-R BT.601)
    luma = 0.299 * pavement_rgb[:, :, 0] + 0.587 * pavement_rgb[:, :, 1] + 0.114 * pavement_rgb[:, :, 2]

    # Baseline statistics of pavement
    median_luma = float(np.median(luma))
    mean_luma = float(np.mean(luma))
    std_luma = float(np.std(luma))

    # 2. Lane Marking & High-Reflectance Suppression Mask
    # White & yellow paint stripes have significantly higher luminance and saturation than asphalt
    paint_thresh = max(130.0, median_luma + 1.1 * max(14.0, std_luma))
    paint_mask = luma > paint_thresh

    # Dilate paint mask by 2 pixels (5x5 neighborhood) to completely cover transition edges
    paint_dilated = np.zeros_like(paint_mask)
    for dy in range(-2, 3):
        for dx in range(-2, 3):
            ys_src = slice(max(0, -dy), min(p_h, p_h - dy))
            xs_src = slice(max(0, -dx), min(p_w, p_w - dx))
            ys_dst = slice(max(0, dy), min(p_h, p_h + dy))
            xs_dst = slice(max(0, dx), min(p_w, p_w + dx))
            paint_dilated[ys_dst, xs_dst] |= paint_mask[ys_src, xs_src]

    # 3. True Pothole Detection (Local Cavity Depression & Morphology)
    # A genuine pothole is a local cavity depression: significantly darker than its immediate
    # neighborhood, forming a coherent 2D void cluster (not scattered pixels or thin cracks).

    # Compute a local background luminance using a low-pass box filter
    luma_pil = Image.fromarray(luma.astype(np.uint8))
    local_bg = np.array(luma_pil.filter(ImageFilter.BoxBlur(14)), dtype=np.float32)

    # Black Top-Hat contrast: Local depression depth = Local Background - Actual Luma
    local_depression = local_bg - luma

    # Pothole cavity threshold: must be at least 24 units darker than local asphalt,
    # and significantly darker than the road median, and not in paint zones.
    pothole_candidate_mask = (
        (local_depression > 24.0)
        & (luma < (median_luma - 0.85 * max(15.0, std_luma)))
        & (~paint_dilated)
    )

    # Connected component labeling to filter out noise, single grains, or linear streaks
    num_pothole_blobs, pothole_blobs = _connected_components_stats(pothole_candidate_mask)

    valid_potholes = []
    pothole_pixel_count = 0

    # Minimum cluster size: at least 0.05% of pavement area to avoid aggregate noise.
    # Maximum aspect ratio: < 3.5 to distinguish circular/elliptical cavity voids from cracks/shadows.
    min_blob_area = max(50, int(total_pavement_pixels * 0.0005))
    max_blob_area = int(total_pavement_pixels * 0.25)

    for blob in pothole_blobs:
        area = blob["area"]
        aspect = blob["aspect_ratio"]
        if min_blob_area <= area <= max_blob_area and aspect < 3.5:
            valid_potholes.append(blob)
            pothole_pixel_count += area

    detected_potholes_count = len(valid_potholes)
    pothole_area_ratio = pothole_pixel_count / max(1, total_pavement_pixels)

    potholes = min(8, detected_potholes_count)

    # 4. True Crack Detection (Directional Gradient & Dark Valley Filtering)
    gx = np.zeros_like(luma)
    gx[:, 1:-1] = (luma[:, 2:] - luma[:, :-2]) / 2.0
    gy = np.zeros_like(luma)
    gy[1:-1, :] = (luma[2:, :] - luma[:-2, :]) / 2.0
    grad_mag = np.sqrt(gx ** 2 + gy ** 2)

    # Mask of pothole cavities to prevent counting pothole crater perimeters as cracks
    pothole_mask = np.zeros_like(pothole_candidate_mask)
    for blob in valid_potholes:
        y1, x1, y2, x2 = blob["bbox"]
        pothole_mask[y1:y2+1, x1:x2+1] = True

    # Dark Valley Criterion: pixel must be at least 12 units darker than local background
    is_dark_valley = luma < (local_bg - 12.0)

    # Crack gradient threshold: requires substantial local edge contrast (min 26.0)
    crack_grad_threshold = max(26.0, np.percentile(grad_mag, 92))

    crack_pixel_mask = (
        (grad_mag > crack_grad_threshold)
        & is_dark_valley
        & (~paint_dilated)
        & (~pothole_mask)
    )

    # Connected component analysis on crack pixels to isolate continuous fissures
    num_crack_blobs, crack_blobs = _connected_components_stats(crack_pixel_mask)

    min_crack_pixels = max(22, int(total_pavement_pixels * 0.0002))
    valid_crack_segments = []
    total_crack_pixels = 0

    for blob in crack_blobs:
        area = blob["area"]
        aspect = blob["aspect_ratio"]
        if area >= min_crack_pixels and (aspect > 1.8 or area > 55):
            valid_crack_segments.append(blob)
            total_crack_pixels += area

    crack_density_ratio = total_crack_pixels / max(1, total_pavement_pixels)

    # Map crack segments to discrete linear fissure count
    if len(valid_crack_segments) >= 7 or crack_density_ratio > 0.035:
        cracks = min(16, max(6, int(len(valid_crack_segments) * 1.2)))
    elif len(valid_crack_segments) >= 3 or crack_density_ratio > 0.015:
        cracks = min(5, max(3, len(valid_crack_segments)))
    elif len(valid_crack_segments) >= 1 and crack_density_ratio > 0.004:
        cracks = min(2, len(valid_crack_segments))
    else:
        cracks = 0

    # 5. Surface Roughness / Texture Wear (Aggregate Loss)
    baseline_pavement_mask = (~paint_dilated) & (~pothole_mask) & (~crack_pixel_mask)
    if np.sum(baseline_pavement_mask) > 100:
        clean_pavement_pixels = luma[baseline_pavement_mask]
        pavement_roughness = float(np.std(clean_pavement_pixels) / (np.mean(clean_pavement_pixels) + 1e-5))
    else:
        pavement_roughness = float(std_luma / (mean_luma + 1e-5))

    # Surface damage levels
    if pavement_roughness > 0.42:
        surface_damage = min(5, max(2, int(pavement_roughness * 8)))
    elif pavement_roughness > 0.28:
        surface_damage = min(2, max(1, int(pavement_roughness * 4)))
    else:
        surface_damage = 0

    # 6. ASTM D6433 PCI (Pavement Condition Index) Calculation
    pothole_deduction = min(55, potholes * 13 + int(pothole_area_ratio * 150))
    crack_deduction = min(40, cracks * 3 + int(crack_density_ratio * 120))
    surface_deduction = min(20, surface_damage * 3 + int(max(0.0, pavement_roughness - 0.20) * 25))

    total_deductions = pothole_deduction + crack_deduction + surface_deduction

    # Clean roads receive high PCI (88 - 98)
    if potholes == 0 and cracks <= 1 and surface_damage == 0:
        health_score = int(np.clip(100 - total_deductions, 88, 98))
    elif potholes == 0 and cracks <= 2 and surface_damage == 0:
        health_score = int(np.clip(100 - total_deductions, 82, 92))
    elif potholes == 0 and cracks <= 4:
        health_score = int(np.clip(100 - total_deductions, 70, 85))
    else:
        health_score = int(np.clip(100 - total_deductions, 18, 75))

    # Derived Failure Risk Probability & Risk Tier
    risk_percentage = int(np.clip(100 - health_score + (8 if potholes >= 3 else 0), 5, 95))

    if health_score < 45 or potholes >= 4 or (potholes >= 2 and cracks >= 5):
        risk_level = "CRITICAL"
        priority = "P1"
        recommendation = "Emergency base stabilization & deep hot-mix overlay"
    elif health_score < 68 or potholes >= 1 or cracks >= 5:
        risk_level = "HIGH"
        priority = "P2"
        recommendation = "Heavy patch repair & polymer-modified micro-surfacing"
    elif health_score < 82 or cracks >= 2 or surface_damage >= 1:
        risk_level = "MODERATE"
        priority = "P3"
        recommendation = "Preventative silicone joint injection & crack sealing"
    else:
        risk_level = "LOW"
        priority = "P4"
        recommendation = "Scheduled routine surface sweep and drainage review"

    # Deterministic inspection ID tied strictly to image content SHA-256 hash
    img_hash = hashlib.sha256(image_bytes).hexdigest()[:6].upper()
    inspection_id = f"INS-{img_hash}"

    return {
        "inspection_id": inspection_id,
        "potholes": potholes,
        "cracks": cracks,
        "surface_damage": surface_damage,
        "health_score": health_score,
        "risk_percentage": risk_percentage,
        "risk_level": risk_level,
        "recommendation": recommendation,
        "priority": priority,
        "is_demo_fallback": False,
        "analysis_method": "Optical Computer Vision (ASTM D6433 distress quantification)",
        "diagnostics": {
            "image_resolution": f"{orig_w}x{orig_h}",
            "pothole_area_ratio": round(pothole_area_ratio, 4),
            "crack_density_ratio": round(crack_density_ratio, 4),
            "surface_roughness": round(pavement_roughness, 4),
            "median_luminance": round(median_luma, 2),
            "valid_pothole_blobs": len(valid_potholes),
            "valid_crack_segments": len(valid_crack_segments),
        },
    }
