#!/usr/bin/python

import cgi, cgitb
import os

def ipWithinSpan():
    ip = cgi.escape(os.environ["REMOTE_ADDR"])
    if type(ip)==type("string"):
        if ip[0:5]=="10.64":
            return True, ip
        elif ip[0:6]=="161.52":
            return True, ip
    return False, ip

if __name__=="__main__":
    print "Content-Type: application/json\n\n"
    ok, ip = ipWithinSpan()
    import json
    out = {
        "valid": ok,
        "ip": ip
    }
    print json.dumps(out)
