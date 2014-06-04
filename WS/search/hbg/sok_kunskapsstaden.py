#!/usr/bin/env python
# -*- coding: UTF-8 -*-

# enable debugging
import cgitb
cgitb.enable()

# import libraries
import cgi
from os import environ
import psycopg2

f = cgi.FieldStorage()
kb = f.getfirst("q", "wrong search parameter")

kb = unicode(kb.decode("utf8")) 
kb = kb.upper()

conn = psycopg2.connect("host='localhost' port='5432' user='hborgPG' password='p0stg1s2010hborg' dbname='hbg'")
cur = conn.cursor()
sql = "SELECT namn FROM kristian WHERE namn like (%s);"
safeParam = (kb+"%", )
cur.execute(sql, safeParam)
#cur.execute("SELECT objektnamn FROM poi_hbg_sok WHERE objektnamn like '" + kb + "%';")

print "Content-Type: text/plain"  #; charset: UTF-8"
print

for record in cur:
	print record[0]
#print conn.encoding

cur.close()
conn.close()


