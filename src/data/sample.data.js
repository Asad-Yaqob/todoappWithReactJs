import TodoModel from '../models/todo.model.js'

const sampleTodos = [
    new TodoModel({todo: 'Buy groceries', deadline: new Date('2023-01-15')}),
    new TodoModel({todo: 'Clean the house', deadline : new Date('2023-01-10')}),
    new TodoModel({todo: 'Study for exams', deadline: new Date('2023-01-12')}),
];

export default sampleTodos;