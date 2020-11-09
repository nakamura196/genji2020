import sys
import urllib
import json
import argparse
import os
import shutil
import glob
import hashlib
import requests

data = []

for vol in range(1, 55):
    print(vol)

    index = 1

    path = "/Users/nakamurasatoru/git/d_genji/genji_curation/docs/iiif/nijl_kuronet/"+str(vol).zfill(2)+".json"

    curationUrl = "https://raw.githubusercontent.com/nakamura196/genji_curation/master/docs/iiif/nijl_kuronet_taisei_all/"+str(vol).zfill(2)+".json"

    with open(path) as f:
        curation = json.load(f)

    selections = curation["selections"]

    for selection in selections:
        members = selection["members"]

        manifest = selection["within"]["@id"]

        m_data = requests.get(manifest).json()

        canvases = m_data["sequences"][0]["canvases"]

        images = {}

        for canvas in canvases:
            images[canvas["@id"]] = canvas["images"][0]["resource"]["service"]["@id"] + "/full/200,/0/default.jpg"

        label = selection["within"]["label"]

        map = {}

        for member in members:

            member_id = member["@id"]

            member_id_spl = member_id.split("#xywh=")

            canvasId = member_id_spl[0]

            page = int(canvasId.split("canvas/")[1])
            
            hash = hashlib.md5(canvasId.encode('utf-8')).hexdigest()

            if canvasId not in map:
                map[canvasId] = {
                    "objectID" : hash,
                    "attribution" : "国文学研究資料館",
                    "vol" : vol,
                    "label": [],
                    "image" : images[canvasId],
                    "work" : label,
                    "page" : page,
                    "pos" : index,
                    "curation" : curationUrl,
                    "manifest" : manifest,
                    "canvas" : canvasId
                }

                index += 1

            map[canvasId]["label"].append(member["label"])

        for canvas in map:

            obj = map[canvas]
            obj["text"] = "\n".join(obj["label"])

            data.append(obj)

    # break

opath = "data/nijl.json"

with open(opath, 'w') as outfile:
    json.dump(data, outfile, ensure_ascii=False,
                indent=4, sort_keys=True, separators=(',', ': '))
