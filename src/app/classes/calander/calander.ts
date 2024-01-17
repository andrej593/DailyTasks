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
    Oktober: 31,
    November: 30,
    December: 31
}
type TMonth = keyof typeof Months;
const AMonths = Object.keys(Months) as TMonth[];

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
const ADays = Object.keys(Days) as TDay[];

class Month {
    name: TMonth;
    days: TDay[];
    constructor(name: TMonth, startDay: number) {
        this.name = name;
        this.days = [] as TDay[];
        for (let i = 0; i < Months[this.name]; i++) {
            this.days.push(ADays[(startDay++) % 7]);
        }
    }
    logMonth() {
        console.log(this.name + "\n");
        for (var index in this.days) {
            console.log(this.days[index] + ', ' + index)+' ';
        }
        return "Month "+this.name+" End\n";
    }
}

class Year {
    year: number;
    leapYear: boolean;
    months: Month[];
    constructor(year: number) {
        this.year = year;
        //leapYear
        this.leapYear = ((this.year % 400 === 0) ? true : ((this.year % 100 === 0) ? false : ((this.year % 4 === 0) ? true : false))) ? true : false;
        Months["February"] = this.leapYear ? 29 : 28;

        let firstDay = new Date(year, 0, 1).getDay();
        this.months = [] as Month[];
        for (let i = 0; i < 12; i++) {
            this.months.push(new Month(AMonths[i], firstDay));
            firstDay+=Months[AMonths[i]];
        }
    }
    logYear() {
        console.log(this.year + "\n");
        console.log(this.leapYear + "\n");
        for (var month of this.months) {
            console.log(month.logMonth()+'\n');
        }
    }
}

export class Calander {
    year: Year;
    constructor(year: number) {
        this.year = new Year(year);
    }
}

