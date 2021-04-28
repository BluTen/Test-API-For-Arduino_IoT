import flask
from flask import jsonify, render_template, redirect, url_for, request

import pymongo

from utils import loadjson

app = flask.Flask(__name__)

db_client = pymongo.MongoClient(loadjson("cred.json")["db_url"])
db = db_client["database0"]
p1_t = db["p1_t"]
p2_t = db["p2_t"]

@app.before_first_request
def startup_func():
    print(" * Startup function Called")
    p2_t.delete_many({})
    p2_t.insert_one({"_id": 0, "main light": 0})
    if p1_t.find_one(filter={"_id": 0}) is None: p1_t.insert({"_id":0, "message": ""})
    print(" * Startup function Finished")

@app.route('/', methods=['GET'])
def home():
    return render_template("home.html")

@app.route('/p1', methods=['GET'])
@app.route('/p1/home', methods=['GET'])
def p1_home():
    return render_template('p1.html')

@app.route('/p1/api/message', methods=['GET', 'POST'])
def p1_api_message():
    if request.method == 'GET':
        if request.args.get('raw') == 'true':
            return jsonify(p1_t.find_one({"_id": 0})["message"]), 200
        # print(p1_t.find_one({"_id": 0}))
        # print(p1_t.find_one({"_id": 0}, {'_id': 0}))
        return jsonify({"data" :p1_t.find_one({"_id": 0}, {'_id': 0})}), 200
            # return jsonify({"data" :"hello"}), 200
    elif request.method == 'POST':
        p1_t.update_one({"_id": 0}, {"$set":{"message": request.form["text"]}})
        return {"action": "UPDATE", "data": {"message": request.form["text"]}}, 201

@app.errorhandler(404)
def page_not_found_error(error):
    return {"Status":404, "Message": 'Page/Query Not Found'}, 404
    
# @app.route('/arduino/list/', methods=['GET'])
# def arduino_list_filter():
#     if


# todo push changes
if __name__ == "__main__":
    app.run()