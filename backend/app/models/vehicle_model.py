



from pymongo import MongoClient

class VehicleModel:
    def __init__(self, db):
        self.collection = db["vehicles"]

    def add_vehicle(self, vehicle_data):
        self.collection.insert_one(vehicle_data)

    def get_all_vehicles(self):
        return list(self.collection.find())

    def update_vehicle(self, vehicle_id, update_data):
        self.collection.update_one({"_id": vehicle_id}, {"$set": update_data})

    def delete_vehicle(self, vehicle_id):
        self.collection.delete_one({"_id": vehicle_id})