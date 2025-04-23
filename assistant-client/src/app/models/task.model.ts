export interface TaskResponse {
  _id: string;
  createdAt: string;
  title: string;
  summary: string;
  dueDate: string;
  userId: string;
  __v: number;
  status: string;
}

export interface TaskData {
  userId: string;
  title: string;
  summary: string;
  dueDate: string;
}
