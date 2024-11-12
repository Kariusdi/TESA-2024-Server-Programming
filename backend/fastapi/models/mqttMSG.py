from typing import Optional
from pydantic import BaseModel, Field

class SensorValueSchema(BaseModel):
    machine_id: int = Field(..., ge=0)
    sensorVal: int = Field(..., ge=0.0)
    date: str = Field(...)
    
    class Config:
        json_schema_extra = {
            "example": {
                "machine_id": 1,
                "status": 234,
                "date": "05/11/2024 12:01:04+07:00Z"
            }
        }

def SuccessResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }

def ErrorResponseModel(error, message):
    return {"error": error, "code": 500, "message": message}