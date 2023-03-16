import pyaudio
import websockets
import asyncio
import base64
import json
import time
import requests

#get keywords
fetch_kw_url = "http://164.92.178.243:5000/keywords"
response = requests.request("GET", fetch_kw_url)
keywords = response.json()["selectedKeywords"]
# keywords = keywords.text["selectedKeywords"]
print("received keywords: ", keywords)
print("received keywords visit: ", keywords[0], keywords[1])

post_kw_url = "http://164.92.178.243:5000/modify"

# speech to text
auth_key = '92b43f81e45647aa9b3818623299e3df'

FRAMES_PER_BUFFER = 3200
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000
p = pyaudio.PyAudio()

# starts recording
stream = p.open(
   format=FORMAT,
   channels=CHANNELS,
   rate=RATE,
   input=True,
   frames_per_buffer=FRAMES_PER_BUFFER
)

# the AssemblyAI endpoint we're going to hit
URL = "wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000"


start_time = time.time()
str_list = []

def speed_test(str):
    global start_time, str_list
    if str == '':
        return
    str = str.split(' ')
    str_list.extend(str)
    print(time.time() - start_time)
    print(str_list)
    if time.time() - start_time > 3: #每隔三秒
        print("enter")
        if len(str_list) > 5: #check一下是不是有5个词以上
            print("too fast")
        start_time = time.time()
        str_list = []    
    print("speed test")

def process_speech(str):
    str = str.lower()
    # print("type: ", type(keywords), type(keywords[1]))
    for i in range(1, len(keywords)):
        # print("current keyword: ", keywords[i])
        if str and str in keywords[i][0]:
            print("before remove keyword", keywords[i])
            keywords[i][1] = False
            print("removed keyword", keywords[i])
            resp = requests.post(post_kw_url, json= keywords)
            print("resp: ", resp.text)


    str = str.split(' ')

    return



async def send_receive():
   print(f'Connecting websocket to url ${URL}')
   async with websockets.connect(
       URL,
       extra_headers=(("Authorization", auth_key),),
       ping_interval=5,
       ping_timeout=20
   ) as _ws:
       await asyncio.sleep(0.1)
       print("Receiving SessionBegins ...")
       session_begins = await _ws.recv()
       print(session_begins)
       print("Sending messages ...")
       async def send():
           while True:
               try:
                   data = stream.read(FRAMES_PER_BUFFER)
                   data = base64.b64encode(data).decode("utf-8")
                   json_data = json.dumps({"audio_data":str(data)})
                   await _ws.send(json_data)
               except websockets.exceptions.ConnectionClosedError as e:
                   print(e)
                   assert e.code == 4008
                   break
               except Exception as e:
                   assert False, "Not a websocket 4008 error"
               await asyncio.sleep(0.01)

           return True

       async def receive():
           while True:
               try:
                   result_str = await _ws.recv()
                   print("printing your speech : ", json.loads(result_str)['text'])
               except websockets.exceptions.ConnectionClosedError as e:
                   print(e)
                   assert e.code == 4008
                   break
               except Exception as e:
                   assert False, "Not a websocket 4008 error"
               process_speech(json.loads(result_str)['text'])
            #    speed_test(json.loads(result_str)['text'])   # yuqi speed test

       send_result, receive_result = await asyncio.gather(send(), receive())
    #    print

asyncio.run(send_receive())