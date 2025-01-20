from flask import Blueprint, request, jsonify
from models.assignment_model import AssignmentModel
from database import db
from bson.objectid import ObjectId

assignment_routes = Blueprint("assignment_routes", __name__)
assignment_model = AssignmentModel(db)

@assignment_routes.route("/assignments", methods=["POST"])
def create_assignment():
    data = request.json  # Expected: { "vehicle_id": "123", "driver_id": "456" }
    assignment_model.create_assignment(data)
    return jsonify({"message": "Assignment created successfully!"}), 201

@assignment_routes.route("/assignments", methods=["GET"])
def get_assignments():
    assignments = assignment_model.get_all_assignments()
    return jsonify(assignments), 200
