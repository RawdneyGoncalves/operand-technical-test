export interface User {
  id: string;
  email: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string; 
  completed: boolean;
  userId: string; 
}

export interface State {
  user: User | null;
  tasks: Task[];
  token: string | null; 
}
