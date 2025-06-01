import { supabase } from '../lib/supabase';

export const uploadFile = async (file: File, path: string): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};

export const uploadProfilePicture = async (file: File, userId: string): Promise<string> => {
  return uploadFile(file, `profile-pictures/${userId}`);
};

export const uploadDocument = async (file: File, type: string, referenceId: string): Promise<string> => {
  return uploadFile(file, `documents/${type}/${referenceId}`);
};

export const uploadMonitoringPhoto = async (file: File, reportId: string): Promise<string> => {
  return uploadFile(file, `monitoring-photos/${reportId}`);
};