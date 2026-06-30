import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/firebase/config';
import { generateId } from '@/utils';
import { MAX_IMAGE_SIZE, SUPPORTED_IMAGE_TYPES } from '@/constants';

/** Upload an image to Firebase Storage */
export async function uploadQuestionImage(file: File): Promise<string> {
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('ファイルサイズが5MBを超えています');
  }

  if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('サポートされていないファイル形式です');
  }

  const extension = file.name.split('.').pop() || 'jpg';
  const fileName = `${generateId()}.${extension}`;
  const storageRef = ref(storage, `questions/${fileName}`);

  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

/** Delete an image from Firebase Storage */
export async function deleteQuestionImage(url: string): Promise<void> {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch {
    // Image may not exist, ignore
  }
}
