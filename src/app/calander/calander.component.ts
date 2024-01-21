import { Component } from '@angular/core';
import { Calander, AMonths, States, ADays2, Months} from '../calander/calander';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../material/material.module';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';

@Component({
  selector: 'app-calander',
  standalone: true,
  imports: [CommonModule, MaterialsModule, MonthComponent, WeekComponent],
  templateUrl: './calander.component.html',
  styleUrl: './calander.component.css'
})

export class CalanderComponent {
  states = States;
  days = ADays2;
  calander = new Calander();

  state = this.states.YEAR;
  year = new Date().getFullYear();
  month = this.calander.year.getMonth("January");
  week = this.month.weeks[0];

  prevYear() {
    this.year = this.year - 1;
    this.calander = new Calander(this.year);
  }
  nextYear() {
    this.year = this.year + 1;
    this.calander = new Calander(this.year);
  }
  prevMonth() {
    console.log("PrevM");
    if(this.month.name === "January"){
      this.year = this.year - 1;
      this.calander = new Calander(this.year);
      this.month = this.calander.year.getMonth("December");
    }else{
      this.month =this.calander.year.getMonth(AMonths[AMonths.indexOf(this.month.name)-1]);
    }

  }
  nextMonth() {
    console.log("NextM");
    if(this.month.name === "December"){
      this.year = this.year + 1;
      this.calander = new Calander(this.year);
      this.month = this.calander.year.getMonth("January");
    }else{
      this.month =this.calander.year.getMonth(AMonths[AMonths.indexOf(this.month.name)+1]);
    }
  }
  prevWeek(){
    //first week of month
    if(this.month.weeks[0] === this.week){
      //first month for year
      if(this.month.name === "January"){
        this.year = this.year - 1;
        this.calander = new Calander(this.year);
        this.month = this.calander.year.getMonth("December");
        this.week = this.month.weeks[this.month.weeks.length-1];
      }else{
        this.month = this.calander.year.getMonth(AMonths[AMonths.indexOf(this.month.name)-1]);
        this.week = this.month.weeks[this.month.weeks.length-1];
      }
    }else{
      this.week = this.month.weeks[this.month.weeks.indexOf(this.week)-1];
    }
  }
  nextWeek(){
        //last week of month
        if(this.month.weeks[this.month.weeks.length-1] === this.week){
          //first month for year
          if(this.month.name === "December"){
            this.year = this.year + 1;
            this.calander = new Calander(this.year);
            this.month = this.calander.year.getMonth("January");
            this.week = this.month.weeks[0];
          }else{
            this.month = this.calander.year.getMonth(AMonths[AMonths.indexOf(this.month.name)+1]);
            this.week = this.month.weeks[0];
          }
        }else{
          this.week = this.month.weeks[this.month.weeks.indexOf(this.week)+1];
        }
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
  getMonth(month: any) {
    this.month = this.calander.year.getMonth(month);
    this.state = this.states.MONTH;
  }
}