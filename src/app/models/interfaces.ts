export interface Expense {
  id?: number;
  category: string;
  amount: number;
  description: string;
  date: string;
  mileage?: number;
  created_at?: string;
  updated_at?: string;
}

export interface FuelRecord {
  id?: number;
  date: string;
  gallons: number;
  cost: number;
  mileage: number;
  gas_station?: string;
  price_per_gallon: number;
  created_at?: string;
  updated_at?: string;
}

export interface Reminder {
  id?: number;
  type: string;
  title: string;
  description?: string;
  due_date: string;
  is_completed: boolean;
  email_sent: boolean;
  mileage_interval?: number;
  current_mileage?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Dashboard {
  total_expenses: number;
  monthly_expenses: number;
  fuel_expenses: number;
  maintenance_expenses: number;
  pending_reminders: number;
  recent_fuel_records: FuelRecord[];
  recent_expenses: Expense[];
  fuel_efficiency: number;
  average_cost_per_gallon: number;
}

export interface ExpenseCategory {
  id: number;
  name: string;
  icon?: string;
  color?: string;
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { id: 1, name: 'Combustible', icon: 'local_gas_station', color: '#f44336' },
  { id: 2, name: 'Mantenimiento', icon: 'build', color: '#2196f3' },
  { id: 3, name: 'Seguros', icon: 'security', color: '#4caf50' },
  { id: 4, name: 'Revisión Técnica', icon: 'fact_check', color: '#ff9800' },
  { id: 5, name: 'Lavado', icon: 'local_car_wash', color: '#9c27b0' },
  { id: 6, name: 'Reparaciones', icon: 'handyman', color: '#795548' },
  { id: 7, name: 'Llantas', icon: 'tire_repair', color: '#607d8b' },
  { id: 8, name: 'Aceite y Filtros', icon: 'water_drop', color: '#ff5722' },
  { id: 9, name: 'Otros', icon: 'more_horiz', color: '#9e9e9e' }
];

export const REMINDER_TYPES = [
  'Seguro de vehículo',
  'Revisión técnica',
  'Cambio de aceite',
  'Cambio de filtros',
  'Rotación de llantas',
  'Revisión de frenos',
  'Cambio de correa de distribución',
  'Mantenimiento general',
  'Otros'
];
