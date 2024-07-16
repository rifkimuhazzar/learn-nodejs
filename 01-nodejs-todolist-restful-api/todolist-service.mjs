export class TodolistService {
  todolist = ["Luffy", "Zoro", "Nami"];

  getJsonTodolist() {
    return JSON.stringify({
      code: 200,
      status: "OK",
      data: this.todolist.map((value, index) => {
        return {
          id: index,
          todo: value,
        };
      }),
    });
  }

  getTodolist(req, res) {
    res.write(this.getJsonTodolist());
    res.end();
  }

  createTodo(req, res) {
    req.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      this.todolist.push(body.todo);

      res.write(this.getJsonTodolist());
      res.end();
    });
  }

  updateTodo(req, res) {
    req.addListener("data", (data) => {
      const body = JSON.parse(data.toString());

      if (this.todolist[body.id]) {
        this.todolist[body.id] = body.todo;
      }

      res.write(this.getJsonTodolist());
      res.end();
    });
  }

  deleteTodo(req, res) {
    req.addListener("data", (data) => {
      const body = JSON.parse(data.toString());

      if (this.todolist[body.id]) {
        this.todolist.splice(body.id, 1);
      }

      res.write(this.getJsonTodolist());
      res.end();
    });
  }
}
