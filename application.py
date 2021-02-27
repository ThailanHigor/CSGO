import os
from app import db, create_app, mail
from app.models import WeaponType, Weapon, Skin, RandomMessage

app = create_app(os.environ["development"])
@app.shell_context_processor
def make_shell_processor():
    return dict(
        app = app,
        db = db,
        mail = mail,
        WeaponType = WeaponType,
        Weapon = Weapon,
        Skin = Skin,
        RandomMessage = RandomMessage
    )

if __name__ == "__main__":
    app.run(debug=True, port=80, host="0.0.0.0")