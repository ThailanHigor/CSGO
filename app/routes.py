
def load(api):    
    from .controllers.Weapons import Weapons
    api.add_resource(Weapons, "/weapons")

    from .controllers.WeaponsTypes import WeaponsTypes
    api.add_resource(WeaponsTypes, "/weapon_types")

    from .controllers.Skins import Skins
    api.add_resource(Skins, "/skins")
    
    from .controllers.SkinScraping import SkinScraping
    api.add_resource(SkinScraping, "/skins-price")

    from .controllers.Contact import Contact
    api.add_resource(Contact, "/contact")