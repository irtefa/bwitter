from tornado.web import RequestHandler


class IndexPageHandler(RequestHandler):

    def get(self):
        if self.get_secure_cookie("bwitter") is not None:
            self.redirect('/dashboard')
            return
        self.render('index.html')


class SignupPageHandler(RequestHandler):

    def get(self):
        if self.get_secure_cookie("bwitter") is not None:
            self.redirect("dashboard")
            return
        self.render('signup.html')


class DashPageHandler(RequestHandler):

    def get(self):
        self.render('dashboard.html')
