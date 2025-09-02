# Money Manager Analytics

A full-stack application for tracking personal finances, analyzing expenses, and managing budgets. The application consists of a Laravel backend API and a Vue.js frontend.

## Project Overview

This project helps you manage your personal finances by:
- Tracking income and expenses
- Categorizing transactions
- Analyzing spending patterns with charts and visualizations
- Setting and monitoring budgets
- Supporting multiple currencies
- Importing financial data from Excel/CSV files

## Tech Stack

### Backend
- Laravel 12 (PHP 8.2+)
- MySQL 8.0 database
- Excel import/export functionality

### Frontend
- Vue 3 with TypeScript
- Vite as build tool
- Tailwind CSS for styling
- Highcharts for data visualization
- Vue Router for navigation
- Pinia for state management

### Infrastructure
- Docker for containerization
- Caddy as web server/reverse proxy

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started) and Docker Compose
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/money-manager-analytics.git
   cd money-manager-analytics
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the backend directory:
   ```bash
   cp backend/.env.example backend/.env
   ```
   
   Configure the database settings in the `.env` file:
   ```
   DB_CONNECTION=mysql
   DB_HOST=db
   DB_PORT=3306
   DB_DATABASE=money_manager
   DB_USERNAME=user
   DB_PASSWORD=password
   ```

3. **Start the application with Docker**
   ```bash
   docker-compose up -d
   ```
   
   This will:
   - Start the MySQL database
   - Build and start the Laravel backend
   - Build and start the Vue.js frontend
   - Configure Caddy as a reverse proxy

5. **Install dependencies of backend**

```cd backend
composer install
```

4. **Initialize the database**
   ```bash
   docker exec backend php artisan migrate
   ```

5. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost
   ```
