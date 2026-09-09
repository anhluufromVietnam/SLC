import { child, get, onValue, ref, set, type Unsubscribe } from 'firebase/database'
import { realtimeDb } from './client'
import type { RealtimePaths } from '@/lib/types'

export const realtimePaths: Record<RealtimePaths, string> = {
  presence: 'presence/{uid}', notifications: 'notifications/{uid}', lessonProgress: 'lessonProgress/{uid}/{lessonId}', uploadStatus: 'uploadStatus/{uploadId}', fileMetadata: 'fileMetadata/{fileId}',
}

export const rtdbPath = {
  module: (path: string) => path,
  access: (role: string) => `accessControl/${role}/menus`,
  user: (uid: string) => `users/${uid}`,
}

export function subscribeToPath<T>(path: string, onChange: (value: T | null) => void): Unsubscribe {
  if (!realtimeDb) return () => undefined
  return onValue(ref(realtimeDb, path), (snapshot) => onChange(snapshot.val() as T | null))
}

export async function readRealtime<T>(path: string): Promise<T | null> {
  if (!realtimeDb) return null
  const snapshot = await get(child(ref(realtimeDb), path))
  return snapshot.exists() ? snapshot.val() as T : null
}

export async function writeRealtime<T>(path: string, value: T) {
  if (!realtimeDb) throw new Error('Firebase Realtime Database is not configured')
  await set(ref(realtimeDb, path), value)
}
