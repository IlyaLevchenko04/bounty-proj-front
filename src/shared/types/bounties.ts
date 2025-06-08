export interface User {
  _id: string;
  username: string;
}

export interface Bounty {
  _id: string;
  title: string;
  description: string;
  targetName: string;
  planet: string;
  reward: number;
  status: "open" | "closed" | "in_progress";
  imageUrl: string;
  postedBy: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
