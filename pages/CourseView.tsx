
import React, { useState } from 'react';
import { 
  Play, 
  FileText, 
  Clock, 
  Plus, 
  ThumbsUp, 
  MessageSquare, 
  Download,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { mockCourses, currentUser } from '../data/mockData';

const CourseView: React.FC = () => {
  const [selectedCourse] = useState(mockCourses[0]);
  const [selectedModule, setSelectedModule] = useState(selectedCourse.modules[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Sidebar: Module List */}
      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6">محتوى المادة</h2>
        {selectedCourse.modules.map((module) => (
          <button
            key={module.id}
            onClick={() => setSelectedModule(module)}
            className={`w-full text-right p-4 rounded-2xl transition-all border ${
              selectedModule.id === module.id 
                ? 'bg-indigo-600 text-white shadow-lg border-indigo-600' 
                : 'bg-white text-gray-600 border-gray-100 hover:border-indigo-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${selectedModule.id === module.id ? 'bg-indigo-500' : 'bg-gray-100'}`}>
                {module.type === 'video' ? <Play size={18} fill={selectedModule.id === module.id ? 'white' : 'currentColor'} /> : <FileText size={18} />}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-sm truncate">{module.title}</p>
                {module.duration && <p className={`text-[10px] mt-0.5 ${selectedModule.id === module.id ? 'text-indigo-200' : 'text-gray-400'}`}>{module.duration}</p>}
              </div>
            </div>
          </button>
        ))}
        
        <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl">
          <h4 className="text-orange-800 font-bold text-sm mb-2">تحديثات جديدة!</h4>
          <p className="text-orange-700 text-xs leading-relaxed">قام 3 من زملائك بإضافة تلخيصات جديدة لهذا الفصل.</p>
        </div>
      </div>

      {/* Main Content: Player/Viewer */}
      <div className="lg:col-span-3 space-y-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative aspect-video bg-black flex items-center justify-center">
            {selectedModule.type === 'video' ? (
              <>
                <div className="text-white text-center opacity-50">
                  <Play size={64} />
                  <p className="mt-4">مشغل الفيديو (معاينه)</p>
                </div>
                {/* Simulated Watermark */}
                <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center rotate-12">
                   <div className="text-white text-4xl font-bold select-none">
                     {currentUser.name} - #10293
                   </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center relative p-20 text-center">
                <FileText size={80} className="text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-700">معاينة ملف PDF</h2>
                <p className="text-gray-500 mt-2">نظام الحماية مفعل: يتم وضع علامة مائية باسمك ورقم جلوسك تلقائياً.</p>
                <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center flex-wrap gap-20 overflow-hidden">
                  {Array.from({length: 12}).map((_, i) => (
                    <span key={i} className="text-black font-bold text-lg rotate-12">{currentUser.name}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold mb-2 uppercase tracking-wider">
                  <ShieldCheck size={14} />
                  محتوى رسمي موثق
                </div>
                <h1 className="text-2xl font-bold text-gray-800">{selectedModule.title}</h1>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all">
                  <Download size={18} />
                  تحميل
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                  إضافة طابع زمني
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Timestamps */}
            {selectedModule.timestamps && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-indigo-600" />
                  أهم اللحظات (مساهمة الطلاب)
                </h3>
                <div className="space-y-3">
                  {selectedModule.timestamps.map((ts, idx) => (
                    <button key={idx} className="flex items-center gap-4 w-full p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors group">
                      <span className="font-mono text-indigo-600 font-bold px-2 py-1 bg-indigo-100 rounded-lg text-sm">{ts.time}</span>
                      <span className="text-gray-700 text-sm flex-1 text-right">{ts.description}</span>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-indigo-600" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <hr className="my-8 border-gray-100" />

            {/* Community Content Section */}
            <div>
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Plus size={18} className="text-green-500" />
                ملحقات مجتمعية مرتبطة بهذا الدرس
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedModule.communityContributions?.map(con => (
                  <div key={con.id} className="p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase">
                        {con.type === 'summary' ? 'تلخيص' : 'ملاحظات'}
                      </span>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <ThumbsUp size={14} />
                        {con.likes}
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">{con.title}</h4>
                    <p className="text-xs text-gray-400 mb-4">بواسطة: {con.author}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors">عرض</button>
                      <button className="px-3 py-2 bg-gray-50 text-gray-400 rounded-lg hover:text-indigo-600">
                        <MessageSquare size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 hover:border-indigo-200 hover:text-indigo-500 transition-all bg-gray-50/50">
                  <Plus size={32} className="mb-2" />
                  <span className="text-sm font-bold">ارفع مساهمتك الخاصة</span>
                  <span className="text-[10px]">واحصل على 50 XP فوراً</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
