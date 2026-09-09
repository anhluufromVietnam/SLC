# Firebase Realtime Database - Cấu trúc và Dữ liệu

## 1. Cấu trúc Database (Database Schema)

### Firebase Realtime DB: `suleco-demo-default-rtdb`

```
suleco-demo-default-rtdb
├── students/                    # Hồ sơ học viên
│   ├── ST-001/ { code, fullName, gender, ... }
│   ├── ST-002/
│   └── ST-003/
│
├── applications/                # Hồ sơ tuyển sinh
│   ├── AP-001/ { code, applicantName, status, ... }
│   └── AP-002/
│
├── orders/                     # Đơn hàng tuyển dụng
│   ├── OD-001/ { code, partnerId, position, quantity, ... }
│   └── OD-002/
│
├── partners/                   # Đối tác Nhật Bản
│   ├── PT-001/ { code, name, contactPerson, ... }
│   └── PT-002/
│
├── japanWorkforce/             # Lực lượng đang làm việc tại Nhật
│   └── JW-001/ { code, studentId, partnerId, status, ... }
│
├── courses/                    # Chương trình đào tạo
│   ├── CR-001/ { code, name, level, tuitionFee, ... }
│   ├── CR-002/
│   └── CR-003/
│
├── classes/                    # Lớp học
│   ├── CL-001/ { code, courseId, teacherName, ... }
│   └── CL-002/
│
├── classSchedules/             # Lịch học
│   ├── CS-001/ { code, classId, date, room, ... }
│   ├── CS-002/
│   └── CS-003/
│
├── learningMaterials/          # Học liệu
│   ├── LM-001/ { code, name, type, ... }
│   └── LM-002/
│
├── examBank/                   # Ngân hàng đề thi
│   ├── EB-001/ { code, name, level, ... }
│   └── EB-002/
│
├── examSessions/               # Kỳ thi
│   └── ES-001/ { code, examId, date, ... }
│
├── grades/                     # Điểm số
│   ├── GR-001/ { code, studentId, score, ... }
│   └── GR-002/
│
├── certificates/               # Chứng chỉ
│   └── CE-001/ { code, studentId, type, ... }
│
├── dormRooms/                  # Phòng KTX
│   ├── DR-001/ { code, building, capacity, ... }
│   ├── DR-002/
│   └── DR-003/
│
├── residences/                 # Hợp đồng cư trú
│   ├── RC-001/ { code, studentId, roomId, ... }
│   ├── RC-002/
│   └── RC-003/
│
├── serviceTickets/             # Yêu cầu dịch vụ
│   ├── SV-001/ { code, reporter, type, ... }
│   └── SV-002/
│
├── accounting/                 # Module Tài chính
│   ├── transactions/           # Giao dịch thu chi
│   │   ├── TR-001/ { code, type, amount, ... }
│   │   ├── TR-002/
│   │   └── TR-003/
│   │
│   ├── tuition/               # Học phí
│   │   ├── TU-001/ { code, studentId, amount, ... }
│   │   ├── TU-002/
│   │   └── TU-003/
│   │
│   ├── debts/                 # Công nợ
│   │   ├── DB-001/ { code, debtorId, amount, ... }
│   │   ├── DB-002/
│   │   └── DB-003/
│   │
│   └── bankAccounts/          # Tài khoản ngân hàng (MỚI)
│       ├── TK-001/ { code, bank, accountNumber, ... }
│       ├── TK-002/
│       └── TK-003/
│
├── reports/                    # Báo cáo
│   ├── RP-001/ { code, name, type, ... }
│   └── RP-002/
│
├── operations/                  # Điều hành công việc
│   ├── OP-001/ { code, title, assignedTo, ... }
│   ├── OP-002/
│   └── OP-003/
│
└── system/                     # Quản trị hệ thống
    ├── users/                  # Người dùng
    │   ├── admin/ { uid, email, role, ... }
    │   ├── user-001/
    │   └── user-002/
    │
    ├── roles/                  # Vai trò
    │   ├── admin/ { key, label, permissions, ... }
    │   ├── student-affairs/
    │   ├── accounting/
    │   ├── training/
    │   ├── teacher/
    │   ├── dormitory/
    │   └── japan/
    │
    ├── auditLogs/              # Nhật ký hệ thống
    │   ├── AL-001/ { code, userId, action, ... }
    │   └── AL-002/
    │
    └── settings/              # Cấu hình
        ├── org/ { key, group, value, ... }
        ├── firebase/
        ├── notification/
        └── backup/
```

## 2. Quan hệ giữa các Collection (Entity Relationships)

```
┌─────────────────────────────────────────────────────────────────┐
│                       RECRUITMENT MODULE                         │
├─────────────────────────────────────────────────────────────────┤
│  applications ──┐                                               │
│                  ├──> students (trúng tuyển → tạo hồ sơ)        │
│  orders ───────────> partners                                   │
│                  └──> japanWorkforce (hồ sơ XKLĐ)               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        TRAINING MODULE                           │
├─────────────────────────────────────────────────────────────────┤
│  courses ──> classes ──> classSchedules                         │
│           │              └──> grades (điểm số)                   │
│           └──> learningMaterials                                │
│  examBank ──> examSessions ──> grades                           │
│                                     └──> certificates           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                       DORMITORY MODULE                           │
├─────────────────────────────────────────────────────────────────┤
│  dormRooms <── residences (hợp đồng cư trú)                     │
│                └──> students                                    │
│  serviceTickets ──> dormRooms, students                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                       FINANCE MODULE                             │
├─────────────────────────────────────────────────────────────────┤
│  accounting/transactions ──> bankAccounts                       │
│  accounting/tuition ──> students                                │
│  accounting/debts ──> students                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 3. Chi tiết từng Collection

### 3.1. `students` - Hồ sơ học viên
```typescript
type Student = {
  code: string              // Mã học viên: ST-001
  fullName: string          // Họ và tên
  gender: 'Nam' | 'Nữ'
  dateOfBirth: string       // YYYY-MM-DD
  phone: string
  email: string
  address: string
  enrolledDate: string      // Ngày nhập học
  currentLevel: string      // N3, N4, Kaigo
  status: 'Đang học' | 'Nợ học phí' | 'Đã tốt nghiệp' | 'Đã nghỉ'
  classId: string           // FK → classes
  courses: string[]         // Danh sách khóa học
  tuitionBalance: number    // Số tiền nợ
  dormitoryContractId: string | null  // FK → residences
  createdAt: string         // ISO 8601
  updatedAt: string
}
```

### 3.2. `applications` - Hồ sơ tuyển sinh
```typescript
type Application = {
  code: string
  applicantName: string
  applicantPhone: string
  applicantEmail: string
  applicationDate: string
  source: 'Website' | 'Giới thiệu' | 'Facebook' | 'Sự kiện'
  programType: 'Kaigo' | 'Tokutei' | 'Kỹ sư'
  targetLevel: string
  status: 'Mới' | 'Đang phỏng vấn' | 'Đã trúng tuyển' | 'Không đạt'
  assignedCounselor: string
  notes: string
  interviewDate: string
  interviewResult: 'Pass' | 'Fail' | null
  studentId: string | null  // FK → students (nếu trúng tuyển)
  createdAt: string
  updatedAt: string
}
```

### 3.3. `accounting/transactions` - Giao dịch thu chi
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

### 3.4. `accounting/bankAccounts` - Tài khoản ngân hàng (MỚI)
```typescript
type BankAccount = {
  code: string              // TK-001
  bank: string              // Vietcombank, BIDV, Techcombank, MB Bank
  accountNumber: string
  accountName: string       // Chủ tài khoản
  branch: string            // Chi nhánh
  type: 'Thanh toán' | 'Tiết kiệm'
  status: 'Đang sử dụng' | 'Đợi kích hoạt' | 'Ngừng hoạt động'
  balance: number           // Số dư
  currency: 'VND' | 'JPY' | 'USD'
  createdAt: string
  updatedAt: string
}
```

## 4. Security Rules (Firebase Realtime Database)

```json
{
  "rules": {
    "students": {
      ".read": "auth != null && data.parent().child('system').child('roles').child(auth.token.role).exists()",
      ".write": "auth != null && auth.token.role === 'admin'"
    },
    "applications": {
      ".read": "auth != null",
      ".write": "auth != null && (auth.token.role === 'admin' || auth.token.role === 'student-affairs')"
    },
    "accounting": {
      ".read": "auth != null && (auth.token.role === 'admin' || auth.token.role === 'accounting')",
      ".write": "auth != null && (auth.token.role === 'admin' || auth.token.role === 'accounting')"
    },
    "system": {
      ".read": "auth != null && auth.token.role === 'admin'",
      ".write": "auth != null && auth.token.role === 'admin'"
    }
  }
}
```

## 5. Chạy Seed Data

### 5.1. Cài đặt dependencies
```bash
npm install tsx --save-dev
```

### 5.2. Chạy script seed
```bash
npx tsx scripts/seed-firebase.ts
```

### 5.3. Kiểm tra kết quả
Mở Firebase Console: https://console.firebase.google.com/project/suleco-demo/database

## 6. Local JSON Structure (file seed-data.ts)

Để sync dễ dàng giữa local và Firebase, chúng ta export toàn bộ data mockup ra 1 file TypeScript:

```typescript
// lib/data/seed-data.ts
export const seedData = {
  students: { ... },
  applications: { ... },
  // ... all other collections
}
```

### 6.1. Lợi ích của cấu trúc này
- ✅ Dễ dàng sync giữa local mockup và Firebase
- ✅ Có thể dùng cho cả mock data khi chạy local và Firebase production
- ✅ Tự động generate TypeScript types
- ✅ Dễ dàng seed/refresh data

### 6.2. Import vào components
```typescript
// Use in components
import { seedData } from '@/lib/data/seed-data'
const students = Object.values(seedData.students)
```

## 7. Indexes (Firebase Realtime Database)

Firebase tự động index theo `.indexOn` rule:

```json
{
  "rules": {
    "students": {
      ".indexOn": ["code", "status", "classId"]
    },
    "classes": {
      ".indexOn": ["code", "courseId", "status"]
    },
    "accounting/transactions": {
      ".indexOn": ["code", "type", "date", "status"]
    }
  }
}
```

## 8. Data Migration Strategy

### 8.1. Seed lần đầu
```bash
npx tsx scripts/seed-firebase.ts
```

### 8.2. Reset và seed lại (xóa hết data cũ)
```bash
# Xóa node root và seed lại
firebase database:remove / --project suleco-demo
npx tsx scripts/seed-firebase.ts
```

### 8.3. Merge data (không xóa data cũ)
Chỉnh script để chỉ update những node cần thiết thay vì overwrite toàn bộ.

---

**Lưu ý:** File `lib/data/seed-data.ts` chứa toàn bộ mock data với đầy đủ các field, types và relationships. Có thể sử dụng cho cả development lẫn production.
