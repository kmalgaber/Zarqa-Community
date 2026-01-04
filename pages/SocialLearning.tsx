
import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Plus, Users, Search, ChevronUp, Radio } from 'lucide-react';
import { currentUser } from '../data/mockData';

const SocialLearning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'qa' | 'rooms'>('qa');

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-left-4 duration-500">
      <header className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">المجتمع التفاعلي</h1>
          <p className="text-gray-500 mt-2">تبادل الخبرات مع زملائك في بيئة تعليمية محفزة.</p>
        </div>
        <div className="bg-white p-1 rounded-2xl border border-gray-100 shadow-sm flex">
          <button 
            onClick={() => setActiveTab('qa')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'qa' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            سؤال وجواب
          </button>
          <button 
            onClick={() => setActiveTab('rooms')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'rooms' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            غرف المذاكرة الحية
          </button>
        </div>
      </header>

      {activeTab === 'qa' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-4">
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-4">
               <div className="flex-1 flex items-center bg-gray-50 rounded-2xl px-4 py-2">
                 <Search size={18} className="text-gray-400 ml-2" />
                 <input type="text" placeholder="ابحث عن سؤال معين..." className="bg-transparent border-none outline-none w-full text-sm" />
               </div>
               <button className="bg-indigo-600 text-white px-6 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all">
                 <Plus size={18} />
                 اطرح سؤالاً
               </button>
            </div>

            {/* Questions List */}
            {[1, 2, 3].map(q => (
              <div key={q} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-6 hover:border-indigo-100 transition-colors">
                <div className="flex flex-col items-center gap-1">
                  <button className="p-2 hover:bg-indigo-50 rounded-xl text-gray-400 hover:text-indigo-600 transition-all">
                    <ChevronUp size={24} />
                  </button>
                  <span className="font-bold text-gray-800">12</span>
                  <span className="text-[10px] text-gray-400 uppercase">صوت</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-md">#محاسبة_تكاليف</span>
                    <span className="text-xs text-gray-400">• منذ 3 ساعات</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-3 hover:text-indigo-600 cursor-pointer">ما هي الطريقة الأفضل لحساب تكلفة الوحدة في نظام المراحل؟</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
                    أواجه صعوبة في فهم الفرق بين متوسط التكلفة المرجح وطريقة الوارد أولاً صادر أولاً عند وجود مخزون إنتاج تحت التشغيل أول المدة...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                      <div className="flex items-center gap-1.5 hover:text-indigo-600 cursor-pointer">
                        <MessageCircle size={14} />
                        <span>8 إجابات</span>
                      </div>
                      <div className="flex items-center gap-1.5 hover:text-green-600 cursor-pointer">
                        <Users size={14} />
                        <span>45 مشاهدة</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-600">سارة علي</span>
                      <img src="https://picsum.photos/seed/sara/50/50" className="w-6 h-6 rounded-full border border-gray-100" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
               <h4 className="font-bold text-gray-800 mb-4">وسوم نشطة</h4>
               <div className="flex flex-wrap gap-2">
                 {['امتحانات_سابقة', 'ملخصات_شاملة', 'شرح_فيديو', 'تسريبات_كويز', 'مساعدة_عاجلة'].map(tag => (
                   <span key={tag} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-xl hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-all">#{tag}</span>
                 ))}
               </div>
            </div>
            
            <div className="bg-indigo-900 p-6 rounded-3xl text-white">
               <h4 className="font-bold mb-2">نظام الثقة الذكي</h4>
               <p className="text-xs text-indigo-300 leading-relaxed mb-4">
                 ساهم بإجابات صحيحة لتحصل على رتبة "مساهم موثوق" لتنشر محتواك فوراً دون انتظار الموافقة.
               </p>
               <div className="w-full bg-indigo-800 rounded-full h-1.5 mb-2">
                  <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '75%' }}></div>
               </div>
               <p className="text-[10px] text-indigo-400">باقي 15 نقطة ثقة على الترقية</p>
            </div>
          </aside>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Live Study Rooms */}
          {[1, 2, 3].map(room => (
            <div key={room} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:border-indigo-100 transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-bold animate-pulse">
                <Radio size={12} />
                مباشر الآن
              </div>
              <div className="bg-indigo-50 w-14 h-14 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                <Users size={28} />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">غرفة مراجعة الإحصاء</h3>
              <p className="text-xs text-gray-400 mb-6">قبل امتحان الغد بـ 24 ساعة. النقاش حول التوزيعات الاحتمالية.</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex -space-x-2 rtl:space-x-reverse">
                   {[1, 2, 3, 4].map(i => (
                     <img key={i} src={`https://picsum.photos/seed/${i + room}/30/30`} className="w-8 h-8 rounded-full border-2 border-white" />
                   ))}
                   <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-400">+12</div>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100">انضم للغرفة</button>
              </div>
            </div>
          ))}
          <div className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center text-gray-400 hover:border-indigo-200 hover:text-indigo-500 transition-all">
             <Plus size={32} className="mb-2" />
             <p className="font-bold text-sm">أنشئ غرفة مذاكرة مؤقتة</p>
             <p className="text-[10px] mt-1">الميزة متاحة للمشرفين والمساهمين الموثوقين فقط</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLearning;
