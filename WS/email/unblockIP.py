#!/usr/bin/env python
# -*- coding: utf-8 -*-

#import sys, os
from logEmail import EmailLogger
import cgi, cgitb
import os

cgitb.enable()

if __name__=="__main__":
    print "Content-type: text/html\n\n"
    f = cgi.FieldStorage()
    ip=None
    #try:
    ip = f["ip"].value
    loggerPath = f["loggerPath"].value
    logger = EmailLogger( os.path.normpath(loggerPath)  ) # Cannot change the path through CGI parameter
    unBlocked = logger.unblock(ip)
    if unBlocked==True:
        print "IP %s successfully unblocked!" %(ip)
    else:
        print "IP %s was not blocked." %(ip)
    
