import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo'
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  // to import services 
  // string intropolation
  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe( todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo){    
    // console.log('delete me...')
    // console.log(todo)
    // Delete todo-item from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Delete from server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo){
    // console.log("hello")
    // console.log(todo)
    this.todoService.addTodo(todo).subscribe(todoReturned =>{      
      todo.id = todoReturned.id;
      this.todos.push(todo);
      console.log(todo);
    });
    
  }
}
