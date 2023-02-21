import sounddevice as sd
import numpy as np

sound_data = []
led_data = []
volume_feedback = []
volume_below = 0
volume_above = 0

def print_sound(indata, outdata, frames, time, status):
    global volume_feedback, volume_below, volume_above
    volume_norm = np.linalg.norm(indata)*10
    sound_data.append(volume_norm)
    if volume_norm < 5:
        volume_below += 1
        volume_above = 0
        if volume_below >= 10: # when volume is below 5 and last for 1 secs
            volume_feedback.append(1)
    elif volume_norm > 10:
        volume_above += 1
        volume_below = 0
        if volume_above >= 10: # when volume is over 10 and last for 1 secs
            volume_feedback.append(2)
    else:
        volume_below = 0
        volume_above = 0
        volume_feedback.append(0)
    print("|" * int(volume_norm))

with sd.Stream(callback=print_sound):
    sd.sleep(10000)

print((sound_data)*10)
print(len(sound_data))
print(volume_feedback)
print(len(volume_feedback))