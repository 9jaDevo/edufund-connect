import { supabase } from '../lib/supabase';
import { showToast } from '../components/ui/Toast';

export const subscribeToNotifications = (userId: string) => {
  const channel = supabase
    .channel(`user_notifications:${userId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`,
    }, (payload) => {
      showToast.info(payload.new.message);
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

export const sendNotification = async (userId: string, message: string, type: string) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        message,
        type,
      });

    if (error) throw error;
  } catch (error) {
    console.error('Failed to send notification:', error);
    throw error;
  }
};