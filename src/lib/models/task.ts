export type TaskStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

export type Task = {
  id: string;
  posterId: string;
  heroId?: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  currency: string;
  location: string;
  status: TaskStatus;
  createdAt: Date;
  completedAt?: Date;
};
