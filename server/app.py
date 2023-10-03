#!/usr/bin/env python3
from flask import request, jsonify, session
from flask_restful import Resource
from config import app, db, api
from models import User
from datetime import datetime
from sqlalchemy.exc import IntegrityError
import os
from dotenv import load_dotenv
from datetime import timedelta
import logging

load_dotenv()

logging.basicConfig(level=logging.DEBUG)

app.secret_key = os.getenv("SECRET_KEY")
print(f"Loaded secret key: {app.secret_key}")

class Home(Resource):
    def get(self):
        return {"message": "Welcome to the server home page!"}
    
api.add_resource(Home, "/")


class SignUp(Resource):
    def post(self):
        logging.debug(f"Received signup request: {request.json}")
        
        json = request.get_json()
        required_fields = ["first_name", "email", "password", "photo_url"]
        missing_fields = [field for field in required_fields if field not in json]
        
        if missing_fields:
            return {"Message": f"Missing fields: {', '.join(missing_fields)}"}, 422

        existing_user = User.query.filter_by(email=json["email"]).first()
        logging.debug(f"Existing user for email {json['email']}: {existing_user}")
        
        if existing_user:
            return {"Message": "Email already registered"}, 400

        user = User(
            first_name=json["first_name"],
            email=json["email"],
            password=json["password"],  # You should hash this before saving
            photo_url=json["photo_url"]  # Added this line
        )

        try:
            db.session.add(user)
            db.session.commit()
        except IntegrityError as e:
            logging.error(f"IntegrityError: {e}")
            db.session.rollback()
            return {"Message": "Database integrity error."}, 400

        return {"Message": "User registered successfully", "id": user.id}, 201

api.add_resource(SignUp, "/signup")

class SignIn(Resource):
    def post(self):
        """
        Endpoint to sign in a user
        """

        json = request.get_json()

        # Check if email and password are provided
        if not json.get("email") or not json.get("password"):
            return {"Message": "Email and password are required."}, 400

        # Fetch the user from the database by email
        user = User.query.filter_by(email=json["email"]).first()

        # If user doesn't exist or password is wrong
        if not user or not user.verify_password(json["password"]):
            print("User authentication failed: Invalid email or password.")
            return {"Message": "Invalid email or password."}, 401

        # Print the user_id
        print(f"User {user.email} logged in with user_id {user.id}")

        # If user exists and password is correct, set session and return user details
        session["user_id"] = user.id

        return {
            "Message": "Logged in successfully.",
            "id": user.id,
            "email": user.email,
        }, 200
        
api.add_resource(SignIn, "/signin", endpoint="signin")


# Define a resource to check the session for the logged-in user's details
class CheckSession(Resource):
    def get(self):


        # Get the user from the database using the user ID in the session
        user = User.query.filter(User.id == session.get("user_id")).first()

        if user:
            # If user is found, return the user's details with a 200 OK status
            return {
                "id": user.id,
                "first_name": user.first_name,
                "photo_url": user.photo_url,
                "privacy_settings": user.privacy_settings,
            }, 200
        else:
                 return {"Message": "Unauthorized"}, 401
             
api.add_resource(CheckSession, "/check_session")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

