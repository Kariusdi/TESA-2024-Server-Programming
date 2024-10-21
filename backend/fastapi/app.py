from fastapi import FastAPI
from mqtt.main import router as MqttRouter

app = FastAPI()

app.include_router(MqttRouter, tags=["MQTT"],prefix="/mqtt")

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "My REST API server!"}