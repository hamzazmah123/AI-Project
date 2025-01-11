from flask import Blueprint, request, jsonify
from models.driver_model import DriverModel
from database import db

driver_routes = Blueprint("driver_routes", __name__)
driver_model = DriverModel(db)

@driver_routes.route("/drivers", methods=["POST"])
def add_driver():
    data = request.json
    driver_model.add_driver(data)
    return jsonify({"message": "Driver added successfully!"}), 201

@driver_routes.route("/drivers", methods=["GET"])
def get_drivers():
    drivers = driver_model.get_all_drivers()
    return jsonify(drivers), 200