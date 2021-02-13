from app import db, create_app
import os
from flask_migrate import Migrate
from app.models import WeaponType
from app.models import Weapon
from app.models import Skin
from app.models import RandomMessage

app = create_app(os.environ["FLASK_ENV"])
migrate=Migrate(app, db)
 
@app.shell_context_processor
def make_shell_processor():
    return dict(
        app = app,
        db = db,
        WeaponType = WeaponType,
        Weapon = Weapon,
        Skin = Skin,
        RandomMessage = RandomMessage
    )

if __name__ == "__main__":
    app.run(debug=True, port=80, host="0.0.0.0")