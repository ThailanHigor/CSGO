from flask_restful import fields

skin_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "weaponType_id": fields.Integer,
    "slug": fields.String, 
    "filter_term": fields.String,
    "image": fields.String,
    "category": fields.String,
    "views": fields.Integer,
    "weapon": fields.Nested({
        "id": fields.Integer,
        "name": fields.String,
    })
}


skin_price_table_fields = {
    "Float": fields.String,
    "PriceBleik": fields.String,
    "LinkBleik": fields.String,
    "PriceCSGOStore": fields.String,
    "LinkCSGOStore": fields.String, 
    "PriceNesha": fields.String,
    "LinkNesha": fields.String,
    "PriceSteam": fields.String,
    "LinkSteam": fields.String,
}

