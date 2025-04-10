# CodeMend

CodeMend is a collaborative code review and project management platform that helps developers improve their code quality through automated reviews and peer feedback.

## 🚀 Demo Preview
![CodeMend Demo](demo-preview.gif)

## ⚙️ Features
- Project Management
- Code Review System
- GitHub Integration
- Real-time Collaboration
- Automated Code Analysis

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas Account
- Git

### Environment Variables
Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.ple9aaj.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🌐 API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/logout` - Logout user

### Projects
- GET `/api/projects` - Get all projects
- GET `/api/projects/:id` - Get single project
- POST `/api/projects` - Create new project
- PUT `/api/projects/:id` - Update project
- DELETE `/api/projects/:id` - Delete project

### Code Reviews
- POST `/api/reviews` - Create new review
- GET `/api/reviews` - Get all reviews
- GET `/api/reviews/:id` - Get single review

## 📦 Database Structure

### Projects Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "description": String,
  "lastModified": Date,
  "status": String,
  "language": String,
  "stars": Number,
  "isGithubLinked": Boolean,
  "projectImage": String,
  "user_id": ObjectId
}
```

### Reviews Collection
```json
{
  "_id": ObjectId,
  "projectId": ObjectId,
  "review": String,
  "codeSnippet": String,
  "createdAt": Date
}
```

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors
- Your Name - Initial work

## 🙏 Acknowledgments
- React.js Community
- Node.js Community
- MongoDB Team