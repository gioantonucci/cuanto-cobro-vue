<template>
  <nav>
    <router-link to="/">Home</router-link> | 
    <router-link to="/por-dia">Por día</router-link> |
    <router-link to="/por-hora">Por hora</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  background-color: #35495E ;
  font-family: "Open Sans", sans-serif;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #496583;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
