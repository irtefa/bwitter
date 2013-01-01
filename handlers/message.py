from tornado.web import RequestHandler
from tornado.web import asynchronous
import simplejson as json


class MessageHandler(RequestHandler):

    @asynchronous
    def get(self, id):
        results = """SELECT `content`, `user_id`,`posted_at` FROM `Bweet` WHERE `group_id` = "%s" """\
        % (id)
        bweets = self.application.db.get(results)
        self.write(json.dumps(bweets))
        self.finish()

    def post(self):
        msg = json.loads(self.request.body)
        content = msg["content"]
        cookie = json.loads(self.get_secure_cookie("bwitter"))
        user_name = cookie["user_name"]
        group_id = msg["group_id"]
        time_stamp = msg["timestamp"]

        get_user_id = """SELECT `user_id` FROM `User` WHERE `user_name` = "%s" """\
        % (user_name)

        user_id = self.application.db.get(get_user_id)

        user_id = user_id["user_id"]

        add_msg = """INSERT INTO `Bweet` (`user_id`, `group_id`,`posted_at`, `content`, `user_name`) VALUES ("%s", "%s","%s", "%s", "%s") """\
        % (user_id, group_id, time_stamp, content, user_name)
        self.application.db.execute(add_msg)
        self.write({"success": "true"})
        self.finish()
