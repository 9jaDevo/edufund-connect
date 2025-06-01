import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ReCaptchaProvider } from './utils/security.tsx';
import './i18n/config';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReCaptchaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReCaptchaProvider>
  </StrictMode>
);