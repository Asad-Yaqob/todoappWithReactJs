import { v4 } from 'uuid';

class TodoModel {

  constructor({id = v4(), todo, deadline,}) {
   this.id = id;
   this.todo = todo;
   this.deadline = deadline;
  }
}

export default TodoModel;