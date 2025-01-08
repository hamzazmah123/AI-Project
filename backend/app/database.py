from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# client = MongoClient(os.getenv("MONGO_URI"))
client = MongoClient(os.getenv("MONGO_URI"), tls=True, tlsAllowInvalidCertificates=True)
db = client["AIProject"]  # Use your MongoDB database name

# mongodb+srv://<db_username>:<db_password>@aiproject.ksmhg.mongodb.net/?retryWrites=true&w=majority&appName=AIProject

print("Connecting to MongoDB...")
try:
    client.admin.command("ping")
    print("MongoDB connected successfully.")
except Exception as e:
    print("Error connecting to MongoDB:", e)
