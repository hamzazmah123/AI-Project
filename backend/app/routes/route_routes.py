from flask import Blueprint, request, jsonify
from models.route_model import RouteModel
from ai.traffic_model import TrafficModel
from database import db
from bson import ObjectId
from ai.predict_shortest_path import a_star_algorithm_with_alternatives

route_routes = Blueprint("route_routes", __name__)
route_model = RouteModel(db)
traffic_model = TrafficModel()

@route_routes.route("/routes", methods=["POST"])
def add_route():
    data = request.json
    route_model.add_route(data)
    return jsonify({"message": "Route added successfully!"}), 201

@route_routes.route("/", methods=["GET"])
def get_routes():
    routes = route_model.get_all_routes()
    return jsonify(routes), 200

@route_routes.route('/distinct-routes', methods=['GET'])
def get_distinct_routes():
    # distinct_start = db.routes.distinct("start")
    # distinct_end = db.routes.distinct("end")
    # return jsonify({"startLocations": distinct_start, "endLocations": distinct_end})
    locations = db.routes.distinct("start") + db.routes.distinct("end")
    return jsonify(list(set(locations)))
    
# @route_routes.route('/filter', methods=['POST']) 
#it is working but function moved to backend that is why we are using new api call
# def get_filtered_routes():
#     data = request.json
#     start_location = data.get('start_location')
#     end_location = data.get('end_location')

#     # Filter routes with the given start and end locations
#     filtered_routes = list(
#         db.routes.find({"start": start_location, "end": end_location})
#     )

#     # Convert ObjectId to string
#     for route in filtered_routes:
#         route["_id"] = str(route["_id"])

#     return jsonify(filtered_routes)

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

@route_routes.route('/filter', methods=['POST']) 
def get_filtered_routes():
    data = request.json
    start_location = data.get('start_location')
    end_location = data.get('end_location')

    # Filter routes with the given start and end locations
    filtered_routes = list(
        db.routes.find({"start": start_location, "end": end_location})
    )

    # Convert ObjectId to string for JSON serialization
    for route in filtered_routes:
        route["_id"] = str(route["_id"])

    # Use the A* algorithm to find the shortest path along with alternatives
    if filtered_routes:
        all_paths = a_star_algorithm_with_alternatives(filtered_routes, start_location, end_location)
        return jsonify({"routes": all_paths})  # Return the entire list of paths
    else:
        return jsonify({"message": "No routes found"})
