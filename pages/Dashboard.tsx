
import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  ArrowUpRight, 
  BookMarked,
  Sparkles,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { mockCourses, mockTasks, currentUser } from '../data/mockData';

const data = [
  { name: 'الأحد', study: 4 },
  { name: 'الاثنين', study: 6 },
  { name: 'الثلاثاء', study: 2 },
  { name: 'الأربعاء', study: 8 },
  { name: 'الجمعة', study: 3 },
  { name: 'السبت', study: 7 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-800">أهلاً بك، {currentUser.name.split(' ')[0]} 👋</h1>
        <p className="text-gray-500 mt-1">لديك تقدم رائع هذا الأسبوع، استمر في العطاء!</p>
      </header>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockCourses.slice(0, 3).map(course => (
          <div key={course.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                <BookMarked size={24} />
              </div>
              <span className="text-sm font-medium text-gray-400">إنجاز {course.progress}%</span>
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">{course.title}</h3>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
            </div>
            {course.progress < 50 && (
              <p className="text-red-500 text-xs flex items-center gap-1">
                <TrendingUp size={14} className="rotate-180" />
                أنت متأخر في هذه المادة بنسبة {50 - course.progress}%
              </p>
            )}
            {course.progress >= 80 && (
              <p className="text-green-500 text-xs flex items-center gap-1">
                <CheckCircle size={14} />
                أداء متميز، شارفت على الانتهاء!
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Progress Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">إحصائيات المذاكرة</h2>
            <select className="bg-gray-50 border-none text-sm text-gray-600 rounded-lg p-2 outline-none">
              <option>هذا الأسبوع</option>
              <option>الشهر الماضي</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorStudy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                  labelStyle={{fontWeight: 'bold', marginBottom: '4px'}}
                />
                <Area type="monotone" dataKey="study" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorStudy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock className="text-orange-500" />
            المهام العاجلة
          </h2>
          <div className="space-y-4">
            {mockTasks.map(task => (
              <div key={task.id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-indigo-100 transition-all cursor-pointer group">
                <p className="text-xs font-bold text-indigo-600 mb-1">{task.courseTitle}</p>
                <h4 className="font-bold text-gray-800 mb-2 group-hover:text-indigo-600">{task.title}</h4>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${task.status === 'urgent' ? 'bg-orange-100 text-orange-600' : 'bg-gray-200 text-gray-600'}`}>
                    {task.status === 'urgent' ? 'عاجل' : 'قريباً'}
                  </span>
                  <span className="text-xs text-gray-400">{task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-sm font-medium hover:border-indigo-300 hover:text-indigo-500 transition-all">
            + إضافة مهمة مخصصة
          </button>
        </div>
      </div>

      {/* Smart Recommendations */}
      <section className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4 bg-indigo-800 w-fit px-4 py-1.5 rounded-full border border-indigo-700">
              <Sparkles size={18} className="text-yellow-400" />
              <span className="text-sm font-bold">توصية ذكية من "عِلم"</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">نظام التوصية يقترح عليك:</h2>
            <p className="text-indigo-200 leading-relaxed mb-6">
              بناءً على درجاتك في كويز المحاسبة الأخير، ننصحك بمراجعة ملخص الطالب 
              <span className="text-white font-bold mx-1 underline decoration-yellow-400">سارة علي</span> 
              في الفصل الثالث لتعزيز فهمك للنقاط التي واجهت فيها صعوبة.
            </p>
            <button className="bg-white text-indigo-900 px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-all">
              تصفح التلخيص المقترح
              <ArrowUpRight size={20} />
            </button>
          </div>
          <div className="hidden md:block">
             <div className="bg-indigo-800/50 p-8 rounded-full border border-indigo-700/50 backdrop-blur-sm">
                <BrainCircuit size={100} className="text-indigo-400" />
             </div>
          </div>
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-800 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-700 rounded-full blur-3xl opacity-50"></div>
      </section>
    </div>
  );
};

export default Dashboard;
