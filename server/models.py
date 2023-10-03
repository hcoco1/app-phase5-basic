from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
from config import db, bcrypt  
from sqlalchemy.orm import validates
import re 

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True, nullable=False)
    _password_hash = db.Column("password_hash", db.String(200), nullable=False)
    photo_url = db.Column(db.String(512))
    # Uncomment the next line if you want to add a birth_date column
    # birth_date = db.Column(db.Date)
    
    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute.')

    @password.setter
    def password(self, password):
        # Validate password
        pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
        if not re.match(pattern, password):
            raise AssertionError('Password should have at least 8 characters, one uppercase, one lowercase, and one digit.')
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def verify_password(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise AssertionError('Provided email is not a valid email address.')
        return email

    # Uncomment the next block if you want to validate birth_date
    """
    @validates('birth_date')
    def validate_birth_date(self, key, birth_date):
        if birth_date >= datetime.date(datetime.utcnow()):
            raise AssertionError('Birth date should be in the past.')
        return birth_date
    """

    def __repr__(self):
        return f'User {self.email}, ID {self.id}'
