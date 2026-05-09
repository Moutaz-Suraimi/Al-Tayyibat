import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share } from 'lucide-react';

export default function InstallPWA() {
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if dismissed previously
    const dismissed = localStorage.getItem('pwa-prompt-dismissed');
    // REMOVED FOR DEBUGGING: if (dismissed) { setIsDismissed(true); }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsInstalled(true);
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handler = (e: any) => {
      e.preventDefault();
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsDismissed(true);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = async () => {
    if (promptInstall) {
      promptInstall.prompt();
      const { outcome } = await promptInstall.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
    } else if (isIOS) {
      setShowIOSInstructions(true);
    } else {
      // Fallback for browsers that don't support beforeinstallprompt but aren't iOS
      alert("للتثبيت، يرجى الضغط على خيارات المتصفح (⋮) ثم اختيار 'الإضافة إلى الشاشة الرئيسية' (Add to Home screen)");
    }
  };

  const onDismiss = () => {
    setIsDismissed(true);
    setShowIOSInstructions(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  if (!mounted || isInstalled || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 150, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 pb-6 sm:p-6 sm:pb-8 pointer-events-none"
      >
        <div className="mx-auto max-w-md pointer-events-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.7)] rounded-2xl border border-gray-200/50 dark:border-white/10 p-4 flex flex-col gap-3 relative overflow-hidden">
          {/* Subtle green gradient background accent */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent pointer-events-none" />
          
          <button 
            onClick={onDismiss}
            className="absolute top-2 left-2 p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full transition-colors z-10"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-4 z-10">
            <img src="/tayebat.png" alt="نظام الطيبات" className="w-14 h-14 rounded-xl object-cover shadow-sm border border-black/5 dark:border-white/5" />
            
            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">نظام الطيبات</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                أضف التطبيق للشاشة الرئيسية للوصول السريع وبدون إنترنت
              </p>
            </div>
            
            <button
              onClick={onClick}
              className="shrink-0 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-green-600/20 flex items-center gap-2 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              تثبيت
            </button>
          </div>

          {showIOSInstructions && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="z-10 mt-1 p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-xl text-xs md:text-sm text-green-800 dark:text-green-300 flex flex-col gap-2"
            >
              <p className="font-semibold">لتثبيت التطبيق على جهازك:</p>
              <div className="flex items-center gap-2">
                <span>1. اضغط على زر المشاركة بالأسفل</span>
                <Share className="w-4 h-4 inline text-blue-500" />
              </div>
              <div>
                <span>2. ثم اختر <strong>"إضافة للشاشة الرئيسية"</strong> (Add to Home Screen)</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
