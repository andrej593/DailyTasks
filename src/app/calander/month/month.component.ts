import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter} from '@angular/core';
import { MaterialsModule } from '../../material/material.module';
import { Calander, AMonths, ADaysM, States } from '../calander';

@Component({
  selector: 'app-month',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './month.component.html',
  styleUrl: './month.component.css'
})
export class MonthComponent {
  states = States;
  days = ADaysM;
  months = AMonths;

  @Input() calander: Calander;
  @Input() state: number;
  @Output() stateChanged = new EventEmitter<number>();

  arrayOfLength(len: number) {
    return new Array(len);
  }
}
