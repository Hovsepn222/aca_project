import sqlite3

connection = sqlite3.connect('database.db')

# run this python code at this location to initialise the database with the provided schema.sql

with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

# Adding something
# cur.execute("INSERT INTO UserTable (Name, Email, Password, PhoneNumber) VALUES (?,?,?,?)",
#             ('Hovsep', 'hovsep@gmail.com', 'pass123', '099129068')
#             )



connection.commit()
connection.close()