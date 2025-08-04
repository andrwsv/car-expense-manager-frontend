import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';
import { FuelRecord } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  
  constructor(private api: Api) { }

  getFuelRecords(): Observable<FuelRecord[]> {
    return this.api.get<FuelRecord[]>('fuel-records');
  }

  getFuelRecord(id: number): Observable<FuelRecord> {
    return this.api.get<FuelRecord>(`fuel-records/${id}`);
  }

  createFuelRecord(fuelRecord: FuelRecord): Observable<FuelRecord> {
    return this.api.post<FuelRecord>('fuel-records', fuelRecord);
  }

  updateFuelRecord(id: number, fuelRecord: FuelRecord): Observable<FuelRecord> {
    return this.api.put<FuelRecord>(`fuel-records/${id}`, fuelRecord);
  }

  deleteFuelRecord(id: number): Observable<void> {
    return this.api.delete<void>(`fuel-records/${id}`);
  }

  getFuelEfficiency(): Observable<{efficiency: number, records: FuelRecord[]}> {
    return this.api.get<{efficiency: number, records: FuelRecord[]}>('fuel-records/efficiency');
  }

  getMonthlyFuelCosts(year: number, month: number): Observable<{total: number, records: FuelRecord[]}> {
    return this.api.get<{total: number, records: FuelRecord[]}>(`fuel-records/monthly/${year}/${month}`);
  }
}
