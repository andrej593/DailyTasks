const States = {
    YEAR: 0,
    MONTH: 1,
    WEEK: 2,
    DAY: 3
}

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
const ADays2 = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

class Day {
    notInThisMonth: boolean;
    day: TDay;
    dayInMonth: number;
    month: TMonth;
    year: number;
    constructor(day: TDay, dayInMonth: number, month: TMonth, year: number, blank: boolean) {
        this.notInThisMonth = blank;
        this.day = day;
        this.dayInMonth = dayInMonth;
        this.month = month;
        this.year = year;
    }
    getDate() {
        return `${this.day}\n${this.dayInMonth}.${AMonths.indexOf(this.month)+1}.${this.year}`;
    }
}

class Week {
    days: Day[];
    constructor() {
        this.days = [] as Day[];
    }
}

class Month {
    year: number;
    name: TMonth;
    weeks: Week[];
    constructor(month: TMonth, firstDay: number, year: number) {
        this.year = year;
        this.name = month;
        this.weeks = [] as Week[];
        let tmpWeek = new Week();
        //if not start on monday
        if ((firstDay) !== 1) {
            let prevMonth: TMonth;   //previus Month
            let tyear = year;       //previous Year if January
            let tstart;             //dayInMonth start from prev Month
            if (this.name !== "January") {
                prevMonth = AMonths[AMonths.indexOf(this.name) - 1];    //only go 1 month back
            } else {
                prevMonth = "December";   //go 1 year back,last month
                tyear--;
            }
            tstart = Months[prevMonth] - ((firstDay + 6) % 7);  //number of days in prev month - where we start counting blank days at
            //fill blank days in week
            for (let j = 0; j < ((firstDay + 6) % 7); j++) {
                tmpWeek.days.push(new Day(ADays[j + 1], tstart + j + 1, prevMonth, tyear, true));
            }
        }
        for (let i = 0; i < Months[this.name]; i++) {
            tmpWeek.days.push(new Day(ADays[(firstDay) % 7], i + 1, month, year, false));
            //week full
            if ((firstDay % 7) === 0) {
                this.weeks.push(tmpWeek);
                tmpWeek = new Week();
            }
            firstDay++;
        }
        //last week not full yet
        if (((firstDay - 1) % 7) !== 0) {
            let nextMonth: TMonth;   //next Month
            let tyear = year;       //next Year if December
            if (this.name !== "December") {
                nextMonth = AMonths[AMonths.indexOf(this.name) + 1];    //only go 1 month forward
            } else {
                nextMonth = "January";   //go 1 year forward,first month
                tyear++;
            }
            //fill blank days in week
            for (let j = 0; j < ((7 - (firstDay - 1) % 7) % 7); j++) {
                tmpWeek.days.push(new Day(ADays[(firstDay + j) % 7], j + 1, nextMonth, tyear, true));
            }
            this.weeks.push(tmpWeek);
        }
    }
    logMonth() {
        console.log(this.name + "\n");
        for (var week of this.weeks) {
            for (let day of week.days) {
                console.log(day.getDate());
            }
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
    getMonth(month: TMonth) {
        for (let monthObj of this.months)
            if (monthObj.name === month) {
                return monthObj;
            }
        return new Month("January", 1, 1);    //dont like this code   
    }
    logYear() {
        console.log(this.yearNumber + "\n");
        console.log(this.leapYear + "\n");
        for (var month of this.months) {
            console.log("Month:" + month.logMonth() + 'LOGEND\n');
        }
    }
}

class Calander {
    year: Year;
    timeNow: Date;
    constructor(year?: number) {
        if (year !== undefined) {
            this.year = new Year(year);
        } else {
            this.year = new Year(new Date().getFullYear());
        }

        this.timeNow = new Date();
    }
}

export { Calander, States, ADays, ADays2, AMonths, Month, Months, Week }

