from pymongo import MongoClient
from bson import ObjectId

class RouteModel:
    def __init__(self, db):
        self.collection = db["routes"]

    def add_route(self, route_data):
        self.collection.insert_one(route_data)

    def get_all_routes(self):
        routes = self.collection.find()
        return [
            {**route, "_id": str(route["_id"])} for route in routes
        ]

    def update_route(self, route_id, update_data):
        self.collection.update_one({"_id": route_id}, {"$set": update_data})