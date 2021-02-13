from app import db

class RandomMessage(db.Model):    
    __tablename__ = 'RandomMessages'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    message = db.Column(db.String(500), nullable=False)
    weaponType_id = db.Column(db.Integer, db.ForeignKey('WeaponTypes.id'),nullable=False)
    
    def __str__(self):
        return f"{self.id} | {self.message} " 
