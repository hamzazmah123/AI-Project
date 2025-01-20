from flask import Flask
from flask_cors import CORS
from routes.vehicle_routes import vehicle_routes
from routes.driver_routes import driver_routes
from routes.route_routes import route_routes
from routes.fee_routes import fee_routes
from routes.auth_routes import auth_routes
from routes.assignment_routes import assignment_routes


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# Register routes
app.register_blueprint(vehicle_routes, url_prefix="/vehicles")
app.register_blueprint(driver_routes, url_prefix="/drivers")
app.register_blueprint(route_routes, url_prefix="/routes")
app.register_blueprint(fee_routes, url_prefix="/fees")
app.register_blueprint(auth_routes, url_prefix="/auth")


if __name__ == "__main__":
    app.run(debug=True)



# from flask import Flask
# from flask_cors import CORS
# from routes.auth_routes import auth_routes  

# app = Flask(__name__)
# CORS(app)

# # Register routes
# app.register_blueprint(auth_routes, url_prefix="/auth")

# if __name__ == "__main__":
#     app.run(debug=True)

