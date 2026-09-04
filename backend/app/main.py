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

# Enable CORS for local Next.js frontend and production Vercel deployment
origins = [
    "https://road-guard-ai-chi.vercel.app",
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


from typing import Optional
from app.image_analyzer import analyze_road_image_cv


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
    is_demo_fallback: bool = False
    analysis_method: str = "Optical Computer Vision (ASTM D6433)"
    diagnostics: Optional[dict] = None


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
    Accepts an uploaded road image and returns structured distress analysis
    quantified by optical computer vision.
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
        raise HTTPException(status_code=400, detail="Uploaded file is empty (0 bytes)")

    try:
        analysis_data = analyze_road_image_cv(content, file.filename)
        return InspectionResponse(**analysis_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image analysis error: {str(e)}")

