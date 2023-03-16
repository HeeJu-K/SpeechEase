from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/start", methods=["GET"])
def start_rasp():
    global isStart
    
    return 