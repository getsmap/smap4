#!/usr/bin/env python 
# -*- coding: UTF-8 -*-

# enable debugging. ONLY for use in testenvironment.
# import cgitb
# cgitb.enable()

# import libraries
import cgi
from os import environ
import psycopg2
import json

f = cgi.FieldStorage()
kb = f.getfirst("q", "wrong search parameter")

kb = unicode(kb.decode("utf8")) 
kb = kb.upper()

#Add your own connectionstring! And configure the sql.
conn = psycopg2.connect("host='localhost' port='5432' user='commonread' password='c0mm0nr34d' dbname='common'")
cur = conn.cursor()
sql = "SELECT easting, northing, objektnamn, objekttyp FROM poi_skane_adressregister_apl WHERE objektnamn = (%s);"
safeParam = (kb, )
cur.execute(sql, safeParam)
#cur.execute("SELECT objektnamn FROM poi_hbg_sok WHERE objektnamn like '" + kb + "%';")

features = []

for record in cur:
        coordinates=[record[0],record[1]]
        geometry={}
        geometry['type'] = 'Point'
        geometry['coordinates'] = coordinates
        properties={}
        properties['name']=record[2]
        properties['category']=record[3]
        feature={}
        feature['type']='Feature'
        feature['geometry']=geometry
        feature['properties']=properties
        features=[feature]
		
address_object={}
address_object['type']='FeatureCollection'
address_object['features']=features

cur.close()
conn.close()

print "Content-Type: application/json"  #; charset: UTF-8"
print
print json.dumps(address_object)


