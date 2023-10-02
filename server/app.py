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

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

