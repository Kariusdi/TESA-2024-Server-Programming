from typing import Optional
from pydantic import BaseModel, Field

class SensorDataSchema(BaseModel):
    name: str = Field(...)
    timestamp: str = Field(...),
    hour: str = Field(...),
    minute: str = Field(...),
    date: str = Field(...),
    sensorValue: int = Field(..., ge=0.0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Machine 1",
                "timestamp": "2024-10-12 10:51:43.794039",
                "hour": "09",
                "minute": "10",
                "date": "2024-10-25",
                "sensorValue": 4756
            }
        }

class HealthStatusSchema(BaseModel):
    id: int = Field(..., ge=0)
    status: int = Field(..., ge=-1)
    date: str = Field(...)
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "status": 0,
                "date": "05/11/2024 12:01:04+07:00Z"
            }
        }

class UpdateHealthStatusSchema(BaseModel):
    id: Optional[int]
    status: Optional[int]
    date: Optional[str]
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "status": 0,
                "date": "05/11/2024 12:01:04+07:00Z"
            }
        }

class UpdateSensorDataSchema(BaseModel):
    name: Optional[str]
    timestamp: Optional[str]
    sensorValue: Optional[int]
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Machine 1",
                "timestamp": "2024-10-12 10:51:43.794039",
                "hour": "09",
                "minute": "10",
                "date": "2024-10-25",
                "sensorValue": 4756
            }
        }
    
def SuccessResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }
    
def SuccessResponseModelList(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }

def ErrorResponseModel(error, message):
    return {"error": error, "code": 500, "message": message}