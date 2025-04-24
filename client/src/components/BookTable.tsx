import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookWithId } from "@/lib/types";
import { useState } from "react";

interface BookTableProps {
  books: BookWithId[];
  onEdit: (book: BookWithId) => void;
  onDelete: (book: BookWithId) => void;
  isLoading: boolean;
}

export default function BookTable({ books, onEdit, onDelete, isLoading }: BookTableProps) {
  const getGenreColor = (genre: string) => {
    const genreMap: Record<string, string> = {
      "Roman": "bg-blue-100 text-blue-800",
      "Science-Fiction": "bg-green-100 text-green-800",
      "Conte": "bg-purple-100 text-purple-800",
      "Classique": "bg-yellow-100 text-yellow-800",
      "Biographie": "bg-indigo-100 text-indigo-800",
      "Histoire": "bg-red-100 text-red-800",
      "Fantaisie": "bg-emerald-100 text-emerald-800",
      "Mystère": "bg-pink-100 text-pink-800"
    };
    
    return genreMap[genre] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif text-primary-800">Ma Collection de Livres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-serif text-accent">Ma Collection de Livres</CardTitle>
          <Badge variant="outline" className="bg-accent/10 text-accent">
            {books.length} {books.length === 1 ? "Livre" : "Livres"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {books.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/5">
                  <TableHead className="font-bold">Titre</TableHead>
                  <TableHead className="font-bold">Auteur</TableHead>
                  <TableHead className="font-bold">Année</TableHead>
                  <TableHead className="font-bold">Genre</TableHead>
                  <TableHead className="text-right font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-10 h-14 bg-accent/10 rounded flex-shrink-0 mr-3 flex items-center justify-center">
                          <span className="material-icons text-accent">auto_stories</span>
                        </div>
                        <span className="font-medium">{book.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{book.author}</TableCell>
                    <TableCell className="text-gray-600">{book.year}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getGenreColor(book.genre)}`}>
                        {book.genre}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onEdit(book)}
                        className="text-primary hover:text-primary/70 h-8 w-8"
                      >
                        <span className="material-icons">edit</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onDelete(book)}
                        className="text-destructive hover:text-destructive/70 h-8 w-8"
                      >
                        <span className="material-icons">delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="material-icons text-5xl text-gray-300 mb-3">auto_stories</span>
            <h3 className="text-xl font-medium text-gray-500 mb-2">Aucun livre trouvé</h3>
            <p className="text-gray-400 mb-4">Votre collection est vide pour l'instant.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
