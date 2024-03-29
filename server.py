import os
import sys
import tornado.ioloop
import tornado.database
import tornado.web
import tornado.httpserver
from tornado.options import options, define
from handlers.pages import *
from handlers.user import *
from handlers.dashboard import *
from handlers.message import *
from handlers.pubfeed import *

PORT = sys.argv[1]
HOST = sys.argv[2]
DB = sys.argv[3]
USER = sys.argv[4]
PASS = sys.argv[5]

define("port", default=PORT, help="run on the given port", type=int)


class Application(tornado.web.Application):
    """ THE MAIN APPLICATION CLASS FOR BWITER """

    def __init__(self):

        self.db = tornado.database.Connection(
            host=HOST, database=DB, user=USER, password=PASS
        )
        handlers = [
            # PAGE HANDLER
            tornado.web.URLSpec(r'/', IndexPageHandler),
            tornado.web.URLSpec(r'/signup', SignupPageHandler),
            tornado.web.URLSpec(r'/dashboard', DashPageHandler),
            # API HANDLER
            tornado.web.URLSpec(r'/api/signup', SignupHandler),
            tornado.web.URLSpec(r'/api/login', LoginHandler),
            tornado.web.URLSpec(r'/api/dashboard', DashboardHandler),
            tornado.web.URLSpec(r'/api/creategroup', CreateGroupHandler),
            tornado.web.URLSpec(r'/logout', LogoutHandler),
            tornado.web.URLSpec(r'/api/message', MessageHandler),
            tornado.web.URLSpec(r'/api/pubfeed', PubfeedHandler),
            tornado.web.URLSpec(r'/api/message/([0-9]+)', MessageHandler)
        ]
        current_dir = os.path.dirname(__file__)

        settings = dict(
                        template_path=os.path.join(current_dir, 'templates'),
                        static_path=os.path.join(current_dir, 'static'),
                        cookie_secret='947e5d1dc624bc99421bfc7e8ebad245'
        )

        super(Application, self).__init__(handlers, **settings)

if __name__ == "__main__":
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
