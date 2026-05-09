import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function InstallPWA() {
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
    if (outcome === 'accepted') {
      setSupportsPWA(false);
    }
  };

  if (!supportsPWA || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-600 text-white rounded-full shadow-[0_8px_30px_rgba(22,163,74,0.4)] flex items-center justify-center border-2 border-white/20"
        aria-label="تثبيت التطبيق"
        title="تثبيت التطبيق"
      >
        <Plus className="w-8 h-8" />
      </motion.button>
    </AnimatePresence>
  );
}
