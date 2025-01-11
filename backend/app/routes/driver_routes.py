from flask import Blueprint, request, jsonify
from models.driver_model import DriverModel
from database import db
from bson.objectid import ObjectId

# Initialize Blueprint
driver_routes = Blueprint("driver_routes", __name__)

# Initialize the driver model
driver_model = DriverModel(db)

@driver_routes.route("/drivers", methods=["POST"])
def add_driver():
    data = request.json  # Expected: { "name": "John Doe", "license_number": "1234", "phone": "1234567890" }
    driver_model.add_driver(data)
    return jsonify({"message": "Driver added successfully!"}), 201

@driver_routes.route("/drivers", methods=["GET"])
def get_all_drivers():
    drivers = driver_model.get_all_drivers()
    return jsonify(drivers), 200

@driver_routes.route("/drivers/assign", methods=["POST"])
def assign_driver():
    data = request.json  # Expected: { "driver_id": "123", "vehicle_id": "456", "route_id": "789" }
    
    # Update driver with assigned vehicle and route
    driver_model.assign_driver(data["driver_id"], data["vehicle_id"], data["route_id"])
    return jsonify({"message": "Driver assigned successfully!"}), 200



# from flask import Blueprint, request, jsonify
# from models.driver_model import DriverModel
# from database import db

# driver_routes = Blueprint("driver_routes", __name__)
# driver_model = DriverModel(db)

# @driver_routes.route("/drivers", methods=["POST"])
# def add_driver():
#     data = request.json
#     driver_model.add_driver(data)
#     return jsonify({"message": "Driver added successfully!"}), 201

# @driver_routes.route("/drivers", methods=["GET"])
# def get_drivers():
#     drivers = driver_model.get_all_drivers()
#     return jsonify(drivers), 200