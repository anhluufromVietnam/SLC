# Firebase Realtime Database - Complete Structure

## 🎉 Tổng quan

Đã tạo và seed thành công **26 collections** vào Firebase Realtime Database với đầy đủ dữ liệu mockup.

## 1. Database Structure (Firebase Realtime DB)

**Project:** `suleco-demo-default-rtdb`  
**Console:** https://console.firebase.google.com/project/suleco-demo/database/data

```
suleco-demo-default-rtdb
│
├── 📚 students/ (5 records)                    # Hồ sơ học viên
│   ├── ST-001 { code, fullName, gender, dateOfBirth, phone, email, address, enrolledDate, currentLevel, status, classId, courses, tuitionBalance, dormitoryContractId, ... }
│   ├── ST-002
│   ├── ST-003
│   ├── ST-004
│   └── ST-005
│
├── 📝 applications/ (2 records)                # Hồ sơ tuyển sinh
│   ├── AP-001 { code, applicantName, applicantPhone, source, programType, status, interviewDate, interviewResult, studentId, ... }
│   └── AP-002
│
├── 📦 orders/ (2 records)                       # Đơn hàng tuyển dụng
│   ├── OD-001 { code, partnerId, position, quantity, filled, requirements, salary, location, status, deadline, ... }
│   └── OD-002
│
├── 🏢 partners/ (2 records)                    # Đối tác Nhật Bản
│   ├── PT-001 { code, name, type, address, contactPerson, contactPhone, contractStartDate, ... }
│   └── PT-002
│
├── 🎌 japanWorkforce/ (1 record)               # Lực lượng XKLĐ tại Nhật
│   └── JW-001 { code, studentId, partnerId, position, departureDate, status, visaType, ... }
│
├── 📖 courses/ (3 records)                     # Chương trình đào tạo
│   ├── CR-001 { code, name, level, duration, tuitionFee, materials, ... }
│   ├── CR-002
│   └── CR-003
│
├── 🏫 classes/ (2 records)                     # Lớp học
│   ├── CL-001 { code, name, courseId, teacherId, maxStudents, currentStudents, schedule, ... }
│   └── CL-002
│
├── 📅 classSchedules/ (3 records)              # Lịch học
│   ├── CS-001 { code, classId, date, room, lesson, status, attendanceStatus, ... }
│   ├── CS-002
│   └── CS-003
│
├── 📚 learningMaterials/ (2 records)           # Học liệu
│   ├── LM-001 { code, name, type, category, version, fileSize, accessRoles, ... }
│   └── LM-002
│
├── 📋 examBank/ (2 records)                    # Ngân hàng đề thi
│   ├── EB-001 { code, name, level, totalQuestions, duration, ... }
│   └── EB-002
│
├── ✍️ examSessions/ (1 record)                 # Kỳ thi
│   └── ES-001 { code, name, examId, date, room, supervisors, ... }
│
├── 📊 grades/ (2 records)                      # Điểm số
│   ├── GR-001 { code, studentId, examSessionId, score, passed, gradedBy, ... }
│   └── GR-002
│
├── 🏆 certificates/ (1 record)                 # Chứng chỉ
│   └── CE-001 { code, studentId, type, issueDate, templateId, ... }
│
├── 🏠 dormRooms/ (3 records)                   # Phòng KTX
│   ├── DR-001 { code, building, floor, type, capacity, occupied, ... }
│   ├── DR-002
│   └── DR-003
│
├── 🛏️ residences/ (3 records)                 # Hợp đồng cư trú
│   ├── RC-001 { code, studentId, roomId, bedNumber, startDate, monthlyFee, ... }
│   ├── RC-002
│   └── RC-003
│
├── 🛠️ serviceTickets/ (2 records)             # Yêu cầu dịch vụ
│   ├── SV-001 { code, reporter, type, category, room, title, priority, ... }
│   └── SV-002
│
├── 💰 accounting/                               # Module Tài chính
│   ├── transactions/ (3 records)               # Giao dịch thu chi
│   │   ├── TR-001 { code, type, date, description, amount, direction, reconcileStatus, ... }
│   │   ├── TR-002
│   │   └── TR-003
│   │
│   ├── tuition/ (3 records)                    # Học phí
│   │   ├── TU-001 { code, studentId, plan, amount, paid, dueDate, status, ... }
│   │   ├── TU-002
│   │   └── TU-003
│   │
│   ├── debts/ (3 records)                      # Công nợ
│   │   ├── DB-001 { code, debtorId, origin, amount, reminderCount, status, ... }
│   │   ├── DB-002
│   │   └── DB-003
│   │
│   └── bankAccounts/ (3 records)               # ⭐ Tài khoản ngân hàng (MỚI)
│       ├── TK-001 { code, bank, accountNumber, accountName, type, balance, ... }
│       ├── TK-002
│       └── TK-003
│
├── 📈 reports/ (2 records)                     # Báo cáo
│   ├── RP-001 { code, name, type, period, status, ... }
│   └── RP-002
│
├── ⚙️ operations/ (3 records)                   # Điều hành công việc
│   ├── OP-001 { code, title, assignedTo, priority, slaDeadline, status, ... }
│   ├── OP-002
│   └── OP-003
│
└── 🔐 system/                                   # Quản trị hệ thống
    ├── users/ (3 records)                      # Người dùng
    │   ├── admin { uid, email, role, status, ... }
    │   ├── user-001
    │   └── user-002
    │
    ├── roles/ (7 records)                      # Vai trò
    │   ├── admin { key, label, permissions, ... }
    │   ├── student-affairs
    │   ├── accounting
    │   ├── training
    │   ├── teacher
    │   ├── dormitory
    │   └── japan
    │
    ├── auditLogs/ (2 records)                  # Nhật ký hệ thống
    │   ├── AL-001 { code, timestamp, userId, action, entity, description, ... }
    │   └── AL-002
    │
    └── settings/ (4 records)                   # Cấu hình
        ├── org { key, group, value: { name, taxCode, address, ... } }
        ├── firebase
        ├── notification
        └── backup
```

## 2. Entity Relationships

```
┌──────────────────────── RECRUITMENT MODULE ────────────────────────┐
│                                                                       │
│  applications ──┐                                                    │
│                  ├──> students (trúng tuyển → tạo hồ sơ)             │
│  orders ───────────> partners                                         │
│                  └──> japanWorkforce (hồ sơ XKLĐ)                    │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘

┌──────────────────────── TRAINING MODULE ─────────────────────────────┐
│                                                                       │
│  courses ──> classes ──> classSchedules                              │
│           │              └──> grades (điểm số)                        │
│           └──> learningMaterials                                       │
│                                                                       │
│  examBank ──> examSessions ──> grades                                │
│                                     └──> certificates                 │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘

┌──────────────────────── DORMITORY MODULE ───────────────────────────┐
│                                                                       │
│  dormRooms <── residences (hợp đồng cư trú)                          │
│                └──> students                                          │
│  serviceTickets ──> dormRooms, students                              │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘

┌──────────────────────── FINANCE MODULE ──────────────────────────────┐
│                                                                       │
│  accounting/transactions ──> bankAccounts                            │
│  accounting/tuition ──> students                                      │
│  accounting/debts ──> students                                         │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

## 3. Chi tiết từng Collection

### 3.1. `students` - Hồ sơ học viên (5 records)

**Fields:**
```typescript
type Student = {
  code: string              // ST-001
  fullName: string          // Nguyễn Minh Anh
  gender: 'Nam' | 'Nữ'
  dateOfBirth: string       // 1998-05-12
  phone: string             // 0912345678
  email: string
  address: string
  enrolledDate: string      // Ngày nhập học
  currentLevel: 'N3' | 'N4' | 'Kaigo'
  status: 'Đang học' | 'Nợ học phí' | 'Đã tốt nghiệp' | 'Đã nghỉ'
  classId: string           // FK → classes
  courses: string[]         // ['N4 Intensive', 'Kaigo Basic']
  tuitionBalance: number    // Số tiền nợ (VND)
  dormitoryContractId: string | null  // FK → residences
  createdAt: string         // ISO 8601
  updatedAt: string
}
```

**Sample data:**
- ST-001: Nguyễn Minh Anh - N4, Đang học, Class K47A
- ST-002: Trần Nhật Nam - N4, Đang học, Class K47A
- ST-003: Lê Hoàng Yến - N3, Nợ học phí, Class K47B
- ST-004: Phạm Đức Long - N3, Đã tốt nghiệp
- ST-005: Trần Văn Khang - N4, Đang học

### 3.2. `accounting/transactions` - Giao dịch thu chi (3 records)

**Fields:**
```typescript
type Transaction = {
  code: string              // PT-2201 (Phiếu thu), PC-3301 (Phiếu chi)
  type: 'Phiếu thu' | 'Phiếu chi'
  date: string
  description: string
  amount: number            // Số tiền (VND)
  direction: 'income' | 'expense'
  reference: string | null  // FK đến entity liên quan
  paymentMethod: 'Tiền mặt' | 'Chuyển khoản'
  bankAccountId: string | null  // FK → bankAccounts
  reconcileStatus: 'Chờ đối soát' | 'Đã đối soát' | 'Chờ hóa đơn'
  status: 'Nháp' | 'Chờ duyệt' | 'Hoàn tất'
  createdBy: string
  createdAt: string
  updatedAt: string
}
```

**Sample data:**
- PT-2201: Phiếu thu 6,000,000đ - Học phí Nguyễn Minh Anh
- PC-3301: Phiếu chi 12,500,000đ - Mua thiết bị phòng A.203
- PT-2202: Phiếu thu 2,000,000đ - Phí KTX

### 3.3. `accounting/bankAccounts` - Tài khoản ngân hàng (3 records) ⭐ MỚI

**Fields:**
```typescript
type BankAccount = {
  code: string              // TK-001
  bank: string              // Vietcombank, BIDV, Techcombank, MB Bank
  accountNumber: string     // '1234567890'
  accountName: string       // 'CÔNG TY SULECO'
  branch: string            // Chi nhánh
  type: 'Thanh toán' | 'Tiết kiệm'
  status: 'Đang sử dụng' | 'Đợi kích hoạt' | 'Ngừng hoạt động'
  balance: number           // Số dư (VND)
  currency: 'VND' | 'JPY' | 'USD'
  createdAt: string
  updatedAt: string
}
```

**Sample data:**
- TK-001: Vietcombank - 1234567890 - Thanh toán - Đang sử dụng
- TK-002: BIDV - 9876543210 - Tiết kiệm - Đang sử dụng
- TK-003: Techcombank - 1122334455 - Thanh toán - Đợi kích hoạt

## 4. Local Structure (TypeScript)

### 4.1. File: `lib/data/seed-data.ts`

Tất cả dữ liệu mockup được export từ 1 file TypeScript:

```typescript
export const seedData = {
  students: { 'ST-001': {...}, 'ST-002': {...}, ... },
  applications: { ... },
  // ... tất cả collections khác
}
```

**Lợi ích:**
- ✅ Single source of truth cho mock data
- ✅ Type-safe với TypeScript
- ✅ Dễ dàng sync giữa local và Firebase
- ✅ Dùng cho cả development lẫn production seeding

### 4.2. File: `scripts/seed-admin.ts`

Script để seed data vào Firebase sử dụng Admin SDK:

```bash
npm run seed
```

**Yêu cầu:**
- File `scripts/service-account-key.json` từ Firebase Console
- Package `firebase-admin` đã được cài đặt

## 5. Commands

### 5.1. Seed data vào Firebase
```bash
npm run seed
```

### 5.2. Check Firebase Console
https://console.firebase.google.com/project/suleco-demo/database/data

### 5.3. Run dev server
```bash
npm run dev
```

### 5.4. Type checking
```bash
npm run typecheck
```

## 6. Features Implemented

✅ **Finance Module - Bank Accounts (MỚI)**
- File: `components/modules/finance/bank-accounts.tsx`
- Data path: `accounting/bankAccounts`
- Roles: `admin`, `accounting`
- Features: Danh sách TK, Loại tài khoản, Chi nhánh, Trạng thái

✅ **Complete Data Structure**
- 26 collections với đầy đủ mock data
- Entity relationships đã được thiết kế
- Type definitions cho tất cả entities

✅ **Seeding Script**
- Admin SDK integration
- Error handling
- Progress reporting

✅ **Documentation**
- Database structure
- Entity relationships
- Field definitions
- Sample data

## 7. Next Steps

**Để sử dụng trong app:**

1. Import seed data nếu cần mock data local:
```typescript
import { seedData } from '@/lib/data/seed-data'
const students = Object.values(seedData.students)
```

2. Subscribe to Firebase Realtime DB:
```typescript
import { subscribeToPath } from '@/lib/firebase/realtime'
subscribeToPath('students', (data) => {
  console.log('Students:', data)
})
```

3. Query từ Firebase:
```typescript
const db = getDatabase()
const studentsRef = ref(db, 'students')
onValue(studentsRef, (snapshot) => {
  const data = snapshot.val()
  // Process data
})
```

## 8. Security Rules (Recommended)

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
      ".read": "auth != null && (auth.token.role === 'admin' || auth.token.role === 'accounting')",
      ".write": "auth != null && auth.token.role === 'admin'"
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

---

**Last updated:** September 9, 2026  
**Status:** ✅ All 26 collections seeded successfully  
**Firebase Console:** https://console.firebase.google.com/project/suleco-demo/database/data
