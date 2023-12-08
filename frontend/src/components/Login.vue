<template>
  <div class="a">
    <div class="form">
        <div class="button">
            <div id="btn"></div>
            <div><button type="button" class="toggle" onclick="login()">LOG IN </button></div>
           <div><button type="button" class="toggle" onclick="register()">REGISTER </button></div>
        </div>
        <form  id="login" class="input">
            <input type="text" class="input-field" placeholder="USER ID" required><br>
            <input type="text" class="input-field" placeholder="ENTER PASSWORD" required><br>
            <input type="checkbox" class="checkbox"><span>Remember password</span><br>
            <button type="submit" class="sbutton">LOG IN</button>
        </form>
        <form id="register" class="input">
            <input type="text" class="input-field" placeholder="USER ID" required><br>
            <input type="email" class="input-field" placeholder="EMAIL ID" required>
            <input type="text" class="input-field" placeholder="ENTER PASSWORD" required><br>
            <input type="checkbox" class="checkbox"><span>I agree to the terms and conditions</span><br>
            <button type="submit" class="sbutton">REGISTER</button>
        </form>
    </div>
  </div>
</template>

<script>
  var x =document.getElementById("login")
  var y =document.getElementById("register")
  var z =document.getElementById("button")
  function login(){
      x.style.left="50px";
      y.style.left="450px";
      z.style.left="110px";
  }
  
  function register(){
      x.style.left="-400px";
      y.style.left="50px";
      z.style.left="110px";
  }
</script>

<style scoped>
@import '../assets/Login.css';
</style>