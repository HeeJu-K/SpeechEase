from flask import Flask, request
from flask_cors import CORS
import json

import subprocess


app = Flask(__name__)
CORS(app)

process = None

@app.route("/start", methods=["POST"])
def start_rasp():
    print("starting the process")
    global process
    process = subprocess.Popen(['python', 'rasp_code.py'])
    return json.dumps("Start")

@app.route("/shut", methods=["POST"])
def shut_rasp():
    print("shutting down the process")
    global process
    process.terminate()
    return json.dumps("Shut") 