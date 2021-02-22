from flask_restful import Resource, marshal
from app.models.Contact import Contact as ContactModel
from app.schemas.skin_fields import skin_fields
from app import request, db, mail
from flask_mail import Message


class Contact(Resource):
    def post(self): 
        data = request.only(["name", "email", "message"]) 
        newContact = ContactModel(
            name = data["name"],
            email = data["email"],
            message = data["message"]
        )

        try:
            db.session.add(newContact)   
            db.session.commit()
            msg = Message("Novo Contato", sender="Novo Contato", recipients=["thailan-higor@hotmail.com", "michell_mrz@hotmail.com"])
            msg.html = f"<b>Novo contato acaba de ser enviado no site!</b>"
            msg.html += f"<br>Nome: {data['name']}"
            msg.html += f"<br>Email: {data['email']}"
            msg.html += f"<br>Mensagem: {data['message']}"
            mail.send(msg)

            return {"success": True}

        except:
            return {"success": False}
    
