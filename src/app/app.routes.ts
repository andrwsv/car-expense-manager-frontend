import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ExpensesComponent } from './components/expenses/expenses';
import { FuelTrackingComponent } from './components/fuel-tracking/fuel-tracking';
import { RemindersComponent } from './components/reminders/reminders';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'fuel-tracking', component: FuelTrackingComponent },
  { path: 'reminders', component: RemindersComponent },
  { path: '**', redirectTo: '/dashboard' }
];
