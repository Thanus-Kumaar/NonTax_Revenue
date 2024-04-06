<template>
  <div class="navbar">
    <div class="title">Non Tax Revenue - India</div>
    <div class="links">
      <router-link to="/home" class="link">Home</router-link>
      <router-link to="/analyse" class="link">Analyse</router-link>
      <router-link to="/admin" class="link">Admin</router-link>
      <router-link to="/login" class="link">Login/Sign Up</router-link>
    </div>
  </div>
  <div class="main-page">
    <router-view></router-view>
  </div>
  <div class="bottombar">
    <div class="title" style="text-align: center; width: 100%;">Thank You for visiting our page</div>
  </div>
</template>

<style scoped>

  .navbar{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    padding: 5px;
    margin-top: 3px;
    background-color: rgb(35, 35, 35);
    color: white;
  }
  .bottombar{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    padding: 5px;
    margin-top: 25px;
    background-color: rgb(16, 16, 16);
    color: white;
    margin-bottom: 5px;
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
    color:white;
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
