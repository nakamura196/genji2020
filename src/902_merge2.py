import sys
import urllib
import json
import argparse
import os
import shutil
import glob
import hashlib
import requests
import Levenshtein
import json

data = []

files = glob.glob("data/*.json")

all2 = {}

for file in files:

    all3 = {}

    with open(file) as f:
        al = json.load(f)

    for i in range(len(al)):
        obj = al[i]
        # for obj in al:
        
        if i != 0:
            obj["prev"] = al[i-1]["objectID"]

        if i < len(al) - 1:
            obj["next"] = al[i+1]["objectID"]

        id = obj["objectID"]

        if obj["target"] == "校異源氏物語":
            all2[id] = obj
        else:
            all3[id] = obj
            

    with open(file.replace("data", "../static/data/json"), 'w') as outfile:
        json.dump(all3, outfile, ensure_ascii=False,
            indent=4, sort_keys=True, separators=(',', ': '))


with open("calc3.json") as f:
    all = json.load(f)

algolia = []
nuxt = {}


for id in all2:
    obj = all2[id]

    if obj["target"] == "校異源氏物語":
        algolia.append(obj)
    
    obj["arr"] = all[id] if id in all else {}
    nuxt[id] = obj

opath = "algolia.json"

with open(opath, 'w') as outfile:
    json.dump(algolia, outfile, ensure_ascii=False,
            indent=4, sort_keys=True, separators=(',', ': '))

opath = "../static/nuxt.json"

with open(opath, 'w') as outfile:
    json.dump(nuxt, outfile, ensure_ascii=False,
            indent=4, sort_keys=True, separators=(',', ': '))