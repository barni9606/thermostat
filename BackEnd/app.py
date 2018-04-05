from flask import Flask, request
import json
from flask_cors import CORS
from subprocess import check_output
app = Flask(__name__)
CORS(app)

# w1Loc = '/sys/bus/w1/devices/28-5ec67b126461'
w1Loc = '.'


@app.route("/temperature", methods=["GET", "PUT"])
def temperature():
    if request.method == "GET":
        return getTempC()
    elif request.method == "PUT":
        req = request.json
        return setTemp(req["temp"], req["mode"])


@app.route("/week", methods=["GET", "PUT"])
def week():
    if request.method == "GET":
        data = open('week.json').read()
        return data
    elif request.method == "PUT":
        return putWeek(request.json)


def getTempC():
    f = open(w1Loc + '/w1_slave', 'r')
    return str(float(f.read().split('=')[2]) / 1000)


def setTemp(t, mode="c"):
    try:
        t = float(t)
    except ValueError:
        return "Not a float"
    try:
        t_old = open("temp", "r+").read(3)
    except FileNotFoundError:
        t_old = 0
    f = open("temp", "w")
    if mode == "f":
        t = (t - 39) * 5 / 9
    t = round(t * 2) / 2
    f.write(str(t))
    try:
        t_old = float(t_old)
        if t > t_old:
            return "True"
        else:
            return "False"
    except ValueError:
        pass
    return "True"


def putWeek(data):
    with open("week.json", "w") as f:
        json.dump(data, f)
    return "Ok"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
