export interface NewSchedule {
  name: string;
  date: string;
  time: string;
  endTime: string;
  category: string;
  location: string;
  priority: string;
}

export interface Schedule {
  userId: string;
  name: string;
  date: string;
  time: string;
  endTime: string;
  category: string;
  location: string;
  priority: string;
}


export interface ScheduleResponse {
  category : string;
  createdAt : string;
  date : string;
  endTime : string;
  location : string;
  name : string;
  priority : string;
  time : string;
  userId : string;
  __v : number;
  _id : string;

}