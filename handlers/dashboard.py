from tornado.web import asynchronous
from tornado.web import RequestHandler
import simplejson as json


class DashboardHandler(RequestHandler):

    @asynchronous
    def get(self):
        user = self.get_secure_cookie("bwitter")
        user = json.loads(user)
        self.set_header("Content-Type", "application/json")
        self.write(json.dumps(user))
        self.finish()
