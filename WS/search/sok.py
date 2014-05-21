#!/usr/bin/env python 
# -*- coding: UTF-8 -*-

# enable debugging. ONLY for use in testenvironment.
# import cgitb
# cgitb.enable()

# import libraries
import cgi
from os import environ
import psycopg2

f = cgi.FieldStorage()
kb = f.getfirst("q", "wrong search parameter")

kb = unicode(kb.decode("utf8")) 
kb = kb.upper()

#Add your own connectionstring! And configure the sql.
conn = psycopg2.connect("host='localhost' port='5432' user='commonread' password='c0mm0nr34d' dbname='common'")
cur = conn.cursor()
sql = "SELECT objektnamn FROM poi_skane_adressregister_apl WHERE objektnamn like (%s);"
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


