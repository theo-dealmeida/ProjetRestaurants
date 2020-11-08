# Projet Restaurants

### Pré-requis

- Modifier le fichier `crud-mongo.js` du TP2 aux lignes suivantes :
```javascript
if(!err) {
            let myquery = { "_id": ObjectId(id)};
			let newvalues = { $set: {name: formData.nom, cuisine: formData.cuisine, borough: formData.borough } };
```

- Démarrer le serveur avec la commande `node serverCrudWithMongo` sur le TP2. 

- Utiliser la commande `npm run serve` sur le Projet Restaurants pour lancer l'application.

- Se rendre au lien [localhost:8081](localhost:8081)

### Explication de l'application en vidéo 

[Projet Restaurants - Théo DE ALMEIDA](https://youtu.be/JbEqj5OhaJ8)

### Expllication de l'application

### Paramèters globaux

Un bouton menu sera toujours présent en haut à gauche de l'application vous permettant de naviguer entre la page [Liste des restaurants](http://localhost:8081/) et la page [Ajouter un restaurant](http://localhost:8081/AjouterRestaurants).

Si vous vous trouvez sur une page de détail d'un restaurant, un bouton rouge "Retour" vous permettra de revenir à la [Liste des restaurants](http://localhost:8081/)


### Page Liste des restaurants

[Page Liste des restaurants](http://localhost:8081/)

Il s'agit de la page principale de l'application. 

Vous pouvez : 

- Chercher un restaurant par son nom dans la barre de recherche dédiée
- Modifier chaque restaurant sur la même page grâce aux boutons "modifier". Vous pouvez annuler la modification en cours grâce au bouton en forme de Croix
- Supprimer un restaurant grâce au bouton supprimer
- Afficher les détails d'un restaurants si celui-ci en dispose. Dans le cas contraire, le bouton sera grisé
- Modifier le nombre de restaurant par page
- Changer de page

Une boîte de dialogue apparaît en cas de nom de restaurant introuvable vous indiquant "Aucun restaurant ne correspond à votre recherche." avec 2 boutons :
- Un bouton "Fermer" permettant de fermer la boîte de dialogue et un bouton "Ajouter un restaurant" qui vous permettre de vous rendre sur la page [Ajouter un restaurant](http://localhost:8081/AjouterRestaurants). 

Une boîte de dialogue apparaît également en cas de suppression d'un restaurant du tableau vous confirmant la suppression du restaurant

### Page Ajouter un restaurant

[Page Ajouter un restaurant](http://localhost:8081/AjouterRestaurants).

Cette page vous permet d'ajouter un restaurant dans la base de données.

Vous devrez y renseigner son nom, son type de cuisine, et sa ville.

Une fois ces champs remplis, vous pourrez cliquer sur le bouton "Ajouter" et le restaurant sera ajouté à la base de données.

Une boîte de dialogue apparaît avant le rechargement de la page vous indiquant que le restaurant a bien été ajouté.

### Page Détail d'un restaurant

Cette page est accessible via la page [Liste des restaurants](http://localhost:8081/) en cliquant sur le bouton "Détails" situé sur la colonne de droite de chaque restaurant du tableau.

Si un restaurant n'a pas de détail, le bouton sera désactivé.

Dans le cas contraire, en cliquant sur ce bouton, vous serez amené sur une page affichant les détails du restaurant sélectionné.

Ces détails sont :

- Le nom du restaurant
- Le type de cuisine du restaurant
- Une image choisie aléatoirement
- L'adresse complète du restaurant
- Une carte centrée sur le restaurant
- La liste des notes du restaurant

Un bouton rouge "Retour" en haut à gauche de la page vous permet de revenir sur la page [Liste des restaurants](http://localhost:8081/)
