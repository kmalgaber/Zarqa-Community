
export interface User {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  badges: Badge[];
  role: 'Newbie' | 'Trusted Contributor' | 'Moderator' | 'Admin';
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  progress: number;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz';
  contentUrl: string;
  duration?: string;
  timestamps?: Timestamp[];
  communityContributions?: Contribution[];
}

export interface Timestamp {
  time: string;
  description: string;
  userId: string;
}

export interface Contribution {
  id: string;
  title: string;
  author: string;
  type: 'summary' | 'notes';
  likes: number;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  courseTitle: string;
  status: 'pending' | 'urgent';
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}
