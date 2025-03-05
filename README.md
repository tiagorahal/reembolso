# Reembolsos - Frontend

![Project Screenshot](public/screenshot.png)

## 📌 Overview

This is the **frontend** for the Reembolsos system, built with **Vue 3**, **TypeScript**, and **Bootstrap**. The application allows users to **manage reimbursements**, including adding, editing, deleting, and tagging them.

## 🚀 Features

👉 User authentication (login & signup)  
👉 Add, edit, delete reembolsos  
👉 Assign and manage **tags**  
👉 Mobile-responsive UI with **Bootstrap**  
👉 **Vue Router** for navigation  

---

## 📛 **Project Structure**

```
reembolso-frontend/
│── public/                # Static assets
│── src/
│   ├── assets/            # Logos, images, etc.
│   ├── components/        # Reusable UI components
│   ├── views/             # Page views (Home, Login, Reembolsos, etc.)
│   ├── router/            # Vue Router configuration
│   ├── api.ts             # Axios API configuration
│   ├── main.ts            # Entry point
│   ├── App.vue            # Root component
│   ├── styles.css         # Global styles
│── package.json           # Project dependencies
│── tsconfig.json          # TypeScript config
│── vite.config.ts         # Vite configuration
```

---

## 🛠️ **Setup & Installation**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/tiagorahal/reembolso.git
cd reembolso
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Development Server

```bash
npm run dev
```

📟 The application will be available at:  
```
http://localhost:5173
```

---

## 🔒 **Authentication Flow**
- Users **must be logged in** to access the Reembolsos page.
- Authenticated requests **require tokens** stored in cookies.
- **Logout** removes authentication tokens.

---

## 🔄 **API Endpoints**
The frontend interacts with the **Reembolsos API** via:

| Method | Endpoint               | Description             |
|--------|------------------------|-------------------------|
| `POST` | `/auth/sign_in`        | Log in user            |
| `POST` | `/auth`                | Register user          |
| `POST` | `/reembolsos`          | Create reembolso       |
| `GET`  | `/reembolsos`          | Get all reembolsos     |
| `PUT`  | `/reembolsos/:id`      | Update reembolso       |
| `DELETE` | `/reembolsos/:id`    | Delete reembolso       |

---

## 📱 **Mobile-First UI**
- **Bootstrap 5** ensures full **responsiveness**.
- UI adapts for **desktop & mobile** devices.

---

## ⚙️ **Environment Variables**
You can configure API URLs by adding a **`.env`** file:

```ini
VITE_API_URL=http://localhost:3000
```

---

## 🛠️ **Development Commands**

| Command             | Description                               |
|---------------------|-------------------------------------------|
| `npm install`      | Install dependencies                      |
| `npm run dev`      | Run local dev server                      |
| `npm run build`    | Build for production                      |
| `npm run lint`     | Lint & fix code issues                    |

---

## 🐝 **License**
This project is open-source and available under the **MIT License**.

---

💡 **Now you’re ready to use the frontend! 🚀**  
🔗 Backend API repo: [Reembolsos API](https://github.com/tiagorahal/reembolso_api)

