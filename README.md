# PI Website 2025

A modern, responsive website for PI (Participatory Intelligence) showcasing projects, budget transparency, and interactive features.

## 🏗️ Architecture

- **Frontend**: React + Vite + Chakra UI
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend) + Render (Backend)

## ✨ Features

### 🎨 Interactive Word Cloud
- Real-time Thai word visualization
- Click to vote and increase word weight
- Add new words dynamically
- MongoDB storage for persistence

### 💰 Budget Transparency
- 2568 fiscal year budget display
- Thai Baht formatting
- CSV-based data structure
- Responsive tables and summaries

### 📧 Contact Form
- Email notifications via Nodemailer
- Form validation and error handling
- Success feedback for users

### 🎯 Project Showcase
- Notion CMS integration
- Project voting system
- Responsive gallery layout
- Dynamic project loading

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Notion API credentials (optional)

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/visarutforthaipbs/pi-new-website-2025.git
   cd pi-new-website-2025
   ```

2. **Install dependencies**:
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd ../frontend && npm install
   ```

3. **Environment setup**:
   ```bash
   # Backend - copy and fill .env
   cp backend/.env.example backend/.env
   
   # Frontend - copy and fill .env.local
   cp frontend/.env.example frontend/.env.local
   ```

4. **Run development servers**:
   ```bash
   # Terminal 1 - Backend
   cd backend && npm start
   
   # Terminal 2 - Frontend  
   cd frontend && npm run dev
   ```

5. **Open application**:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## 📱 API Endpoints

- `GET /api/projects` - Fetch projects from Notion
- `GET /api/wordclouds` - Get word cloud data
- `POST /api/wordclouds` - Submit new word
- `POST /api/contact` - Submit contact form
- `GET /health` - Health check

## 🌐 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy
1. **Backend on Render**: Deploy using render.yaml
2. **Frontend on Vercel**: Auto-deploy from GitHub
3. **Configure**: Set environment variables in each platform

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Chakra UI
- Framer Motion
- React Router Dom
- @visx/wordcloud
- Axios

### Backend
- Node.js
- Express
- MongoDB with native driver
- Nodemailer
- CORS
- dotenv

### Development Tools
- ESLint
- Vite dev server
- Nodemon

## 📁 Project Structure

```
pi-new-website-2025/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   └── config.js        # Configuration
│   ├── public/              # Static assets
│   └── package.json
├── backend/                  # Express backend
│   ├── config/              # Database config
│   ├── services/            # Business logic
│   ├── server.js            # Main server file
│   └── package.json
├── DEPLOYMENT.md            # Deployment guide
├── render.yaml              # Render config
├── vercel.json              # Vercel config
└── package.json             # Root package.json
```

## 🔧 Configuration

### Environment Variables

**Frontend (.env.local)**:
```bash
VITE_API_URL=http://localhost:3001  # or your production backend URL
```

**Backend (.env)**:
```bash
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
PORT=3001
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Create an issue on GitHub
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Review API documentation in the code

---

Built with ❤️ by the PI Team
