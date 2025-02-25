export interface CatchPost {
    id: string;
    userId: string;
    description: string;
    imageUrl: string;
    avatar: string;
    createdAt: {
      seconds: number;
      nanoseconds: number;
    };
  }
  