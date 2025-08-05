import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ExpensesComponent } from './components/expenses/expenses';
import { FuelTrackingComponent } from './components/fuel-tracking/fuel-tracking';
import { RemindersComponent } from './components/reminders/reminders';
import { LoginComponent } from './components/login/login';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'expenses', 
    component: ExpensesComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'fuel-tracking', 
    component: FuelTrackingComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'reminders', 
    component: RemindersComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];
