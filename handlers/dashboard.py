from tornado.web import asynchronous
from tornado.web import RequestHandler
import simplejson as json


class DashboardHandler(RequestHandler):

    @asynchronous
    def get(self):
        user = json.loads(self.get_secure_cookie("bwitter"))
        self.set_header("Content-Type", "application/json")
        self.write(json.dumps(user))
        self.finish()
