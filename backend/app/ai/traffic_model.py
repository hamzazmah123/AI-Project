import random

class TrafficModel:
    def predict_traffic(self, route):
        # Simulate traffic prediction (return low, medium, high)
        return random.choice(["low", "medium", "high"])

    def calculate_cost(self, route, traffic_level):
        # Simulate fuel cost and time prediction
        traffic_multiplier = {"low": 1, "medium": 1.5, "high": 2}
        base_fuel_cost = route["distance"] * 0.1  # Fuel cost per km
        base_time = route["distance"] / 40  # Time in hours (40 km/h avg speed)
        return {
            "fuel_cost": base_fuel_cost * traffic_multiplier[traffic_level],
            "time": base_time * traffic_multiplier[traffic_level]
        }