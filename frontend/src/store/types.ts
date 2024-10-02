export interface State {
  user: User | null;
  tasks: Task[];
}

export interface User {
  id: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
}