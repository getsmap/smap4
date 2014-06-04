#!/usr/bin/env python
# -*- coding: utf-8 -*-

from PIL import Image

import reportlab
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

def makePdf(imagePath, savePath, text=None, legendPath=None):
    c = canvas.Canvas(savePath, reportlab.lib.pagesizes.A4)

    c.setFont('Helvetica', 32)
    
    c.setPageCompression(0)

    if type(imagePath)==type("string"):
        img = Image.open(imagePath)
    else:
        img = imagePath

    # Resize using interpolation to make pic smoother.
    
    #img = img.resize((300,300), Image.BICUBIC)
    ir = ImageReader(img)

    if text!=None:
        c.drawCentredString(295, 660, text)
    
    c.drawImage(ir, 100, 200, width=img.size[0]/1.3, height=img.size[1]/1.3, preserveAspectRatio=True )
    c.showPage()
    c.save()


if __name__=="__main__": 
    pass
    #imagePath = r"Z:\stadsatlas\WebContent\serverscripts\print\img_838050272.PNG"
    #savePath = r"Z:\stadsatlas\WebContent\serverscripts\print\savedPDF.pdf"
    #makePdf(imagePath, savePath, text="En karta över Malmö 2010")
    
    
