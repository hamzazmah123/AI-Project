class RouteModel:
    def __init__(self, db):
        self.collection = db["routes"]

    def add_route(self, route_data):
        self.collection.insert_one(route_data)

    def get_all_routes(self):
        return list(self.collection.find())

    def update_route(self, route_id, update_data):
        self.collection.update_one({"_id": route_id}, {"$set": update_data})