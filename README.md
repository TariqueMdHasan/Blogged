# MERN Blog App

A **MERN stack** blogging platform where users can create, read, update, and delete blogs. Users can upload images, comment on posts, and manage their profiles.

## 🚀 Features

- **User Authentication** (Register/Login) 🔑
- **Create, Edit, and Delete Blogs** 📝
- **Upload Blog Images to Cloudinary** ☁️
- **Comment on Blogs** 💬
- **User Profile Management** 👤

---

## 🛠 Tech Stack

### Frontend
- React.js ⚛️
- Redux Toolkit (for state management) 🗂
- Tailwind CSS (for styling) 🎨

### Backend
- Node.js + Express.js 🚀
- MongoDB + Mongoose 📦
- Cloudinary (for image uploads) ☁️
- JWT (JSON Web Token for authentication) 🔒

---

## 📂 Folder Structure
```
mern-blog-app/
│── backend/          # Express.js backend
│   ├── models/       # Mongoose schemas
│   ├── controllers/  # Business logic
│   ├── routes/       # API endpoints
│   ├── config/       # Database & Cloudinary configs
│── frontend/         # React.js frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page views
│   │   ├── store/       # Redux store
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/TariqueMdHasan/Blogged.git
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install

# Create a .env file and add:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

---

## 📌 API Routes

### User Routes
| Method | Endpoint       | Description        |
|--------|--------------|-------------------|
| POST   | `/api/users/register` | Register a new user |
| POST   | `/api/users/login` | Login user |
| GET    | `/api/users/profile` | Get user profile |
| PUT    | `/api/users/update` | Update user profile |

### Blog Routes
| Method | Endpoint       | Description        |
|--------|--------------|-------------------|
| POST   | `/api/blogs` | Create a blog |
| GET    | `/api/blogs` | Get all blogs |
| GET    | `/api/blogs/:id` | Get a single blog |
| PUT    | `/api/blogs/:id` | Update a blog |
| DELETE | `/api/blogs/:id` | Delete a blog |

---

## 📷 Image Upload with Cloudinary

Images are uploaded and retrieved using the Cloudinary URL stored in the database.

---

## 🔥 Future Enhancements
- **Like & Share Feature** ❤️📤
- **Categories & Tags for Blogs** 🏷️
- **Search & Filter Blogs** 🔍
- 
- **Responsive UI with React.js** 🎨

---

## 🤝 Contributing
Feel free to open issues and submit PRs to improve this project! 😊

---

## 🌟 Show Your Support
Give this project a ⭐ if you found it useful!

---

## 📨 Contact
For any questions or feedback, reach out via md.th.abdi@gmail.com.

