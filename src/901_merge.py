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

    with open(file) as f:
        al = json.load(f)

    for obj in al:
        id = obj["objectID"]

        all2[id] = obj


with open("calc.json") as f:
    all = json.load(f)

arr2 = []
arr3 = {}


for id in all2:
    arr2.append(all2[id])

    all2[id]["arr"] = all[id]
    arr3[id] = all2[id]

opath = "algolia.json"

with open(opath, 'w') as outfile:
    json.dump(arr2, outfile, ensure_ascii=False,
            indent=4, sort_keys=True, separators=(',', ': '))

opath = "nuxt.json"

with open(opath, 'w') as outfile:
    json.dump(arr3, outfile, ensure_ascii=False,
            indent=4, sort_keys=True, separators=(',', ': '))