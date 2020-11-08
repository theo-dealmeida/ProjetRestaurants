<template>
  <div>
    <h3> Detail du restaurant </h3>
    <br>
    <p> {{restaurant.name}}</p>
    <h2> Cuisine : {{restaurant.cuisine}}</h2>
    <p v-if="selectedImage"><img style="width:600px; height: 400px" :src="selectedImage" alt=""></p>
    <md-list class="md-double-line">
      <md-subheader>Adresse</md-subheader>
      <md-list-item>
        <md-icon>location_on</md-icon>

        <div class="md-list-item-text">
          <md-label>Rue : {{restaurant.address.street}}</md-label>
          <md-label>Bâtiment : {{restaurant.address.building}}</md-label>
          <md-label>Code postale : {{restaurant.address.zipcode}}</md-label>
          <md-label>Ville : {{restaurant.borough}}</md-label>
          <md-label>Coordonnées : {{this.restaurantX }} {{ this.restaurantY}}</md-label>
          <br>
        </div>
      </md-list-item>

      <md-divider></md-divider>

      <md-subheader>Carte</md-subheader>
      <md-list-item>
        <l-map
            style="height: 300px; width: 400px"
            v-if="showMap"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
        >
          <l-tile-layer
              :url="url"
              :attribution="attribution"
          />
          <l-marker :lat-lng="withPopup">
            <l-popup style="width: auto">
              <div>
                {{restaurant.name}}
              </div>
            </l-popup>
          </l-marker>
        </l-map>
      </md-list-item>
    </md-list>

    <md-table v-model="restaurant"  md-card md-fixed-header>

      <md-table-toolbar>

        <div class="md-toolbar-section-start">
          <h1 class="md-title">Liste des notes</h1>
        </div>
      </md-table-toolbar>

      <md-table-row slot="md-table-row"
                    v-for="(note,index) in restaurant.grades"
                    :key="index"
                    :class="{bordureRouge:(index === 2)}"
      >
        <md-table-cell md-label="Note">
          <md-label>{{note.grade}}</md-label>
        </md-table-cell>

        <md-table-cell md-label="Score">
          <md-label>{{note.score}}</md-label>
        </md-table-cell>

        <md-table-cell md-label="Date">
          <md-label>{{note.date}}</md-label>
        </md-table-cell>
      </md-table-row>
    </md-table>

  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup} from "vue2-leaflet";
export default {
components: { LMap, LTileLayer, LMarker, LPopup},
name: "RestaurantDetail",
  data: function(){
    return {
      restaurant: [],
      images: [
        'https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        'https://cdn.pixabay.com/photo/2016/10/22/20/34/wine-1761613_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/03/05/19/02/abstract-1238247_1280.jpg',
        'https://cdn.pixabay.com/photo/2015/09/14/11/43/restaurant-939434_1280.jpg',
        'https://cdn.pixabay.com/photo/2018/09/14/11/12/food-3676796_1280.jpg',
        'https://cdn.pixabay.com/photo/2018/08/03/08/33/food-3581341_1280.jpg'

                          ],
      selectedImage: null,
      restaurantId: '',
      nom:'',
      restaurantX:0,
      restaurantY:0,
      zoom: 13,
      center: latLng(0, 0),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(0, 0),
      currentZoom: 11.5,
      currentCenter: latLng(0, 0),
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    }
  },
mounted() {
  console.log("AVANT AFFICHAGE");
  var url = new URL(window.location.href );
  this.restaurantId = url.searchParams.get("id");
  console.log(this.restaurantId);
  this.getRestaurantFromServer()
  this.selectedImage = this.randomImage(this.images)
},
  methods: {
    getRestaurantFromServer() {
      let url = "http://localhost:8080/api/restaurants/" + this.restaurantId;


      console.log(url);

      fetch(url)
          .then((responseJSON) => {
            // arrow functions, conserve le bon "this"
            // la réponse est en JSON, on la convertit avec la ligne suivante
            responseJSON.json().then((resJS) => {
              // Maintenant resJS est un vrai objet JavaScript
              this.restaurant = resJS.restaurant;
              this.showProgressBar = false;

              this.restaurantX = this.restaurant.address.coord[0];
              this.restaurantY = this.restaurant.address.coord[1];

              this.center = latLng(this.restaurantY, this.restaurantX);
              this.currentCenter = latLng(this.restaurantY, this.restaurantX);
              this.currentCenter = latLng(this.restaurantY, this.restaurantX);
              this.withPopup = latLng(this.restaurantY, this.restaurantX);
              console.log(this.center);
            });
          })
          .catch(function (err) {
            console.log(err);
          });
    },
    randomImage (images) {
      return images[Math.floor(Math.random()*images.length)];
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    }
  }
}
</script>

<style scoped>

.md-table {
  margin-top: 96px;
}

.md-subheader {
  font-size: 20px;
  color: #2c3e50;
}

.md-list {
  width: 600px;
  max-width: 100%;
  display: inline-block;
  margin: 50px;
  vertical-align: top;
  float: left;
  border: 1px solid black;
}

p {
  font-size: 45px;
  font-weight: bold;
  color: dodgerblue;
}

h2 {
  color: lightblue;
}

h3 {
  margin-top: -5px;
  color: lightgrey;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
