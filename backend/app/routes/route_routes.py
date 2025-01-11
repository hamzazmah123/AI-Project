from flask import Blueprint, request, jsonify
from models.route_model import RouteModel
from ai.traffic_model import TrafficModel
from database import db

route_routes = Blueprint("route_routes", __name__)
route_model = RouteModel(db)
traffic_model = TrafficModel()

@route_routes.route("/routes", methods=["POST"])
def add_route():
    data = request.json
    route_model.add_route(data)
    return jsonify({"message": "Route added successfully!"}), 201

@route_routes.route("/routes", methods=["GET"])
def get_routes():
    routes = route_model.get_all_routes()
    return jsonify(routes), 200

@route_routes.route("/routes/predict", methods=["POST"])
def predict_route_cost():
    data = request.json  # Expected data: { "route": { "distance": 20, "stops": 3, "other_params": "value" } }
    traffic_level = traffic_model.predict_traffic(data["route"])
    cost_prediction = traffic_model.calculate_cost(data["route"], traffic_level)
    return jsonify({
        "traffic_level": traffic_level,
        "fuel_cost": cost_prediction["fuel_cost"],
        "time": cost_prediction["time"]
    }), 200