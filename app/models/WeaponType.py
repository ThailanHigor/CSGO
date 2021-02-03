from app import db

class WeaponType(db.Model):
    __tablename__ = 'WeaponTypes'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    order = db.Column(db.Integer)
    slug = db.Column(db.String(255))

    weapons = db.relationship('Weapon', backref='weapontype', lazy=True)

    def __str__(self):
        return f"{self.name} | {self.order}"