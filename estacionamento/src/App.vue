<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #0D6EFD;" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ParkingSmart</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/marca/lista">Marca</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/modelo/lista">Modelo</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/condutor/lista">Condutor</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/veiculo/lista">Veiculo</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/configuracao/lista">Configuracao</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/movimentacao/lista">Movimentacao</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  <router-view/>
</template>

<style lang="scss">

/** Style do Bootstrap */
$primary: #900;
$enable-shadows: true;
$prefix: "mo-";

@import "~/node_modules/bootstrap/scss/bootstrap";
@import url('https://fonts.googleapis.com/css2?family=Comic+Neue:ital@1&family=Gruppo&family=Poppins:ital,wght@0,300;1,200;1,400&display=swap');

/** Fim das configurações do Style do Bootstrap */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
li{
  font-size: 20px;
  font: 400;
  font-family: 'Poppins', sans-serif;
}
div ul li:hover{
  color: #6930C3;
}
div ul li:active{
  color: #F1F1F1;
  text-shadow: 2px #F1F1F1;;
}
div ul{
  margin-left: 100px;
}
div a{
  font-family: 'Poppins', sans-serif;
  margin-left: 50px;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

th {
  font-weight: normal !important;
}

hr {
  margin-top: -5px;
  margin-bottom: 0px;
}

.row{
  margin-top: 10px;
}
.container{
  margin-top: 10px;
  background: #ECECEC;
  padding: 20px;
}

nav{
  background: linear-gradient(90deg, #2E0249, #570A57, #A91079 );
  background-size: 300% 300%;
  animation: colorChange 10s ease infinite;
  transition: 0.5s;
  overflow: hidden;

}

@keyframes colorChange {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>
