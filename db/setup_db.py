# A script to clean and setup the tables in the database

from tornado.database import Connection
import sys


def get_db_credentials():
    prompt = """\

Please enter the following information to connect to the database.

    """
    print prompt
    host = raw_input("'host': ")
    db = raw_input("'database name': ")
    user = raw_input("'username': ")
    password = raw_input("'password': ")
    return (host, db, user, password)


def print_connection_prompt(host, database, user):
    prompt = """\

The script will now try to connect to...
    database:   '%s'
    on host:    '%s'
    using user: '%s'

""" % (database, host, user)
    print prompt

host, db, user, password = get_db_credentials()
print_connection_prompt(db, host, user)
sure = raw_input('Are you sure? (yes/no) ')
if sure in ('yes', 'Yes', 'y', 'Y'):
    db = Connection(host=host, database=db, user=user, password=password)
else:
    print "Operation aborted."
    sys.exit(1)

# Create User table
cmd = """\
CREATE TABLE `User` (\
  `user_id` INT NOT NULL AUTO_INCREMENT,\
  `user_name` VARCHAR(100) NOT NULL DEFAULT 'NULL',\
  `user_email` VARCHAR(50) NULL DEFAULT NULL,\
  `first_name` VARCHAR(100) NOT NULL DEFAULT 'NULL',\
  `last_name` VARCHAR(100) NOT NULL DEFAULT 'NULL',\
  `password` VARCHAR(1000) NOT NULL DEFAULT 'NULL',\
  PRIMARY KEY (`user_id`)
);\
"""
db.execute(cmd)

# Create Group table
cmd = """\
CREATE TABLE `Group` (\
  `group_id` INT NOT NULL AUTO_INCREMENT,\
  `user_id` INT NOT NULL,\
  `group_name` VARCHAR(1000) NOT NULL,\
  PRIMARY KEY (`group_id`),\
  FOREIGN KEY (user_id) REFERENCES `User` (`user_id`)\
);\
"""
db.execute(cmd)

# Create Bweet table
cmd = """\
CREATE TABLE `Bweet` (\
  `bweet_id` INT NOT NULL AUTO_INCREMENT,\
  `user_id` INT NOT NULL,\
  `group_id` INT NOT NULL,\
  `posted_at` VARCHAR(50) NOT NULL DEFAULT 'NULL',\
  `content` VARCHAR(1000) NOT NULL,\
  PRIMARY KEY (`bweet_id`),\
  FOREIGN KEY (user_id) REFERENCES `User` (`user_id`),\
  FOREIGN KEY (group_id) REFERENCES `Group` (`group_id`)\
);\
"""
db.execute(cmd)

# Create Members table
cmd = """\
CREATE TABLE `Members` (\
  `member_id` INT NOT NULL AUTO_INCREMENT,\
  `user_id` INT NOT NULL,\
  `group_id` INT NOT NULL,\
  PRIMARY KEY (`member_id`),\
  FOREIGN KEY (user_id) REFERENCES `User` (`user_id`),\
  FOREIGN KEY (group_id) REFERENCES `Group` (`group_id`)\
);\
"""
db.execute(cmd)

db.close()

print "Database setup complete.\n"
