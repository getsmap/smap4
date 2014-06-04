#!/usr/bin/env python
# -*- coding: utf-8 -*-

import cgi, cgitb
cgitb.enable()

# Import smtplib for the actual sending function
import smtplib

# Here are the email package modules we'll need
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header
from email.mime.image import MIMEImage

import json
import urllib2


def sendEmail(fromEmail="noreply@smap.se", toEmail="johan.lahti@malmo.se", smtp="10.10.32.3", port=25, msg="", password=None):
    server = smtplib.SMTP(smtp, port)
    server.ehlo()
    if password!=None:
        server.starttls()
        server.login(fromEmail, password)

    server.sendmail(fromEmail, toEmail, msg.as_string())
    server.close()

def prepareEmail():
	
    # Get data from client
    f = cgi.FieldStorage()
    
    subject = f["subject"].value
    message = f["message"].value if f.has_key("message") else None
    html = f["html"].value if f.has_key("html") else None
    fromEmail = f["fromemail"].value if f.has_key("fromemail") else None
    toEmail = f["toemail"].value
    images = f["images"].value if f.has_key("images") else None
    
    # Prepare the mime message
    mimeMsg = MIMEMultipart()
    mimeMsg['Subject'] = Header(subject, 'UTF-8').encode()
    mimeMsg['From'] = Header(fromEmail, 'UTF-8').encode() 
    mimeMsg['To'] = Header(toEmail, 'UTF-8').encode()
    
    
    if message == None and html == None:
        print "Either parameter message or html is required"
    if images != None:
        imagePaths = json.loads(images)
        for p in imagePaths:
            if p[:5].lower() == "http:":
                img = fetchImageFromUrl(p)
            else:
                f = open(p, "rb")
                img = f.read()
                f.close()
            img = MIMEImage(img)
            
            mimeMsg.attach(img)
   
    # According to RFC 2046, the last part of a multipart message, in this case
    # the HTML message, is best and preferred.
    if message != None:
        message = MIMEText(message, 'plain', "utf-8")
        mimeMsg.attach(message)
    
    # Send a html message
    if html != None:
        html = MIMEText(html, 'html', "utf-8") # specify html if u like instead of plain
        mimeMsg.attach(html)
    
    # Send email
    sendEmail(msg=mimeMsg, fromEmail=fromEmail, toEmail=toEmail)

def fetchImageFromUrl(url):
    img = urllib2.urlopen(url).read()
    return img

if __name__ == "__main__":
    print "Content-Type: text/plain\n"
    prepareEmail()
    