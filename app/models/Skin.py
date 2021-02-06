from app import db

class Skin(db.Model):    
    __tablename__ = "Skins"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(100))
    order = db.Column(db.Integer)
    slug = db.Column(db.String(255))
    link = db.Column(db.String(255))
    image = db.Column(db.String(255))
    filterTerm = db.Column(db.String(255))
    filterTerm_br = db.Column(db.String(255))
    category = db.Column(db.String(255))
    weapon_id = db.Column(db.Integer, db.ForeignKey('Weapons.id'), nullable=False)

    def __str__(self):
        return f"{self.name} | {self.link} | {self.weapon_id} | {self.category}"
       