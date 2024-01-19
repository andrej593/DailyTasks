const Months = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31
}
type TMonth = keyof typeof Months;
export const AMonths = Object.keys(Months) as TMonth[];

const Days = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
}
type TDay = keyof typeof Days;
export const ADays = Object.keys(Days) as TDay[];

class Day {
    day: TDay;
    dayInMonth: number;
    month: TMonth;
    year: number;
    constructor(day: TDay, dayInMonth: number, month: TMonth, year: number) {
        this.day = day;
        this.dayInMonth = dayInMonth;
        this.month = month;
        this.year = year;
    }
    getDate(){
        return `${this.day} ${this.dayInMonth}.${this.month}.${this.year}`;
    }
}

class Month {
    year: number;
    name: TMonth;
    days: Day[];
    blanksStart: number;
    blanksEnd: number;
    constructor(month: TMonth, firstDay: number, year: number) {
        this.year = year;
        this.name = month;
        this.days = [] as Day[];
        this.blanksStart = (firstDay + 6) % 7; //num of filler days so always starts on monday
        for (let i = 0; i < Months[this.name]; i++) {
            this.days.push(new Day(ADays[(firstDay++) % 7], i+1, month, year));
        }
        this.blanksEnd = (7 - (firstDay - 1) % 7) % 7;  //num of fillers so always end on sunday -> second %7 for -1 length
    }
    logMonth() {
        console.log(this.name + "\n");
        for (var index in this.days) {
            console.log(this.days[index].getDate());
        }
        return "Month " + this.name + " End\n";
    }
}

class Year {
    yearNumber: number;
    leapYear: boolean;
    months: Month[];
    constructor(year: number) {
        this.yearNumber = year;
        //leapYear
        this.leapYear = ((this.yearNumber % 400 === 0) ? true : ((this.yearNumber % 100 === 0) ? false : ((this.yearNumber % 4 === 0) ? true : false))) ? true : false;
        Months["February"] = this.leapYear ? 29 : 28;

        let firstDay = new Date(year, 0, 1).getDay();
        this.months = [] as Month[];
        for (let i = 0; i < 12; i++) {
            this.months.push(new Month(AMonths[i], firstDay, year));
            firstDay = (firstDay + Months[AMonths[i]]) % 7;
        }
    }
    getMonth(month:TMonth){
        for(let monthObj of this.months)
        if(monthObj.name === month){
            return monthObj;
        }
        return new Month("January",1,1);    //dont like this code   
    }
    logYear() {
        console.log(this.yearNumber + "\n");
        console.log(this.leapYear + "\n");
        for (var month of this.months) {
            console.log("Month:"+month.logMonth() + 'LOGEND\n');
        }
    }
}

export class Calander {
    year: Year;
    timeNow: Date;
    constructor(year?:number) {
        if(year !== undefined){
            this.year = new Year(year);
        }else{
            this.year = new Year(new Date().getFullYear());
        }
       
        this.timeNow = new Date();
    }
}

