from flask_restful import Resource, marshal
from flask import jsonify
from app.models.Skin import Skin
from app.models.PriceTable import PriceTable
from app.services.Search.Scraping import search_skin
from app.schemas.skin_fields import skin_price_table_fields
from app import request
import asyncio

class SkinScraping(Resource): 
    def post(self):
        request_data = request.only(["skin_selected_id"])
        skinSelectedId = request_data['skin_selected_id']
        skin = Skin.query.filter(Skin.id == skinSelectedId).first()
        
        prices_normals = []
        prices_stattrak = []
        floats = {
            "Nova de Fábrica (FN)": ["FN", "Factory New"],
            "Pouco Usada (MW)" : ["MW", "Minimal Wear"],
            "Testada em Campo (FT)": ["FT", "Field-Tested"],
            "Bem Desgastada (WW)": ["WW", "Well-Worn"],
            "Veterana de Guerra (BS)": ["BS","Battle-Scarred"]
        }

        if("Vanilla" in skin.name):
            floats = {
                "Vanilla": ["Vanilla"],
            }
        
        results = asyncio.run(search_skin(skin))
    
        normals = [x for x in results if not x.stattrak]
        statrak = [x for x in results if x not in normals]

        for key, value in floats.items():
            priceTableItem = PriceTable(key)
     
            for normal in normals:   
          
                if (any(s in normal.name for s in value)):
                    if(normal.store == "CSGO Store"): 
                        priceTableItem.PriceCSGOStore = normal.price
                        priceTableItem.LinkCSGOStore = normal.link
                    elif(normal.store == "NeshaStore"):
                        priceTableItem.PriceNesha = normal.price
                        priceTableItem.LinkNesha = normal.link
                    elif(normal.store == "BleikStore"):
                        priceTableItem.PriceBleik = normal.price
                        priceTableItem.LinkBleik = normal.link
                    elif(normal.store == "Steam"):
                        priceTableItem.PriceSteam = normal.price
                        priceTableItem.LinkSteam = normal.link
                        
            prices_normals.append(priceTableItem)

        for key, value in floats.items():
            priceTableItem = PriceTable(key + " - StatTrak™")
            for stats in statrak:     
                if (any(s in stats.name for s in value)):
                    if(stats.store == "CSGO Store"): 
                        priceTableItem.PriceCSGOStore = stats.price
                        priceTableItem.LinkCSGOStore = stats.link
                    elif(stats.store == "NeshaStore"):
                        priceTableItem.PriceNesha = stats.price
                        priceTableItem.LinkNesha = stats.link
                    elif(stats.store == "BleikStore"):
                        priceTableItem.PriceBleik = stats.price
                        priceTableItem.LinkBleik = stats.link     
                    elif(stats.store == "Steam"):
                        priceTableItem.PriceSteam = stats.price
                        priceTableItem.LinkSteam = stats.link                
            
            prices_stattrak.append(priceTableItem)

        result_normals = marshal(prices_normals, skin_price_table_fields)
        result_stattrak = marshal(prices_stattrak, skin_price_table_fields)
        
        return jsonify(name=skin.name, image=skin.image, weapon=skin.weapon.name, prices_normals=result_normals, price_stattrak=result_stattrak)
