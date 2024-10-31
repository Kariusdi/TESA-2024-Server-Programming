import motor.motor_asyncio
from bson.objectid import ObjectId
from pymongo import ReturnDocument, errors
import asyncio

async def create_ts_collection(database, col_name):
    try :
        await database.create_collection(
                col_name,
                timeseries= {
                    "timeField": "timestamp",
                    "metaField": "metadata",
                    "granularity": "seconds"
                }
            )
        print("Create collection successfully.")
    except errors.CollectionInvalid as e:
        print(f"{e}. Continuing")
    
async def main():
    MONGO_DETAILS = "mongodb://admin:1q2w3e4r@127.0.0.1:27017"

    client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

    database = client.machines_data
    col_name = "sensors_time_series"
    
    task = asyncio.create_task(create_ts_collection(database, col_name))
    
    _ = await asyncio.gather(task)
    
    print("Done.")

if __name__ == "__main__":
    asyncio.run(main())