from app import db

class Contact(db.Model):    
    __tablename__ = "Contacts"
    
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(255))
    message = db.Column(db.Text())
    email = db.Column(db.String(255))
    
    
    def __str__(self):
        return f"{self.name} | {self.email} | {self.message} | {self.id}"
       