<template>
  <div id="app">
    <div id="menu">
    <md-menu md-direction="bottom-start">
      <md-button class="md-fab md-icon-button md-primary" md-menu-trigger>
        <md-icon>menu</md-icon>
      </md-button>
      <md-button href="../" class="md-fab" style="margin-left: 10px" v-show="showBouton">
        <md-icon>arrow_back</md-icon>
      </md-button>
      <md-menu-content>
        <md-menu-item href="/">Liste des restaurants</md-menu-item>
        <md-menu-item href="/AjouterRestaurants">Ajouter un restaurant</md-menu-item>
      </md-menu-content>
    </md-menu>
    </div>
    <h1>Projet Restaurants</h1>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: function() {
    return {
      showBouton: false
    }
  },
  mounted() {
    if(window.location.href.includes('RestaurantDetail')){
      this.showBouton = true;
    }
  }
}
</script>

<style>

#menu {
  position: absolute;
}

.md-menu {
  float:left;
  padding:10px;
}

h1{
  padding-top:10px;
}
html.md-theme-default {
  background-color: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
