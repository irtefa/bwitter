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
