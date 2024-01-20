import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter} from '@angular/core';
import { MaterialsModule } from '../../material/material.module';
import { ADays2, States, AMonths, Week} from '../calander';
import { Month } from '../calander';

@Component({
  selector: 'app-month',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './month.component.html',
  styleUrl: './month.component.css'
})
export class MonthComponent {
  states = States;
  days = ADays2;
  months = AMonths;

  @Output() emitState = new EventEmitter<number>();
  @Output() emitWeek = new EventEmitter<Week>();
  @Output() emitNextMonth = new EventEmitter();
  @Output() emitPrevMonth = new EventEmitter();
  @Input() month: Month;
  @Input() today: string;


  arrayOfLength(len: number) {
    return new Array(len);
  }
}
