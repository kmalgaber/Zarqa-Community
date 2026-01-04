
import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Send, FileText, LayoutGrid, Loader2 } from 'lucide-react';
import { summarizeText, generateFlashcards } from '../services/geminiService';
import { Flashcard } from '../types';

const AICompanionView: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'flashcards'>('summary');

  const handleAIAction = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setSummary(null);
    setFlashcards([]);
    
    try {
      if (activeTab === 'summary') {
        const result = await summarizeText(inputText);
        setSummary(result || "عذراً، لم أتمكن من تلخيص النص.");
      } else {
        const result = await generateFlashcards(inputText);
        setFlashcards(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
      <header className="text-center">
        <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-xl shadow-indigo-200">
          <BrainCircuit size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">مساعد عِلم الذكي</h1>
        <p className="text-gray-500 mt-2">حوّل أي مادة دراسية طويلة إلى ملخصات ذكية أو بطاقات استذكار بضغطة زر.</p>
      </header>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="mb-6 flex gap-2">
          <button 
            onClick={() => setActiveTab('summary')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'summary' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            <FileText size={18} />
            تلخيص ذكي
          </button>
          <button 
            onClick={() => setActiveTab('flashcards')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'flashcards' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            <LayoutGrid size={18} />
            بطاقات استذكار
          </button>
        </div>

        <textarea 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="ألصق محتوى المحاضرة أو النص هنا (أو ارفع ملف PDF قريباً)..."
          className="w-full h-48 bg-gray-50 border-none rounded-2xl p-6 outline-none text-gray-700 resize-none focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-400"
        />

        <button 
          onClick={handleAIAction}
          disabled={loading || !inputText}
          className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
          {loading ? 'جاري المعالجة...' : activeTab === 'summary' ? 'توليد الملخص الذكي' : 'إنشاء بطاقات الاستذكار'}
        </button>
      </div>

      {/* AI Result Container */}
      {(summary || flashcards.length > 0) && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
             <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Sparkles size={18} />
             </div>
             <h3 className="font-bold text-gray-800">النتيجة المولدة بواسطة الذكاء الاصطناعي</h3>
          </div>

          {activeTab === 'summary' && summary && (
            <div className="prose prose-indigo max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{summary}</div>
            </div>
          )}

          {activeTab === 'flashcards' && flashcards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flashcards.map((card, idx) => (
                <div key={idx} className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl group relative cursor-pointer overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wide">السؤال</p>
                    <p className="font-bold text-indigo-900 mb-4">{card.question}</p>
                    <div className="h-[1px] bg-indigo-100 my-4 group-hover:bg-indigo-200"></div>
                    <p className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wide">الإجابة</p>
                    <p className="text-indigo-800 font-medium">{card.answer}</p>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AICompanionView;
