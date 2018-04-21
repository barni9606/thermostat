import socket
from mysocket import Socket
from threading import Thread, Lock
import time
import json
from datetime import datetime

try:
    import RPi.GPIO as GPIO
except RuntimeError:
    print("Error importing RPi.GPIO!")
gpio_number = 17

week = None
lock = Lock()
# w1Loc = '/sys/bus/w1/devices/28-5ec67b126461'
w1Loc = '.'
GPIO.setmode(GPIO.BCM)
GPIO.setup(gpio_number, GPIO.OUT)


def getTempC():
    f = open(w1Loc + '/w1_slave', 'r')
    return float(f.read().split('=')[2]) / 1000


def activate_relay():
    GPIO.output(gpio_number, GPIO.HIGH)


def deactivate_relay():
    GPIO.output(gpio_number, GPIO.LOW)


class Regulator(Thread):

    def run(self):
        while True:
            day = datetime.today().weekday()
            now = datetime.now().time()
            period = None
            with lock:
                for i in week[day]["periods"]:
                    start = i["start"]["hours"] * 60 + i["start"]["minutes"]
                    finish = i["finish"]["hours"] * 60 + i["finish"]["minutes"]
                    if start <= now.hour * 60 + now.minute <= finish:
                        period = i
                        break
                temp = period["temperature"]
            current_temp = getTempC()
            if temp > current_temp:
                activate_relay()
            else:
                deactivate_relay()
            time.sleep(30)


def read():
    with open('week.json', 'r') as f:
        global week
        f.seek(0)
        with lock:
            week = json.load(f)


try:
    read()
    r = Regulator()
    r.start()

    server_socket = socket.socket(
        socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('', 5001))
    # become a server socket
    server_socket.listen(1)

    while 1:
        # accept connections from outside
        (client_socket, address) = server_socket.accept()
        # now do something with the clientsocket
        conn = Socket(client_socket)
        # sock.connect('localhost', 5001)
        if conn.receive() == 'azd':
            read()
            print(week)
finally:
    GPIO.cleanup()
