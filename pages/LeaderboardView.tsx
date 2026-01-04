
import React from 'react';
import { Trophy, Medal, Star, Flame, Award } from 'lucide-react';
import { leaderboard, currentUser } from '../data/mockData';

const LeaderboardView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            لوحة الشرف
            <Trophy className="text-yellow-400" />
          </h1>
          <p className="text-gray-500 mt-2">الأكثر مذاكرة ومساعدة لزملائهم في هذا الشهر.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100">الأسبوعي</button>
          <button className="px-6 py-2 bg-white text-gray-600 border border-gray-100 rounded-xl font-bold hover:bg-gray-50 transition-all">الشهري</button>
        </div>
      </header>

      {/* Top 3 Visual */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end py-10">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center relative md:order-1 h-fit">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border-4 border-white">
            <Medal size={24} />
          </div>
          <img src={leaderboard[1].avatar} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-100" />
          <h3 className="font-bold text-gray-800">{leaderboard[1].name}</h3>
          <p className="text-xs text-gray-400 mb-4">{leaderboard[1].xp} XP</p>
          <div className="py-2 px-4 bg-gray-50 rounded-full text-xs font-bold text-gray-500">المركز الثاني</div>
        </div>

        <div className="bg-indigo-900 p-10 rounded-[40px] shadow-2xl shadow-indigo-200 text-center relative md:order-2">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white border-8 border-indigo-900 animate-bounce">
            <Trophy size={32} />
          </div>
          <img src={leaderboard[0].avatar} className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-yellow-400 shadow-xl" />
          <h3 className="font-bold text-white text-xl">{leaderboard[0].name}</h3>
          <p className="text-indigo-300 mb-6">{leaderboard[0].xp} XP</p>
          <div className="py-2 px-6 bg-yellow-400 text-indigo-900 rounded-full text-sm font-bold inline-block">الأول على المنصة 🏆</div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center relative md:order-3 h-fit">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-400 border-4 border-white">
            <Medal size={24} />
          </div>
          <img src={leaderboard[2].avatar} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-orange-50" />
          <h3 className="font-bold text-gray-800">{leaderboard[2].name}</h3>
          <p className="text-xs text-gray-400 mb-4">{leaderboard[2].xp} XP</p>
          <div className="py-2 px-4 bg-orange-50 rounded-full text-xs font-bold text-orange-500">المركز الثالث</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Full List */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">الترتيب الكامل</h3>
            <span className="text-xs text-gray-400">تحديث تلقائي كل ساعة</span>
          </div>
          <div className="divide-y divide-gray-50">
            {leaderboard.map((user, idx) => (
              <div key={user.id} className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${user.id === currentUser.id ? 'bg-indigo-50/50' : ''}`}>
                <span className="w-8 text-center font-bold text-gray-400">#{idx + 1}</span>
                <img src={user.avatar} className="w-10 h-10 rounded-full border border-gray-100" />
                <div className="flex-1">
                  <p className="font-bold text-gray-800 text-sm">{user.name}</p>
                  <p className="text-[10px] text-gray-400">{user.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs font-bold text-indigo-600">
                    <Flame size={14} className="text-orange-500" />
                    {user.xp}
                  </div>
                  {idx < 3 && <Star size={16} fill={idx === 0 ? '#facc15' : '#cbd5e1'} className="text-transparent" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Badges */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Award size={18} className="text-indigo-600" />
              أوسمتي المستحقة
            </h3>
            <div className="space-y-4">
              {currentUser.badges.map(badge => (
                <div key={badge.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-indigo-200 transition-all">
                  <div className="text-3xl bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">{badge.name}</h4>
                    <p className="text-xs text-gray-400">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all">
              عرض جميع الأوسمة (15 قفلاً)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardView;
