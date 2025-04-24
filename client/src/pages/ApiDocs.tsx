import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ApiDocs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif font-bold text-primary-800">API RESTful</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Utilisez ces endpoints pour interagir avec l'API de gestion des livres:</p>
        
        <div className="overflow-x-auto">
          <Table className="mb-4">
            <TableHeader>
              <TableRow className="bg-primary-50">
                <TableHead className="text-xs font-semibold text-primary-800">Méthode</TableHead>
                <TableHead className="text-xs font-semibold text-primary-800">Endpoint</TableHead>
                <TableHead className="text-xs font-semibold text-primary-800">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b">
                <TableCell>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded">GET</span>
                </TableCell>
                <TableCell className="font-mono text-sm">/api/books</TableCell>
                <TableCell className="text-sm text-gray-600">Récupérer tous les livres</TableCell>
              </TableRow>
              <TableRow className="border-b">
                <TableCell>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded">GET</span>
                </TableCell>
                <TableCell className="font-mono text-sm">/api/books/:id</TableCell>
                <TableCell className="text-sm text-gray-600">Récupérer un livre par ID</TableCell>
              </TableRow>
              <TableRow className="border-b">
                <TableCell>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">POST</span>
                </TableCell>
                <TableCell className="font-mono text-sm">/api/books</TableCell>
                <TableCell className="text-sm text-gray-600">Créer un nouveau livre</TableCell>
              </TableRow>
              <TableRow className="border-b">
                <TableCell>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded">PUT</span>
                </TableCell>
                <TableCell className="font-mono text-sm">/api/books/:id</TableCell>
                <TableCell className="text-sm text-gray-600">Mettre à jour un livre existant</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded">DELETE</span>
                </TableCell>
                <TableCell className="font-mono text-sm">/api/books/:id</TableCell>
                <TableCell className="text-sm text-gray-600">Supprimer un livre</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-md font-medium text-primary-800 mb-2">Test avec Bruno</h3>
          <p className="text-sm text-gray-600 mb-3">Les fichiers de configuration Bruno sont inclus pour tester facilement l'API.</p>
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">{`# Exemple de requête Bruno
POST {{baseUrl}}/api/books
Content-Type: application/json

{
  "title": "Nouveau Livre",
  "author": "Auteur",
  "year": 2023,
  "genre": "Roman",
  "description": "Description du livre"
}`}</pre>
        </div>
      </CardContent>
    </Card>
  );
}
