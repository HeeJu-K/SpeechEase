import speech_recognition as sr
from gpiozero import LED
from time import sleep

red = LED(17)
relay1 = LED(14)
relay2 = LED(15)

r = sr.Recognizer()
mic = sr.Microphone()

print("hello")

while True:
    print("in loop")
    with mic as source:
        audio = r.record(source, duration=30)
        print("audio: ", audio)
    words = r.recognize_google(audio)
    print("words", words)
   
