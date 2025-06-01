import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

export const uploadFile = async (file: File, path: string): Promise<string> => {
  try {
    // Create storage reference
    const storageRef = ref(storage, path);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadUrl = await getDownloadURL(snapshot.ref);
    
    return downloadUrl;
  } catch (error) {
    console.error('File upload error:', error);
    throw new Error('Failed to upload file');
  }
};

export const uploadProfilePicture = async (file: File, userId: string): Promise<string> => {
  const path = `profile-pictures/${userId}/${file.name}`;
  return uploadFile(file, path);
};

export const uploadDocument = async (file: File, type: string, referenceId: string): Promise<string> => {
  const path = `documents/${type}/${referenceId}/${file.name}`;
  return uploadFile(file, path);
};

export const uploadMonitoringPhoto = async (file: File, reportId: string): Promise<string> => {
  const path = `monitoring-photos/${reportId}/${file.name}`;
  return uploadFile(file, path);
};