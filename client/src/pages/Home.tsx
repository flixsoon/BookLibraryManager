import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import BookTable from "@/components/BookTable";
import BookForm from "@/components/BookForm";
import SearchBar from "@/components/SearchBar";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { BookFormData, BookWithId, SearchFilters } from "@/lib/types";

export default function Home() {
  const { toast } = useToast();
  const [bookToEdit, setBookToEdit] = useState<BookWithId | null>(null);
  const [bookToDelete, setBookToDelete] = useState<BookWithId | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({ query: "", genre: "" });
  const [allBooks, setAllBooks] = useState<BookWithId[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookWithId[]>([]);

  // Fetch all books
  const { data: books, isLoading } = useQuery({
    queryKey: ["/api/books"],
    refetchOnWindowFocus: true,
  });

  // Apply filters to books
  useEffect(() => {
    if (books) {
      setAllBooks(books);
      
      if (filters.query === "" && (filters.genre === "" || filters.genre === "all")) {
        setFilteredBooks(books);
      } else {
        const filtered = books.filter((book: BookWithId) => {
          const matchesQuery = filters.query === "" || 
            book.title.toLowerCase().includes(filters.query.toLowerCase()) ||
            book.author.toLowerCase().includes(filters.query.toLowerCase());
          
          const matchesGenre = filters.genre === "" || 
                               filters.genre === "all" || 
                               book.genre === filters.genre;
          
          return matchesQuery && matchesGenre;
        });
        
        setFilteredBooks(filtered);
      }
    }
  }, [books, filters]);

  // Handle search/filter changes
  const handleSearchChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  // Get unique genres for filter dropdown
  const genres = Array.from(new Set(allBooks.map(book => book.genre))).sort();

  // Add a new book
  const createBookMutation = useMutation({
    mutationFn: async (book: BookFormData) => {
      await apiRequest("POST", "/api/books", book);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/books"] });
      toast({
        title: "Succès!",
        description: "Le livre a été ajouté avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: `Échec de l'ajout du livre: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Update an existing book
  const updateBookMutation = useMutation({
    mutationFn: async ({ id, book }: { id: number; book: BookFormData }) => {
      await apiRequest("PUT", `/api/books/${id}`, book);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/books"] });
      setBookToEdit(null);
      toast({
        title: "Succès!",
        description: "Le livre a été mis à jour avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: `Échec de la mise à jour du livre: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Delete a book
  const deleteBookMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/books/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/books"] });
      setBookToDelete(null);
      toast({
        title: "Succès!",
        description: "Le livre a été supprimé avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: `Échec de la suppression du livre: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const handleSubmit = (data: BookFormData) => {
    if (bookToEdit) {
      updateBookMutation.mutate({ id: bookToEdit.id, book: data });
    } else {
      createBookMutation.mutate(data);
    }
  };

  // Edit book handler
  const handleEditBook = (book: BookWithId) => {
    setBookToEdit(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel edit handler
  const handleCancelEdit = () => {
    setBookToEdit(null);
  };

  // Delete confirmation handler
  const handleDeleteBook = (book: BookWithId) => {
    setBookToDelete(book);
  };

  // Confirm delete handler
  const handleConfirmDelete = () => {
    if (bookToDelete) {
      deleteBookMutation.mutate(bookToDelete.id);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Book List */}
      <div className="lg:col-span-2">
        <SearchBar onSearchChange={handleSearchChange} genres={genres} />
        
        <BookTable
          books={filteredBooks}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
          isLoading={isLoading}
        />
      </div>

      {/* Right Column - Forms */}
      <div className="lg:col-span-1">
        <BookForm
          onSubmit={handleSubmit}
          bookToEdit={bookToEdit}
          isSubmitting={createBookMutation.isPending || updateBookMutation.isPending}
          onCancel={handleCancelEdit}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        book={bookToDelete}
        isOpen={!!bookToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setBookToDelete(null)}
      />
    </div>
  );
}
