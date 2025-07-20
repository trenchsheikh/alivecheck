import React, { useState } from 'react';
import { Home, Clock, Settings, Calculator } from 'lucide-react';

// Types
interface CheckIn {
  timestamp: number;
  status: 'safe' | 'not_safe';
  secretWord: string;
  contactId?: number;
}
interface Contact {
  id: number;
  name: string;
  method: string;
  value: string;
}

// Translations
const translations = {
  en: {
    appName: 'Alive Check',
    subtitle: 'Quick Safety Check-in',
    safe: "I'm Safe!",
    notSafe: "I'm Not Safe",
    enterSecret: 'Enter secret word',
    confirm: 'Confirm',
    cancel: 'Cancel',
    lastCheckinSafe: 'Last check-in: SAFE',
    lastCheckinNotSafe: 'Last check-in: NOT SAFE',
    secretWord: 'Secret Word',
    checkinHistory: 'Check-in History',
    noCheckins: 'No check-ins yet!',
    startPrompt: 'Start by hitting that big green or red button!',
    safeCheckin: 'Safe Check-in',
    notSafeCheckin: 'Not Safe',
    settings: 'Settings',
    trustedContacts: 'Trusted Contacts',
    contactName: 'Contact name',
    contactInfo: 'Contact info',
    addContact: 'Add Contact',
    darkMode: 'Dark Mode',
    light: 'Light',
    dark: 'Dark',
    stealthMode: 'Stealth Mode',
    disable: 'Disable',
    enable: 'Enable',
    calculator: 'Calculator',
    tapToReveal: 'Tap calculator icon 3x to reveal',
    home: 'Home',
    history: 'History',
    settingsNav: 'Settings',
    stealth: 'Stealth',
  },
  ar: {
    appName: 'تأكيد النجاة',
    subtitle: 'تسجيل السلامة السريع',
    safe: 'أنا بخير!',
    notSafe: 'لست بخير',
    enterSecret: 'أدخل كلمة السر',
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    lastCheckinSafe: 'آخر تسجيل: بخير',
    lastCheckinNotSafe: 'آخر تسجيل: لست بخير',
    secretWord: 'كلمة السر',
    checkinHistory: 'سجل التسجيلات',
    noCheckins: 'لا توجد تسجيلات بعد!',
    startPrompt: 'ابدأ بالضغط على الزر الأخضر أو الأحمر!',
    safeCheckin: 'تسجيل بخير',
    notSafeCheckin: 'تسجيل غير بخير',
    settings: 'الإعدادات',
    trustedContacts: 'جهات الاتصال الموثوقة',
    contactName: 'اسم جهة الاتصال',
    contactInfo: 'معلومات الاتصال',
    addContact: 'إضافة جهة اتصال',
    darkMode: 'الوضع الداكن',
    light: 'فاتح',
    dark: 'داكن',
    stealthMode: 'وضع التخفي',
    disable: 'إيقاف',
    enable: 'تفعيل',
    calculator: 'آلة حاسبة',
    tapToReveal: 'انقر على الآلة الحاسبة 3 مرات للكشف',
    home: 'الرئيسية',
    history: 'السجل',
    settingsNav: 'الإعدادات',
    stealth: 'تخفي',
  }
};

// Pages
const HomePage: React.FC<{
  checkIns?: CheckIn[];
  onCheckIn: (status: 'safe' | 'not_safe', secretWord: string, contactId?: number) => void;
  lang: 'en' | 'ar';
  contacts: Contact[];
}> = ({ checkIns = [], onCheckIn, lang, contacts }) => {
  const t = translations[lang];
  const lastCheckIn = checkIns.length > 0 ? checkIns[checkIns.length - 1] : undefined;
  const [showSecretPrompt, setShowSecretPrompt] = React.useState<null | 'safe' | 'not_safe'>(null);
  const [secretWord, setSecretWord] = React.useState('');
  const [selectedContact, setSelectedContact] = React.useState<number | undefined>(undefined);
  const handleButtonClick = (status: 'safe' | 'not_safe') => {
    setShowSecretPrompt(status);
    setSecretWord('');
    setSelectedContact(undefined);
  };
  const handleConfirm = () => {
    if (showSecretPrompt && secretWord.trim() && (contacts.length === 0 || selectedContact !== undefined)) {
      onCheckIn(showSecretPrompt, secretWord.trim(), selectedContact);
      setShowSecretPrompt(null);
      setSecretWord('');
      setSelectedContact(undefined);
    }
  };
  const handleCancel = () => {
    setShowSecretPrompt(null);
    setSecretWord('');
    setSelectedContact(undefined);
  };
  return (
    <div className="flex flex-1 min-h-0 flex-col items-center justify-center px-8">
      <div className="flex flex-row gap-8 items-center justify-center">
        {/* Safe Button */}
        <div className="relative">
          <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <button
            className="relative bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white text-2xl font-bold py-6 px-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300 animate-pulse"
            onClick={() => handleButtonClick('safe')}
            style={{
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.5), 0 20px 40px rgba(0, 0, 0, 0.2)'
            }}
          >
            {t.safe}
          </button>
        </div>
        {/* Not Safe Button */}
        <div className="relative">
          <div className="absolute inset-0 bg-red-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <button
            className="relative bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-2xl font-bold py-6 px-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300 animate-pulse"
            onClick={() => handleButtonClick('not_safe')}
            style={{
              boxShadow: '0 0 30px rgba(239, 68, 68, 0.5), 0 20px 40px rgba(0, 0, 0, 0.2)'
            }}
          >
            {t.notSafe}
          </button>
        </div>
      </div>
      {/* Secret Word Prompt */}
      {showSecretPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl flex flex-col items-center w-full max-w-xs">
            <h3 className={`text-xl font-bold mb-4 ${showSecretPrompt === 'safe' ? 'text-green-600 dark:text-green-200' : 'text-red-600 dark:text-red-300'}`}>{showSecretPrompt === 'safe' ? t.safe : t.notSafe}</h3>
            <input
              className="w-full p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-green-100 mb-4 focus:border-green-400 focus:outline-none"
              type="password"
              placeholder={t.enterSecret}
              value={secretWord}
              onChange={e => setSecretWord(e.target.value)}
              autoFocus
            />
            {/* Contact selection if contacts exist */}
            {contacts.length > 0 && (
              <select
                className="w-full p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-green-100 mb-4 focus:border-green-400 focus:outline-none"
                value={selectedContact ?? ''}
                onChange={e => setSelectedContact(Number(e.target.value))}
              >
                <option value="" disabled>{lang === 'ar' ? 'اختر جهة اتصال' : 'Select contact'}</option>
                {contacts.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.method}: {c.value})</option>
                ))}
              </select>
            )}
            <div className="flex gap-4 w-full">
              <button className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-2 px-4 rounded-lg hover:from-green-500 hover:to-green-700 transition-colors" onClick={handleConfirm} disabled={!secretWord.trim() || (contacts.length > 0 && selectedContact === undefined)}>
                {t.confirm}
              </button>
              <button className="flex-1 bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors" onClick={handleCancel}>
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
      {lastCheckIn && (
        <div className="mt-8 text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className={`text-sm font-semibold ${lastCheckIn.status === 'safe' ? 'text-green-600 dark:text-green-200' : 'text-red-600 dark:text-red-300'}`}>{lastCheckIn.status === 'safe' ? t.lastCheckinSafe : t.lastCheckinNotSafe}</div>
            <div className="text-lg font-semibold text-gray-800 dark:text-green-100">
              {new Date(lastCheckIn.timestamp).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-green-200 mt-1">{t.secretWord}: {'•'.repeat(lastCheckIn.secretWord.length)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const History: React.FC<{ checkIns: CheckIn[]; lang: 'en' | 'ar'; contacts: Contact[] }> = ({ checkIns, lang, contacts }) => {
  const t = translations[lang];
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white via-black via-green-600 to-red-600 bg-clip-text text-transparent">
        {translations[lang].checkinHistory}
      </h2>
      {checkIns.length === 0 ? (
        <div className="text-center">
          <div className="text-gray-500 dark:text-green-200 text-lg">{translations[lang].noCheckins}</div>
          <div className="text-gray-400 dark:text-green-300">{translations[lang].startPrompt}</div>
        </div>
      ) : (
        <ul className="space-y-4">
          {checkIns.slice().reverse().map((ci) => {
            const contact = ci.contactId !== undefined ? contacts.find(c => c.id === ci.contactId) : undefined;
            return (
              <li key={ci.timestamp} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${ci.status === 'safe' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <span className={`font-semibold text-lg ${ci.status === 'safe' ? 'text-black dark:text-green-200' : 'text-black dark:text-red-300'}`}>{ci.status === 'safe' ? translations[lang].safeCheckin : translations[lang].notSafeCheckin}</span>
                  </div>
                  <span className={`font-mono ${ci.status === 'safe' ? 'text-gray-600 dark:text-green-100' : 'text-red-600 dark:text-red-300'}`}>
                    {new Date(ci.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-green-200 mt-2">{t.secretWord}: {'•'.repeat(ci.secretWord.length)}</div>
                {contact && (
                  <div className="text-xs text-gray-700 dark:text-green-100 mt-1">
                    {lang === 'ar' ? 'تم الإرسال إلى: ' : 'Sent to: '}
                    <span className="font-semibold">{contact.name}</span> ({contact.method}: {contact.value})
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const SettingsPage: React.FC<{
  contacts: Contact[];
  onAddContact: (c: Omit<Contact, 'id'>) => void;
  onRemoveContact: (id: number) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  stealthMode: boolean;
  onToggleStealthMode: () => void;
  lang: 'en' | 'ar';
}> = ({ contacts, onAddContact, onRemoveContact, darkMode, onToggleDarkMode, stealthMode, onToggleStealthMode, lang }) => {
  const t = translations[lang];
  const [form, setForm] = useState<Omit<Contact, 'id'>>({ name: '', method: 'Email', value: '' });

  const handleSubmit = () => {
    if (!form.name || !form.value) return;
    onAddContact(form);
    setForm({ name: '', method: 'Email', value: '' });
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white via-black via-green-600 to-red-600 bg-clip-text text-transparent">
        {t.settings}
      </h2>
      
      <div className="mb-8">
        <h3 className="font-bold text-xl mb-4 flex items-center text-black dark:text-green-200">
          <span className="mr-2">{t.trustedContacts}</span>
        </h3>
        <div className="space-y-4 mb-6">
          <input 
            className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-green-100 focus:border-green-400 focus:outline-none transition-colors" 
            placeholder={t.contactName} 
            value={form.name} 
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} 
          />
          <select 
            className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-green-100 focus:border-green-400 focus:outline-none transition-colors" 
            value={form.method} 
            onChange={e => setForm(f => ({ ...f, method: e.target.value }))}
          >
            <option>📧 Email</option>
            <option>💬 Telegram</option>
            <option>📱 SMS</option>
          </select>
          <input 
            className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-green-100 focus:border-green-400 focus:outline-none transition-colors" 
            placeholder={t.contactInfo} 
            value={form.value} 
            onChange={e => setForm(f => ({ ...f, value: e.target.value }))} 
          />
          <button className="w-full bg-gradient-to-r from-white via-green-200 to-green-500 text-green-900 dark:text-green-900 font-bold py-4 px-6 rounded-2xl hover:from-green-100 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg" onClick={handleSubmit}>
            {t.addContact}
          </button>
        </div>
        
        <ul className="space-y-3">
          {contacts.map(c => (
            <li key={c.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="font-medium text-black dark:text-green-200">{c.name} ({c.method}: {c.value})</span>
              <button 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition-colors" 
                onClick={() => onRemoveContact(c.id)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <span className="font-semibold flex items-center text-black dark:text-green-200">
            <span className="mr-2">{darkMode ? '🌙' : '☀️'}</span>
            {t.darkMode}
          </span>
          <button 
            className={`py-2 px-6 rounded-xl font-bold transition-all duration-300 ${darkMode ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'bg-gray-800 text-white hover:bg-gray-900'}`} 
            onClick={onToggleDarkMode}
          >
            {darkMode ? t.light : t.dark}
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <span className="font-semibold flex items-center text-black dark:text-green-200">
            <span className="mr-2">🕵️</span>
            {t.stealthMode}
          </span>
          <button 
            className={`py-2 px-6 rounded-xl font-bold transition-all duration-300 ${stealthMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'}`} 
            onClick={onToggleStealthMode}
          >
            {stealthMode ? t.disable : t.enable}
          </button>
        </div>
      </div>
    </div>
  );
};

const StealthCalculator: React.FC<{ onReveal: () => void; lang: 'en' | 'ar' }> = ({ onReveal, lang }) => {
  const t = translations[lang];
  const [count, setCount] = useState(0);
  const tapRef = React.useRef(0);
  
  const handleLogoClick = () => {
    tapRef.current += 1;
    if (tapRef.current >= 3) {
      onReveal();
      tapRef.current = 0;
    }
  };
  
  return (
    <div className="p-8 max-w-md mx-auto flex flex-col items-center">
      <div className="mb-6 cursor-pointer transform hover:scale-110 transition-transform" onClick={handleLogoClick} title="Triple-tap to reveal app">
        <span className="text-6xl text-black dark:text-green-200">🧮</span>
      </div>
      <div className="mb-6 text-2xl font-bold text-center text-black dark:text-green-200">{t.calculator}</div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-bold text-2xl w-12 h-12 rounded-xl transition-colors" 
            onClick={() => setCount(c => c + 1)}
          >
            +
          </button>
          <div className="text-3xl font-mono w-20 text-center bg-gray-100 dark:bg-gray-700 rounded-xl py-2 text-black dark:text-green-200">
            {count}
          </div>
          <button 
            className="bg-red-500 hover:bg-red-600 text-white font-bold text-2xl w-12 h-12 rounded-xl transition-colors" 
            onClick={() => setCount(c => c - 1)}
          >
            -
          </button>
        </div>
        <div className="text-xs text-gray-500 dark:text-green-200 text-center">{t.tapToReveal}</div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [stealthMode, setStealthMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  React.useEffect(() => {
    if (stealthMode) {
      setCurrentPage('stealth');
    }
  }, [stealthMode]);

  const handleCheckIn = (status: 'safe' | 'not_safe', secretWord: string, contactId?: number) => {
    setCheckIns((prev) => [...prev, { timestamp: Date.now(), status, secretWord, contactId }]);
  };

  const handleAddContact = (c: Omit<Contact, 'id'>) => {
    setContacts(prev => [...prev, { ...c, id: Date.now() }]);
  };
  
  const handleRemoveContact = (id: number) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const handleToggleDarkMode = () => setDarkMode(d => !d);
  const handleToggleStealthMode = () => setStealthMode(s => !s);
  const handleRevealApp = () => setStealthMode(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'history':
        return <History checkIns={checkIns} lang={language} contacts={contacts} />;
      case 'settings':
        return <SettingsPage contacts={contacts} onAddContact={handleAddContact} onRemoveContact={handleRemoveContact} darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} stealthMode={stealthMode} onToggleStealthMode={handleToggleStealthMode} lang={language} />;
      case 'stealth':
        return <StealthCalculator onReveal={handleRevealApp} lang={language} />;
      default:
        return <HomePage checkIns={checkIns} onCheckIn={handleCheckIn} lang={language} contacts={contacts} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-white to-red-200 dark:from-black dark:via-gray-900 dark:to-green-900" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="relative bg-gradient-to-r from-green-600 via-black to-red-600 text-white py-6 px-6 text-center shadow-2xl">
        <h1 className="text-3xl font-bold mb-2">{translations[language].appName}</h1>
        <p className="text-green-100 text-sm font-medium">{translations[language].subtitle}</p>
        <div className="absolute top-4 right-6">
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as 'en' | 'ar')}
            className="bg-white dark:bg-gray-900 text-black dark:text-green-200 border border-gray-300 dark:border-gray-700 rounded px-3 py-1 text-sm font-semibold shadow focus:outline-none"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {renderCurrentPage()}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 py-3 px-4 shadow-2xl">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 hover:bg-green-100 dark:hover:bg-gray-800 group ${currentPage === 'home' ? 'bg-green-100 dark:bg-gray-800' : ''}`}
          >
            <Home className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-green-600 dark:text-green-400 mt-1">{translations[language].home}</span>
          </button>
          <button 
            onClick={() => setCurrentPage('history')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 hover:bg-red-100 dark:hover:bg-gray-800 group ${currentPage === 'history' ? 'bg-red-100 dark:bg-gray-800' : ''}`}
          >
            <Clock className="w-6 h-6 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-red-600 dark:text-red-400 mt-1">{translations[language].history}</span>
          </button>
          <button 
            onClick={() => setCurrentPage('settings')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 hover:bg-black/10 dark:hover:bg-green-900 group ${currentPage === 'settings' ? 'bg-black/10 dark:bg-green-900' : ''}`}
          >
            <Settings className="w-6 h-6 text-black dark:text-green-300 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-black dark:text-green-300 mt-1">{translations[language].settingsNav}</span>
          </button>
          <button 
            onClick={() => setCurrentPage('stealth')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 hover:bg-green-50 dark:hover:bg-black group ${currentPage === 'stealth' ? 'bg-green-50 dark:bg-black' : ''}`}
          >
            <Calculator className="w-6 h-6 text-green-700 dark:text-green-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-green-700 dark:text-green-400 mt-1">{translations[language].stealth}</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;