import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { BookFormData, BookWithId } from "@/lib/types";
import { insertBookSchema } from "@shared/schema";

const formSchema = insertBookSchema.extend({
  description: z.string().optional(),
  year: z.coerce.number().min(1000, "L'année doit être supérieure à 1000").max(new Date().getFullYear(), `L'année ne peut pas dépasser ${new Date().getFullYear()}`),
});

interface BookFormProps {
  onSubmit: (data: BookFormData) => void;
  bookToEdit: BookWithId | null;
  isSubmitting: boolean;
  onCancel?: () => void;
}

export default function BookForm({ onSubmit, bookToEdit, isSubmitting, onCancel }: BookFormProps) {
  const isEditMode = !!bookToEdit;

  const form = useForm<BookFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      year: new Date().getFullYear(),
      genre: "",
      description: "",
    },
  });

  useEffect(() => {
    if (bookToEdit) {
      form.reset({
        title: bookToEdit.title,
        author: bookToEdit.author,
        year: bookToEdit.year,
        genre: bookToEdit.genre,
        description: bookToEdit.description || "",
      });
    } else {
      form.reset({
        title: "",
        author: "",
        year: new Date().getFullYear(),
        genre: "",
        description: "",
      });
    }
  }, [bookToEdit, form]);

  const handleFormSubmit = (data: BookFormData) => {
    onSubmit(data);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-primary-800">
          {isEditMode ? "Modifier le livre" : "Ajouter un livre"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auteur</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Année</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1000" 
                        max={new Date().getFullYear()}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Roman">Roman</SelectItem>
                        <SelectItem value="Science-Fiction">Science-Fiction</SelectItem>
                        <SelectItem value="Biographie">Biographie</SelectItem>
                        <SelectItem value="Histoire">Histoire</SelectItem>
                        <SelectItem value="Fantaisie">Fantaisie</SelectItem>
                        <SelectItem value="Mystère">Mystère</SelectItem>
                        <SelectItem value="Conte">Conte</SelectItem>
                        <SelectItem value="Classique">Classique</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <Button 
                type="submit" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={isSubmitting}
              >
                <span className="material-icons mr-1">save</span>
                {isEditMode ? "Enregistrer" : "Ajouter"}
              </Button>
              
              {isEditMode && onCancel && (
                <Button 
                  type="button" 
                  variant="ghost"
                  onClick={onCancel}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Annuler
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
