import json

def loadjson(path, mode='r'):
    return json.load(open(path, mode))