# Hướng dẫn Seed Data vào Firebase

## Vấn đề hiện tại
Lỗi `PERMISSION_DENIED` xảy ra vì Security Rules yêu cầu authentication, nhưng script seed đang chạy từ client-side không có auth token.

## Giải pháp

### Cách 1: Tạm thời mở Security Rules (Nhanh nhất)

1. Mở Firebase Console: https://console.firebase.google.com/project/suleco-demo/database/rules
2. Thay thế rules hiện tại bằng:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
3. Click "Publish"
4. Chạy seed script:
```bash
npm run seed
```
5. **QUAN TRỌNG**: Restore lại rules bảo mật sau khi seed xong:
```json
{
  "rules": {
    "students": {
      ".read": "auth != null",
      ".write": "auth != null && auth.token.role === 'admin'"
    },
    "applications": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "accounting": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "system": {
      ".read": "auth != null && auth.token.role === 'admin'",
      ".write": "auth != null && auth.token.role === 'admin'"
    },
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

### Cách 2: Sử dụng Firebase Admin SDK (An toàn hơn)

Cài đặt Firebase Admin SDK:
```bash
npm install firebase-admin
```

Tạo service account key:
1. Vào Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Save file JSON vào `scripts/service-account-key.json` (KHÔNG COMMIT FILE NÀY!)

Tạo script seed với Admin SDK:
```typescript
// scripts/seed-admin.ts
import { initializeApp, cert } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'
import { seedData } from '../lib/data/seed-data'
import serviceAccount from './service-account-key.json'

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://suleco-demo-default-rtdb.firebaseio.com'
})

const db = getDatabase()

async function seedFirebase() {
  console.log('🌱 Starting Firebase seeding with Admin SDK...\n')
  
  for (const [path, data] of Object.entries(seedData)) {
    try {
      await db.ref(path).set(data)
      console.log(`✓ ${path}`)
    } catch (error) {
      console.error(`✗ ${path}:`, error)
    }
  }
  
  console.log('\n✅ Seeding complete!')
  process.exit(0)
}

seedFirebase()
```

### Cách 3: Import trực tiếp từ Firebase Console

1. Export seed data ra JSON file:
```bash
npx tsx -e "import { seedData } from './lib/data/seed-data'; console.log(JSON.stringify(seedData, null, 2))" > seed-data.json
```

2. Vào Firebase Console → Realtime Database → ⋮ (3 dots) → Import JSON
3. Upload file `seed-data.json`

## Kiểm tra sau khi seed

1. Mở Firebase Console
2. Kiểm tra dữ liệu tại: https://console.firebase.google.com/project/suleco-demo/database/data
3. Verify các collection đã có data

## Verify trong App

Chạy dev server:
```bash
npm run dev
```

Mở trình duyệt và kiểm tra:
- http://localhost:3000 → Finance → Transactions
- http://localhost:3000 → Finance → Bank Accounts (MỚI)
- http://localhost:3000 → Learners → Student List

## Lưu ý quan trọng

1. **KHÔNG BAO GIỜ commit file `service-account-key.json` vào Git**
2. Thêm vào `.gitignore`:
```
service-account-key.json
*-key.json
```
3. Sau khi seed xong, restore lại security rules
4. Với production database, luôn sử dụng Admin SDK hoặc Firebase CLI
