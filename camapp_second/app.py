


#Initialization part:
 # - start the emitter which emits events from the camera
 # - define the frames per second
 # - define video capture variable to use later
 # - define the threading to route different client requests
 # - Ensure the thread daemon is up and running
 # - start the thread



 # Run function:
 # - once you have initialized the variables above, you want your camera to keep runing and capturing frames as well
 # - remember implementing the while loop to allow for continous capture

# onEveryNewFrame funtion:
 # - You want to attach your emitter to it and keep calling a function on it

# removing the emit listener on a new frame function:

# Kill / stop the running process you had initiated earlier

# define the capture frame fxn that's responsible for capturing the images and remember to call the emit fxn from the emitter to emit your images

import cv2
import threading
import time
from pyee import EventEmitter


class Camera()
    running = True

    def __init__(self,fps=24):
        self.emitter = EventEmitter()
        self.fps = fps
        self.cap = cv2.VideoCapture(0)
        self.thread = threading.Thread(target=self.run)
        self.thread.daemon = True
        self.thread.start()

    def run(self):
        capturePeriodSecs = 1.0 / self.fps
        while self.Running == True:
            try:
                self.cap_frame()
            except Exception as error:
                print ("error with capturing frames: ", error)
            time.sleep(capturePeriodSecs)

    def onNewFrame(self,callback):
        self.emitter.on('frame', callback)

    def removeOnNewFrameListener(self,callback):
        self.emitter.remove_emitter_listener('frame', callback)


    def stop(self):
        self.running = False


    def cap_frame(self):
        f,img = self.cap.read()
        self.latest_frame = img
        self.emitter.emit('frame', img)



import cv2

class Recorder()
    def __init__(self,camera,file_name,dimensions):
        self.dimensions = dimensions
        self.file_name = file_name
        self.camera = camera
        self.vid_writer = cv2.VideoWriter(file_name,-1,camera.fps,dimensions)
        self.camera.onNewFrame(self.newFrameChange)

    def newFrameChange(self,frame):
        frame = cv2.resize(frame,self.dimensions)
        self.vid_writer.write(frame)


    def stop(self):
        self.camera.removeOnNewFrameListener(self.newFrameChange)
        self.vid_writer.release()


import datetime from datetime
import cv2
from camera import Camera
from recorder import Recorder
import time
from flask import Flask, make_response


app = Flask(__name__)
app.debug(True)
camera = Camera()
recorder = Recorder()
recorder_id = 0
recorders = {}
FRAME_HEIGHT = 640
FRAME_WIDTH = 340


@app.route('/frame', [method ='GET'])
def get_frame():
    if camera.latest_frame:
        frame = cv2.resize(camera.latest_frame,(FRAME_WIDTH,FRAME_HEIGHT))
        revtal, buffer = cv2.imencode('.png',frame)
        response = make_response(buffer.tobytes())
        response.headers['Content-Type'] = 'image/png'
        return response
    else:
        return "No frame available", 500

@app.route('/record/start', [method ='POST'])
def record_start():
    global recorder_id
    recorder_id += 1
    file_name = 'video' + str(recorder_id) + str(datetime.datetime.now()) + '.avi'
    recorder = Recorder(camera,file_name, (FRAME_WIDTH,FRAME_HEIGHT))
    recorders[recoder_id] = recorder
    return str(recorder_id)


@app.route('/record/stop/<int:recorder_id>', [method = 'POST'])
def record_stop(recorder_id):
    recorder = recorders[recorder_id]
    recorder.stop()
    return recorder.file_name

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)



const store = createStore(reducers,
{},
compose(applyMiddleWaare(reduxThunk),autoRehydrate ))

persistStore(store, { storage: AsyncStorage, whitelist:['likedJobs'] })
