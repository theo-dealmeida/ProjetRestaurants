<template>
  <div>
    <h1>Nombre de restaurants : {{nbRestaurantsTotal}}</h1>

    <div>
      <md-progress-spinner class="md-accent" md-mode="indeterminate" v-show="showProgressBar"></md-progress-spinner>
    </div>

    <md-dialog-confirm
        :md-active.sync="NoRestaurantFound"
        md-content="Aucun restaurant ne correspond à votre recherche."
        md-confirm-text="Fermer"
        md-cancel-text="Ajouter un restaurant"
        @md-cancel="changerURL()"/>

    <md-dialog-alert
        :md-active.sync="RestoSupprime"
        md-content="Le restaurant a bien été supprimé"
        md-confirm-text="Fermer" />

    <md-table v-model="restaurants"  md-card md-fixed-header>

      <md-table-toolbar>

        <div class="md-toolbar-section-start">
          <h1 class="md-title">Liste des restaurants</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input @input="chercherRestaurants()"
                    type="text"
                    v-model="nomRestauRecherche" placeholder="Chercher par nom..." />
        </md-field>

      </md-table-toolbar>

      <md-table-row slot="md-table-row"
          v-for="(r,index) in restaurants"
          :key="index"
          :class="{bordureRouge:(index === 2)}"
      >
        <md-table-cell md-label="Nom">
          <md-label v-show="r.modification!==true">{{r.name}}</md-label>
          <md-input v-show="r.modification===true"  type="text" :placeholder="r.name" v-model="nomChange" />
        </md-table-cell>
        <md-table-cell md-label="Cuisine">
          <md-label v-show="r.modification!==true">{{r.cuisine}}</md-label>
          <md-input  v-show="r.modification===true" type="text" :placeholder="r.cuisine" v-model="cuisineChange"/>
        </md-table-cell>
        <md-table-cell md-label="Ville">
          <md-label v-show="r.modification!==true">{{r.borough}}</md-label>
          <md-input  v-show="r.modification===true" type="text" :placeholder="r.borough" v-model="boroughChange"/>
        </md-table-cell>
        <md-table-cell md-label="Modification">

          <md-button v-show="r.modification===true" @click="annulerModif(r)" class=" md-icon-button" md-menu-trigger>
            <md-icon>close</md-icon>
          </md-button>

          <md-button class="md-raised md-primary" @click="confirmerModif(r)" v-show="r.modification===true">Confirmer</md-button>
          <md-button :disabled="onModif===true" v-show="r.modification!==true" class="md-raised" @click="restaurantsModifEnCours += r;verifModifEnCours(r)">Modifier</md-button>
          <md-button :disabled="onModif===true" class="md-raised md-accent" @click="supprimerRestaurant(r)">Supprimer</md-button>

        </md-table-cell>
        <md-table-cell md-label="Détails">

          <md-button class=" md-icon-button md-primary" md-menu-trigger :disabled="r.address === undefined" :href="'/RestaurantDetail?id=' + r._id">
             <md-icon>menu</md-icon>
          </md-button>

        </md-table-cell>
      </md-table-row>
    </md-table>
    <br>
    <p>Nombre de pages total : {{nbPagesTotal}}</p>
    <p>Nombre de restaurants par page :
      <input
          @input="getRestaurantsFromServer()"
          type="range" min=2 max=1000 v-model="pagesize"
      >{{pagesize}}</p>
    <md-button class="md-raised md-primary" :disabled="page===0" @click="pagePrecedente(), annulerModif(r)">Précédent</md-button>
    <md-button class="md-raised md-primary" :disabled="page===nbPagesTotal" @click="pageSuivante(), annulerModif(r)">Suivant</md-button>
    <p>Page courante : {{page + 1}}</p>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: 'ListeDesRestaurants',
  data: function(){
    return {
      nomChange: "",
      cuisineChange: "",
      boroughChange: "",
      onModif:false,
      showProgressBar: false,
      showConfirmButton:false,
      RestoSupprime: false,
      NoRestaurantFound:false,
      restaurants: [],
      restaurantsModifEnCours: [],
      nom: "",
      cuisine: "",
      borough:"",
      nbRestaurantsTotal: 0,
      page: 0,
      laPage:'Liste',
      pagesize: 10,
      nbPagesTotal: 0,
      msg: "",
      nomRestauRecherche: "",
    }
  },
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.showProgressBar = true;
    this.getRestaurantsFromServer();
  },
  methods: {

    confirmerModif(r) {

      let donneesFormulaire = new FormData();

      if(this.nomChange ==''){
        donneesFormulaire.set("nom",r.name);
      }
      else{
        donneesFormulaire.set("nom",this.nomChange);
      }

      if(this.cuisineChange ==''){
        donneesFormulaire.set("cuisine", r.cuisine);
      }
      else{
        donneesFormulaire.set("cuisine", this.cuisineChange);
      }

      if(this.boroughChange ==''){
        donneesFormulaire.set("borough",r.borough);
      }
      else{
        donneesFormulaire.set("borough",this.boroughChange);
      }

      let url = "http://localhost:8080/api/restaurants/" + r._id;

        fetch(url, {
          method: "PUT",
          body: donneesFormulaire,
        })
            .then((responseJSON) => {
              responseJSON.json().then((resJS) => {
                // Maintenant res est un vrai objet JavaScript
                console.log(resJS.msg);
                this.msg = resJS.msg;
                this.getRestaurantsFromServer();
              });
            })
            .catch(function (err) {
              console.log(err);
            });

        this.nom = r.nom;
        this.cuisine = r.cuisine;
        this.borough = r.borough;

        this.annulerModif(r);
      },

    verifModifEnCours(r){
      if(this.restaurantsModifEnCours.includes(r)){
        r.modification = true;
        this.onModif = true;
      }
    },

    changerURL(){
      window.location.href = '/AjouterRestaurants';
    },

    annulerModif(r){
      this.onModif = false;
      r.modification = false;
      this.restaurantsModifEnCours = [];
    },

    pagePrecedente() {
      this.showProgressBar = true;
      if (this.page === 0) return;

      this.page--;
      this.getRestaurantsFromServer();
    },
    pageSuivante() {
      this.showProgressBar = true;
      if (this.page === this.dernierePage) return;
      this.page++;
      this.getRestaurantsFromServer();
    },
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pagesize;
      url += "&name=" + this.nomRestauRecherche;

      fetch(url)
          .then((responseJSON) => {
            // arrow functions, conserve le bon "this"
            // la réponse est en JSON, on la convertit avec la ligne suivante
            responseJSON.json().then((resJS) => {
              // Maintenant resJS est un vrai objet JavaScript
              this.restaurants = resJS.data;
              this.nbRestaurantsTotal = resJS.count;
              this.nbPagesTotal = Math.round(
                  this.nbRestaurantsTotal / this.pagesize
              );
              if(this.nbRestaurantsTotal===0){
                this.NoRestaurantFound = true;
              }
              this.showProgressBar =false;
            });
          })
          .catch(function (err) {
            console.log(err);
          });
    },
    chercherRestaurants: _.debounce(function () {
      // appelée que si on n'a pas tapé de touches pendant un certain délai
      this.showProgressBar =true;
      this.getRestaurantsFromServer();
    }, 300),
    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r._id;
      this.showProgressBar = true;

      fetch(url, {
        method: "DELETE",
      })
          .then((responseJSON) => {
            responseJSON.json().then((resJS) => {
              // Maintenant res est un vrai objet JavaScript
              console.log(resJS.msg);
              this.msg = resJS.msg;
              // On rafraichit la vue
              this.getRestaurantsFromServer();
              this.RestoSupprime=true;
            });
          })
          .catch(function (err) {
            console.log(err);
          });
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

input{
  text-align: center;
}

.md-title{
  text-align: left;
}

.md-button .md-ripple{
  margin-top: 0px;
}
.md-table-head {
  text-align: center;
}
.md-table{
  width: -moz-fit-content;
  margin-left: 50px;
  margin-right: 50px;
}

h1{
  color:white;
}
h3 {
  margin: 40px 0 0;
  color: white;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: white;
}

p{
  color:white;
}
</style>


