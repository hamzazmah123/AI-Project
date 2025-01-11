from flask import Blueprint, request, jsonify
from database import db
from bson.objectid import ObjectId

fee_routes = Blueprint("fee_routes", __name__)

@fee_routes.route("/fees/calculate", methods=["POST"])
def calculate_fee():
    data = request.json  # Expected: { "route_id": "123", "trips_per_month": 20 }
    route = db.routes.find_one({"_id": ObjectId(data["route_id"])})
    
    if not route:
        return jsonify({"message": "Route not found!"}), 404

    base_cost_per_trip = route.get("distance", 0) * 0.5  # Assuming cost per km
    monthly_fee = base_cost_per_trip * data["trips_per_month"]
    return jsonify({"monthly_fee": monthly_fee}), 200

@fee_routes.route("/fees/student/<student_id>", methods=["GET"])
def get_student_fees(student_id):
    student = db.students.find_one({"_id": ObjectId(student_id)})
    if not student:
        return jsonify({"message": "Student not found!"}), 404

    return jsonify({"fees": student.get("fees", {})}), 200