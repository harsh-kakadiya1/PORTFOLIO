# 🚀 AI Portfolio Terminal

An interactive, AI-powered portfolio website featuring a retro terminal interface with modern React architecture.

## ✨ Features

- **🤖 AI-Powered Chat**: Interactive AI assistant that can answer questions about projects and skills
- **💻 Terminal Interface**: Retro-styled terminal with modern animations and effects
- **🎮 Interactive Commands**: Type commands to explore portfolio content
- **📱 Responsive Design**: Works seamlessly across all devices
- **⚡ Real-time Updates**: Live clock and dynamic content updates
- **🎨 Modern UI/UX**: Beautiful gradients, shadows, and smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **OpenAI API** - AI chat functionality
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harsh-kakadiya1/PORTFOLIO.git
   cd PORTFOLIO
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   PORT=5000
   ```

5. **Start the Application**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
portfolio/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── terminal/    # Terminal components
│   │   ├── pages/           # Page components
│   │   └── services/        # API services
│   └── package.json
├── backend/                 # Express backend
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   ├── config/             # Configuration files
│   └── middleware/         # Custom middleware
└── README.md
```

## 🎮 Available Commands

Type these commands in the terminal interface:

- `/help` - Show all available commands
- `/about` - Learn about the developer
- `/projects` - View portfolio projects
- `/skills` - Display technical skills
- `/contact` - Get contact information
- `/clear` - Clear the terminal
- `/time` - Show current time
- Ask any question - Chat with the AI assistant!

## 🔧 Configuration

### Frontend Configuration
- **Vite Config**: `frontend/vite.config.js`
- **Tailwind Config**: `frontend/tailwind.config.js`
- **ESLint Config**: `frontend/eslint.config.js`

### Backend Configuration
- **Database**: `backend/config/database.js`
- **CORS**: `backend/middleware/cors.js`
- **Environment**: `backend/.env`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Heroku/Railway)
```bash
cd backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for the GPT API
- React team for the amazing framework
- Tailwind CSS for the utility classes
- All the open-source contributors

## 📞 Contact

**Harsh Kakadiya**
- GitHub: [@harsh-kakadiya1](https://github.com/harsh-kakadiya1)
- Portfolio: [coming soon]
- Email: [harshkakadiya128@gmail.com]

---

⭐ **Star this repository if you found it helpful!**
## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Gemini API** - AI chat functionality
- **CORS** - Cross-origin resource sharing
