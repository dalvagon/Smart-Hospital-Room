import random as rand
from databaseop import database_update
import time
import uuid
import datetime
def generate_one_data():
    temperature = round(rand.uniform(20, 35), 2)
    humidity = round(rand.uniform(30, 70), 2)
    return temperature, humidity


def generate_data_contant():
    while (1):
        temperature, humidity = generate_one_data()
        id=str(uuid.uuid4())
        print(id)
        generated_time=datetime.datetime.now()
        sql_query="insert into data values (\'%s\',\'%s\',\'%s\',\'%s\')" % (
            id, temperature, humidity,generated_time)
        print("Temperature: ", temperature)
        print("Humidity:", humidity)
        database_update(sql_query)
        time.sleep(5)


if __name__ == "__main__":
    generate_data_contant()
