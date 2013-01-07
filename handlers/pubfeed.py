from tornado.web import asynchronous
from tornado.web import RequestHandler
import simplejson as json


class PubfeedHandler(RequestHandler):

    @asynchronous
    def get(self):
        results = """SELECT `user_id`, `user_name`, `content`, `posted_at` FROM `Pubfeed` """
        bweets = self.application.db.query(results)
        self.set_header("Content-Type", "application/json")
        self.write(json.dumps(bweets))
        self.finish()

    @asynchronous
    def post(self):
        msg = json.loads(self.request.body)
        content = msg["content"]
        cookie = json.loads(self.get_secure_cookie("bwitter"))
        user_name = cookie["user_name"]
        time_stamp = msg["timestamp"]

        get_user_id = """SELECT `user_id` FROM `User` WHERE `user_name` = "%s" """\
        % (user_name)

        user_id = self.application.db.get(get_user_id)

        user_id = user_id["user_id"]

        add_msg = """INSERT INTO `Pubfeed` (`user_id`, `user_name`,`posted_at`, `content`) VALUES ("%s", "%s","%s", "%s") """\
        % (user_id, user_name, time_stamp, content)
        self.application.db.execute(add_msg)
        self.write({"success": "true"})
        self.finish()
