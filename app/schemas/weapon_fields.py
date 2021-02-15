from flask_restful import fields

weapon_types_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "slug": fields.String
}

weapon_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "slug": fields.String,
    "weaponType_id": fields.Integer, 
    "filterTerm": fields.String,
    "image": fields.String,
    "leftCSS":fields.String,
    "topCSS":fields.String,
    "variable": fields.Nested({
        "id": fields.Integer,
        "name": fields.String,
        "slug": fields.String,
        "weaponType_id": fields.Integer, 
        "filterTerm": fields.String,
        "image": fields.String,
        "leftCSS":fields.String,
        "topCSS":fields.String
    })
}

