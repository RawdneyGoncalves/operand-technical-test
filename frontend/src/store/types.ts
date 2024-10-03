export interface User {
  id: string;
  email: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string; 
  userId: string;
}

export interface State {
  user: User | null;
  token: string | null;
  tasks: Task[];
}