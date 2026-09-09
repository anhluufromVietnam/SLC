import { initializeApp, cert } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'
import * as fs from 'fs'
import * as path from 'path'
import { seedData } from '../lib/data/seed-data'

const serviceAccountPath = path.join(__dirname, 'service-account-key.json')

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ File service-account-key.json không tồn tại!')
  console.error('   Vui lòng tạo file từ Firebase Console:')
  console.error('   https://console.firebase.google.com/project/suleco-demo/settings/serviceaccounts/adminsdk')
  process.exit(1)
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://suleco-demo-default-rtdb.firebaseio.com'
})

const db = getDatabase()

async function seedFirebase() {
  console.log('🌱 Starting Firebase seeding with Admin SDK...\n')
  console.log(`📁 Processing ${Object.keys(seedData).length} collections...\n`)

  let successCount = 0
  let errorCount = 0

  for (const [path, data] of Object.entries(seedData)) {
    try {
      await db.ref(path).set(data)
      const recordCount = Object.keys(data as object).length
      console.log(`✓ ${path} (${recordCount} records)`)
      successCount++
    } catch (error) {
      console.error(`✗ ${path}:`, error instanceof Error ? error.message : String(error))
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`✅ Seeding complete!`)
  console.log(`   Success: ${successCount} collections`)
  console.log(`   Errors: ${errorCount} collections`)
  console.log('='.repeat(50))
  console.log(`\n📊 Check your Firebase console:`)
  console.log(`   https://console.firebase.google.com/project/suleco-demo/database/data`)
  
  process.exit(0)
}

seedFirebase().catch((error) => {
  console.error('❌ Seeding failed:', error)
  process.exit(1)
})
