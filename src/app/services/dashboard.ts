import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';
import { Dashboard } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor(private api: Api) { }

  getDashboardData(): Observable<Dashboard> {
    return this.api.get<Dashboard>('dashboard');
  }

  getMonthlyReport(year: number, month: number): Observable<any> {
    return this.api.get<any>(`dashboard/monthly-report/${year}/${month}`);
  }

  getYearlyReport(year: number): Observable<any> {
    return this.api.get<any>(`dashboard/yearly-report/${year}`);
  }
}
