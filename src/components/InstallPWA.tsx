import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';

export default function InstallPWA() {
  // Set to true by default so the user can see the beautiful UI
  const [supportsPWA, setSupportsPWA] = useState(true); 
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      console.log('beforeinstallprompt triggered');
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    window.addEventListener('appinstalled', () => {
      setSupportsPWA(false);
      setIsDismissed(true);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = async () => {
    if (!promptInstall) {
      alert("لإضافة التطبيق، اضغط على زر المشاركة أو القائمة في متصفحك واختر 'إضافة للشاشة الرئيسية' (Add to Home Screen).");
      return;
    }
    promptInstall.prompt();
    const { outcome } = await promptInstall.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    if (outcome === 'accepted') {
      setSupportsPWA(false);
    }
  };

  const onDismiss = () => {
    setIsDismissed(true);
  };

  if (!supportsPWA || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 md:pb-4 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-20px_40px_rgba(0,0,0,0.15)] flex items-center justify-between gap-4"
        dir="rtl"
      >
        <div className="flex items-center gap-3">
          <img src="/tayebat.png" alt="شعار النظام" className="w-12 h-12 rounded-2xl shadow-sm border border-gray-100" />
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm md:text-base">تطبيق نظام الطيبات</span>
            <span className="text-xs text-gray-500 font-medium">أضفه للشاشة الرئيسية للوصول السريع</span>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={onDismiss}
            className="text-xs text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
          >
            لاحقاً
          </button>
          <button
            onClick={onClick}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded-full flex items-center gap-2 shadow-lg shadow-green-600/30 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            تثبيت
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
