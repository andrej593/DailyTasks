const ADaysM = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
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

class Day {
    notInThisMonth: boolean;    //for when week or month does not start on monday or end on sunday
    dayName: TDay;
    dayInMonth: number;
    month: TMonth;
    year: number;
    constructor(day: TDay, dayInMonth: number, month: TMonth, year: number, blank: boolean) {
        this.notInThisMonth = blank;
        this.dayName = day;
        this.dayInMonth = dayInMonth;
        this.month = month;
        this.year = year;
    }
    getDate() {
        return `${this.dayInMonth}.${AMonths.indexOf(this.month) + 1}.${this.year}`;
    }
}

class Week {
    days: Day[];
    constructor() {
        this.days = [] as Day[];
    }
    getDay(dayInMonth: number) {
        for (let i = 0; i < this.days.length; i++) {
            if (this.days[i].dayInMonth == dayInMonth) return this.days[i];
        }
        return this.days[0];    //should never happen
    }
    fromTo(){
        return 'from '+this.days[0].getDate()+' to '+this.days[6].getDate();
    }
}

class Month {
    year: number;
    monthName: TMonth;
    weeks: Week[];

    firstDay: Day;  //need this because of blank days
    constructor(month: TMonth, firstDay: number, year: number) {
        this.firstDay = new Day(ADays[firstDay], 1, month, year, false);
        this.year = year;
        this.monthName = month;
        this.weeks = [] as Week[];
        let tmpWeek = new Week();
        //if not start on monday
        if ((firstDay) !== 1) {
            let prevMonth: TMonth;   //previus Month
            let startYear = year;       //previous Year if January
            if (this.monthName !== "January") {
                prevMonth = AMonths[AMonths.indexOf(this.monthName) - 1];    //only go 1 month back
            } else {
                prevMonth = "December";   //go 1 year back,last month
                startYear--;
            }
            let start = Months[prevMonth] - ((firstDay + 6) % 7) + 1;  //number of days in prev month - where we start counting blank days at
            //fill blank days in week
            for (let i = 0; i < ((firstDay + 6) % 7); i++) {
                tmpWeek.days.push(new Day(ADays[i + 1], start++, prevMonth, startYear, true));
            }
        }
        for (let i = 0; i < Months[this.monthName]; i++) {
            tmpWeek.days.push(new Day(ADays[(firstDay) % 7], i + 1, month, year, false));
            //week full/is sunday
            if ((firstDay % 7) === 0) {
                this.weeks.push(tmpWeek);
                tmpWeek = new Week();
            }
            firstDay++;
        }
        //last week not full yet
        if (((firstDay - 1) % 7) !== 0) {   //didnt end on sunday
            let nextMonth: TMonth;   //next Month
            let startYear = year;       //next Year if December
            if (this.monthName !== "December") {
                nextMonth = AMonths[AMonths.indexOf(this.monthName) + 1];    //only go 1 month forward
            } else {
                nextMonth = "January";   //go 1 year forward,first month
                startYear++;
            }
            //fill blank days in last week
            for (let i = 0; i < ((7 - (firstDay - 1) % 7) % 7); i++) {
                tmpWeek.days.push(new Day(ADays[(firstDay + i) % 7], i + 1, nextMonth, startYear, true));
            }
            this.weeks.push(tmpWeek);
        }
    }
    getWeek(dayInMonth: number) {
        for (let i = 0; i < this.weeks.length; i++) {
            for (let j = 0; j < this.weeks[i].days.length; j++) {
                if (this.weeks[i].days[j].dayInMonth == dayInMonth) {
                    return this.weeks[i];
                }
            }
        }
        return this.weeks[0];   //should never come to this
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
        Months["February"] = this.leapYear ? 29 : 28;

        let firstDay = new Date(year, 0, 1).getDay();   //to get which day of the week to start on
        this.months = [] as Month[];
        for (let i = 0; i < 12; i++) {
            this.months.push(new Month(AMonths[i], firstDay, year));
            firstDay = (firstDay + Months[AMonths[i]]) % 7; //calculate what day of the week is for next month
        }
    }
    getMonth(month: number) {
        for (let monthObj of this.months) {
            if (monthObj.monthName === AMonths[month]) {
                return monthObj;
            }
        }
        return new Month("January", 1, 2024);    //dont like this code
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
    setMonth(month:Month){
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

