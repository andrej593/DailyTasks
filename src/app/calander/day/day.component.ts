import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { States, ADaysM, AMonths, Calander } from '../calander';
import { MaterialsModule } from '../../material/material.module';
import { TaskService } from '../../services/task/task.service';
import { ITask } from '../../interfaces/task';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [CommonModule, MaterialsModule, TaskComponent],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent implements OnInit {
  taskService = inject(TaskService);

  @Input() calander: Calander;
  @Input() state: number;
  @Output() stateChanged = new EventEmitter<number>();

  states = States;
  days = ADaysM;
  months = AMonths;

  ngOnInit() {
  }

  arrayOfLength(len: number) {
    return new Array(len);
  }
}
