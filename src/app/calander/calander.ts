import { ITask } from "../interfaces/task";
const States = {
    YEAR: 0,
    MONTH: 1,
    WEEK: 2,
    DAY: 3
}
const ADaysM = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const Months = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
}
const AMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function prefixZero(num: number) {
    if (num <= 9) {
        return '0' + num;
    }
    return num;
}

class Day {
    notInThisMonth: boolean;    //for when week or month does not start on monday or end on sunday
    date: Date;

    tasks:ITask[];
    tasksNum:number;
    tasksCompleted:number;
    
    constructor(year: number, month: number, day: number, blank: boolean) {
        this.notInThisMonth = blank;
        this.date = new Date(year, month, day);
    }
    getDate() {
        return `${this.date.getDate()}.${this.date.getMonth() + 1}.${this.date.getFullYear()}`;
    }
    getDayRange() {
        return `${this.date.getFullYear()}-${prefixZero(this.date.getMonth()+1)}-${prefixZero(this.date.getDate())},`
                +`${this.date.getFullYear()}-${prefixZero(this.date.getMonth()+1)}-${prefixZero(this.date.getDate())}T23:59:59`;
    }
}

class Week {
    days: Day[];
    constructor() {
        this.days = [] as Day[];
    }
    getDay(dayInMonth: number) {
        for (let i = 0; i < this.days.length; i++) {
            if (this.days[i].date.getDate() == dayInMonth) return this.days[i];
        }
        return this.days[0];    //should never happen
    }
    fromTo() {
        return 'from ' + this.days[0].getDate() + ' to ' + this.days[6].getDate();
    }
}


class Month {
    year: number;
    monthName: string;
    month: number;
    daysInMonth: number;
    firstDay: Day;  //Which day of the week month starts
    weeks: Week[];
    constructor(year: number, month: number, firstDay: number) {
        this.firstDay = new Day(year, month, 1, false);
        this.year = year;
        this.month = month + 1;
        this.daysInMonth = Months[month];
        this.monthName = AMonths[month];
        this.weeks = [] as Week[];
        let tmpWeek = new Week();
        if ((firstDay) !== 1) { //not start on monday
            let prevMonth: number;   //previus Month
            let startYear = year;       //startYear
            if (month !== 0) {  //if not january
                prevMonth = month - 1;    //only go 1 month back
            } else {    //if january
                prevMonth = 11;   //go 1 year back,last month
                startYear--;
            }
            let start = Months[prevMonth] - ((firstDay + 6) % 7) + 1;  //number of days in prev month - where we start counting blank days at
            for (let i = 0; i < ((firstDay + 6) % 7); i++) {
                tmpWeek.days.push(new Day(startYear, prevMonth, start++, true));
            }
        }
        for (let i = 0; i < Months[month]; i++) {
            tmpWeek.days.push(new Day(year, month, i + 1, false));
            if ((firstDay % 7) === 0) { //week full
                this.weeks.push(tmpWeek);
                tmpWeek = new Week();
            }
            firstDay++;
        }
        if (((firstDay - 1) % 7) !== 0) {   //didnt end on sunday
            let nextMonth: number;   //next Month
            let startYear = year;       //start Year
            if (this.monthName !== "December") {
                nextMonth = month + 1;    //go 1 month forward
            } else {
                nextMonth = 0;   //go 1 year forward,first month
                startYear++;
            }
            for (let i = 0; i < ((7 - (firstDay - 1) % 7) % 7); i++) {
                tmpWeek.days.push(new Day(startYear, nextMonth, i + 1, true));
            }
            this.weeks.push(tmpWeek);
        }
    }
    getWeek(dayInMonth: number) {
        for (let i = 0; i < this.weeks.length; i++) {
            for (let j = 0; j < this.weeks[i].days.length; j++) {
                if (this.weeks[i].days[j].date.getDate() == dayInMonth) {
                    return this.weeks[i];
                }
            }
        }
        return this.weeks[0];   //should never come to this
    }
    getMonthQueryString() {
        return `${this.year}-${prefixZero(this.month)}-01,${this.year}-${prefixZero(this.month)}-${this.daysInMonth}T23:59:59`;
    }
}

function isLeapYear(year: number) {
    return ((year % 400 === 0) ? true : ((year % 100 === 0) ? false : ((year % 4 === 0) ? true : false))) ? true : false;
}

class Year {
    yearNumber: number;
    leapYear: boolean;
    months: Month[];
    constructor(year: number) {
        this.yearNumber = year;
        //leapYear
        this.leapYear = isLeapYear(year);
        Months[1] = this.leapYear ? 29 : 28;

        let firstDay = new Date(year, 0, 1).getDay();   //to get which day of the week to start on
        this.months = [] as Month[];
        for (let month = 0; month < 12; month++) {
            this.months.push(new Month(year, month, firstDay));
            firstDay = (firstDay + Months[month]) % 7; //calculate what day of the week is for next month
        }
        //this.logYear();
    }
    getMonth(month: number) {
        for (let monthObj of this.months) {
            if (monthObj.monthName === AMonths[month]) {
                return monthObj;
            }
        }
        return new Month(0, 1, 2024);    //dont like this code, should always find month
    }
    logYear(){
        for(let month of this.months){
            console.log("Month:"+month.monthName);
            for(let week of month.weeks){
                console.log("Week:"+week.fromTo());
                for(let day of week.days){
                    console.log("Day:"+day.getDate());
                }
            }
        }
    }
}

class Calander {
    currentYear: Year;
    currentMonth: Month;
    currentWeek: Week;
    currentDay: Day;
    today: Date;
    constructor(year?: number) {
        this.today = new Date();
        if (year !== undefined) {   // first day first week first month of chosen year
            this.currentYear = new Year(year);
            this.currentMonth = this.currentYear.months[0];
            this.currentWeek = this.currentMonth.weeks[0];
            this.currentDay = this.currentWeek.days[0];
        } else {    //default sets for Date now 
            this.currentYear = new Year(this.today.getFullYear());
            this.currentMonth = this.currentYear.getMonth(this.today.getMonth());
            this.currentWeek = this.currentMonth.getWeek(this.today.getDate());
            this.currentDay = this.currentWeek.getDay(this.today.getDate());
        }
    }
    prevYear() {
        this.currentYear = new Year(this.currentYear.yearNumber - 1);
        this.currentMonth = this.currentYear.months[this.currentYear.months.length - 1]; //change month to match year
        this.currentWeek = this.currentMonth.weeks[this.currentMonth.weeks.length - 1];  //change week to match month
        this.currentDay = this.currentWeek.days[6];                                      //change day to match week
    }
    nextYear() {
        this.currentYear = new Year(this.currentYear.yearNumber + 1);
        this.currentMonth = this.currentYear.months[0]; //change month to match year
        this.currentWeek = this.currentMonth.weeks[0];  //change week to match month
        this.currentDay = this.currentWeek.days[0];     //change day to match week
    }
    prevMonth() {
        if (this.currentMonth.monthName === "January") {
            this.prevYear();
            this.currentMonth = this.currentYear.getMonth(11);
        } else {
            this.currentMonth = this.currentYear.getMonth(AMonths.indexOf(this.currentMonth.monthName) - 1);
        }
        this.currentWeek = this.currentMonth.weeks[this.currentMonth.weeks.length - 1];  //change week to match month
        this.currentDay = this.currentWeek.days[6];                                      //change day to match week
    }
    nextMonth() {
        if (this.currentMonth.monthName === "December") {
            this.nextYear();
            this.currentMonth = this.currentYear.getMonth(0);
        } else {
            this.currentMonth = this.currentYear.getMonth(AMonths.indexOf(this.currentMonth.monthName) + 1);
        }
        this.currentWeek = this.currentMonth.weeks[0];  //change week to match month
        this.currentDay = this.currentWeek.days[0];     //change day to match week
    }
    prevWeek() {
        if (this.currentMonth.weeks[0] === this.currentWeek) {
            this.prevMonth();
            this.currentWeek = this.currentMonth.weeks[this.currentMonth.weeks.length - 1];
        } else {
            this.currentWeek = this.currentMonth.weeks[this.currentMonth.weeks.indexOf(this.currentWeek) - 1];
        }
        this.currentDay = this.currentWeek.days[6]; //change day to match week
    }
    nextWeek() {
        if (this.currentMonth.weeks[this.currentMonth.weeks.length - 1] === this.currentWeek) {
            this.nextMonth();
            this.currentWeek = this.currentMonth.weeks[0];
        } else {
            this.currentWeek = this.currentMonth.weeks[this.currentMonth.weeks.indexOf(this.currentWeek) + 1];
        }
        this.currentDay = this.currentWeek.days[0]; //change day to match week
    }
    prevDay() {
        if (this.currentWeek.days[0] === this.currentDay) {
            this.prevWeek();
            if (this.currentDay.notInThisMonth) this.prevWeek();
            this.currentDay = this.currentWeek.days[6];
        } else {
            this.currentDay = this.currentWeek.days[this.currentWeek.days.indexOf(this.currentDay) - 1];
        }
    }
    nextDay() {
        if (this.currentWeek.days[6] == this.currentDay) {
            this.nextWeek();
            if (this.currentDay.notInThisMonth) this.nextWeek();
            this.currentDay = this.currentWeek.days[0];
        } else {
            this.currentDay = this.currentWeek.days[this.currentWeek.days.indexOf(this.currentDay) + 1];
        }
    }
    getToday() {
        return this.today.getDate() + "." + (this.today.getMonth() + 1) + "." + this.today.getFullYear();
    }
    setMonth(month: Month) {
        this.currentMonth = month;
        this.currentWeek = this.currentMonth.weeks[0];
        this.currentDay = this.currentWeek.days[0];
    }
    setWeek(week: Week) {
        this.currentWeek = week;
        this.currentDay = this.currentWeek.days[0];
    }
    setDay(day: Day) {
        this.currentDay = day;
    }
}

export { Calander, Month, Week, Day, AMonths, ADaysM, States }

