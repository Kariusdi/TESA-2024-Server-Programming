import json
from typing import List
from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import requests
# from bson.objectid import ObjectId

from models.sensor import (
    SensorDataSchema, 
    HealthStatusSchema,
    UpdateSensorDataSchema,
    UpdateHealthStatusSchema,
    SuccessResponseModel,
    SuccessResponseModelList,
    ErrorResponseModel
)

from db.crud import (
    create,
    create_status,
    retrieve,
    retrieve_status,
    retrieve_id,
    update,
    update_status,
    delete_all_status,
    delete
)

router = APIRouter()

@router.post("/create/maintenance/logs", response_description="Create Maintenance Logs Data")
async def create_maintenance_logs(status: List[HealthStatusSchema] = Body(...)):
    created_statuses = []
    for status_item in status:
        status_analyzer = jsonable_encoder(status_item) 
        new_status = await create_status(status_analyzer)
        created_statuses.append(new_status) 

    return SuccessResponseModelList(data=created_statuses, message="Status Added Successfully.")

@router.get("/retrieve/maintenance/logs", response_description="Retrieve All Status Data")
async def retrieve_statuses():
    statuses_data = await retrieve_status()
    if statuses_data:
        return SuccessResponseModel(statuses_data, "Statuses Data Retrieved Successfully.")
    return ErrorResponseModel(statuses_data, "This Collection is Empty.")

@router.put("/update/maintenance/logs/{id}", response_description="Update A Status Data by Id")
async def update_status_by_ID(id, update_data: UpdateHealthStatusSchema = Body(...)):
    req = {k: v for k, v in update_data.dict().items() if v is not None}
    updated_data = await update_status(id, req)
    if updated_data:
        return SuccessResponseModel(
            updated_data,
            "Status Data with ID: {} is Updated Successfully".format(id),
        )
    return ErrorResponseModel(
        updated_data,
        "An Error Occurred, Data with id {0} doesn't exist".format(id)
    )

@router.delete("/delete/maintenance/logs", response_description="Delete All Status Data")
async def update_status_by_ID():
    delete_data = await delete_all_status()
    if delete_data:
        return SuccessResponseModel(
            delete_data,
            "Status Data is Deleted Successfully".format(id),
        )
    return ErrorResponseModel(
        delete_data,
        "An Error Occurred"
    )
    
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
async def retrive_sensor_by_ID(id):
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