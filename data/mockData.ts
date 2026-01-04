
import { User, Course, Task, Badge } from '../types';

export const currentUser: User = {
  id: 'u1',
  name: 'أحمد محمود',
  avatar: 'https://picsum.photos/seed/user1/100/100',
  xp: 1250,
  level: 5,
  role: 'Trusted Contributor',
  badges: [
    { id: 'b1', name: 'منقذ الدفعة', icon: '🏆', description: 'الأكثر رفعاً للتلخيصات' },
    { id: 'b2', name: 'دودة كتب', icon: '📚', description: 'أنهى 10 دورات' }
  ]
};

export const mockCourses: Course[] = [
  {
    id: 'c1',
    title: 'محاسبة التكاليف',
    progress: 80,
    modules: [
      { 
        id: 'm1', 
        title: 'المقدمة في التكاليف', 
        type: 'video', 
        contentUrl: 'https://example.com/video1',
        duration: '45:00',
        timestamps: [
          { time: '10:05', description: 'شرح المثال العملي الأول', userId: 'u2' }
        ],
        communityContributions: [
          { id: 'con1', title: 'تلخيص شامل للوحدة الأولى', author: 'سارة علي', type: 'summary', likes: 45 }
        ]
      },
      { id: 'm2', title: 'نظام المراحل الإنتاجية', type: 'pdf', contentUrl: 'https://example.com/file1.pdf' }
    ]
  },
  {
    id: 'c2',
    title: 'إدارة الأعمال الدولية',
    progress: 45,
    modules: []
  },
  {
    id: 'c3',
    title: 'الإحصاء التطبيقي',
    progress: 20,
    modules: []
  }
];

export const mockTasks: Task[] = [
  { id: 't1', title: 'كويز الوحدة الثانية', dueDate: 'اليوم - 4:00 م', courseTitle: 'محاسبة التكاليف', status: 'urgent' },
  { id: 't2', title: 'تسليم ملخص الفصل الثالث', dueDate: 'غداً', courseTitle: 'إدارة الأعمال', status: 'pending' }
];

export const leaderboard: User[] = [
  { id: 'u3', name: 'ليلى حسن', avatar: 'https://picsum.photos/seed/user3/100/100', xp: 2800, level: 12, role: 'Moderator', badges: [] },
  { id: 'u4', name: 'محمد خالد', avatar: 'https://picsum.photos/seed/user4/100/100', xp: 2500, level: 10, role: 'Trusted Contributor', badges: [] },
  { id: 'u5', name: 'أحمد محمود', avatar: 'https://picsum.photos/seed/user1/100/100', xp: 1250, level: 5, role: 'Trusted Contributor', badges: [] },
];
