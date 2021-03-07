FROM python:3.6

WORKDIR /app

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . /app
EXPOSE 5000
EXPOSE 80
CMD flask run