import pyaudio
import websockets
import asyncio
import base64
import json
import audioop
#from collections import deque
import time
import serial
import requests

# from ctypes import *
# 
# feedback = cdll.LoadLibrary(home/pi/Desktop/cloud/ER-TFTM1.28-1/tft.so)
 
# 打开串口连接
#ser = serial.Serial('/dev/ttyACM0', 9600)

power = []

keywords = []
output_content = [0, []]

duration = 10 #in seconds

loop = None

auth_key = '92b43f81e45647aa9b3818623299e3df'
FRAMES_PER_BUFFER = 4096
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
IP = "http://10.19.228.170:5000"

post_kw_url = IP + "/modify"
# keywords = ['Hi', 'raspberry pi', 'great']

# add speed detection - yuqi
start_time = time.time()
str_list = []

def write_output():
    print("heres the output to be writeed::", output_content)
    # print("writing to text file")
    tmp_list = []
    tmp_list.append(str(output_content[0]))
    for keyword in output_content[1]:
        if keyword[1] == True:
            tmp_list.append(keyword[0])
            if len(tmp_list) > 3:
                break
    output_kw = '\n'.join(tmp_list)
    with open("output.text", "w") as output_file:
        output_file.write(output_kw)

def retrieve_keywords():
    global keywords
    #get keywords
    fetch_kw_url = IP + "/keywords"
    response = requests.request("GET", fetch_kw_url)
    keywords = response.json()["selectedKeywords"]
    # keywords = keywords.text["selectedKeywords"]
    print("received keywords: ", keywords)
    print("received keywords visit: ", keywords[0], keywords[1])
    keywords = keywords[1:]
    output_content[1] = keywords
    write_output()
    # output_kw = []
    # for keyword in keywords:
    #     if keyword[1] == True:
    #         output_kw.append(keyword[0] + "\n")
    #         if len(output_kw) > 3:
    #             break
    # with open("output.text", "w") as output_file:
    #     output_file.write(str(output_kw))

def volume_test(p, str):
    global output_content
    if str == '':
        return
    avg_power = sum(power) / len(power)
    print('Average Power : ', avg_power)
    if avg_power > 800:
        print("Too Loud")
        output_content[0] = 1
        write_output() 
        
    elif avg_power < 250:
        print("Too Low")
        output_content[0] = 2
        write_output()
    else:
        print("Normal volume")
        output_content[0] = 0
        write_output()
        
    print('volume_test')

def speed_test(str):
    global start_time, str_list
    if str == '':
        return
    str = str.split(' ')
    #print("STR",str,str_list)
    #str_list.extend(str)
    print(time.time() - start_time)
    #print("00",str_list)
    if time.time() - start_time > 3: #每隔三秒
        #str_list.extend(str)
        str_list = str
        print("enter")
        if len(str_list) > 5: #check一下是不是有5个词以上
            print("too fast")
            output_content[0] = 3
            write_output()
            # output_file.write('3\n')
            # with open("output.txt", "w") as output_file:
            #     output_file.write(f"This is too loud.\n")
            #     output_file.close()
            #ser.write(b'F')  # 向串口发送字节'F'，指示Arduino控制LED
        elif len(str_list) < 3:
            print("too slow")
            output_content[0] = 4
            write_output()
        else:
            print("Normal speed")
            output_content[0] = 0
            write_output()
            
            #ser.write(b'S')
        start_time = time.time()
        str_list = []
        #str_list = []
        print("11",str_list)
    print("speed test")


def process_speech(str):
    global keywords, loop
    str = str.lower()
    print("transcription:", str)
    if "bye" in str:
        loop.close()
    for i in range(0, len(keywords)):
        # print("current keyword: ", keywords[i])
        if str and str in keywords[i][0].lower():
            print("before remove keyword", keywords[i])
            keywords[i][1] = False
            print("removed keyword", keywords[i])
            # resp = requests.post(post_kw_url, json= keywords)
            # print("resp: ", resp.text)
            output_content[1] = keywords
            write_output()

    str = str.split(' ')
    # write_output(keywords)

    return
    
# cur_time = time.time()

async def send_receive():
   
    global power, loop
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
            global power
            while True:
                try:
                    data = stream.read(FRAMES_PER_BUFFER, exception_on_overflow = False)
                   
                    power.append(audioop.rms(data, 2))
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
            global power 
           
            while True:
                try:
                    result_str = await _ws.recv()
                    print("here print text: ", json.loads(result_str)['text'])
                except websockets.exceptions.ConnectionClosedError as e:
                    print(e)
                    assert e.code == 4008
                    break
                except Exception as e:
                    assert False, "Not a websocket 4008 error"
                process_speech(json.loads(result_str)['text'])
                speed_test(json.loads(result_str)['text'])   # yuqi speed test
                print(power)
                if len(power) % 6 == 0:
                   
                    volume_test(power, json.loads(result_str)['text'])
                    power = []
                            
        send_result, receive_result = await asyncio.gather(send(), receive())
    #    print("getting loop")
    loop = asyncio.get_running_loop()
    #    print

# global loop
if __name__ == '__main__':
    retrieve_keywords()

    asyncio.run(send_receive())
    # loop = asyncio.get_running_loop()




