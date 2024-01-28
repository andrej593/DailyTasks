import { Component, Input } from '@angular/core';
import { ITask, taskStatus} from '../../interfaces/task';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  status = taskStatus;
  @Input() task: ITask;

}
