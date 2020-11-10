import sys
import urllib
import json
import argparse
import os
import shutil
import glob
import hashlib
import requests



path = "/Users/nakamurasatoru/git/d_genji/kouigenjimonogatari.github.io/api/items/*.json"

files = glob.glob(path)

files = sorted(files)

all = {}

m_data_map = {}

for i in range(len(files)):

    file = files[i]

    print(i+1, len(files))

    with open(file) as f:
        rdf = json.load(f)[0]

    vol = int(rdf["http://purl.org/dc/terms/isPartOf"][0]["@id"].split("/")[-1].split(".")[0])

    if vol not in all:
        all[vol] = {}

    obj = all[vol]

    page = rdf["https://w3id.org/kouigenjimonogatari/api/property/page"][0]["@value"]

    if page not in obj:

        hash = str(page).zfill(4)

        with open("/Users/nakamurasatoru/git/d_genji/kouigenjimonogatari.github.io/api/item_sets/"+str(vol).zfill(2)+".json") as f:
            rdf2 = json.load(f)[0]

        manifest = rdf2["http://www.w3.org/2000/01/rdf-schema#seeAlso"][0]["@id"]

        if manifest not in m_data_map:

            m_data = requests.get(manifest).json()

            canvases = m_data["sequences"][0]["canvases"]

            images = {}

            for canvas in canvases:
                images[canvas["@id"]] = canvas["images"][0]["resource"]["service"]["@id"] + "/full/200,/0/default.jpg"

            m_data_map[manifest] = images

        canvas = rdf["http://purl.org/dc/terms/relation"][0]["@id"].split("&canvas=")[1]

        image = m_data_map[manifest][canvas]

        if page % 2 == 0:
            image = image.replace("full", "pct:50,0,100,100")
        else:
            image = image.replace("full", "pct:0,0,50,100")

        obj[page] = {
            "attribution": "国立国会図書館",
            "label" : [],
            "objectID" : hash,
            "page": page,
            # "pos": 1,
            "vol": vol,
            "work": rdf2["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"],
            "image" : image,
            "manifest" : manifest,
            "canvas" : canvas
        }

    obj2 = obj[page]

    obj2["label"].append(rdf["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"])

data = []

for vol in all:
    for page in all[vol]:

        obj = all[vol][page]
        obj["text"] = "\n".join(obj["label"])

        data.append(obj)

opath = "data/ndl.json"

with open(opath, 'w') as outfile:
    json.dump(data, outfile, ensure_ascii=False,
                indent=4, sort_keys=True, separators=(',', ': '))
