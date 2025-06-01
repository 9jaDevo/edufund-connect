import { messaging } from '../lib/firebase';
import { getToken, onMessage } from 'firebase/messaging';
import { showToast } from '../components/ui/Toast';

export const initializeNotifications = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
      });
      
      // Send token to backend
      await fetch('/api/notifications/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      
      // Handle foreground messages
      onMessage(messaging, (payload) => {
        showToast.info(payload.notification?.body || 'New notification');
      });
    }
  } catch (error) {
    console.error('Failed to initialize notifications:', error);
  }
};

export const sendNotification = async (userId: string, message: string) => {
  try {
    await fetch('/api/notifications/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, message })
    });
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
};