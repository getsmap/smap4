#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import glob
import time
import cgi

def deleteAllFiles(folder, ext=[], maxAge=None):
    """ @param folder {String} The path to the folder
        @param ext {List} Only files with these extensions will be deleted.
        @param maxAge {Number} All files older than this (in seconds) will be deleted """
    
    # Find all files in this folder. Optionally
    # with the given extension(s) ext
    if len(ext)>0:
        paths = []
        for x in ext:
            # Get files with extension with both upper and lower case...
            newPathsLower = glob.glob(os.path.normpath(folder) + "/*." + x.lower())
            paths.extend(newPathsLower)
            newPathsUpper = glob.glob(os.path.normpath(folder) + "/*" + x.upper())
            paths.extend(newPathsUpper)
    else:
        paths = glob.glob(os.path.normpath(folder) + "/*")
    now = time.time()
    for p in paths:
        if maxAge!=None:
            stat = os.stat(p)
            fileage = stat.st_ctime # fileage => creation time
            delta = now - fileage
            if delta > maxAge:
                os.remove(p)
        else:
            # If no time limit was given - delete all files with the given extensions.
            os.remove(p)
    

def writeLog(filePath, content):
    """ Logs time and IP in a simple log file """

    if os.path.exists(filePath)==False:
        mode = "w"
        content = "Time\tIP\tType\n" + content # headers
    else:
        mode = "a"
    f = open(filePath, mode)
    f.write(content)
    f.close()


if __name__=='__main__':
    pass
##    folder = r"E:\data_e\smap_export"
##    deleteAllFiles(folder, ext=["jpg", "png"], maxAge=60)
##
##    # Make a log message
##    now = time.ctime()
##    ip = cgi.escape(os.environ["REMOTE_ADDR"])
##    content = now + "\t" + str(ip) + "\n"
##    writeLog(os.path.normpath(folder) + "/log.txt", content)
