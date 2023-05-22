import sqlite3
import csv
import os

# Run this python file to add all scrapped data from the csv to db
cwd = os.getcwd()  # Get the current working directory (cwd)
files = os.listdir(cwd)  # Get all the files in that directory

def add_toDB(list_am_csv):
    # Connect to the SQLite database
    conn = sqlite3.connect('/Users/hovsepnajarian/Documents/GitHub/aca_project/server/db/database.db')
    cursor = conn.cursor()
    # Open the CSV file and read its contents
    csv_data = '/Users/hovsepnajarian/Documents/GitHub/aca_project/server/listam_data/list_data.csv'
    with open(csv_data, 'r') as data:
        csv_data = csv.reader(data)
        next(csv_data) # Skip the header row if present
        # Iterate over each row in the CSV and insert into the database
        for row in csv_data:
            UserID = 1
            CatagoryID = row[5]
            ItemName = row[0]
            Description = row[1]
            Price = row[2]
            Currency = row[3]
            Location = row[4]
            Image = row[6]
            cursor.execute("INSERT INTO ItemsTable (UserID, CatagoryID, ItemName, Description, Price, Currency, Location, Image) VALUES (?,?,?,?,?,?,?,?)",
            (UserID, CatagoryID, ItemName, Description, Price, Currency, Location, Image)
            )
    conn.commit()
    conn.close()


add_toDB('list_data.csv')
    