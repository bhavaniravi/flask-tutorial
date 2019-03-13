from models import ToDoModel


class ToDoService:
    def __init__(self):
        self.model = ToDoModel()

    def create(self, params):
        self.model.create(params["text"], params["Description"])

    def update(self, item_id, params):
        self.model.update(item_id, params)

    def delete(self, item_id):
        self.model.delete(item_id)

    def list(self):
        self.model.list(user_id=user_id)
