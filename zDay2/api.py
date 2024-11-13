from flask import Flask, jsonify, request
import uuid

app = Flask(__name__)

datas =  [{"data1": 345}, {"data2": 35}, {"data3": 45}]

@app.route("/")
def index():
    return f"<h1>Hello World {uuid.getnode()}</h1>"

@app.route("/data", methods=["GET"])
def get_data():
    return jsonify(datas), 200

@app.route("/data", methods=["POST"])
def post_data():
    new_data = request.get_json()
    datas.append(new_data)
    return jsonify(datas), 201

@app.route("/data/<int:id>", methods=["PUT"])
def put_data(id):
    updated_data = request.get_json()
    datas[id] = updated_data 
    return jsonify(datas), 201

@app.route("/data", methods=["DELETE"])
def del_data():
    del_data = datas.pop()
    return jsonify(del_data), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)