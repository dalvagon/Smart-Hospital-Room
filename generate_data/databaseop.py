import mysql.connector

def create_db_connection(host_name, user_name, user_password, db_name):
    conn = None
    try:
        conn = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name
        )
        print("MYSQL database connection successful")
    except Exception as e:
        print(e)
    return conn

def database_update(query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
    except Exception as e:
        print(e)  # return "error" next step

connection = create_db_connection("localhost", "root", "root", "temphum")