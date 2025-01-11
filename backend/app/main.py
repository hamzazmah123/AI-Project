from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_routes  

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(auth_routes, url_prefix="/auth")

if __name__ == "__main__":
    app.run(debug=True)

