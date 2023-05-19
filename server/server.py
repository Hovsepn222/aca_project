import sqlite3
import hashlib
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)
salt = "5gz2"
cors = CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})
app.config["JWT_SECRET_KEY"] = "73bd912ydj30d12g"
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
    hashed_password = hashlib.md5(password.encode()).hexdigest()
    phone_number = request.json.get("phone_number", None)
    conn = get_db_connection()
    if conn.execute("select * from UserTable where Email = ?", [email]).fetchone():
        return {"msg": "Email is already added"}, 409
    if conn.execute("select * from UserTable where PhoneNumber = ?", [phone_number]).fetchone():
        return {"msg": "An account with this phone number exists"}, 409
    conn.execute("INSERT INTO UserTable (Name, Email, Password, PhoneNumber) VALUES (?,?,?,?)",
            (name, email, hashed_password, phone_number)
            )
    conn.commit()
    conn.close()
    return {"msg": "Account has been created"}, 201

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
        return {"msg": "Wrong email or password"}, 401
    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    print(user['Email'])
    return response

# Logout
@app.route("/api/logout", methods=["POST"])
@cross_origin()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

# Home Items
@app.route("/api", methods=["POST", "GET"])
@cross_origin()
def home_page():
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

# Catagory Items
@app.route("/api/category/<category_id>", methods=["GET", "POST"])
@cross_origin()
def catagory_pages(category_id):
    conn = get_db_connection()
    items = conn.execute('SELECT * FROM ItemsTable WHERE CatagoryID = ?', [category_id]).fetchall()
    res = []
    for row in items:
        res.append({
            "user_id": row['UserID'],
            "category_id": row['CatagoryID'],
            "item_name": row['ItemName'],
            "description": row['Description'],
            "price": row["Price"],
            "currency": row['Currency'],
            "location": row['Location'] 
        })
    return jsonify(res)

# Specific Item
@app.route("/api/item/<item_id>", methods=["GET", "POST"])
@cross_origin()
def item_page(item_id):
    conn = get_db_connection()
    item = conn.execute('SELECT * FROM ItemsTable WHERE ID = ?', [item_id]).fetchone()
    item = [{
            "id": item['ID'],
            "user_id": item['UserID'],
            "category_id": item['CatagoryID'],
            "item_name": item['ItemName'],
            "description": item['Description'],
            "price": item["Price"],
            "currency": item['Currency'],
            "location": item['Location'] 
        }]
    return jsonify(item)


# User Listings
@app.route('/api/mylistings/<user_id>', methods=["GET", "POST"])
@cross_origin()
# @jwt_required()
def user_listings(user_id):
    conn = get_db_connection()
    items = conn.execute("SELECT * FROM ItemsTable WHERE UserID = ?", [user_id]).fetchall()
    res = []
    for row in items:
        res.append({
            "user_id": row['UserID'],
            "category_id": row['CatagoryID'],
            "item_name": row['ItemName'],
            "description": row['Description'],
            "price": row["Price"],
            "currency": row['Currency'],
            "location": row['Location'] 
        })
    return jsonify(res)

# Search Items
@app.route('/api/search/<search_keyword>', methods=["POST", "GET"])
@cross_origin()
def search_listings(search_keyword):
    conn = get_db_connection()
    items = conn.execute("SELECT * FROM ItemsTable WHERE ItemName LIKE ?", ['%' + search_keyword + '%']).fetchall()
    res = []
    for row in items:
        res.append({
            "user_id": row['UserID'],
            "category_id": row['CatagoryID'],
            "item_name": row['ItemName'],
            "description": row['Description'],
            "price": row["Price"],
            "currency": row['Currency'],
            "location": row['Location'] 
        })
    return jsonify(res)

# Delete Items
@app.route('/api/delete/<item_id>', methods=["DELETE"])
@cross_origin()
# @jwt_required()
def delete_listing(item_id):
    user_id = request.json.get("user_id", None)
    conn = get_db_connection()
    item = conn.execute("SELECT * FROM ItemsTable WHERE ID = ?", [item_id]).fetchone()
    if item is None:
            return jsonify({"message": "Item not found"}), 404
    if item['UserID'] != user_id:
        return jsonify({"message": "User ID doesn't match with the Item UserID"}), 403
    conn.execute("DELETE FROM ItemsTable WHERE ID = ?", [item_id])
    conn.commit()
    return jsonify({"message": "Item deleted successfully"})

# Add Item
@app.route('/api/add', methods=["POST", "GET"])
@cross_origin()
# @jwt_required()
def add_item():
    data = request.get_json()
    user_id = data.get('user_id')
    category_id = data.get('category_id')
    item_name = data.get('item_name')
    description = data.get('description')
    price = data.get('price')
    currency = data.get('currency')
    location = data.get('location')
    if not user_id or not category_id or not item_name or not price or not currency or not location:
        return jsonify({"message": "Missing required fields"}), 400
    with get_db_connection() as conn:
        conn.execute(
            "INSERT INTO ItemsTable (UserID, CatagoryID, ItemName, Description, Price, Currency, Location) "
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
            (user_id, category_id, item_name, description, price, currency, location)
        )
        conn.commit()
        return jsonify({"message": "Item added successfully"}), 201
    
if __name__ == '__main__':
    app.run(debug=True)
