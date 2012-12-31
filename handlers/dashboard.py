from tornado.web import asynchronous
from tornado.web import RequestHandler
import simplejson as json


class DashboardHandler(RequestHandler):

    @asynchronous
    def get(self):
        user = self.get_secure_cookie("bwitter")
        user = json.loads(user)

        select_user_id = """SELECT `user_id` FROM `User` WHERE `user_name` = "%s" """\
        % (user["user_name"])

        user = self.application.db.get(select_user_id)

        get_groups = """SELECT `group_id` FROM `Members` WHERE `user_id` = "%s" """\
        % (user["user_id"])

        results = self.application.db.query(get_groups)

        group_names = []
        for result in results:
            get_group_names = """SELECT `group_name` FROM `Group` WHERE `group_id` = "%s" """\
            % (result["group_id"])
            blah = self.application.db.get(get_group_names)
            group_names.append(blah["group_name"])

        user["groups"] = group_names
        self.set_header("Content-Type", "application/json")
        self.write(json.dumps(user))
        self.finish()


class CreateGroupHandler(RequestHandler):

    @asynchronous
    def post(self):
        data = json.loads(self.request.body)
        user_name = json.loads(self.get_secure_cookie("bwitter"))

        select_user_id = """SELECT `user_id` FROM `User` WHERE `user_name` = "%s" """\
        % (user_name["user_name"])

        user = self.application.db.get(select_user_id)

        select_group_name = """SELECT `group_name` FROM `Group` WHERE `group_name` = "%s" """\
        % (data["group_name"])

        result = self.application.db.get(select_group_name)

        if result is None:
            add_group_info = """INSERT INTO `Group` (`user_id`, `group_name`) VALUES ("%s", "%s")"""\
            % (user["user_id"], data["group_name"])
            self.application.db.execute(add_group_info)

            select_group_id = """SELECT `group_id` FROM `Group` WHERE `group_name` = "%s" """\
            % (data["group_name"])

            result = self.application.db.get(select_group_id)

            add_member_info = """INSERT INTO `Members` (`user_id`, `group_id`) VALUES ("%s", "%s")"""\
            % (user["user_id"], result["group_id"])

            self.application.db.execute(add_member_info)

            self.write({"success": "true", "group_name": data["group_name"]})
            self.finish()
            return
        else:
            self.write({"success": "group-exists"})
            self.finish()
            return
