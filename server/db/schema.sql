drop table if exists UserTable;
CREATE TABLE UserTable (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name CHARACTER(50),
    Email CHARACTER(50) UNIQUE,
    Password CHARACTER(50),
    PhoneNumber INTEGER(50) UNIQUE
);

drop table if exists ItemsTable;
CREATE TABLE ItemsTable (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER,
    CatagoryID INTEGER,
    ItemName CHARACTER(200),
    Description CHARACTER(2000),
    Price INTEGER,
    Currency CHARACTER(20),
    Location TEXT,
    Image CHARACTER(400),
    FOREIGN KEY (UserID) REFERENCES UserTable(ID),
    FOREIGN KEY (CatagoryID) REFERENCES CatagoryTable(ID)
);

drop table if exists CatagoryTable;
CREATE TABLE CatagoryTable (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name CHARACTER(100)
);

drop table if exists FavoriteTable;
CREATE TABLE FavoriteTable (
    UserID INTEGER,
    ItemID INTEGER,
    FOREIGN KEY (UserID) REFERENCES UserTable(ID),
    FOREIGN KEY (ItemID) REFERENCES ItemsTable(ID)
);