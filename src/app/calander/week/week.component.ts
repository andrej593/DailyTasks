import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Week, States, ADays2 } from '../calander';
import { MaterialsModule } from '../../material/material.module';

@Component({
  selector: 'app-week',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './week.component.html',
  styleUrl: './week.component.css'
})
export class WeekComponent {
  states = States;
  days = ADays2;

  @Output() emitState = new EventEmitter<number>();
  @Output() emitNextWeek = new EventEmitter();
  @Output() emitPrevWeek = new EventEmitter();
  @Input() week: Week;

  arrayOfLength(len: number) {
    return new Array(len);
  }
}
