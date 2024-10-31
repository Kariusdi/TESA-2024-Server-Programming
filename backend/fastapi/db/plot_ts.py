import datetime
import pathlib
import asyncio
import pandas as pd
import motor.motor_asyncio


async def aggregation(collection):
    results = await collection.aggregate([
        {"$project": {
        "date": { 
            "$dateToString": { "format": "%Y-%m", "date": "$timestamp" } 
        },
        "cuisine": "$metadata.cuisine",
        "rating": "$rating",
        }},
        { 
        "$group": {
            "_id": {
                "cuisine": "$cuisine",
                "date": "$date",
            },
            "average": { "$avg": "$rating" },
        }
        },
        {"$addFields": {"cuisine": "$_id.cuisine" }},
        {"$addFields": {"date": "$_id.date" }}
    ]).to_list(length=None)
    
    return results

async def main():
    start_date = '2018-01-01'
    end_date = '2022-12-31'
    
    MONGO_DETAILS = "mongodb://admin:1q2w3e4r@127.0.0.1:27017"

    client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

    database = client.machines_data
    col_name = "sensors_time_series"
    
    collection = database.get_collection(col_name)
    task = asyncio.create_task(aggregation(collection))
    result = await asyncio.gather(task)
    
    print(len(result[0]))
    
    df = pd.DataFrame(result[0])
    df['date'] = pd.to_datetime(df['date'])
    df = df[['date', 'cuisine', 'average']]
    df.set_index('date', inplace=True)

    # Ensure the dates are sorted for slicing
    df = df.sort_index()

    base_dir = pathlib.Path(__file__).parent.parent
    output_dir = base_dir / 'plots' / 'cuisines'
    output_dir.mkdir(exist_ok=True, parents=True)
    now = datetime.datetime.now()

    group_data = df.loc[start_date:end_date].groupby('cuisine')['average']
    chart_a = group_data.plot(legend=True, figsize=(10, 5))
    fig = chart_a.iloc[0].get_figure()
    fig.savefig(str(output_dir / f'{int(now.timestamp())}-{start_date}-{end_date}.png'))
    
if __name__ == "__main__":
    asyncio.run(main())
