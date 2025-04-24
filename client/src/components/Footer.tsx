import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <span className="material-icons mr-2">menu_book</span>
              <h2 className="text-xl font-serif font-bold">Bibliothèque</h2>
            </div>
            <p className="text-sm text-gray-300 mt-1">Gestionnaire de livres CRUD avec API RESTful</p>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-accent-gold transition">
              <span className="material-icons">home</span>
            </Link>
            <Link href="/api" className="hover:text-accent-gold transition">
              <span className="material-icons">api</span>
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent-gold transition"
            >
              <span className="material-icons">code</span>
            </a>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-primary-800 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Bibliothèque App
        </div>
      </div>
    </footer>
  );
}
