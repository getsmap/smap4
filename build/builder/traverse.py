#!/usr/bin/env python
# -*- coding: utf-8 -*-

#######################################################################################
# Author: Johan Lahti
# Company/Organisation: Malmö municipality, Sweden.
# Date: 2011-11-22
# Version: 1.0
# License: MIT License
# About: A script for merging many JS- and CSS-files and then compressing
#   them with yuicompressor. The script requires a JSON-file for configuration.
#   The configuration tells which files should be merged and the output file name etc.
#   Read the readme-document for more information.
#######################################################################################

import subprocess
import os
import json

def traverseDir(dir, ext, avoidNames=[]):
	paths = []
	for top, dirs, files in os.walk(dir):
		for name in files:
			avoid = False
			
			for a in avoidNames:
				if a.upper() in name.upper():
					avoid = True
					print "Avoiding file %s" %(name)
					
			if avoid == False and name.split(".")[-1] == ext: 
				path = os.path.join(top, name)
				paths.append(path)
	
	return paths
	
	
if __name__ == "__main__":
	dir = "/Library/WebServer/Documents/map-1.0/core/"
	ext = "js"
	paths = traverseDir(dir, ext)
	for p in paths:
		print '"%s",' %(p)
	