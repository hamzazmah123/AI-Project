class DriverModel:
    def __init__(self, db):
        self.collection = db["drivers"]

    def add_driver(self, driver_data):
        self.collection.insert_one(driver_data)

    def get_all_drivers(self):
        return list(self.collection.find())

    def assign_driver_to_vehicle(self, driver_id, vehicle_id):
        self.collection.update_one({"_id": driver_id}, {"$set": {"assigned_vehicle": vehicle_id}})