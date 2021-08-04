interface Event {
  title: string;
  description: string;
  createdAt: Date;
  authorId: string;
  dateTime: number;
  date: {
    month: number;
    date: number;
    year: number;
  };
  time: {
    hour: number;
    minutes: number;
    pm: boolean;
  };
}

export default Event;
