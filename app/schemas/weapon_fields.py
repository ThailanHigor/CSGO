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
    "filter_term": fields.String,
    "image": fields.String
}

