import json
from fastapi import APIRouter 
from fastapi_mqtt.config import MQTTConfig
from fastapi_mqtt.fastmqtt import FastMQTT
import datetime

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
@fast_mqtt.subscribe("tgr2024/THE_LIAM/btn_evt")
async def message_to_topic(client, topic, payload, qos, properties):
    data = json.loads(payload)
    h = data["height"]
    id = data["id"]
    print(data)

    # date = datetime.datetime.now()

    # all_data = {
    #     "name": "M7",
    #     "id": id,
    #     "year": date.year,
    #     "date": date.day,
    #     "month": date.month,
    #     "height": int(h)
    # }

    # waterhieghtdata: WaterHeightSchema = all_data
    # await add_water(waterhieghtdata)

    print("Received message to specific topic: ", topic, payload.decode(), qos, properties)
        
@fast_mqtt.on_disconnect()
def disconnect(client, packet, exc=None):
    print("Disconnected")

@fast_mqtt.on_subscribe()
def subscribe(client, mid, qos, properties):
    print("subscribed", client, mid, qos, properties)


@router.get("/", response_description="test publish to mqtt")
async def publish_hello():
    fast_mqtt.publish("/mqtt", "Hello from Fastapi") #publishing mqtt topic
    return {"result": True,"message":"Published" }
