# Bwitter
A social network for close friends.

Created by Mohd Irtefa and Mohd Irteza

## Installation:
To install and run this application follow the steps below:

###Create Virtual Environment
If you haven't done so already, create a virtualenv for the project using:

  mkvirtualenv bwitter

###Activate the Virtual Environment
Whenever you want to work on the project, before beginning work, run:

  workon bwitter

###Start MySQL server locally
If you haven't started mysql server locally use the following command:

  mysql

###Setup local database for bwitter
On a different tab, type the following command in your terminal and when prompted for host, database, user and password type the following:

  python db/setup_db.py
  localhost:3306
  bwitter
  root
  "" (empty, just press enter)

###Contribution to the Project
Whenever you are working on a new feature, after checking out master, create your own branch. After you are done working commit to the main repository to that branch, but not the master branch. Your code will be merged with the master after code review.


