#!/usr/bin/python2.4
#
# Small script to show PostgreSQL and Pyscopg together
#

import psycopg2

try:
    conn = psycopg2.connect("dbname='sandbox' user='postgres' host='localhost' password='Categoryit73CL'")
    print "I am connected"
except:
    print "I am unable to connect to the database"
    
print "Content-Type: text/plain"  #; charset: UTF-8"
print
