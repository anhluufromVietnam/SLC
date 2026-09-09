# Suleco data architecture

## Hybrid model
- Firebase Realtime Database: operational state, permissions, presence, notifications, progress, status changes.
- Firebase Storage: binary files and documents. RTDB stores metadata only (`storagePath`, `mimeType`, `size`, `status`).
- Local `lib/data/mock.ts`: safe demo fixtures with the same shapes as Firebase records.
- `lib/firebase/realtime.ts`: typed read/write boundary. Keep UI components unaware of Firebase SDK details.

## Config
Copy `firebase/config.example.json` to a secure environment/config source. For Next.js, expose only `NEXT_PUBLIC_FIREBASE_*` values. Never commit service-account JSON or admin SDK credentials.

## Suggested RTDB tree
```text
accessControl/{role}/menus/{moduleId}: true
users/{uid}: { role, department, displayName, status }
students/{studentId}: { masterId, profile, enrollment, documents }
courses/{courseId}: { code, title, status }
classes/{classId}/members/{studentId}: true
japanApplications/{applicationId}: { studentId, partnerId, stage, updatedAt }
dormitory/{roomId}/occupants/{studentId}: true
accounting/{transactionId}: { studentId, type, amount, status }
notifications/{uid}/{notificationId}: { title, read, createdAt }
```

## Module contract
Each module has a file under `components/modules`, a registry entry under `lib/modules/registry.ts`, and one `dataPath`. Add query/mutation functions in `lib/firebase/realtime.ts`, then switch the module from mock to realtime without changing the navigation shell.

## Security
Use Firebase Auth custom claims for coarse role checks and RTDB rules for every path. Never trust a client-side checkbox as authorization; the Admin UI only edits the server-side access policy.
