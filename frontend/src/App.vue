<template>
  <div class="navbar">
    <div class="title">Non Tax Revenue - India</div>
    <div class="links">
      <router-link to="/home" class="link">Home</router-link>
      <router-link to="/analyse" class="link">Analyse</router-link>
      <router-link to="/login" class="link">Login/Sign Up</router-link>
    </div>
  </div>
  <div class="main-page">
    <router-view></router-view>
  </div>
</template>

<style scoped>
  .navbar{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    padding: 5px;
    margin: 3px;
    background-color: gainsboro;
  }
  .title{
    margin-left: 30px;
    font-size: 24px;
  }
  .links{
    width: 500px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    font-size: 17px;
    margin-top: 3px;
  }
  .link{
    text-decoration: none;
    color:black;
  }
  .link:hover{
    cursor: pointer;
    user-select: none;
  }
  .main-page{
    margin: 2px;
  }
</style>

<script></script>
