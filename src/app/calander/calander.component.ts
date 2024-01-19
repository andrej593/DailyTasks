import { Component } from '@angular/core';
import { Calander, AMonths } from '../classes/calander/calander';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../material/material.module';

@Component({
  selector: 'app-calander',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './calander.component.html',
  styleUrl: './calander.component.css'
})

export class CalanderComponent {
  states = {
    YEAR : 0,
    MONTH : 1,
    WEEK : 2,
    DAY : 3
  }
  
  state = this.states.YEAR;
  year = new Date().getFullYear();
  calander = new Calander();
  month = this.calander.year.getMonth("January");

  Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  nextYear() {
    this.year = this.year + 1;
    this.calander = new Calander(this.year);
  }
  prevYear() {
    this.year = this.year - 1;
    this.calander = new Calander(this.year);
  }
  nextMonth(){
    /*let nextMonth= 
    this.month = */
  }
  prevMonth(){

  }
  arrayOfLength(len: number) {
    return new Array(len);
  }
  getToday() {
    if (this.calander.year.yearNumber === this.calander.timeNow.getFullYear()) {
      return AMonths[this.calander.timeNow.getMonth()] + this.calander.timeNow.getDate();
    }
    return '';
  }
  getMonth(month:any){
    this.month = this.calander.year.getMonth(month);
    this.changeState(this.states.MONTH);
    console.log(this.state);
    console.log(this.month.logMonth());
  }
  changeState(state:number){
    this.state = state;
  }
}