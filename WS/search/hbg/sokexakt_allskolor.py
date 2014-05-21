#!/usr/bin/env python 
# -*- coding: UTF-8 -*-

# enable debugging
import cgitb
cgitb.enable()

# import libraries
import cgi
from os import environ
import psycopg2
import json

f = cgi.FieldStorage()
kb = f.getfirst("q", "wrong search parameter")
kb = unicode(kb.decode("utf8")) 
kb = kb.upper() #finns Trim() i Python?

conn = psycopg2.connect("host='localhost' port='5432' user='hborgPG' password='p0stg1s2010hborg' dbname='hbg'")
cur = conn.cursor()

sql = "SELECT easting, northing, namn FROM poi_skola_sok WHERE namn = (%s);"
safeParam = (kb, )

cur.execute(sql, safeParam)
#cur.execute("SELECT easting, northing, objektnamn, objekttyp FROM poi_skola_sok WHERE namn = '" + kb + "';")

features = []

for record in cur:
        coordinates=[record[0],record[1]]
        geometry={}
        geometry['type'] = 'Point'
        geometry['coordinates'] = coordinates
        properties={}
        properties['name']=record[2]
        #properties['category']=record[3]
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


