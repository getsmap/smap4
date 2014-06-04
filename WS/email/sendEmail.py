#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Import smtplib for the actual sending function
import sys, os
import smtplib
import email
# Import the email modules we'll need
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header

def sendEmail(fromEmail="", password=None, toEmails=[], smtp="smtp.gmail.com",\
              port=25, msg=""):

    server = smtplib.SMTP(smtp, port)
    server.ehlo()
    if password!=None:
        server.starttls()
        server.login(fromEmail, password)

    server.sendmail(fromEmail, toEmails, msg.as_string())
    server.close()

if __name__=='__main__':
    pass

    """fromEmail = "noreply@malmo.se" #"johanlahti@gmail.com"
    password = None
    smtp = "mail2.malmo.se"
    port = 25
    toEmails = ["johan.lahti@malmo.se"]
    subject = "Testar ÅÄÖ åäö"
    content = "ÅÄÖ åäö Nu testar jag skicka en länk...\n\n/Johan"

    msg = MIMEText(content, "plain", "utf-8")
    msg['Subject'] = subject
    msg['From'] = fromEmail
    msg['To'] = ";".join(toEmails)

    sendEmail(fromEmail, password, \
              toEmails=toEmails, msg=msg, \
              smtp=smtp, port=port)"""
              
