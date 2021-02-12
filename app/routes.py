def load(app):    
    from .controllers.weapons import weapons as weapons_blueprint
    app.register_blueprint(weapons_blueprint)

    from .controllers.skins import skins as skins_blueprint
    app.register_blueprint(skins_blueprint)
    