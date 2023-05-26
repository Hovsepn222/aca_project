import sqlite3
import hashlib
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from datetime import timedelta
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)
salt = "5gz2"
cors = CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})
app.config["JWT_SECRET_KEY"] = "73bd912ydj30d12g"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=100)
jwt = JWTManager(app)

@app.after_request
@cross_origin()
def set_headers(response):
    response.headers["Referrer-Policy"] = 'no-referrer'
    return response

# Connecting to the database
def get_db_connection():
    conn = sqlite3.connect('db/database.db')
    conn.row_factory = sqlite3.Row
    return conn

# SignUp
@app.route('/api/signup', methods=["POST"])
@cross_origin()
def signup_create_account():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None) + salt
    confirmPassword = request.json.get("confirmPassword", None) + salt
    hashed_password = hashlib.md5(password.encode()).hexdigest()
    phone_number = request.json.get("phone_number", None)
    conn = get_db_connection()
    if conn.execute("select * from UserTable where Email = ?", [email]).fetchone():
        return {"error": "Email is already added"}, 409
    if conn.execute("select * from UserTable where PhoneNumber = ?", [phone_number]).fetchone():
        return {"error": "An account with this phone number exists"}, 409
    conn.execute("INSERT INTO UserTable (Name, Email, Password, PhoneNumber) VALUES (?,?,?,?)",
            (name, email, hashed_password, phone_number)
            )
    if password != confirmPassword:
        return {"error": "Passwords didn't Match"}, 409
    conn.commit()
    conn.close()
    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

# Login 
@app.route('/api/login', methods=["POST"])
@cross_origin()
def login_create_token():
        email = request.json.get("email", None)
        password = request.json.get("password", None) + salt
        hashed_password = hashlib.md5(password.encode()).hexdigest()
        conn = get_db_connection()
        user = conn.execute("select * from UserTable where Email = ?", [email]).fetchone()
        if email != user['Email'] or hashed_password != user['Password']:
            return {"error": "Invalid Credentials"}, 401
        access_token = create_access_token(identity=email)
        response = {"access_token":access_token}
        return response

# Logout
@app.route("/api/logout", methods=["POST"])
@cross_origin()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

# Logged User Data
@app.route("/api/loggeddata", methods=["POST"])
@cross_origin()
@jwt_required()
def get_user_data():
    conn = get_db_connection()
    current_user = get_jwt_identity()
    user = conn.execute("SELECT * FROM UserTable WHERE Email = ?", [current_user]).fetchone()
    data = {
        "email": user['Email'],
        "name": user['Name'],
        "phone_number": user['PhoneNumber']
    }
    return jsonify(data)

# Change User Data
@app.route("/api/changeloggeddata", methods=[ "POST"])
@cross_origin()
@jwt_required()
def change_user_data():
    conn = get_db_connection()
    current_user = get_jwt_identity()
    user = conn.execute("SELECT * FROM UserTable WHERE Email = ?", [current_user]).fetchone()
    try:
        email = request.json.get("email", None)
        name = request.json.get("name", None)
        phone_number = request.json.get("phone_number", None)
        if email and name and phone_number:
            conn.execute("""
                UPDATE UserTable
                SET Name = ?,
                    Email = ?,
                    PhoneNumber = ?
                WHERE ID = ?
            """, (name, email, phone_number, user['ID']))
            conn.commit()
            conn.close()
            return jsonify({"Success": 'Data Updated'})
    except:
        return jsonify({"Error": 'Payload error'})


# All Items
@app.route("/api", methods=["POST", "GET"])
@cross_origin()
def all_page():
    conn = get_db_connection()
    items = conn.execute('SELECT * FROM ItemsTable').fetchall()
    res = []
    for row in items:
            res.append({
                "id": row["ID"],
                "user_id": row['UserID'],
                "category_id": row['CatagoryID'],
                "item_name": row['ItemName'],
                "description": row['Description'],
                "price": row["Price"],
                "currency": row['Currency'],
                "location": row['Location'],
                "image": row["Image"]
            })
    return jsonify(res)

# Home Items (Returns 10 Recent Items From Each Category)
@app.route("/api/home", methods=["POST", "GET"])
@cross_origin()
def home_page():
    conn = get_db_connection()
    items = conn.execute('''
    SELECT * FROM (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY CatagoryID ORDER BY ID) AS rn FROM ItemsTable WHERE Currency = 'USD') 
        AS subquery WHERE rn <= 10;''').fetchall()
    res = []
    for row in items:
            res.append({
                "id": row["ID"],
                "user_id": row['UserID'],
                "category_id": row['CatagoryID'],
                "item_name": row['ItemName'],
                "description": row['Description'],
                "price": row["Price"],
                "currency": row['Currency'],
                "location": row['Location'],
                "image": row["Image"]
            })
    return jsonify(res)

# Catagory Items
@app.route("/api/category/<category_id>", methods=["GET", "POST"])
@cross_origin()
def catagory_pages(category_id):
    conn = get_db_connection()
    items = conn.execute('SELECT * FROM ItemsTable WHERE CatagoryID = ?', [category_id]).fetchall()
    res = []
    for row in items:
        res.append({
            "id": row['ID'],
            "user_id": row['UserID'],
            "category_id": row['CatagoryID'],
            "item_name": row['ItemName'],
            "description": row['Description'],
            "price": row['Price'],
            "currency": row['Currency'],
            "location": row['Location'],
            "image": row['Image']
        })
    return jsonify(res)

# Specific Item
@app.route("/api/item/<item_id>", methods=["GET", "POST"])
@cross_origin()
def item_page(item_id):
    conn = get_db_connection()
    item = conn.execute('SELECT * FROM ItemsTable WHERE ID = ?', [item_id]).fetchone()
    user = conn.execute('SELECT * FROM UserTable WHERE ID = ?', [item['UserID']]).fetchone()
    data = {
            "id": item['ID'],
            "user_id": item['UserID'],
            "category_id": item['CatagoryID'],
            "item_name": item['ItemName'],
            "description": item['Description'],
            "price": item["Price"],
            "currency": item['Currency'],
            "location": item['Location'],
            "image": item['Image'],
            "user_name": user['Name'],
            "user_email": user['Email'],
            "user_number": user['PhoneNumber']
        }
    return jsonify(data)

# Similar Items
@app.route("/api/similar/<item_id>", methods=["GET", "POST"])
@cross_origin()
def similar_items(item_id):
    conn = get_db_connection()
    item = conn.execute('SELECT * FROM ItemsTable WHERE ID = ?', [item_id]).fetchone()
    similar_items = conn.execute('SELECT * FROM ItemsTable WHERE CatagoryID = ? LIMIT 4', [item['CatagoryID']]).fetchall()
    data = []
    for item in similar_items:
        data.append({
                "id": item['ID'],
                "user_id": item['UserID'],
                "category_id": item['CatagoryID'],
                "item_name": item['ItemName'],
                "description": item['Description'],
                "price": item["Price"],
                "currency": item['Currency'],
                "location": item['Location'],
                "image": item['Image']
            })
    return jsonify(data)



# User Listings
@app.route('/api/mylistings', methods=["GET", "POST"])
@cross_origin()
@jwt_required()
def user_listings():
    conn = get_db_connection()
    current_user = get_jwt_identity()
    user = conn.execute("SELECT * FROM UserTable WHERE Email = ?", [current_user]).fetchone()
    res = []
    if conn.execute("SELECT * FROM ItemsTable WHERE UserID = ?", [user['ID']]).fetchall():
        items = conn.execute("SELECT * FROM ItemsTable WHERE UserID = ?", [user['ID']]).fetchall()
        for row in items:
            res.append({
                "id": row['ID'],
                "user_id": row['UserID'],
                "category_id": row['CatagoryID'],
                "item_name": row['ItemName'],
                "description": row['Description'],
                "price": row["Price"],
                "currency": row['Currency'],
                "location": row['Location'],
                "image": row['Image']
            })
        return jsonify(res)
    return jsonify({"message": 'No Items listed'})
    

# Search Items
@app.route('/api/search/<search_keyword>', methods=["POST", "GET"])
@cross_origin()
def search_listings(search_keyword):
    conn = get_db_connection()
    items = conn.execute("SELECT * FROM ItemsTable WHERE ItemName LIKE ?", ['%' + search_keyword + '%']).fetchall()
    res = []
    for row in items:
        res.append({
            "id": row['ID'],
            "user_id": row['UserID'],
            "category_id": row['CatagoryID'],
            "item_name": row['ItemName'],
            "description": row['Description'],
            "price": row["Price"],
            "currency": row['Currency'],
            "location": row['Location'],
            "image": row['Image']
        })
    return jsonify(res)

# Delete Items
@app.route('/api/delete/<item_id>', methods=["POST"])
@cross_origin()
@jwt_required()
def delete_listing(item_id):
    conn = get_db_connection()
    current_user = get_jwt_identity()
    user = conn.execute("SELECT * FROM UserTable WHERE Email = ?", [current_user]).fetchone()
    print(user['ID'])
    item = conn.execute("SELECT * FROM ItemsTable WHERE ID = ? AND UserID = ?", [item_id, user['ID']]).fetchone()
    if item is None:
            return jsonify({"message": "Item not found"}), 404
    if item['UserID'] != user['ID']:
        return jsonify({"message": "User ID doesn't match with the Item UserID"}), 403
    conn.execute("DELETE FROM ItemsTable WHERE ID = ? AND UserID = ?", [item_id, user['ID']])
    conn.commit()
    return jsonify({"message": "Item deleted successfully"}), 200

# Add Item
@app.route('/api/additem', methods=["POST", "GET"])
@cross_origin()
@jwt_required()
def add_item():
    conn = get_db_connection()
    current_user = get_jwt_identity()
    user = conn.execute("SELECT * FROM UserTable WHERE Email = ?", [current_user]).fetchone()
    data = request.get_json()
    category_id = data.get('category_id')
    item_name = data.get('item_name')
    description = data.get('description')
    price = data.get('price')
    currency = data.get('currency')
    location = data.get('location')
    image = data.get('image')
    if not user['ID'] or not category_id or not item_name or not price or not currency or not location:
        return jsonify({"message": "Missing required fields"}), 400
    with get_db_connection() as conn:
        conn.execute(
            "INSERT INTO ItemsTable (UserID, CatagoryID, ItemName, Description, Price, Currency, Location, Image) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (user['ID'], category_id, item_name, description, price, currency, location, image)
        )
        conn.commit()
        return jsonify({"message": "Item added successfully"}), 201
    
# Save Item as Favorite
@app.route('/api/addfavorite/<item_id>', methods=["POST"])
@cross_origin()
@jwt_required()
def add_favorite(item_id):
    conn = get_db_connection()
    current_user = get_jwt_identity()
    user = conn.execute("SELECT * FROM UserTable WHERE Email = ?", [current_user]).fetchone()
    item = conn.execute("SELECT * FROM ItemsTable WHERE ID = ?", [item_id]).fetchone()
    if item is None:
            return jsonify({"message": "Item not found"}), 404
    elif conn.execute("SELECT * FROM FavoriteTable WHERE UserID = ? AND ItemID = ?", [ user['ID'], item_id]).fetchone():
        conn.execute("DELETE FROM FavoriteTable  WHERE UserID = ? AND ItemID = ?", [user['ID'], item_id])
        conn.commit()
        return jsonify({"message": "Item removed from favorites"}), 201
    conn.execute("INSERT INTO FavoriteTable (ItemID, UserID)" 
                "VALUES (?, ?)",
                (item_id, user['ID']))
    conn.commit()
    return jsonify({"message": "Item added to favorites"}), 201
    
# Favorite Listings
@app.route('/api/favorites', methods=["GET", "POST"])
@cross_origin()
@jwt_required()
def user_favorites():
    conn = get_db_connection()
    current_user = get_jwt_identity()
    user = conn.execute("SELECT * FROM UserTable WHERE Email = ?", [current_user]).fetchone()
    res = []
    if conn.execute("SELECT * FROM FavoriteTable WHERE UserID = ?", [user['ID']]).fetchall():
        fav_items = conn.execute("""
            SELECT i.* 
            FROM ItemsTable AS i
            INNER JOIN FavoriteTable AS f ON i.ID = f.ItemID
            WHERE f.UserID = ?
            """, [user['ID']]).fetchall()
        for row in fav_items:
            res.append({
                "id": row['ID'],
                "user_id": row['UserID'],
                "category_id": row['CatagoryID'],
                "item_name": row['ItemName'],
                "description": row['Description'],
                "price": row["Price"],
                "currency": row['Currency'],
                "location": row['Location'],
                "image": row['Image']
            })
        return jsonify(res)
    return jsonify({"message": 'No favorite items'})
    
if __name__ == '__main__':
    app.run(debug=True)
