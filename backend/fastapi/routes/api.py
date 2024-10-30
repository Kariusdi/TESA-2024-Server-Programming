import json
from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import requests
# from bson.objectid import ObjectId

from models.sensor import (
    SensorDataSchema, 
    HealthStatusSchema,
    UpdateSensorDataSchema,
    SuccessResponseModel,
    ErrorResponseModel
)

from db.crud import (
    create,
    retrieve,
    retrieve_id,
    update,
    delete
)

router = APIRouter()

@router.post("/create", response_description="Create Sensor Data")
async def create_sensors(sensor: SensorDataSchema = Body(...)):
    sensor_analyzer = jsonable_encoder(sensor)
    new_sensor = await create(sensor_analyzer)
    return SuccessResponseModel(new_sensor, "Sensor Added Successfully.")

@router.get("/retrieve", response_description="Retrieve All Sensors Data")
async def retrieve_sensors():
    sensors_data = await retrieve()
    if sensors_data:
        return SuccessResponseModel(sensors_data, "Sensors Data Retrieved Successfully.")
    return ErrorResponseModel(sensors_data, "This Collection is Empty.")

@router.get("/retrieve/{id}", response_description="Retrieve A Sensor Data by Id")
async def retrive_sensor_byID(id):
    sensor = await retrieve_id(id)
    if sensor:
        return SuccessResponseModel(sensor, "A Sensor Data Retrieved Successfully.")
    return ErrorResponseModel(sensor, "This id doesn't exist.")

@router.put("/update/{id}", response_description="Update A Sensor Data by Id")
async def update_sensor_by_ID(id, update_data: UpdateSensorDataSchema = Body(...)):
    req = {k: v for k, v in update_data.dict().items() if v is not None}
    updated_data = await update(id, req)
    if updated_data:
        return SuccessResponseModel(
            updated_data,
            "Sensor Data with ID: {} is Updated Successfully".format(id),
        )
    return ErrorResponseModel(
        updated_data,
        "An Error Occurred, Data with id {0} doesn't exist".format(id)
    )

@router.delete("/delete/{id}", response_description="Delete A Sensor Data by Id")
async def delete_water_data(id: str):
    deleted_water = await delete(id)
    if deleted_water:
        return SuccessResponseModel(
            deleted_water,
            "Sensor Data with ID: {} is Deleted Successfully".format(id),
        )
    return ErrorResponseModel(
        deleted_water,
        "An Error Occurred, Data with id {0} doesn't exist".format(id)
    )