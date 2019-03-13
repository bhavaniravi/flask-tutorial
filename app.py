from flask import Flask, request
from service import ToDoService
app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/<name>")
def hello_name(name):
    return "Hello " + name


@app.route("/todo", method=["GET"])
def list_todo():
    return ToDoService().list_todo()


@app.route("/todo", method=["POST"])
def create_todo():
    return ToDoService().create_to(request.get_json())


@app.route("/todo/<item_id>", method=["PUT"])
def update_item(item_id):
    return ToDoService().update(item_id, request.get_json())


@app.route("/todo/<item_id>", method=["DELETE"])
def delete_item(item_id):
    return ToDoService().delete(item_id)



if __name__ == "__main__":
    app.run(debug=True)
