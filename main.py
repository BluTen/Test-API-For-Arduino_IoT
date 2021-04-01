import flask
from flask import jsonify, render_template, redirect, url_for, request

import pymongo

from utils import loadjson

app = flask.Flask(__name__)
app.config["DEBUG"] = True

db_client = pymongo.MongoClient(loadjson("cred.json")["db_url"])
db = db_client["database0"]
p1_t = db["p1_t"]
p2_t = db["p2_t"]

@app.before_first_request
def startup_func():
    print(" * Startup function Called")
    p2_t.delete_many({})
    p2_t.insert_one({"_id": 0, "main light": 0})
    if p1_t.find_one(filter={"_id": 0}) is None:
        p1_t.insert({"_id":0, "message": ""})
    print(" * Startup function Finished")

@app.route('/', methods=['GET'])
@app.route('/p1', methods=['GET'])
@app.route('/p1/home', methods=['GET'])
def home():
    if request.args.get("text") is not None:
        return render_template('home.html', messages={"btext": request.args["text"]})
    return render_template('home.html', messages={"btext": ""})

@app.route('/p1/c_message', methods=['GET'])
def display_all():
    return jsonify(p1_t.find_one({"_id": 0})["message"])

@app.route("/p1/post_message", methods=['GET','POST'])
def display_post():
    if request.method == 'POST':
        print(request.get_data())
        p1_t.update_one({"_id": 0}, {"$set":{"message": request.form["text"]}})
        return redirect(url_for('home', text=request.form["text"], redirect='1'))
    if request.form["noRedirect"] is None:
        return redirect('/p1/home')

@app.errorhandler(404)
def page_not_found_error(error):
    return {"Status":404, "Message": 'Page/Query Not Found'}
    
# @app.route('/arduino/list/', methods=['GET'])
# def arduino_list_filter():
#     if

if __name__ == "__main__":
    app.run()