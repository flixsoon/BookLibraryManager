import { Link, useLocation } from "wouter";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-primary-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="material-icons mr-2">menu_book</span>
          <h1 className="text-2xl font-serif font-bold">Bibliothèque</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li className={location === "/" ? "text-accent-gold" : "hover:text-accent-gold transition"}>
              <Link href="/" className="font-semibold">
                Accueil
              </Link>
            </li>
            <li className={location === "/api" ? "text-accent-gold" : "hover:text-accent-gold transition"}>
              <Link href="/api" className="font-semibold">
                API
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
