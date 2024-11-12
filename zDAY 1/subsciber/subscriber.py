import json
from paho.mqtt import client as mqtt_client
from datetime import datetime, timedelta, timezone
from pymongo import MongoClient

client = MongoClient("mongodb://admin:1q2w3e4r@host.docker.internal:27017")
db = client['machines_data']
sensors_collection = db['sensors_collection']

broker = "host.docker.internal"
# broker = "172.20.10.2"
port = 1883
topic = "Lintech/test/msg"
username = 'LinearOnly-Idea'
password = '1q2w3e4r'

def sensor_helper(sensor) -> dict:
    return {
        "id": str(sensor["_id"]),
        "machine_id": sensor["machine_id"],
        "sensorVal": sensor["sensorVal"],
        "date": sensor["date"]
    }

def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client()
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client

def getTimeStamp():
    offset = timezone(timedelta(hours=7))
    current_time = datetime.now(offset)
    date_string = current_time.strftime("%d/%m/%Y %H:%M:%S%zZ")
    formatted_date = date_string[:-3] + ':' + date_string[-3:]

    print({"date": formatted_date})
    
    return formatted_date

def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        try:
            payload = json.loads(msg.payload.decode())
            machine_id = payload.get('machine_id')
            sensor_val = payload.get('sensorVal')
            date = getTimeStamp()
    
            data_schema = {
                "machine_id": machine_id,
                "sensorVal": sensor_val,
                "date": date
            }

            result = sensors_collection.insert_one(data_schema)
            print(f"Inserted sensor with ID: {result.inserted_id}")
            print(f"Received Machine ID: {machine_id}, Sensor Value: {sensor_val} from `{msg.topic}` topic")
        except json.JSONDecodeError:
            print(f"Failed to decode JSON from message: {msg.payload}")
        except KeyError as e:
            print(f"Missing key in message payload: {e}")
    
    client.subscribe(topic)
    client.on_message = on_message


def run():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()


if __name__ == '__main__':
    run()
