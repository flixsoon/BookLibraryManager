import { Book } from "@shared/schema";

export interface BookFormData {
  title: string;
  author: string;
  year: number;
  genre: string;
  description?: string;
}

export type BookWithId = Book;

export interface SearchFilters {
  query: string;
  genre: string;
}
