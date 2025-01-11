from bson.objectid import ObjectId

class DriverModel:
    def __init__(self, db):
        self.collection = db["drivers"]

    def add_driver(self, driver_data):
        self.collection.insert_one(driver_data)

    def get_all_drivers(self):
        drivers = self.collection.find()
        return [
            {
                "_id": str(driver["_id"]),
                "name": driver["name"],
                "license_number": driver["license_number"],
                "phone": driver["phone"],
                "assigned_vehicle": driver.get("assigned_vehicle"),
                "assigned_route": driver.get("assigned_route"),
            }
            for driver in drivers
        ]

    def assign_driver(self, driver_id, vehicle_id, route_id):
        self.collection.update_one(
            {"_id": ObjectId(driver_id)},
            {"$set": {"assigned_vehicle": vehicle_id, "assigned_route": route_id}}
        )


# class DriverModel:
#     def __init__(self, db):
#         self.collection = db["drivers"]

#     def add_driver(self, driver_data):
#         self.collection.insert_one(driver_data)

#     def get_all_drivers(self):
#         return list(self.collection.find())

#     def assign_driver_to_vehicle(self, driver_id, vehicle_id):
#         self.collection.update_one({"_id": driver_id}, {"$set": {"assigned_vehicle": vehicle_id}})