# 記帳本（Account Book）

這是一個基於 **Node.js + Express + MongoDB** 的記帳系統，使用者可以透過網頁進行 **新增、刪除、查詢** 收支帳目，並同時提供 **RESTful API** 介面以便與前端或其他服務整合。

---

## 🚀 功能特色

- **Web 介面**：  
  - **新增記帳**、刪除記帳、查詢帳目列表  
  - 透過 **EJS** 模板引擎呈現前端頁面  
  - 資料時間格式化採用 **Moment.js**  

- **RESTful API**：  
  - 提供標準 CRUD 介面供前後端或其他服務串接  
  - 使用 `JSON` 格式傳遞與接收資料  
  - 端點路由以 `/api/account` 為主  

- **資料儲存**：  
  - 使用 **MongoDB** 搭配 **Mongoose** 進行增刪改查  

- **回呼地獄 (Callback Hell)**：  
  - 專案當前以「（Callback）」的方式進行非同步操作，尚未採用 `async/await` 或 `Promise` 進行重構  
  - 未來會持續優化改寫，提升程式可讀性與維護性  

#### `account.js` (RESTful API 路由)

- **路徑**：`routes/api/account.js`  
- 以 `/api` 作為前綴，並針對 `account` 進行標準的 CRUD 操作：
  - **GET** `/api/account`：取得所有帳目信息 (JSON)
  - **GET** `/api/account/:id`：取得指定帳目 (JSON)
  - **POST** `/api/account`：新增帳目 (JSON)
  - **DELETE** `/api/account/:id`：刪除帳目 (JSON)
  - **PATCH** `/api/account/:id`：更新帳目 (JSON)



