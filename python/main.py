from machine import Pin
import socket
import math
import utime
import network
import time
import json
from dht import DHT11, InvalidChecksum
import requests

wlan = network.WLAN(network.STA_IF)


wlan.active(True)


wlan.connect("Quoc Tuan", "0904543404")


dhtPIN = 16


sensor = DHT11(Pin(dhtPIN, Pin.OUT, Pin.PULL_UP))


 


# Wait for connect or fail


wait = 10


while wait > 0:


    if wlan.status() < 0 or wlan.status() >= 3:


        break


    wait -= 1


    print('waiting for connection...')


    time.sleep(1)


 


# Handle connection error


if wlan.status() != 3:


    raise RuntimeError('WiFi connection failed')


else:


    print('Connected')


    ip = wlan.ifconfig()[0]


    print('IP:', ip)


 


def read_dht():
    utime.sleep(1)

    sensor.measure()


    temperature = sensor.temperature


    humidity = sensor.humidity


    return temperature, humidity

def send_data_to_backend(temperature, humidity):
    url = "http://wirxkano.kesug.com/api/gettemperature"
    headers = {'Content-Type': 'application/json'}
    data = {
        'temperature': temperature,
        'humidity': humidity
    }
    
    print("check")
    
    response = requests.post(url, data=json.dumps(data), headers=headers)
    print(response.text)
    response.close()


def webpage(temperature, humidity):


    html = f"""


        <!DOCTYPE html>


        <html>


        <body>


        <head>Raspberry pi pico W web server </head>


        <p>Temperature: <span id="temp">{temperature}</span> degrees Celsius</p>


        <p>Humidity: <span id="hum">{humidity}</span> %</p>


        <script>


            setInterval(function() {{


                fetch('/data')


                .then(response => response.json())


                .then(data => {{


                    document.getElementById('temp').innerHTML = data.temperature;


                    document.getElementById('hum').innerHTML = data.humidity;


                }});


            }}, 5000);


        </script>


        </body>


        </html>


    """


    return html


 


def serve(connection):


    while True:


        client = connection.accept()[0]


        request = client.recv(1024)


        request = str(request)


        try:


            request = request.split()[1]


        except IndexError:


            pass


 


        print(request)


 


        if request == '/data':
            temperature, humidity = read_dht()
            
            print("temp :"+str(temperature))


            print(" humidity :"+str(humidity))
            
            send_data_to_backend(temperature, humidity)
        else:


            html = webpage(0, 0)  # Initial values for temperature and humidity


            client.send(html)
 


        client.close()


 


def open_socket(ip):


    # Open a socket


    address = (ip, 80)


    connection = socket.socket()


    connection.bind(address)


    connection.listen(1)


    print(connection)


    return connection


 


try:


    if ip is not None:


        connection = open_socket(ip)


        serve(connection)


except KeyboardInterrupt:


    machine.reset()

