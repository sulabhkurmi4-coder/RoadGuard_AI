from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import time

app = FastAPI(
    title="RoadGuard AI API",
    description="API for AI-Powered Road Infrastructure Intelligence & Predictive Maintenance.",
    version="0.1.0",
)

# Enable CORS for local Next.js frontend (all local hostnames, ports, and dev servers)
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://localhost:3005",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3002",
    "http://127.0.0.1:3003",
    "http://127.0.0.1:3004",
    "http://127.0.0.1:3005",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


class InspectionResponse(BaseModel):
    inspection_id: str
    potholes: int
    cracks: int
    surface_damage: int
    health_score: int
    risk_percentage: int
    risk_level: str
    recommendation: str
    priority: str


@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "RoadGuard AI API is running",
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
    }


@app.post("/api/inspection/analyze", response_model=InspectionResponse)
async def analyze_road(file: UploadFile = File(...)):
    """
    Accepts an uploaded road image and returns structured distress analysis.
    NOTE: Simulated prototype analysis. Does not run a trained ML model yet.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    # Validate file extension
    allowed_extensions = (".jpg", ".jpeg", ".png", ".webp", ".svg", ".bmp", ".jfif", ".gif", ".tiff")
    is_allowed_ext = file.filename.lower().endswith(allowed_extensions)
    is_image_type = bool(file.content_type and file.content_type.startswith("image/"))
    if not is_allowed_ext and not is_image_type:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type ({file.filename}). Allowed formats: {', '.join(allowed_extensions)}",
        )

    # Read uploaded bytes to ensure upload succeeded
    content = await file.read()
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    filename = file.filename.lower()
    timestamp_id = int(time.time() % 10000)

    # Dynamic simulated outputs reflecting real physical patterns
    if "port" in filename or "pothole" in filename:
        return InspectionResponse(
            inspection_id=f"INS-{timestamp_id}",
            potholes=6,
            cracks=8,
            surface_damage=5,
            health_score=38,
            risk_percentage=86,
            risk_level="CRITICAL",
            recommendation="Emergency base stabilization & deep hot-mix overlay",
            priority="P1",
        )
    elif "101" in filename or "joint" in filename or "moderate" in filename:
        return InspectionResponse(
            inspection_id=f"INS-{timestamp_id}",
            potholes=1,
            cracks=7,
            surface_damage=2,
            health_score=72,
            risk_percentage=34,
            risk_level="MODERATE",
            recommendation="High-flexibility silicone joint injection",
            priority="P3",
        )
    elif "healthy" in filename or "good" in filename:
        return InspectionResponse(
            inspection_id=f"INS-{timestamp_id}",
            potholes=0,
            cracks=3,
            surface_damage=1,
            health_score=86,
            risk_percentage=18,
            risk_level="LOW",
            recommendation="Scheduled routine surface sweep and drainage review",
            priority="P4",
        )
    else:
        # Default structured analysis conforming to example specification
        return InspectionResponse(
            inspection_id=f"INS-{timestamp_id:03d}" if timestamp_id < 1000 else f"INS-{timestamp_id}",
            potholes=4,
            cracks=11,
            surface_damage=3,
            health_score=62,
            risk_percentage=48,
            risk_level="MODERATE",
            recommendation="Preventive resurfacing",
            priority="P2",
        )
