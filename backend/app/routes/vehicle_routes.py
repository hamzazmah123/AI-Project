from flask import Blueprint, request, jsonify
from models.vehicle_model import VehicleModel
from database import db

vehicle_routes = Blueprint("vehicle_routes", __name__)
vehicle_model = VehicleModel(db)

@vehicle_routes.route("/vehicles", methods=["POST"])
def add_vehicle():
    data = request.json
    vehicle_model.add_vehicle(data)
    return jsonify({"message": "Vehicle added successfully!"}), 201

@vehicle_routes.route("/vehicles", methods=["GET"])
def get_vehicles():
    vehicles = vehicle_model.get_all_vehicles()
    return jsonify(vehicles), 200