from tornado.web import asynchronous
from tornado.web import RequestHandler
import simplejson as json
from passlib.apps import custom_app_context as pwd_context


class SignupHandler(RequestHandler):

    @asynchronous
    def post(self):
        user = json.loads(self.request.body)
        print user
        pwd = user["pass_word"]
        hash = pwd_context.encrypt(pwd)

        select_user_name = """SELECT `user_name` FROM `User` WHERE `user_name` = "%s" """\
        % (user["user_name"])

        result = self.application.db.get(select_user_name)
        if result is not None:
            self.write({"success": "username"})
            self.finish()

        select_user_email = """SELECT `user_email` FROM `User` WHERE `user_email` = "%s" """\
        % (user["user_email"])

        result = self.application.db.get(select_user_email)
        if result is not None:
            self.write({"success": "useremail"})
            self.finish()

        add_user_info = """INSERT INTO `User` (`user_name`, `user_email`, `first_name`, `last_name`, `password`) VALUES ("%s", "%s", "%s","%s","%s")"""\
        % (user["user_name"], user["user_email"], user["first_name"], user["last_name"], hash)

        result = self.application.db.execute(add_user_info)

        self.write({"success": "true"})
        self.finish()
