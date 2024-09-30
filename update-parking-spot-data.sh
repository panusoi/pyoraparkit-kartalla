#!/bin/bash

mkdir -p tmp

TAMPERE_JSON="tmp/tampere-parking-spots.json"

curl  -H 'Content-Type: application/json;charset=UTF-8' -o "$TAMPERE_JSON" "https://geodata.tampere.fi/geoserver/liikenneverkot/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=liikenneverkot:pyorapysakointipaikat_postgis_gsview&outputFormat=json" 

npx esbuild ./scripts/generate-tampere-data.ts --outdir=tmp

node ./tmp/generate-tampere-data.js $TAMPERE_JSON

npx prettier --write ./src/data/tampere.ts