from tornado.web import RequestHandler


class IndexPageHandler(RequestHandler):

    def get(self):
        self.render('index.html')
