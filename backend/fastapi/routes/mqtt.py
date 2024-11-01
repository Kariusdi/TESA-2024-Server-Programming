import json
from fastapi import APIRouter 
from fastapi_mqtt.config import MQTTConfig
from fastapi_mqtt.fastmqtt import FastMQTT
from utils.time import getTimeStamp
from models.sensor import SensorDataSchema
from db.crud import create
import socketio


# Socket.IO setup
sio_server = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=[])
sio_app = socketio.ASGIApp(socketio_server=sio_server, socketio_path='sockets')

mqtt_config = MQTTConfig(host = "172.30.1.60",
    port= 1883,
    keepalive = 60,
    username="LinearOnly-Karn",
    password="1q2w3e4r")

fast_mqtt = FastMQTT(config=mqtt_config)

router = APIRouter()
fast_mqtt.init_app(router)

@fast_mqtt.on_connect()
def connect(client, flags, rc, properties):
    fast_mqtt.client.subscribe("/mqtt") #subscribing mqtt topic
    print("Connected: ", client, flags, rc, properties)

@fast_mqtt.on_message()
async def message(client, topic, payload, qos, properties):
    print("Received message: ",topic, payload.decode(), qos, properties)

# @fast_mqtt.subscribe("my/mqtt/topic/#")
@fast_mqtt.subscribe("linearOnly/soundSensor/1")
async def message_to_topic(client, topic, payload, qos, properties):
    data = json.loads(payload)

    time = getTimeStamp()
    
    data_schema = {
        "name": data["name"],
        "timestamp": time["timestamp"],
        "hour": time["hour"],
        "minute": time["minute"],
        "date": time["date"],
        "sensorValue": data["sensorValue"],
    }
    
    sensor_data: SensorDataSchema = data_schema
    await create(sensor_data)
    
    print("Received message to specific topic: ", topic, payload.decode(), qos, properties)

@fast_mqtt.subscribe("linearOnly/status")
async def machine_status(client, topic, payload, qos, properties):
    data = json.loads(payload)
    
    await sio_server.emit('machine_status', data["data"])
    
    print("Done")
    
@fast_mqtt.on_disconnect()
def disconnect(client, packet, exc=None):
    print("Disconnected")

@fast_mqtt.on_subscribe()
def subscribe(client, mid, qos, properties):
    print("subscribed", client, mid, qos, properties)


@router.get("/", response_description="test publish to mqtt")
async def publish_hello():
    fast_mqtt.publish("/mqtt", "Hello from Fastapi") #publishing mqtt topic
    return {"result": True,"message":"Published"}

@sio_server.event
async def machine_status(data):
    await sio_server.emit('machine_status', {'data': data})
