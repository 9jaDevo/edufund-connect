import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ReCaptchaProvider } from './utils/security.tsx';
import './i18n/config';
import './index.css';

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, prompt user to refresh
                if (confirm('New version available! Refresh to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// PWA Install Prompt
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA install prompt triggered');
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show install button or banner
  showInstallPromotion();
});

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  // Hide install promotion
  hideInstallPromotion();
  // Clear the deferredPrompt
  deferredPrompt = null;
});

function showInstallPromotion() {
  // You can implement a custom install banner here
  console.log('Show install promotion');
  
  // Example: Create a simple install banner
  const installBanner = document.createElement('div');
  installBanner.id = 'install-banner';
  installBanner.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #0F766E;
    color: white;
    padding: 12px;
    text-align: center;
    z-index: 1000;
    font-family: Inter, sans-serif;
  `;
  installBanner.innerHTML = `
    <span>Install EduFund Connect for a better experience!</span>
    <button id="install-button" style="margin-left: 12px; background: white; color: #0F766E; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
      Install
    </button>
    <button id="dismiss-button" style="margin-left: 8px; background: transparent; color: white; border: 1px solid white; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
      Dismiss
    </button>
  `;
  
  document.body.appendChild(installBanner);
  
  // Add event listeners
  document.getElementById('install-button')?.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
      hideInstallPromotion();
    }
  });
  
  document.getElementById('dismiss-button')?.addEventListener('click', () => {
    hideInstallPromotion();
  });
}

function hideInstallPromotion() {
  const banner = document.getElementById('install-banner');
  if (banner) {
    banner.remove();
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReCaptchaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReCaptchaProvider>
  </StrictMode>
);