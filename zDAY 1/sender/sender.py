import json
from paho.mqtt import client as mqtt_client
import time

broker = "host.docker.internal"
# broker = "172.20.10.2"
port = 1883
topic = "Lintech/test/msg"
username = 'LinearOnly-Idea'
password = '1q2w3e4r'

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

def publish(client: mqtt_client):
    try:
        while True:
            time.sleep(10)
            payload = {
                "machine_id": 1,
                "sensorVal": 476
            }
            json_payload = json.dumps(payload)
            result = client.publish(topic, json_payload)
            if result:
                print("Sent ", payload)
            else:
                print("Failed to send message to topic " + topic)
                if not client.is_connected():
                    print("Client not connected, exiting...")
                    break             
    finally:
        client.disconnect()
        client.loop_stop()
        
def run():
    client = connect_mqtt()
    publish(client)
    client.loop_forever()
    
if __name__ == '__main__':
    run()