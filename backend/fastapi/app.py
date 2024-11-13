from fastapi import FastAPI
from routes.mqtt import router as MqttRouter
from routes.api import router as SensorRouter
from fastapi.middleware.cors import CORSMiddleware
from routes.mqtt import sio_app

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(MqttRouter, tags=["MQTT"],prefix="/mqtt")
# app.include_router(SensorRouter, tags=["Machine Sensor and Status"],prefix="/sensor")
# app.mount('/sockets', app=sio_app)

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "My REST API server!"}