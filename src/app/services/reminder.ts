import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';
import { Reminder } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  
  constructor(private api: Api) { }

  getReminders(): Observable<Reminder[]> {
    return this.api.get<Reminder[]>('reminders');
  }

  getReminder(id: number): Observable<Reminder> {
    return this.api.get<Reminder>(`reminders/${id}`);
  }

  createReminder(reminder: Reminder): Observable<Reminder> {
    return this.api.post<Reminder>('reminders', reminder);
  }

  updateReminder(id: number, reminder: Reminder): Observable<Reminder> {
    return this.api.put<Reminder>(`reminders/${id}`, reminder);
  }

  deleteReminder(id: number): Observable<void> {
    return this.api.delete<void>(`reminders/${id}`);
  }

  getPendingReminders(): Observable<Reminder[]> {
    return this.api.get<Reminder[]>('reminders/pending');
  }

  markAsCompleted(id: number): Observable<Reminder> {
    return this.api.put<Reminder>(`reminders/${id}/complete`, {});
  }

  getUpcomingReminders(days: number = 30): Observable<Reminder[]> {
    return this.api.get<Reminder[]>(`reminders/upcoming/${days}`);
  }
}
