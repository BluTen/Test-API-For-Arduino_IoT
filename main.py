import flask
from flask import jsonify, render_template

app = flask.Flask(__name__)
app.config["DEBUG"] = True

data = {'display': ''}
data2 = {
    0:{
        'Arduino Uno':'AVR'
        },
    1:{
        'Arduino Mega': 'AVR'
        }
}

@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/display/all/', methods=['GET'])
def display():
    return jsonify(data)

@app.route('/hidden/', methods=['GET'])
def hidden_site():
    return '<h1 style="text-align: center;">You Got Me OwO</h1>'

@app.errorhandler(404)
def page_not_found_error(error):
    return {404:'Page Not Found'}

# @app.route('/arduino/list/', methods=['GET'])
# def arduino_list_filter():
#     if

if __name__ == "__main__":
    app.run()