def load(app):    
    from .controllers.home import home as home_blueprint
    app.register_blueprint(home_blueprint)

    from .controllers.steps import steps as steps_blueprint
    app.register_blueprint(steps_blueprint)
    