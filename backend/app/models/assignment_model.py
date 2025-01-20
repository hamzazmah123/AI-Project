from bson.objectid import ObjectId

class AssignmentModel:
    def __init__(self, db):
        self.collection = db["assignments"]

    def create_assignment(self, assignment_data):
        self.collection.insert_one(assignment_data)

    def get_all_assignments(self):
        assignments = self.collection.find()
        return [
            {
                "_id": str(assignment["_id"]),
                "vehicle_id": str(assignment["vehicle_id"]),
                "driver_id": str(assignment["driver_id"]),
            }
            for assignment in assignments
        ]
