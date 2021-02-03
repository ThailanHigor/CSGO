from app import db

class Weapon(db.Model):    
    __tablename__ = 'Weapons'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    order = db.Column(db.Integer)
    slug = db.Column(db.String(255))
    link = db.Column(db.String(255))
    price = db.Column(db.String(255))
    image = db.Column(db.String(255))
    store = db.Column(db.String(255))
    filterTerm = db.Column(db.String(255))
    weaponType_id = db.Column(db.Integer, db.ForeignKey('WeaponTypes.id'),nullable=False)
    skins = db.relationship('Skin', backref='Weapon', lazy=True)


    def __init__(self, name, link, price, image, store, slug, order, category, filterTerm):
       self.name = name
       self.link = link
       self.price = price
       self.image = image
       self.store = store
       self.slug = slug
       self.order = order
       self.category = category
       self.filterTerm = filterTerm

    def __str__(self):
        return f"{self.name} | {self.price} | {self.store} | {self.link} | {self.weaponType_id}" 
