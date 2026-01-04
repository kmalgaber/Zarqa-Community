
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Trophy, 
  MessageCircle, 
  Zap, 
  Search, 
  Bell, 
  User as UserIcon,
  LayoutDashboard,
  BrainCircuit,
  Settings
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import CourseView from './pages/CourseView';
import LeaderboardView from './pages/LeaderboardView';
import SocialLearning from './pages/SocialLearning';
import AICompanionView from './pages/AICompanionView';
import { currentUser } from './data/mockData';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex h-screen bg-gray-50 overflow-hidden font-sans" dir="rtl">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-indigo-900 text-white transition-all duration-300 flex flex-col`}>
          <div className="p-6 flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg text-indigo-900">
              <Zap size={24} fill="currentColor" />
            </div>
            {isSidebarOpen && <span className="font-bold text-xl tracking-wider">عِلم</span>}
          </div>

          <nav className="flex-1 mt-6 px-4 space-y-2">
            <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="لوحة التحكم" isOpen={isSidebarOpen} />
            <SidebarLink to="/courses" icon={<BookOpen size={20} />} label="المواد الدراسية" isOpen={isSidebarOpen} />
            <SidebarLink to="/ai-companion" icon={<BrainCircuit size={20} />} label="مساعد الذكاء" isOpen={isSidebarOpen} />
            <SidebarLink to="/leaderboard" icon={<Trophy size={20} />} label="لوحة الشرف" isOpen={isSidebarOpen} />
            <SidebarLink to="/social" icon={<MessageCircle size={20} />} label="المجتمع" isOpen={isSidebarOpen} />
          </nav>

          <div className="p-4 border-t border-indigo-800">
            <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
              <img src={currentUser.avatar} alt="avatar" className="w-10 h-10 rounded-full border-2 border-indigo-400" />
              {isSidebarOpen && (
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold truncate">{currentUser.name}</p>
                  <p className="text-xs text-indigo-300">مستوى {currentUser.level}</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
              <Search size={18} className="text-gray-400 ml-2" />
              <input 
                type="text" 
                placeholder="ابحث في المحاضرات، الملفات، أو #الوسوم..." 
                className="bg-transparent border-none outline-none w-full text-sm placeholder-gray-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                <Zap size={16} />
                <span>{currentUser.xp} XP</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors relative">
                <Bell size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                <Settings size={22} />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<CourseView />} />
              <Route path="/ai-companion" element={<AICompanionView />} />
              <Route path="/leaderboard" element={<LeaderboardView />} />
              <Route path="/social" element={<SocialLearning />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isOpen }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
      ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'}
      ${!isOpen && 'justify-center px-0'}
    `}
  >
    {icon}
    {isOpen && <span className="font-medium text-sm">{label}</span>}
  </NavLink>
);

export default App;
