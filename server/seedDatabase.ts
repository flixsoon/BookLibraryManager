import { db } from "./db";
import { books } from "@shared/schema";

export async function seedInitialData() {
  // Vérifier si des livres existent déjà
  const existingBooks = await db.select().from(books);
  
  if (existingBooks.length === 0) {
    console.log('Ajout des données initiales dans la base de données...');
    
    // Ajouter des livres de démonstration
    await db.insert(books).values([
      {
        title: "L'Étranger",
        author: "Albert Camus",
        year: 1942,
        genre: "Roman",
        description: "L'histoire d'un homme qui commet un meurtre et affronte les conséquences de ses actes."
      },
      {
        title: "1984",
        author: "George Orwell",
        year: 1949,
        genre: "Science-Fiction",
        description: "Un roman dystopique décrivant un futur totalitaire sous surveillance constante."
      },
      {
        title: "Le Petit Prince",
        author: "Antoine de Saint-Exupéry",
        year: 1943,
        genre: "Conte",
        description: "Un conte poétique qui aborde les thèmes de l'amitié, l'amour et le sens de la vie."
      },
      {
        title: "Les Misérables",
        author: "Victor Hugo",
        year: 1862,
        genre: "Classique",
        description: "Un roman historique qui suit la vie de plusieurs personnages dans la France du 19e siècle."
      }
    ]);
    
    console.log('Données initiales ajoutées avec succès!');
  } else {
    console.log('La base de données contient déjà des données.');
  }
}