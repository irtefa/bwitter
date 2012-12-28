import os
import sys
import tornado.ioloop
import tornado.database
import tornado.web
import tornado.httpserver
from tornado.options import options, define
from handlers.pages import *

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
            tornado.web.URLSpec(r'/', IndexPageHandler)
            # API HANDLER
        ]
        current_dir = os.path.dirname(__file__)

        settings = dict(
                        template_path=os.path.join(current_dir, 'templates'),
                        static_path=os.path.join(current_dir, 'static')
        )

        super(Application, self).__init__(handlers, **settings)

if __name__ == "__main__":
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
