export interface CatchPost {
  id: string;
  userId: string;
  userName?: string;
  description: string;
  imageUrl: string;
  avatar: string;
  lake: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}
