#!/usr/bin/env python
# -*- coding: utf-8 -*-

import shelve
import time
import sys, os
from operator import itemgetter

class EmailLogger:

    def __init__(self, path=""):
        self.path = os.path.normpath(path)
        self.blockPath = os.path.normpath(os.path.dirname(path) + "/blocked_IPs.db")

    def getNumberOfPosts(self, ipNr, secondsBack=None):
        """ Get the number of emails sent by a computer
        with this IP number within the interval now and
        user defined number of seconds back in time. """

        if secondsBack==None:
            secondsBack=time.time()
        
        db = shelve.open(self.path)

        if db.has_key(ipNr)==False:
            return 0, None
        
        logList = db[ipNr]
        logList.sort(key=itemgetter(0, 2), reverse=True)

        now = time.time()
        borderTime = now - secondsBack

        # Count number of logs within time interval
        nrOfSentEmails = 0
        for log in logList:       
            logTime = log[0]
            
            if logTime <= borderTime:
                break
            nrOfSentEmails += 1

        db.close()
        return nrOfSentEmails, logList[0]

    def getBlock(self, ipNr):
        """ Get the IP and the time when/if a warning email has been sent.
        @param ipNr {String}
        @return {Boolean} True -> A warning has been sent """
        
        isBlocked = False
        
        if self.ipIsOK(ipNr)!=True:
            return isBlocked

        db = shelve.open(self.blockPath)
        if db.has_key(ipNr)==True:
            isBlocked=True
        db.close()
        
        return isBlocked
        
    def setBlock(self, ipNr):
        """ Block the IP. The time of the blocking is stored.
        @param ipNr {String}
        @return {Boolean} True -> Success, False -> Failure """
        
        if self.ipIsOK(ipNr)!=True:
            return False
            
        db = shelve.open(self.blockPath)
        now = time.time()
        db[ipNr] = now
        db.close()
        return True

    def unblock(self, ipNr):
        """ Unblock this IP by deleting it from block file."""
        db = shelve.open(self.blockPath)
        try:
            del db[ipNr]
            success = True
        except:
            success = False
        db.close()
        return success

    def getLogSummary(self, secondsBack=None, asText=False):
        """ Get a 2D-list with columns: ipnr | nrOfPosts
        sorted by number of sent emails.
        @param secondsBack {Number}
        @return {List} """
        
        db = shelve.open(self.path)

        ipNrs = db.keys()
        summary = [["IP", "Number of Posts", "Last log"]]

        from datetime import datetime
        for ip in ipNrs:
            nrOfSentEmails, lastLog = self.getNumberOfPosts(ip, secondsBack)
            t = datetime.fromtimestamp(lastLog[0]).ctime() # convert time to readable format
            summary.append([ip, nrOfSentEmails, t])
        
        summary.sort(key=itemgetter(1), reverse=True)

        if asText==True:
            txt = ""
            for row in summary:
                txt = txt + row[0] + "\t" + str(row[1]) + "\t" + str(row[2]) + "\n"
            txt.rstrip("\n")
            summary = txt
        
        return summary
        

    def storePost(self, ipNr, msg, toEmail):
        """ Store post inside the shelve-file as a list containing:
            @param ipNr {String}
            @param msg {String}
            @param toEmail {Email address}
            And also stores:
            - time when sent

            @return {Boolean} True if successfully stored. Otherwise False. """

        if self.ipIsOK(ipNr)!=True:
            return False
        
        db = shelve.open(self.path)

        # Try to fetch the log for this ip-number. Otherwise create new.
        try:
            logList = db[ipNr]
        except:
            logList = []

        # The order: ipNr : [ time | msg | toEmail ]
        logList.append( [time.time(), msg, toEmail] )
        db[ipNr] = logList # store it in database
        db.close()
        return True

    def ipIsOK(self, ipNr):
        """ Checks if IP is in OK format. """
        ok = False
        try:
            if len(ipNr.split("."))==4:
                ok=True
        except:
            pass
        return ok
        

def getSummaryHtml():
    """ Gives a HTML summary of the sent emails
    (calls the getSummary method). It uses the
    shelve-file given as parameter 'logpath'. """
    
    import cgi, cgitb
    cgitb.enable()
    
    #print "Content-type: text/html\n\n"

    f = cgi.FieldStorage()

    logPath = f["logpath"].value
    
    logger = EmailLogger(logPath)
    summary = logger.getLogSummary(secondsBack=None)

    outText = "<html><head></head><body><table border='1'><tr><th>%s</th><th>%s</th><th>%s</th></tr>" \
              % (summary[0][0], summary[0][1], summary[0][2])
    
    for row in summary[1:]:
        outText += "<tr><td>%s</td><td>%s</td><td>%s</td></tr>" %(row[0], row[1], row[2])
    outText += "</table></body></html>"
    print outText
    

if __name__=="__main__":
    print "Content-type: text/html\n\n"
    
    getSummaryHtml()

    #logger = EmailLogger("D:/sMapLog/blocked_IPs.db")
    #unBlocked = logger.unblock("161.52.64.27")
    
    
