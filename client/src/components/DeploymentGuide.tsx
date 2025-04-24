import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DeploymentGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif text-primary-800">Déploiement GitHub</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-primary-700 mb-1">1. Configuration du projet</h3>
            <p className="text-sm text-gray-600">Assurez-vous d'avoir Node.js et Git installés sur votre machine.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary-700 mb-1">2. Initialiser le dépôt</h3>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
git init
git add .
git commit -m "Initial commit"
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary-700 mb-1">3. Créer un dépôt GitHub</h3>
            <p className="text-sm text-gray-600">Créez un nouveau dépôt sur GitHub et suivez les instructions.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary-700 mb-1">4. Lier et pousser</h3>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
git remote add origin https://github.com/username/repo.git
git push -u origin main
            </pre>
          </div>
          
          <a 
            href="https://docs.github.com/fr/repositories/creating-and-managing-repositories/creating-a-new-repository" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-center bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium py-2 px-4 rounded-lg mt-4 transition"
          >
            Voir la documentation complète
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
