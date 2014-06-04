sMap 4
======

*Short introduction in English:*

>Welcome to sMap, a software package that serves to provide a platform
>for building complete web map products. The software has been developed by the sMap project
>and is released under the Apache Software Licese 2.0. The project is
>a collaboration between a number of swedish municipalities. If you
>want more information, visit our website at http://www.smap.se.

Introduktion
------------

sMap är ett mjukvarupaket som bland annat bygger på OpenLayers. Syftet
med paketet är att tillhandahålla ett komplett ramverk och tillhörande
utökningar som gör det möjligt att bygga avancerade kartapplikationen
på webben.

För mer information om sMap-projektet, kontakta våra
projektsamordnare. Se längst ned.

Omfattning
----------

sMap som produkt består av källkod som utvecklats av
sMap-projektet. Denna programkod är släppt under Apache Software
License 2.0.

Produkten i sig bygger på ett antal tredjepartsbibliotek såsom
OpenLayers, jqgrid, Spin.js med flera. Dessa ingår inte i
sMap-produkten utan tillhandahålls som de är. Upphovsrätten för dessa
tillhör sina respektive författare, och de är licenseriade under egen
licens.

Paketeringen av sMap (dvs, innehållet i detta källkodsförråd), består
av dels av sMap-produkten, dels av de nödvändiga
tredjepartsbiblioteken.

Viktig information gällande datakällor
--------------------------------------

Datakällor, oavsett om de tillhör sMap-projektet, sMap-projektets
deltagare eller någon annan ingår inte i vare sig produkt eller
paketering.

Du måste söka tillstånd för att få använda dem hos respektive utgivare
och/eller upphovsrättsinnehavare. Detta gäller även om vi skulle länka
till dem i någon programkod.

Komma igång
-----------

För att komma igång, gör följande:

 1. Klona eller ladda ned källkoden i detta källkodsförråd
 2. Anpassa configs/config.js så att den refererar korrekta datakällor
 3. Kör kompilering och komprimering genom att köra Python-skriptet
    cc.py med utgångspunkt i roten av arkivet.
 4. Ladda upp hela förrådet till en webbserver och besök index.html.

Observera! Du måste ha Python 2.7.x samt Java 6 eller nyare
installerat för att kunna köra cc.py.

Bidrag
------

Om du använder sMap för att göra en egen karta, eller förändrar den,
får du gärna höra av dig till oss och dela med dig av dina
erfarenheter och dina ändringar.

Frågor, synpunkter eller förslag?
---------------------------------

Vi välkomnar all slags återkoppling! Hör gärna av dig till våra
projektsamordnare Ulf Minör (ulf.minor (snabel-a) malmo.se) och
Karl-Magnus Jönsson (karl-magnus.jonsson (snabel-a) kristianstad.se).