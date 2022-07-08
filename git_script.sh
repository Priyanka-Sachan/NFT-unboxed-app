#!/bin/bash
# Script to push commit with different author and commit date
# For uasge
# sudo chmod u+rx git_script.sh
# ./git_script <commit message> <date(YYYY-MM-DD)>

# If arguement is not given
if [ $# -eq 0 ]
then
    echo "Error: Input not provided."
else

    # commit message
    message=$1
    # New date
    newDate=$2
  
	CURRENT_TIME=`date +"%T"`
	GIT_DATE=$(date -d "$newDate $CURRENT_TIME" +"%a %b %d %T %Y %z")
	
    GIT_AUTHOR_DATE="$GIT_DATE" GIT_COMMITTER_DATE="$GIT_DATE" git commit -m "$message";
fi