import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { MaterialsModule } from '../../material/material.module';
import { Calander, AMonths, ADaysM, States } from '../calander';
import { TaskService } from '../../services/task/task.service';
import { taskStatus } from '../../interfaces/task';
@Component({
  selector: 'app-month',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './month.component.html',
  styleUrl: './month.component.css'
})
export class MonthComponent {
  taskService = inject(TaskService);
  states = States;
  days = ADaysM;
  months = AMonths;

  @Input() calander: Calander;
  @Output() stateChanged = new EventEmitter<number>();

  tasksNum: number = 0;
  tasksCompleted: number = 0;

  thisMonthRange: string;

  ngOnInit() {
    this.thisMonthRange = this.calander.currentMonth.getMonthQueryString();
    this.getMonthlyTasks();
    this.getMonthlyCompletedTasks();
    for (let week of this.calander.currentMonth.weeks) {
      for (let day of week.days) {
        this.taskService.getTasksNum(undefined, day.getDayRange()).subscribe({
          next: res => { day.tasksNum = res.num; console.log(day.getDate()+' TasksNum:'+day.tasksNum); },
          error: err => { console.log(err); day.tasksNum = 0; }
        });
        this.taskService.getTasksNum(taskStatus.completed, day.getDayRange()).subscribe({
          next: res => { day.tasksCompleted = res.num; console.log(day.getDate()+' TasksCompleted:'+day.tasksNum); },
          error: err => { console.log(err); day.tasksCompleted = 0; }
        });
      }
    }
  }
  updateTasks() {
    this.thisMonthRange = this.calander.currentMonth.getMonthQueryString();
    this.getMonthlyTasks();
    this.getMonthlyCompletedTasks();
  }
  getMonthlyTasks() {
    this.taskService.getTasksNum(undefined, this.thisMonthRange).subscribe({
      next: res => { this.tasksNum = res.num; console.log("MonthlyTasks:" + this.tasksNum); },
      error: err => { console.log(err); this.tasksNum = 0; }
    });
  }
  getMonthlyCompletedTasks() {
    this.taskService.getTasksNum(taskStatus.completed, this.thisMonthRange).subscribe({
      next: res => { this.tasksCompleted = res.num; console.log("MonthlyCompleted:" + this.tasksCompleted); },
      error: err => { console.log(err); this.tasksCompleted = 0; }
    });
  }
  arrayOfLength(len: number) {
    return new Array(len);
  }
}
