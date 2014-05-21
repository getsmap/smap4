#!/bin/bash
# Copyright (c) Göran Magnusson
# References
# - http://www.mapfish.org/doc/print/configuration.html

# Version
VER="0.1.0"

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ] ; do SOURCE="$(readlink "$SOURCE")"; done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
if [ "$(whoami)" != "root" ]; then
	echo "Usage: sudo $SOURCE";
	exit 1
fi

echo "This script can generate a config file in this directory. $(tput setaf 4)[Default values]$(tput sgr0)"
echo

echo "Please enter a config file name (e.g. export). Exclude '.yaml'. $(tput setaf 4)[print]$(tput sgr0)"
read -e service_name
service_name="${service_name:-print}"

config_file=$DIR/$service_name".yaml"

overwrite="y"
if [ -e $config_file ] ; then
	echo "Service config $config_file already exist."
	read -e -p "Overwrite? $(tput setaf 4)[$overwrite]$(tput sgr0) " input
	overwrite="${input:-$overwrite}"
else
	touch "$service_name.yaml"
fi

if [ $overwrite == "n" ] ; then
	echo "Nothing to do. Exiting..."
	exit 0
fi

cp --remove-destination $DIR/header.yaml $config_file

echo "State which print sizes that shuld be possible."
read -e -p "Minimum size? $(tput setaf 4)[A4]$(tput sgr0) " minsize
minsize="${minsize:-A4}"
minsize=${minsize:(-1)}
read -e -p "Maximum size? $(tput setaf 4)[A0]$(tput sgr0) " maxsize
maxsize="${maxsize:-A0}"
maxsize=${maxsize:(-1)}
read -e -p "Margin? $(tput setaf 4)[42]$(tput sgr0) " MARGIN
MARGIN="${MARGIN:-42}"
read -e -p "Title possible? $(tput setaf 4)[y]$(tput sgr0)" title
title="${title:-y}"
read -e -p "Comment possible? $(tput setaf 4)[y]$(tput sgr0)" comment
comment="${comment:-y}"
read -e -p "Landscape mode possible? $(tput setaf 4)[y]$(tput sgr0)" landscape
landscape="${landscape:-y}"
read -e -p "Northarrow possible? $(tput setaf 4)[y]$(tput sgr0)" northarrow
northarrow="${northarrow:-y}"
read -e -p "Scale bar possible? $(tput setaf 4)[y]$(tput sgr0)" scalebar
scalebar="${scalebar:-y}"

# Regexp check if input are ok.
if ! [[ "$minsize" =~ ^[0-9]+$ ]] ; then
   exec >&2; echo "ERROR: Input Minimum size $minsize Not a number"; exit 1
fi
if ! [[ "$maxsize" =~ ^[0-9]+$ ]] ; then
   exec >&2; echo "ERROR: Input Maximum size $maxsize Not a number"; exit 1
fi
if ! [[ "$MARGIN" =~ ^[0-9]+$ ]] ; then
   exec >&2; echo "ERROR: Input Margin $MARGIN Not a number"; exit 1
fi

A4=(595 842)
A3=(842	1191)
A2=(1191 1684)
A1=(1684 2382)
A0=(2382 3368)
HEADER=0
ROW=20

function makeLayout {
	paper_size="A$1"
	echo -e "  #===========================================================================" >> $config_file
	echo -e "  \"A$1_${2:-Portrait}_${3:-NoArrow}_${4:-NoBar}\":" >> $config_file
	echo -e "  #===========================================================================
    metaData:
      author: 'Stadsbygnadskontoret'
      keywords: 'karta'
      creator: 'sMap'

    mainPage:" >> $config_file

	if [ ${2:-Portrait} == "Portrait" ] ; then
		width=`eval echo \\\${$paper_size[0]}`
		height=`eval echo \\\${$paper_size[1]}`
	else
		width=`eval echo \\\${$paper_size[1]}`
		height=`eval echo \\\${$paper_size[0]}`
	fi
	
	if [ $title == "y" ] ; then
		HEADER=$[$HEADER+$ROW]
	fi
	if [ $comment == "y" ] ; then
		HEADER=$[$HEADER+$ROW]
	fi
	
	echo -e "      pageSize: $width $height
      items:
        - !map
          name: Karta
          absoluteX: $MARGIN
          absoluteY: $[$height-$MARGIN-$HEADER]
          width: $[$width-($MARGIN*2)]
          height: $[$height-($MARGIN*2)-$HEADER]" >> $config_file

	if [ $title == "y" ] ; then
		echo -e "        - !columns
          absoluteX: $MARGIN
          absoluteY: $[$height-$MARGIN]
          width: $[$width-($MARGIN*2)]
          items:
            - !text
               font: Helvetica
               align: center
               fontSize: 18
               text: '\${mapTitle}'" >> $config_file
	fi

	if [ $comment == "y" ] ; then
		echo -e "        - !columns
          absoluteX: $MARGIN
          absoluteY: $[$height-$MARGIN-$ROW]
          width: $[$width-($MARGIN*2)]
          items:
            - !text
               font: Helvetica
               align: center
               fontSize: 12
               text: '\${comment}'" >> $config_file
	fi

	echo -e "        - !columns
          absoluteX: $[$MARGIN+$ROW]
          absoluteY: $[$MARGIN+$ROW]
          width: $[$width-($MARGIN*2)-$ROW]
          items:
            - !text
              font: Helvetica
              align: left
              fontSize: 10
              text: '\${copy}'" >> $config_file

	if [ ${3:-NoArrow} == "Arrow" ] ; then
		echo -e "        - !columns
          absoluteX: $[$MARGIN+$MARGIN]
          absoluteY: $[$height-$MARGIN-($ROW*3)]
          width: $[$width-($MARGIN*2)]
          items:
            - !image
               align: left
               maxWidth: 60
               maxHeight: 60
               url: 'http://localhost/print-servlet/Arrow_North_CFCF.svg'
               rotation: '\${rotation}'" >> $config_file
	fi

	if [ ${4:-NoBar} == "Bar" ] ; then
		echo -e "        - !columns
          absoluteX: $[$width-$MARGIN-($ROW*4)]
          absoluteY: $[($MARGIN*2)]
          width: $[$ROW*4]
          items:
            - !scalebar
               align: right
               maxSize: 180
               type: 'bar sub'
               intervals: 5" >> $config_file
	fi
}

function arrowBar {
	if [ $northarrow == "y" ] && [ $scalebar == "y"  ] ; then 
		makeLayout $1 $2 "Arrow" "Bar"
		makeLayout $1 $2 "Arrow" "NoBar"
		makeLayout $1 $2 "NoArrow" "Bar"
	elif [ $northarrow == "n" ] && [ $scalebar == "y" ] ; then
		makeLayout $1 $2 "NoArrow" "Bar"
	elif [ $northarrow == "y" ] && [ $scalebar == "n" ] ; then
		makeLayout $1 $2 "Arrow" "NoBar"
	fi
	makeLayout $1 $2 "NoArrow" "NoBar"
}

while [ $maxsize -le $minsize ]
do
	echo "-- Making layot for A$maxsize --"
	
	# Portrait or and landscape
	if [ $landscape == "y" ] ; then 
		arrowBar $maxsize "Portrait"
		arrowBar $maxsize "Landscape"
	else
		arrowBar $maxsize "Portrait"
	fi
	
	maxsize=$(( $maxsize + 1 ))
done

echo
echo "Checking file $config_file..."
if [ -f $config_file ];  then
    echo "[x] Exists and is a regular file."
else
	echo "ERROR: $config_file don't exist!"
fi
if [ -s $config_file ];  then
    echo "[x] Has a size greater than zero."
else
	echo "ERROR: $config_file has a zero size!"
fi
echo
echo "...done."
