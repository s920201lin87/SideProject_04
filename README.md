# 記帳本（Account Book）

這是一個基於 **Node.js + Express + MongoDB** 的記帳系統，使用者可以透過網頁進行 **新增、刪除、查詢** 收支帳目，並同時提供 **RESTful API** 介面以便與前端或其他服務整合。

---

## 🚀 功能特色

### 📌 1. Web 介面
- **會員註冊 / 登入 / 登出**
- **記帳管理**（新增記帳、刪除記帳、查詢帳目）
- **Session & Cookie 管理**（使用者登入後維持狀態）
- **使用 `EJS` 模板引擎**
- **`Moment.js` 格式化時間**

### 📌 2. RESTful API
- **提供標準 CRUD 介面**
- **回應 JSON 格式**
- **路由前綴為 `/api/account`**
  - **GET** `/api/account`：取得所有帳目
  - **GET** `/api/account/:id`：取得指定帳目
  - **POST** `/api/account`：新增帳目
  - **DELETE** `/api/account/:id`：刪除帳目
  - **PATCH** `/api/account/:id`：更新帳目

### 📌 3. 資料儲存
- **使用 `MongoDB` 搭配 `Mongoose` 進行增刪改查**
- **使用 `connect-mongo` 儲存 `Session` 到 MongoDB**
- **密碼加密：使用 `MD5` 進行加密**

### 📌 4. 安全性
- **防止跨站請求偽造（CSRF）**
- **所有重要請求皆透過 `POST` 進行**
- **使用 `Session` 進行身份驗證**
-  **加入 `JWT` 來強化身份驗證**
  
## 📌 未來規劃
- ✅ **帳號角色權限管理**
- ✅ **支援 OAuth（Google、Facebook 登入）**
- ✅ **增加更完整的 API 文件（Swagger）**


