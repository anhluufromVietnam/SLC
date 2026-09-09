import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set } from 'firebase/database'
import { seedData } from '../lib/data/seed-data'

const firebaseConfig = {
  apiKey: 'AIzaSyBmKZ6qhV0XD5k5oCDwueNqUJBx0uwjxA8',
  authDomain: 'suleco-demo.firebaseapp.com',
  databaseURL: 'https://suleco-demo-default-rtdb.firebaseio.com',
  projectId: 'suleco-demo',
  storageBucket: 'suleco-demo.firebasestorage.app',
  messagingSenderId: '1020630124866',
  appId: '1:1020630124866:web:a8e1e2e83f682ea1a3a0db',
}

type SeedNode = { [key: string]: unknown }

function extractNodesByPath(data: typeof seedData, basePath: string): SeedNode[] {
  const result: SeedNode[] = []
  
  for (const [key, value] of Object.entries(data)) {
    const path = basePath ? `${basePath}/${key}` : key
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const hasNestedObjects = Object.values(value).some(v => typeof v === 'object' && v !== null && !Array.isArray(v))
      
      if (hasNestedObjects) {
        result.push(...extractNodesByPath(value as typeof seedData, path))
      } else {
        result.push({ path, data: value })
      }
    }
  }
  
  return result
}

async function seedFirebase() {
  console.log('🌱 Starting Firebase seeding...\n')
  
  const app = initializeApp(firebaseConfig)
  const db = getDatabase(app)
  
  const nodes = extractNodesByPath(seedData, '')
  
  for (const node of nodes) {
    const { path, data } = node
    try {
      const nodeRef = ref(db, path)
      await set(nodeRef, data)
      const count = Object.keys(data as object).length
      console.log(`✓ ${path} (${count} records)`)
    } catch (error) {
      console.error(`✗ ${path}:`, error instanceof Error ? error.message : String(error))
    }
  }
  
  console.log('\n✅ Seeding complete!')
  console.log(`📊 Check your Firebase console: ${firebaseConfig.databaseURL}`)
  process.exit(0)
}

seedFirebase().catch((error) => {
  console.error('❌ Seeding failed:', error)
  process.exit(1)
})
