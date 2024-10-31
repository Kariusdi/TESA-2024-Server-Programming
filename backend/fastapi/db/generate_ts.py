import datetime
import random
import sys
import motor.motor_asyncio
import asyncio

name_choices =  ["Big", "Goat", "Chicken", "Tasty", "Salty", "Fire", "Forest", "Moon", "State", "Texas", "Bear", "California"]
cuisine_choices = ["Pizza", "Bar Food", "Fast Food", "Pasta","Tacos", "Sushi", "Vegetarian", "Steak", "Burgers"]

def get_random_name():
    _name_start = random.choice(name_choices)
    _name_end = random.choice(name_choices)
    return f"{_name_start} {_name_end}"

def get_random_cuisine():
    selected_cuisine = random.choice(cuisine_choices)
    return selected_cuisine
  
def get_random_rating(skew_low=True):
    part_a = list([random.randint(1, 3) for i in range(10)])
    part_b = list([random.randint(3, 4) for i in range(10)])
    if not skew_low:
      part_c = list([random.randint(4, 5) for i in range(25)])
    else:
      part_c = list([random.randint(4, 5) for i in range(5)])
    _ratings =  part_a + part_b +  part_c
    return random.choice(_ratings)

def get_random_timestamp():
    now = datetime.datetime.now()
    delta = now - datetime.timedelta(days=random.randint(0, 5_000), minutes=random.randint(0, 60), seconds=random.randint(0, 60))
    return delta

async def run(collection, iterations=50, skew_results=True):
    completed = 0
    for n in range(0, iterations):
        timestamp = get_random_timestamp()
        name = get_random_name()
        cuisine = get_random_cuisine()
        rating = get_random_rating(skew_low=True)
        if skew_results:
          if cuisine.lower() == "mexican":
              rating = random.choice([4, 5])
          elif cuisine.lower() == "bar food":
              rating = random.choice([1, 2])
          elif cuisine.lower() == "sushi":
              rating = get_random_rating(skew_low=False)              
        data = {
          "metadata": {
            "name": name,
            "cuisine": cuisine
          },
          "rating": rating,
          "timestamp": timestamp
        }
        result = await collection.insert_one(data)
        if result.acknowledged:
            completed += 1
        if n > 0 and n % 1000 == 0:
            print(f"Finished {n} of {iterations} items.")
    print(f"Added {completed} items.")

async def find_ts_one(collection):
    await asyncio.sleep(1)
    result = await collection.find_one()
    return result

async def aggregate(collection):
    results = await collection.aggregate([
        {"$group": {
            "_id": {"name": "$metadata.name", "cuisine": "$metadata.cuisine"},
            "count": {"$sum": 1},
            "currentAvg": {"$avg": "$rating"},
        }}
    ]).to_list(length=None)
    return results

async def main():
    iterations = 1000
    
    MONGO_DETAILS = "mongodb://admin:1q2w3e4r@127.0.0.1:27017"

    client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

    database = client.machines_data
    col_name = "sensors_time_series"
    
    collection = database.get_collection(col_name)
    
    tasks = [asyncio.create_task(run(collection, iterations=iterations)), asyncio.create_task(find_ts_one(collection))]
    # task = asyncio.create_task(aggregate(collection))
    result = await asyncio.gather(*tasks)
    
    # print(len(result[0]))

if __name__ == "__main__":
    asyncio.run(main())