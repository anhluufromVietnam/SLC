# SULECO ERP — Hệ thống quản lý Trường Trung cấp SULECO

Hệ thống quản trị toàn diện cho trường trung cấp: tuyển sinh & XKLĐ Nhật Bản, đào tạo, khảo thí & chứng chỉ, ký túc xá, tài chính, báo cáo và phân quyền theo 9 vai trò.

## Chạy dự án

```bash
pnpm install
pnpm dev
```

Mở http://localhost:3000. Chưa cấu hình Firebase thì hệ thống chạy **Demo mode** (mock data) ngay.

## Chuyển vai trò demo

Dùng ô chọn vai trò ở góc phải thanh trên cùng. Mỗi vai trò có dashboard, menu và phân quyền riêng:

| Vai trò | Mô tả |
|---|---|
| Quản trị viên | Toàn bộ hệ thống |
| Công tác học viên | Hồ sơ, chăm sóc, ký túc xá, chứng chỉ |
| Nhật Bản (XKLĐ) | Đơn hàng, hồ sơ, đối tác, lực lượng tại Nhật |
| Phòng đào tạo | Khóa học, lớp, lịch học, khảo thí |
| Giảng viên | Lớp phụ trách, lịch giảng, chấm điểm, học liệu |
| Ký túc xá | Phòng, cư dân, sự cố dịch vụ |
| Kế toán | Giao dịch, học phí, công nợ |
| Đối tác Nhật Bản | Đơn hàng tuyển, ứng viên đề cử |
| Học viên | Lịch học, học liệu, kỳ thi, điểm, học phí, KTX |

## Kết nối Firebase Realtime Database

### 1. Tạo dự án Firebase

1. Truy cập https://console.firebase.google.com → **Add project**.
2. Sau khi tạo xong, vào **Build → Realtime Database → Create Database**.
   - Chọn vùng **Singapore (asia-southeast1)** cho độ trễ thấp nhất tại Việt Nam.
   - Chọn **Start in locked mode** (sẽ cấu hình rules ở bước 3).

### 2. Lấy cấu hình và điền vào dự án

1. Vào **Project settings (⚙️) → General → Your apps → Web app (`</>`)**, đăng ký app web.
2. Firebase hiển thị object `firebaseConfig`. Copy các giá trị tương ứng vào file `.env.local` ở thư mục gốc:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...        # apiKey
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=suleco-erp.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://suleco-erp-default-rtdb.asia-southeast1.firebasedatabase.app
NEXT_PUBLIC_FIREBASE_PROJECT_ID=suleco-erp
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=suleco-erp.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

> Lưu ý: `databaseURL` là trường bắt buộc — nếu thiếu, hệ thống vẫn chạy nhưng ở chế độ mock.

Ngoài ra có thể lưu bản cấu hình mẫu vào `firebase/config.json` (đã có sẵn `firebase/config.example.json` để tham khảo) — nhưng ứng dụng đọc cấu hình từ biến môi trường `NEXT_PUBLIC_FIREBASE_*`, không đọc trực tiếp file JSON này.

3. Khởi động lại dev server (`pnpm dev`). Khi cấu hình hợp lệ, hệ thống **tự động chuyển sang chế độ Realtime DB** — không cần bấm gì thêm. Nút ở thanh trên vẫn cho phép bật/tắt thủ công để so sánh.

### Cơ chế dữ liệu: khi nào còn thấy mock data?

| Tình huống | Hành vi |
|---|---|
| Chưa điền `NEXT_PUBLIC_FIREBASE_*` | Toàn bộ màn hình dùng dữ liệu mẫu (mock). |
| Đã điền config, khởi động lại | Tự chuyển sang Realtime DB, mỗi bảng đăng ký (subscribe) trực tiếp theo `dataPath` của nó. |
| Node trên Realtime DB **chưa có dữ liệu** | Bảng tự fallback về dữ liệu mẫu và hiện ghi chú vàng "Node ... chưa có dữ liệu" — bạn thấy ngay path cần ghi. |
| Node đã có dữ liệu | Bảng hiển thị dữ liệu thật, cập nhật realtime khi dữ liệu đổi. |
| Bấm "Thêm" ở chế độ realtime | Bản ghi mới được **ghi thẳng vào Realtime DB** tại `dataPath`. |
| Ghi bị từ chối (rules chặn) | Hiện cảnh báo đỏ kèm lý do, dữ liệu mẫu vẫn hiển thị. |

> Tóm lại: dán Firebase config vào `.env.local` + khởi động lại là xong. Mock data chỉ còn xuất hiện ở những node bạn chưa nhập liệu — nhập dữ liệu vào path tương ứng (bảng trong Firebase Console hoặc import JSON) là thay thế hoàn toàn.

### 3. Cấu hình Security Rules

Vào **Realtime Database → Rules**, dán rules sau (đọc ghi yêu cầu đăng nhập — bật Firebase Auth trước khi lên production):

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "students": { ".indexOn": ["classCode", "status"] },
    "applications": { ".indexOn": ["status", "orderId"] },
    "examSessions": { ".indexOn": ["date"] },
    "serviceTickets": { ".indexOn": ["status", "createdAt"] }
  }
}
```

### 4. Cấu trúc dữ liệu trên Realtime DB

Mỗi màn hình con hiển thị **data path** của nó ở chân bảng (ví dụ `accounting/tuition`, `assessment/examBank`). Cây dữ liệu gợi ý:

```
suleco-erp-default-rtdb
├── students/                 # Hồ sơ học viên
├── applications/             # Hồ sơ XKLĐ
├── orders/                   # Đơn hàng tuyển dụng
├── partners/                 # Đối tác Nhật Bản
├── japanWorkforce/           # Lực lượng đang làm việc tại Nhật
├── courses/ · classes/ · classSchedules/ · learningMaterials/
├── examBank/ · examSessions/ · grades/ · certificates/
├── dormRooms/ · residences/ · serviceTickets/
├── accounting/transactions/ · accounting/tuition/ · accounting/debts/
├── reports/ · operations/
└── system/users/ · system/roles/ · system/auditLogs/ · system/settings/
```

## Triển khai lên Vercel

1. Push code lên GitHub và kết nối repo tại https://vercel.com/new.
2. Vào **Settings → Environment Variables**, thêm đủ 7 biến `NEXT_PUBLIC_FIREBASE_*` cho môi trường Production và Preview.
3. Deploy. Firebase Console → **Authentication → Settings → Authorized domains**: thêm domain `<project>.vercel.app`.

## Cấu trúc mã nguồn

```
app/                        # Next.js App Router
components/
  dashboard-shell.tsx       # Khung ứng dụng: sidebar, topbar, điều hướng
  dashboard/role-dashboard  # Dashboard riêng theo vai trò
  modules/
    shared/data-table.tsx   # ModuleFrame: khung bảng + tìm kiếm + tạo bản ghi
    overview/ learners/ recruitment/ training/ assessment/
    dormitory/ finance/ reports/ system/   # 28 màn hình con theo phân hệ
lib/
  navigation/catalog.ts     # Cây menu: phân hệ → màn hình → vai trò được phân quyền
  roles/permissions.ts      # 9 vai trò
  roles/dashboards.ts       # KPI + việc cần xử lý theo vai trò
  modules/registry.ts       # Đăng ký module (title, dataPath, features)
  firebase/client.ts        # Khởi tạo Firebase (tự tắt khi chưa cấu hình)
firebase/config.example.json
```
