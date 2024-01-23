import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { States, ADaysM, AMonths, Calander } from '../calander';
import { MaterialsModule } from '../../material/material.module';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent {
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
