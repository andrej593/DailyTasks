import { Component } from '@angular/core';
import { Calander, ADaysM, States } from '../calander/calander';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../material/material.module';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';
import { DayComponent } from './day/day.component';

@Component({
  selector: 'app-calander',
  standalone: true,
  imports: [CommonModule, MaterialsModule, MonthComponent, WeekComponent, DayComponent],
  templateUrl: './calander.component.html',
  styleUrl: './calander.component.css'
})

export class CalanderComponent {
  states = States;  //so i can swich in html between states
  days = ADaysM;  //so i can get day names

  calander = new Calander();
  today = new Date();
  state = this.states.YEAR;

  arrayOfLength(len: number) {
    return new Array(len);
  }
  isToday(str:string){
    return str == this.calander.getToday() ? true : false;
  }
}