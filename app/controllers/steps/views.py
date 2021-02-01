from . import steps
from flask import render_template, request, jsonify
from app import db
from app.models.Weapon import Weapon
from app.models.Skin import Skin
from app.models.PriceTable import PriceTable

@steps.route("/steps/getWeaponsByCategory", methods=["GET"])
def getWeaponsByCategory():
    category = request.args.get('category')
    print(category)
    
    weapons = []
    weapons.append(Weapon("FAMAS", "", "", "famas.png","", "famas", 1, "rifle"))
    weapons.append(Weapon("M4A4", "", "", "m4a4.png","", "m4a4", 2, "rifle"))
    weapons.append(Weapon("SSG 08", "", "", "ssg08.png","", "ssg08", 3, "rifle"))
    weapons.append(Weapon("AUG", "", "", "aug.png","", "aug", 4, "rifle"))
    weapons.append(Weapon("AWP", "", "", "awp.png","", "awp", 5, "rifle"))
    weapons.append(Weapon("SCAR-20", "", "", "scar20.png","", "scar20", 6, "rifle"))
    message = "Nice escolha pra fechar o inventário em!"
    result = [d.__dict__ for d in weapons]
    
    return jsonify(weapons=result, message=message, category=category)


@steps.route("/steps/getSkinsFromWeapon", methods=["GET"])
def getSkinsFromWeapon(): 
    weaponSelected = request.args.get('weaponSelected')
    print(weaponSelected)
    
    skins = []
    skins.append(Skin("The Emperor", "", "/m4a4/m4a4-emperor.png", "the-emperor", "rifle"))
    skins.append(Skin("Asiimov", "", "/m4a4/m4a4-Asiimov.png", "the-emperor", "rifle"))
    skins.append(Skin("The Battlestar", "", "/m4a4/m4a4-battlestar.png", "the-emperor", "rifle"))
    skins.append(Skin("Bullet Rain", "", "/m4a4/m4a4-bulletRain.png", "the-emperor", "rifle"))
    skins.append(Skin("Buzz Kill", "", "/m4a4/m4a4-buzzkill.png", "the-emperor", "rifle"))
    skins.append(Skin("Cyber Security ", "", "/m4a4/m4a4-cyberSecurity.png", "the-emperor", "rifle"))
    skins.append(Skin("Desolate Space", "", "/m4a4/m4a4-desolateSpace.png", "the-emperor", "rifle"))
    skins.append(Skin("Evil Daimyo", "", "/m4a4/m4a4-evilDaymio.png", "the-emperor", "rifle"))
    skins.append(Skin("Howl", "", "/m4a4/m4a4-howl.png", "the-emperor", "rifle"))
    skins.append(Skin("Neo-Noir", "", "/m4a4/m4a4-neoNoir.png", "the-emperor", "rifle"))
    skins.append(Skin("Royal Paladin", "", "/m4a4/m4a4-royalPaladin.png", "the-emperor", "rifle"))
    skins.append(Skin("Tornado", "", "/m4a4/m4a4-tornado.png", "the-emperor", "rifle"))

    message = "Agora é só escolher a skin!"
    result = [d.__dict__ for d in skins]
    
    return jsonify(skins=result, message=message, weaponSelected=weaponSelected)


@steps.route("/steps/getSkinInfo", methods=["GET"])
def getSkinInfo():
    category = request.args.get('category')
    print(category)
    
    prices = []

    priceFN = PriceTable("Nova de Fábrica (FN)", "-", "R$ 85,00", "R$ 78,00")
    prices.append(priceFN)

    priceMW = PriceTable("Pouco Usada (MW)", "R$ 115,00", "R$ 85,00", "-")
    prices.append(priceMW)

    priceBT = PriceTable("Testada em Campo (BT)", "R$ 115,00", "-", "R$ 78,00")
    prices.append(priceBT)

    priceWW = PriceTable("Bem Desgastada (WW)", "-", "R$ 85,00", "R$ 78,00")
    prices.append(priceWW)

    priceBS = PriceTable("Veterana de Guerra (BS)", "R$ 115,00", "R$ 85,00", "R$ 78,00")
    prices.append(priceBS)



    message = "É isso, se liga nos preços aí!"
    result = [d.__dict__ for d in prices]
    
    return jsonify(prices=result, message=message, name="The Emperor", image="/m4a4/m4a4-emperor.png" )