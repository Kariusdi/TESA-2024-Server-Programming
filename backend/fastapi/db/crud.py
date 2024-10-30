import motor.motor_asyncio
from bson.objectid import ObjectId
from pymongo import ReturnDocument

MONGO_DETAILS = "mongodb://admin:1q2w3e4r@127.0.0.1:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.machines_data

sensors_collection = database.get_collection("sensors_collection")

def sensor_helper(sensor) -> dict:
    return {
        "id": str(sensor["_id"]),
        "timestamp": sensor["timestamp"],
        "sensorValue": sensor["sensorValue"],
        "updatedTime": sensor["updatedTime"]
    }

async def create(water_data: dict) -> dict:
    sensor = await sensors_collection.insert_one(water_data)
    new_sensor = await sensors_collection.find_one({"_id": sensor.inserted_id})
    return sensor_helper(new_sensor)

async def retrieve():
    data = []
    async for ele in sensors_collection.find():
        data.append(sensor_helper(ele))
    return data

async def retrieve_id(id: str) -> dict:
    sensor = await sensors_collection.find_one({"_id": ObjectId(id)})    
    if sensor:
        return sensor_helper(sensor)

async def update(id: str, update_data: dict) -> bool:
    if len(update_data) == 0:
        return False
    
    sensor = await sensors_collection.find_one_and_update({"_id": ObjectId(id)}, 
                                                          {'$set': update_data}, 
                                                          return_document = ReturnDocument.AFTER)
    if sensor:
        return True
    return False

async def delete(id: str) -> bool:
    del_sensor = await sensors_collection.find_one_and_delete({"_id": ObjectId(id)}, 
                                                projection = None, 
                                                sort = None)    
    if del_sensor:
        return True
    return False