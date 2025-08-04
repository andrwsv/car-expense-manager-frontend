import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';
import { Expense } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  
  constructor(private api: Api) { }

  getExpenses(): Observable<Expense[]> {
    return this.api.get<Expense[]>('expenses');
  }

  getExpense(id: number): Observable<Expense> {
    return this.api.get<Expense>(`expenses/${id}`);
  }

  createExpense(expense: Expense): Observable<Expense> {
    return this.api.post<Expense>('expenses', expense);
  }

  updateExpense(id: number, expense: Expense): Observable<Expense> {
    return this.api.put<Expense>(`expenses/${id}`, expense);
  }

  deleteExpense(id: number): Observable<void> {
    return this.api.delete<void>(`expenses/${id}`);
  }

  getExpensesByCategory(category: string): Observable<Expense[]> {
    return this.api.get<Expense[]>(`expenses/category/${category}`);
  }

  getMonthlyExpenses(year: number, month: number): Observable<Expense[]> {
    return this.api.get<Expense[]>(`expenses/monthly/${year}/${month}`);
  }
}
