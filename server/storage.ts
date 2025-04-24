import { users, type User, type InsertUser, type Book, type InsertBook } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllBooks(): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: number, book: InsertBook): Promise<Book>;
  deleteBook(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private books: Map<number, Book>;
  private userCurrentId: number;
  private bookCurrentId: number;

  constructor() {
    this.users = new Map();
    this.books = new Map();
    this.userCurrentId = 1;
    this.bookCurrentId = 1;

    // Add some initial books for demo
    this.createBook({
      title: "L'Étranger",
      author: "Albert Camus",
      year: 1942,
      genre: "Roman",
      description: "L'histoire d'un homme qui commet un meurtre et affronte les conséquences de ses actes."
    });
    this.createBook({
      title: "1984",
      author: "George Orwell",
      year: 1949,
      genre: "Science-Fiction",
      description: "Un roman dystopique décrivant un futur totalitaire sous surveillance constante."
    });
    this.createBook({
      title: "Le Petit Prince",
      author: "Antoine de Saint-Exupéry",
      year: 1943,
      genre: "Conte",
      description: "Un conte poétique qui aborde les thèmes de l'amitié, l'amour et le sens de la vie."
    });
    this.createBook({
      title: "Les Misérables",
      author: "Victor Hugo",
      year: 1862,
      genre: "Classique",
      description: "Un roman historique qui suit la vie de plusieurs personnages dans la France du 19e siècle."
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getBook(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.bookCurrentId++;
    const book: Book = { ...insertBook, id };
    this.books.set(id, book);
    return book;
  }

  async updateBook(id: number, insertBook: InsertBook): Promise<Book> {
    const book: Book = { ...insertBook, id };
    this.books.set(id, book);
    return book;
  }

  async deleteBook(id: number): Promise<void> {
    this.books.delete(id);
  }
}

export const storage = new MemStorage();
