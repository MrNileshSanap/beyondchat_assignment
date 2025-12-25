# Article Enhancement System

A practical full-stack system that improves articles using AI and supporting web content. The focus of this project is clean architecture, clear data flow, and real-world integration rather than just CRUD operations.

---

## 🎯 Project Overview

This system automatically fetches articles, searches for related content on the web, scrapes reference articles, and enhances the original content using AI before publishing the improved version back to the database.

### Key Features

* 📝 **Article Management**: Full CRUD operations for articles
* 🤖 **AI Enhancement**: Automatically enhance articles using OpenAI
* 🔍 **Smart Search**: Google search integration for finding related content (optional)
* 🕷️ **Web Scraping**: Extract content from reference articles
* ⚡ **Decoupled Processing**: Node.js–based enhancement service
* 🎨 **Modern UI**: React frontend with Vite

---

## 🏗️ System Architecture


┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Laravel API   │◄──►│ Article         │◄──►│   Database      │
│   (Backend)     │    │ Processor       │    │   (SQLite)      │
│   Port: 8000    │    │ (Node.js)       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┼───────────────────────┐
                                 │                       │
                    ┌─────────────────┐                 │
                    │  React Frontend │◄────────────────┘
                    │  (Vite + React) │
                    │  Port: 5173     │
                    └─────────────────┘


---

## 🧠 Why This Architecture?

This project is intentionally structured to reflect how real production systems are built, where responsibilities are clearly separated.

* Separates AI-heavy processing from the main backend
* Allows independent scaling of the enhancement service
* Keeps Laravel API fast and stable
* Makes AI failures non-blocking for CRUD operations
* Mirrors real-world microservice-style design

---

## 📁 Project Structure


beyondchat_assignment/
├── backend-laravel/          # Laravel API Server
├── article-processor/        # Node.js Enhancement Service
├── frontend-react/           # React Frontend
└── README.md


---

## 🚀 Local Setup Instructions

### Prerequisites

* PHP 8.0+ with Composer
* Node.js 16+ with npm
* Git

---

### 1. Install Dependencies

bash
cd backend-laravel
composer install

cd ../article-processor
npm install

cd ../frontend-react
npm install


---

### 2. Database Setup (Laravel)

bash
cd backend-laravel
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed


---

### 3. Environment Configuration



#### backend-laravel/.env

env
APP_NAME="Article Enhancement System"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite




#### article-processor/.env

env
PORT=3001
LARAVEL_API_URL=http://localhost:8000



#### frontend-react/.env

env
VITE_API_BASE_URL=http://localhost:8000
VITE_PROCESSOR_URL=http://localhost:3001


---

## ▶️ Start Services

bash
# Laravel API
php artisan serve

# Article Processor
npm start

# React Frontend
npm run dev


---

## 🔄 Data Flow

1. User creates an article via frontend or API
2. Enhancement is triggered
3. Node.js service fetches the article
4. Related content is searched and scraped
5. AI enhances the article
6. Updated article is saved back to Laravel
7. Frontend displays enhanced content

---

## 📊 API Endpoints

### Laravel API (Port 8000)


GET    /api/articles
GET    /api/articles/{id}
POST   /api/articles
PUT    /api/articles/{id}
DELETE /api/articles/{id}


### Article Processor (Port 3001)


POST   /enhance
POST   /enhance/{id}


---

## 🧪 Testing Example

bash
curl -X POST http://localhost:8000/api/articles \
-H "Content-Type: application/json" \
-d '{"title":"AI Future","content":"AI is changing the world"}'

curl -X POST http://localhost:3001/enhance


---

## 🗄️ Database Schema

sql
CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source_url TEXT,
  version TEXT DEFAULT 'original',
  references TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


---

## 🛠️ Technologies Used

### Backend

* Laravel 10
* PHP 8+
* SQLite

### Processing Service

* Node.js
* Express.js
* OpenAI API
* Axios
* Cheerio / Puppeteer

### Frontend

* React 18
* Vite
* JavaScript (ES6+)

---

## 🔮 Future Improvements

This project is intentionally kept simple for clarity and evaluation. In a production environment, the following improvements would be considered:

* Background jobs with Redis queues
* Caching scraped references
* Authentication & role-based access
* Article version history
* Retry & failure handling for AI calls

---

## 🐛 Troubleshooting

* Check Laravel logs: `storage/logs/laravel.log`
* Verify API keys
* Ensure all services are running
* Check CORS configuration

---

## 👨‍💻 Author

**Nilesh Sanap**
Assignment for BeyondChats

### AI Usage Disclosure
AI tools (OpenAI API) are used only for article content enhancement as part of the system functionality.  
The overall system design, backend and frontend integration, and core implementation logic were designed and implemented manually, with limited assistance from AI for development support.


**Nilesh Sanap**
Assignment for BeyondChats
Full-stack AI-powered article enhancement system


