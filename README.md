# Nail Studio — Luxury Portfolio Website

Website portfolio cao cấp cho nail designer, xây dựng bằng **Next.js 16 + TypeScript + TailwindCSS + Framer Motion**.

## Tính năng

- ✨ Giao diện luxury editorial — hero 2 cột, typography lớn
- 🖼️ Gallery masonry với filter theo category
- 🔍 Lightbox xem ảnh full-screen (keyboard + swipe mobile)
- 📸 About section với collage ảnh cá nhân
- ⏳ Timeline hành trình sự nghiệp
- 💬 Testimonials tự động cuộn
- 📞 Floating contact buttons (Zalo/Messenger/Phone)
- 🔐 Admin panel upload ảnh có bảo vệ mật khẩu
- 📱 Mobile-first responsive

---

## Cài đặt & Chạy

### 1. Yêu cầu
- Node.js 18+

### 2. Cài đặt
```bash
cd d:\NailDesgin\nextapp
npm install
```

### 3. Cấu hình môi trường
Tạo file `.env.local` (đã có sẵn):
```env
ADMIN_PASSWORD=admin123
SESSION_SECRET=your-secret-key-here
```

### 4. Chạy development
```bash
npm run dev
# → http://localhost:3000
# → http://localhost:3000/admin
```

### 5. Build production
```bash
npm run build
npm run start
```

---

## Tuỳ chỉnh nhanh

### Đổi số điện thoại & link liên hệ
Mở `lib/constants.ts`:
```ts
export const PHONE = "0987654321";        // Số điện thoại
export const ZALO_URL = `https://zalo.me/${PHONE}`;
export const MESSENGER_URL = "https://m.me/YourPage"; // Username Messenger Page
```

### Đổi mật khẩu admin
Mở `.env.local`:
```env
ADMIN_PASSWORD=mat_khau_moi_cua_ban
```

### Thêm ảnh giới thiệu bản thân
Đặt ảnh vào: `public/images/toi/`
- Ảnh đầu tiên sẽ xuất hiện trong Hero và Contact
- Các ảnh tiếp theo hiển thị trong collage About section
- Định dạng: `.jpg`, `.png`, `.webp`

### Upload ảnh nail mới
1. Vào `http://localhost:3000/admin`
2. Đăng nhập bằng mật khẩu trong `.env.local`
3. Drag & drop hoặc chọn ảnh
4. Đặt tên mẫu + chọn danh mục
5. Nhấn "Tải lên" → ảnh xuất hiện ngay trên gallery

### Đổi nội dung About & Timeline
Mở `lib/constants.ts` và chỉnh sửa:
```ts
export const DESIGNER_NAME = "Tên của bạn";
export const TIMELINE = [...];
export const TESTIMONIALS = [...];
export const STATS = [...];
```

---

## Cấu trúc thư mục

```
nextapp/
├── app/
│   ├── layout.tsx              # Root layout + SEO
│   ├── page.tsx                # Trang chủ
│   ├── admin/
│   │   ├── layout.tsx          # noindex metadata
│   │   └── page.tsx            # Admin dashboard
│   └── api/
│       ├── nails/route.ts      # GET danh sách nail
│       ├── toi/route.ts        # GET ảnh cá nhân
│       ├── auth/               # Login/logout/check
│       └── admin/              # Upload + CRUD
├── components/
│   ├── layout/                 # Header, Footer
│   ├── sections/               # 7 sections
│   └── ui/                     # FloatingButtons
├── lib/
│   ├── constants.ts            # ← Tuỳ chỉnh ở đây
│   ├── nails.ts                # CRUD nails.json
│   └── auth.ts                 # iron-session
├── public/images/
│   ├── nail/                   # Ảnh nail mẫu
│   └── toi/                    # Ảnh cá nhân
└── data/nails.json             # Metadata ảnh
```

---

## Deploy lên Render.com

1. Tạo repo Git và push code
2. Đăng ký tại [render.com](https://render.com)
3. **New Web Service** → chọn repo
4. Settings:
   - **Root Directory**: `nextapp`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
5. **Environment Variables**:
   ```
   ADMIN_PASSWORD = mat_khau_cua_ban
   SESSION_SECRET = chuoi_ngau_nhien_dai
   ```

> ⚠️ Render free tier: ảnh upload sẽ mất khi dyno restart. Dùng plan $7/tháng hoặc VPS để lưu trữ bền vững.

## Deploy lên Vercel

```bash
npm i -g vercel
cd nextapp
vercel

# Thêm env vars trong dashboard Vercel:
# ADMIN_PASSWORD, SESSION_SECRET
```

> ⚠️ Vercel không hỗ trợ file system write bền vững. Chỉ phù hợp nếu bạn dùng external storage (Cloudinary, S3...) cho ảnh upload.

---

## Bảo mật

- ✅ Mật khẩu admin lưu trong `.env.local` — không bao giờ commit
- ✅ `.gitignore` đã bao gồm `.env.local`
- ✅ `/admin` có `noindex` — không hiển thị trên Google
- ✅ API admin routes yêu cầu session cookie (iron-session)
- ✅ Upload validate: chỉ jpg/png/webp, tối đa 5MB
- ✅ Sharp tự động optimize + convert sang webp

---

## Tech Stack

| Công nghệ | Version | Mục đích |
|---|---|---|
| Next.js | 16 | Framework |
| React | 19 | UI |
| TypeScript | 5 | Type safety |
| TailwindCSS | 4 | Styling |
| Framer Motion | 12 | Animations |
| iron-session | 8 | Auth |
| sharp | 0.35 | Image optimize |
