import sqlite3


class Schema:
    def __init__(self):
        self.conn = sqlite3.connect('todo.db')
        self.create_user_table()
        self.create_to_do_table()

    def __del__(self):
        # body of destructor
        self.conn.commit()
        self.conn.close()

    def create_to_do_table(self):

        query = """
        CREATE TABLE IF NOT EXISTS Todo (
          id INTEGER PRIMARY KEY,
          text TEXT,
          _is_done boolean,
          _is_deleted boolean,
          CreatedOn Date DEFAULT GETDATE()
          DueDate Date 
          UserId INTEGER FOREIGN KEY REFERENCES User(_id)
        );
        """

        self.conn.execute(query)

    def create_user_table(self):
        query = """
        CREATE TABLE IF NOT EXISTS User (
          _id INTEGER PRIMARY KEY,
          Name TEXT,
          Email VARCHAR(320),
          CreatedOn Date DEFAULT GETDATE()
        );
        """
        self.conn.execute(query)


class ToDoModel:
    TABLENAME = "Todo"

    def __init__(self):
        self.conn = sqlite3.connect('todo.db')

    def __del__(self):
        # body of destructor
        self.conn.commit()
        self.conn.close()

    def create(self, text, description, due_date, current_user):
        query = f'insert into {TABLENAME} ' \
                f'(Title, Description, DueDate, UserId) ' \
                f'values ({text},{description},{due_date},{current_user})'

        result = self.conn.execute(query)
        return result

    def delete(self, item_id):
        query = f"UPDATE {TABLENAME} " \
                f"SET _is_deleted = 1 " \
                f"WHERE _id = {item_id}"

        self.conn.execute(query)

    def update(self, item_id, update_dict):
        """
        column: value
        Title: new title
        """
        set_query = [f'{column} = {value}'
                     for column, value in update_dict.items()]

        query = f"UPDATE {TABLENAME} " \
                f"SET {set_query} " \
                f"WHERE _id = {item_id}"

        self.conn.execute(query)

    def list(self, user_id):
        query = f"SELECT (Title, Description, DueDate) " \
                f"from {TABLENAME} " \
                f"WHERE UserId = {user_id}"
        return self.conn.execute(query)


class User:
    TABLENAME = "User"

    def create(self, name, email):
        query = f'insert into {TABLENAME} ' \
                f'(Name, Email) ' \
                f'values ({name},{email})'
        result = self.conn.execute(query)
        return result

