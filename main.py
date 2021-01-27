import json

import flask
from flask import jsonify, render_template, redirect, url_for, request

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    if request.args.get("text") is not None:
        return render_template('home.html', messages={"btext": request.args["text"]})
    return render_template('home.html', messages={"btext": ""})

@app.route('/display/all/', methods=['GET'])
def display_all():
    return jsonify(loadf())

@app.route("/display/post/", methods=['GET','POST'])
def display_post():
    if request.method == 'POST':
        with open("data.json", 'w') as fp:
            json.dump({"display": request.form["text"]}, fp)
        return redirect(url_for('home', text=loadf("display")))
    return redirect('/')

@app.errorhandler(404)
def page_not_found_error(error):
    return {404:'Page Not Found'}

# @app.route('/arduino/list/', methods=['GET'])
# def arduino_list_filter():
#     if

def loadf(key =""):
    if key:
        return json.load(open("data.json", "r"))[key]
    return json.load(open("data.json", "r"))

if __name__ == "__main__":
    app.run()