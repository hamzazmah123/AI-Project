class CostModel:
    def predict_monthly_fee(self, route, trips_per_month):
        base_cost_per_km = 0.5  # Example: $0.5 per km
        monthly_fee = route["distance"] * base_cost_per_km * trips_per_month
        return monthly_fee