from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database import db

auth_routes = Blueprint("auth_routes", __name__)

@auth_routes.route("/signup", methods=["POST"])
def signup():
    data = request.json
    hashed_password = generate_password_hash(data["password"])

    # Check if the user already exists
    if db.users.find_one({"email": data["email"]}):
        return jsonify({"message": "Email already registered!"}), 400

    db.users.insert_one({
        "name": data["name"],
        "email": data["email"],
        "password": hashed_password,
        "role": data["role"],
    })
    return jsonify({"message": "User registered successfully!"}), 201

@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    user = db.users.find_one({"email": data["email"]})
    
    if user and check_password_hash(user["password"], data["password"]):
        # Simulating token generation for simplicity
        return jsonify({"message": "Login successful!", "role": user["role"], "token": "fake-jwt-token"}), 200
    
    return jsonify({"message": "Invalid credentials!"}), 401

@auth_routes.route("/drivers", methods=["GET"])
def get_drivers():
    try:
        # Fetch all users with the role "driver"
        drivers = list(db.users.find({"role": "driver"}, {"_id": 1, "name": 1, "email": 1}))
        # Convert ObjectId to string
        for driver in drivers:
            driver["_id"] = str(driver["_id"])
        return jsonify(drivers), 200
    except Exception as e:
        print("Error fetching drivers:", e)
        return jsonify({"message": "Failed to fetch drivers"}), 500

    
@auth_routes.route("/assign-driver", methods=["POST"])
def assign_driver():
    data = request.json
    db.assignments.insert_one(data)
    return jsonify({"message": "Driver assigned successfully!"}), 201


try:
    db.command("ping")  # Test connection
    print("MongoDB connected successfully.")
except Exception as e:
    print("Error connecting to MongoDB:", e)

