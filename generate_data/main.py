import random as rand
from databaseop import database_update
import time
import uuid
import datetime
from perlin_noise import PerlinNoise

noise = PerlinNoise()
toff = rand.randint(0, 100)
hoff = rand.randint(0, 100)


def getClimate():
    global toff
    global hoff
    toff += 0.1
    hoff += 0.1
    temperature = round((noise(toff) + 1) * 10 + 15, 2)
    humidity = round((noise(hoff) + 1) * 25 + 20, 2)
    return temperature, humidity


def generateData():
    while 1:
        temperature, humidity = getClimate()
        id = str(uuid.uuid4())
        generated_time = datetime.datetime.now()
        sql_query = "insert into data values ('%s','%s','%s','%s')" % (
            id,
            temperature,
            humidity,
            generated_time,
        )
        print("Temperature: ", temperature)
        print("Humidity:", humidity)
        database_update(sql_query)
        time.sleep(5)


if __name__ == "__main__":
    generateData()
