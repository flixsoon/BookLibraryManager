# Book Library Manager

A modern, responsive web application for managing your book collection. This full-stack application allows users to create, read, update, and delete books in a personal library.

![Book Library Manager Screenshot](https://i.imgur.com/placeholder.jpg)

## 🚀 Live Demo

Check out the live application: [Book Library Manager](https://book-library-manager-main-8qkakm928-abdelwahads-projects.vercel.app/)

## ✨ Features

- **Complete Book Management**: Add, view, edit, and delete books in your collection
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive user interface with smooth animations
- **Real-time Updates**: Instantly see changes when adding, editing, or removing books
- **Data Persistence**: All books are stored in a PostgreSQL database

## 🛠️ Tech Stack

- **Frontend**:
  - HTML5, CSS3, JavaScript
  - Responsive design with CSS Grid and Flexbox
  - Font Awesome icons
  - Google Fonts (Poppins)

- **Backend**:
  - Node.js with Express
  - RESTful API architecture
  - PostgreSQL database (hosted on Neon.tech)
  - Drizzle ORM for database operations

- **Deployment**:
  - Vercel for hosting both frontend and serverless API functions
  - Environment variables for secure configuration

## 📋 API Endpoints

The application provides the following RESTful API endpoints:

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book by ID
- `POST /api/books` - Add a new book
- `PUT /api/books/:id` - Update an existing book
- `DELETE /api/books/:id` - Delete a book

## 📦 Data Model

Each book in the library has the following properties:

```typescript
interface Book {
  id: number;        // Auto-generated primary key
  title: string;     // Book title
  author: string;    // Book author
  year: number;      // Publication year
  genre: string;     // Book genre
  description?: string; // Optional book description
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database (or a Neon.tech account)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/book-library-manager.git
   cd book-library-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your database connection string:
   ```
   DATABASE_URL=postgresql://username:password@hostname:port/database
   ```

4. Run database migrations:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5000`

## 🔧 Configuration

The application can be configured using environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Set to `development` for development mode or `production` for production mode

## 🌐 Deployment

The application is configured for easy deployment to Vercel:

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Add your environment variables in the Vercel dashboard.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgements

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQL databases
- [Neon.tech](https://neon.tech/) - Serverless PostgreSQL
- [Vercel](https://vercel.com/) - Platform for frontend frameworks and static sites
- [Font Awesome](https://fontawesome.com/) - Icon set and toolkit
- [Google Fonts](https://fonts.google.com/) - Library of free licensed font families

---

Made with ❤️ by ABDELWAHAD
