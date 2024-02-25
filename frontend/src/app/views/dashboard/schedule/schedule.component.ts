import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Agrega esta línea
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Agrega CommonModule a la lista de imports
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent  implements OnInit  {
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  public calendar: (Date | null)[][] = [];
  events: { date: Date, title: string }[] = [];
  allEvents: { date: Date, title: string }[] = [];
  currentMonthEvents: { date: Date, title: string }[] = [];
  newEventDay: number | null = new Date().getDate();
  constructor(private http: HttpClient) {}

  showingEventDetails: boolean = false;
  selectedEvent: { date: Date, title: string } = { date: new Date(), title: '' };
  

  getCalendarDays(year: number, month: number): { day: number | null, inMonth: boolean }[] {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    let days: { day: number | null, inMonth: boolean }[] = [];

    // Fill in the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, inMonth: false });
    }

    // Fill in the days of the month with numbers 1 to lastDay
    for (let i = 1; i <= lastDay; i++) {
      days.push({ day: i, inMonth: true });
    }

    // Ensure there are always 7 elements in each week
    while (days.length % 7 !== 0) {
      days.push({ day: null, inMonth: false });
    }

    return days;
  }


  currentMonth: number = 0;
  currentYear: number = new Date().getFullYear();



  changeMonth(offset: number) {
    this.currentMonth += offset;

    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }

    console.log('Nuevo mes:', this.months[this.currentMonth], 'Año:', this.currentYear);
  }

  selectedYear: number = new Date().getFullYear();

  months = [
    { name: 'Enero', number: 1, days: 31 },
    { name: 'Febrero', number: 2, days: 28 },
    { name: 'Marzo', number: 3, days: 31 },
    { name: 'Abril', number: 4, days: 30 },
    { name: 'Mayo', number: 5, days: 31 },
    { name: 'Junio', number: 6, days: 30 },
    { name: 'Julio', number: 7, days: 31 },
    { name: 'Agosto', number: 8, days: 31 },
    { name: 'Septiembre', number: 9, days: 30 },
    { name: 'Octubre', number: 10, days: 31 },
    { name: 'Noviembre', number: 11, days: 30 },
    { name: 'Diciembre', number: 12, days: 31 },
  ];

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  getDaysInMonth(month: number, year: number): number[] {
    const daysInMonth = this.months.find(m => m.number === month)?.days || 0;
    const isLeap = this.isLeapYear(year);

    // Actualizar días de febrero para años bisiestos
    if (month === 2 && isLeap) {
      return Array.from({ length: daysInMonth + 1 }, (_, i) => i + 1);
    } else {
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }
  }

  updateCalendar() {
    // Puedes agregar lógica adicional si es necesario al cambiar el año
    console.log('Año actualizado:', this.selectedYear);
  }

  getCalendar(): (Date | null)[][] {
    this.calendar = [];

    const daysInMonth = this.getCalendarDays(this.currentYear, this.currentMonth);

    let week: (Date | null)[] = [];

    for (let i = 0; i < daysInMonth.length; i++) {
      const dayInfo = daysInMonth[i];

      week.push(dayInfo.day !== null ? new Date(this.currentYear, this.currentMonth, dayInfo.day) : null);

      if (week.length === 7 || i === daysInMonth.length - 1) {
        // Añade la semana completa o la última semana del mes
        this.calendar.push(week.slice());  // Utiliza slice para crear una copia del array
        week = [];
      }
    }

    return this.calendar;
  }

  // Añade una variable para controlar la visibilidad del formulario
  showEventForm: boolean = false;

  // Añade propiedades para almacenar la información del nuevo evento

  newEventDescription: string = "";

  // Función para mostrar el formulario al hacer clic en el botón
  onButtonClick(): void {
    console.log('Botón clickeado');
    this.showEventForm = true;
  }
 
  newEventTime: string = "";
  addEvent(): void {
    if (this.newEventDay !== null && this.newEventDescription.trim() !== "") {
      const newEventDate = new Date(this.selectedYear, this.currentMonth, this.newEventDay);
      const [hours, minutes] = this.newEventTime.split(':').map(part => parseInt(part, 10));
      newEventDate.setHours(hours);
      newEventDate.setMinutes(minutes);
      
      // Añade el nuevo evento al array de todos los eventos
      this.allEvents.push({ date: newEventDate, title: this.newEventDescription });

      this.updateCalendar();
      this.showEventForm = false;
      this.newEventDay = null;
      this.newEventDescription = "";
      this.newEventTime = "";
      this.showingEventDetails = true;
    }
  }



  fetchEvents(): void {
    this.http.get<{ date: string, title: string }[]>('http://localhost:8000/eventos') // Adjust the API endpoint
      .subscribe(events => {
        this.allEvents = events.map(event => ({ date: new Date(event.date), title: event.title }));
        this.updateCalendar();
      }, error => {
        console.error('Error fetching events:', error);
        // Handle error as needed
      });
  }
  
  ngOnInit(): void {
    this.fetchEvents(); // Fetch events from API on component initialization
  }
  
  getEventsForDay(day: Date | null): { date: Date, title: string }[] {
    if (day) {
      const eventsForDay = this.allEvents.filter(event => event.date.toDateString() === day.toDateString());
      return eventsForDay;
    } else {
      return []; // o cualquier otro manejo para el caso de null
    }
  }
  
  
  
  

  calendar2: { date: Date | null, events: { date: Date, title: string }[] }[][] = [];
  getCalendar2(): { date: Date | null, events: { date: Date, title: string }[] }[][] {
    this.calendar2 = [];

    const daysInMonth = this.getCalendarDays(this.currentYear, this.currentMonth);

    for (let i = 0; i < daysInMonth.length; i++) {
      const dayInfo = daysInMonth[i];
      const currentDate = dayInfo.day !== null ? new Date(this.currentYear, this.currentMonth, dayInfo.day) : null;

      // Obtén los eventos para el día actual
      const dayEvents = this.events.filter(event => {
        return currentDate !== null && event.date.toDateString() === currentDate.toDateString();
      });

      // Añade la información al día en el calendario
      this.calendar2.push([{ date: currentDate, events: [...dayEvents] }]);
    }

    return this.calendar2;
  }

  deleteEvent(event: any): void {
    // Ensure 'event.date' is present and is a valid Date object
    if (event && event.date) {
      const eventDate = new Date(event.date);
  
      // Remove the event from allEvents array
      this.allEvents = this.allEvents.filter(currentEvent => {
        const currentEventDate = new Date(currentEvent.date);
        return (
          currentEventDate instanceof Date &&
          !isNaN(currentEventDate.getTime()) &&
          currentEventDate.toDateString() !== eventDate.toDateString()
        );
      });
  
      // Update the calendar and localStorage
      this.updateCalendar();
      localStorage.setItem('allEvents', JSON.stringify(this.allEvents));
    }
  }
  
  
  
  hasEvent(day: Date | null): boolean {
    if (!day) {
      return false;
    }
    
    // Lógica para determinar si el día tiene eventos asociados
    return this.events.some(event => event.date.toDateString() === day.toDateString());
  }

  showEventDetails(day: Date | null): void {
    if (day) {
      this.selectedEvent = this.events.find(event => event.date.toDateString() === day.toDateString()) || { date: new Date(), title: '' };
      this.showingEventDetails = true;
    }
  }
  
}