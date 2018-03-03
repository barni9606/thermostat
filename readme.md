# Raspberry Thermorstat
This is a Project-Laboratory project in the Budapest University of Technology and Economics (BME) on the Department of Automation and Applied Informatics (AUT) about a remotely controlled smart thermostat using the Raspberry Pi.

## Hardware requirements
+ Raspberry pi
+ DS18B20 (digital thermometer)
+ 10k ohm resistor
+ 5V relay (preferably with light coupling)
+ breadboard
+ 3 MF, 3 FF and an optional MM jumper cable

### Wiring diagram and Schematic
![wiring diagram](/imgs/wiring_diagram.png)
![schematic](/imgs/schematic.png)
> Please note that DS18B20 might be vertically mirrored on the wiring diagram


## Software requirements
+ Raspbian OS
+ python (with libraries: flask, subprocess, RPi.GPIO)
