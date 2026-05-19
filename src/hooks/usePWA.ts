import { useState, useEffect } from 'react';

export const usePWA = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      // For iOS, we can show a modal or just alert
      alert('To install on iOS, tap the Share button and then "Add to Home Screen".');
    } else {
      alert('PWA installation is supported in your browser. Look for the install prompt in the address bar!');
    }
  };

  return { deferredPrompt, handleInstall };
};