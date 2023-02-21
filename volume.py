# Print out realtime audio volume as ascii bars

import sounddevice as sd
import numpy as np

sound_data = []
led_data = []

def print_sound(indata, outdata, frames, time, status):
    volume_norm = np.linalg.norm(indata)*10
    print ("|" * int(volume_norm))
    sound_data.append(volume_norm)
    #if volume_norm > 20:
        #light = 1
    #elif volume_norm < 10:
       # light = 2
    #else:
       # light = 0
    #light.append(light)

with sd.Stream(callback=print_sound):
    sd.sleep(10000)

print(sound_data)
print(len(sound_data))


