<template>
  <div>
    <md-dialog-alert
        :md-active.sync="restoAjoute"
        md-content="Le restaurant a bien été ajouté"
        md-confirm-text="Fermer" />

    <h1>Ajouter un Restaurant</h1>
    <br>

    <form v-on:submit="ajouterRestaurant">
      <md-label>
        Nom : <input name="nom" type="text" required v-model="nom">
      </md-label>
      <md-label>
        Cuisine : <input name="cuisine" type="text" required v-model="cuisine">
      </md-label>
      <md-label>
        Ville : <input name="borough" type="text" required v-model="borough">
      </md-label>

      <md-button class="md-raised md-primary" type="submit">Ajouter</md-button>
    </form>
  </div>

</template>

<script>
export default {
  name: "AjouterRestaurants",
  data: function() {
    return {
      restoAjoute: false
    }
  },
    methods: {
      ajouterRestaurant(event)
      {
        this.restoAjoute = true;
        // Récupération du formulaire. Pas besoin de document.querySelector
        // ou document.getElementById puisque c'est le formulaire qui a généré
        // l'événement
        let form = event.target;

        // Récupération des valeurs des champs du formulaire
        // en prévision d'un envoi multipart en ajax/fetch
        let donneesFormulaire = new FormData(form);

        let url = "http://localhost:8080/api/restaurants";

        fetch(url, {
          method: "POST",
          body: donneesFormulaire,
        })
            .then((responseJSON) => {
              responseJSON.json().then((resJS) => {
                // Maintenant res est un vrai objet JavaScript
                console.log(resJS.msg);
                this.msg = resJS.msg;
                // On rafraichit la vue
              });
            })
            .catch(function (err) {
              console.log(err);
            });

        this.nom = "";
        this.cuisine = "";
        this.borough = "";
      }
    }
}
</script>

<style scoped>

.md-button{
  margin-top:-5px;
}

md-label {
  color: white;
}

</style>
