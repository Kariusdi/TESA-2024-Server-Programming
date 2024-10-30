from typing import Optional
from pydantic import BaseModel, Field

class SensorDataSchema(BaseModel):
    timestamp: str = Field(...)
    sensorValue: int = Field(..., ge=0.0)
    updatedTime: int = Field(..., ge=1.0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "timestamp": "09:10",
                "sensorValue": 4756,
                "updatedTime": 3
            }
        }

class HealthStatusSchema(BaseModel):
    name: str = Field(...)
    status: int = Field(..., ge=0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Machine 1",
                "status": 0
            }
        }

class UpdateSensorDataSchema(BaseModel):
    timestamp: Optional[str]
    sensorValue: Optional[int]
    updatedTime: Optional[int]
    
    class Config:
        json_schema_extra = {
            "example": {
                "timestamp": "09:10",
                "sensorValue": 4756,
                "updatedTime": 3
            }
        }
    
def SuccessResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": 404, "message": message}