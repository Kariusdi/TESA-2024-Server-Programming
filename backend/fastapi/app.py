from fastapi import FastAPI
from routes.mqtt import router as MqttRouter
from routes.api import router as SensorRouter

app = FastAPI()

# app.include_router(MqttRouter, tags=["MQTT"],prefix="/mqtt")
app.include_router(SensorRouter, tags=["Sensor"],prefix="/sensor")

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "My REST API server!"}