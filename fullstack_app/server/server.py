# server.py
from flask import Flask, render_template
import requests
import json

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/getComments")
def getComments():
    # TODO : implement function to make request and get surf data
    # TODO : make sure it is CORS compatible - code in book
    r = requests.get('')
    print("status: {} ".format(r.status))
    print("status: {} ".format(r.status))


if __name__ == "__main__":
    app.run(debug=True)




