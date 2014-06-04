#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Import smtplib for the actual sending function
import sys, os
import smtplib
import email
import sendEmail, logEmail

# Import the email modules we'll need
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header


# To get the sent in parameters
import cgi, cgitb

##############################################################
##
## Author: Johan Lahti
## Date: 2010-10-04
## Copyright: Stadsbyggnadskontoret, Malmö stad
## License: MIT license
##
## Description:
##     This script is used by sMap to send an email with a URL
##     to the current map.
##
##     When calling this script as main, it will check if there is a
##     path to a log file (the log file does not need to exist).
##     If so, it will check if any emails have been sent recently
##     and how many (the interval and accepted amounts of emails
##     within this interval is user defined). It will also check if
##     the session time has passed (the minimum time interval for
##     sending two emails in a row). If it passes the mentioned steps:
##         - log
##         - session
##     then the email will be sent (and logged if there is a logfile-path
##     given). If the log detects that too many emails have been sent
##     within the time interval, the email will not be sent. An email
##     will also be sent to alert the administrator that someone with the
##     given IP might be trying to spam somebody. This IP will be blocked
##     until the administrator unblocks it.
##
##     The required data for the simple email function is the following:
##         - fromEmail {String}
##         - smtp {Integer}
##         - password {String} (if not needed, set to None)
##         - port {Integer}
##
##     If you also want a log-function with alert emails - you this parameter:
##         - adminEmails {String} (if many - separate by comma, e.g. "person1@gmail.com,person2@malmo.se"
##
##
##  Dependencies: sendEmail.py, getSession,py, logEmail,py (also sMap-made...)
##
##############################################################

###########################################################################################
## Here you set the email variables required for sending email
## and alert email (in case of spamming).

adminEmails = "johan.lahti@malmo.se"
fromEmail = "noreply@smap.se" #"noreply.mkarta@gmail.com" #"info@smap.se"
smtp = "10.10.32.3"  #"smtp.gmail.com" #"192.168.250.205"
password = None #"asdf1234"
port= 25 #587 #465
logPath = "/var/www/kartor/temp/email/log.db" # The folder of this file must be writable & readable

############################################################################################


def emailAdmin(ip, nrLoggedEmails, lastLog):
    """ Email the administrator that someone might be trying to spam. """
    
    msg = lastLog[1]
    toEmail = lastLog[2]

    msg = "VARNING! En dator med IP-nummer %s har skickat fler än max-antal e-postmeddelanden under angivet tidsintervall.\n\n" % (ip)
    msg += "Utdrag från senaste loggade mejlet:\n\nIP: %s\nMottagare: %s\n\nFör mer info, kolla loggfilen på: %s\n\n"\
           % (ip, toEmail, logPath)
    msg += "----------------------------------------------------------\n"
    msg += "Detta mejl har genererats automatiskt av sMap's email-log\n"
    msg += "----------------------------------------------------------\n"

    # Add a log summary
    logger = logEmail.EmailLogger(logPath)
    
    logSummary = logger.getLogSummary(secondsBack=None, asText=True)
    msg = msg + "\nUtdrag från loggen (visar alla sända mejl uppdelat på IP-nummer):\n\n%s" % (logSummary)

    mimeMsg = MIMEText(msg, "plain", "utf-8")
    mimeMsg['Subject'] = "Varning från sMaps e-post"
    mimeMsg['From'] = fromEmail
    mimeMsg['To'] = adminEmails

    """for debuggning from localhost: sendEmail.sendEmail("noreply.mkarta@gmail.com", "asdf1234", adminEmails,\
                        port=port, msg=mimeMsg)"""
    
    sendEmail.sendEmail(fromEmail, password, adminEmails.split(","),\
                        smtp, port=port, msg=mimeMsg)
    
    # Store data that warning has been sent so that it won't
    # create what it tries to prevent - spamming!!
    blocked = logger.setBlock(ip)



def checkLog(ip, secondsBack, maxEmails):
    
    # Get the IP and check if it has sent to many mails within interval.
    if type(logPath)==type("string") and \
        type(secondsBack) == type(1) and \
        type(maxEmails) == type(1):
        logger = logEmail.EmailLogger(logPath)
        nrLoggedEmails, lastLog = logger.getNumberOfPosts(ip, secondsBack)
        tooManyPosts = (maxEmails <= nrLoggedEmails)
        
    else:
        tooManyPosts = False
        nrLoggedEmails = None
        lastLog = None

    return tooManyPosts, nrLoggedEmails, lastLog

def checkSender(f, ip):
    """ Check the log for this IP and email admin if it has tried to send
    too many emails within a certain time interval. Note! This sender check
    can only be made if there is a given logPath. """

    tooManyPosts = False

    # Check if this IP is blocked - if so return False.
    logger = logEmail.EmailLogger(logPath)
    isBlocked = logger.getBlock(ip)
    if isBlocked==True:
        return False

    # If there is a logger file path given - check the log.
    if logPath != "null":
        #try:
        secondsBack = 20
        maxEmails = 4
        tooManyPosts, nrLoggedEmails, lastLog = checkLog(ip,\
                                                     secondsBack, maxEmails)
        #except:
            #return True # OK
        # Alert admin that this IP might be a spammer!
        if nrLoggedEmails!=None and tooManyPosts==True:
            emailAdmin(ip, nrLoggedEmails, lastLog)

    ok = (tooManyPosts==False)
    return ok

def sendTheDamnEmail(f):
    """ Extract the web-parameter values and send
    an email to the receiver... The client expects
    'success' if it worked out and 'error' if not.
    @param f {Object} The cgi FieldStorage object. """
    
    subject = f["subject"].value
    toEmails = f["toEmail"].value
    msg = f["msg"].value
    
    #try:
    #mimeMsg = MIMEText(msg, "plain", "utf-8")
    #mimeMsg['Subject'] = subject
    #mimeMsg['From'] = fromEmail
    #mimeMsg['To'] = toEmails
    
    mimeMsg = MIMEMultipart('alternative')
    mimeMsg['Subject'] = Header(subject, 'UTF-8').encode()
    mimeMsg['To'] = Header(toEmails, 'UTF-8').encode()
    mimeMsg['From'] = Header(fromEmail, 'UTF-8').encode()
	
    part1 = MIMEText(msg, 'plain', "utf-8")
    #part2 = MIMEText(msg, 'html') # If you want to send a fancy HTML email, use this one also
	
    mimeMsg.attach(part1)

    sendEmail.sendEmail(fromEmail, password, toEmails,\
                    smtp, port=port, msg=mimeMsg)

    if logPath!="null":
        logger = logEmail.EmailLogger(logPath)
        stored = logger.storePost(ip, msg, toEmails)
	print "stored"
    print "success"


def getClientIP():
    return cgi.escape(os.environ["REMOTE_ADDR"])

if __name__=='__main__':

    cgitb.enable() # for debugging
    print "Content-Type: text/plain\n"


    # --------------- TESTING START ----------------------
    """f = {
            "toEmail": "johan.lahti@malmo.se",
            "subject": "A new subject with åäö",
            "msg": "Content of the message comes here..."
        }"""
    #import socket
    #ip = socket.getaddrinfo(socket.gethostname(), None)[0][4][0] # Get this computers IP
    #print "ip", ip
    
    # --------------- TESTING END ----------------------

    ip = getClientIP()
    f = cgi.FieldStorage() # outcomment when testing

    # Check IP
    senderOK = checkSender(f, ip)
    if senderOK == True:
        sendTheDamnEmail(f)
    else:
        print "blocked"
     
