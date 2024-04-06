<template>

    <div class="container">

        <div class="box2">
            <span style="margin: 0px;font-size: 50px;color:black; font-family: 'Kanit', sans-serif; font-weight: bold;">Login</span>
        </div> 
        
        <div class="box3">
            <input type="text" class="username" id="username" placeholder="Username" style="margin-top  : 20px;" required>
            <i class="fa-solid fa-user" style="color: #ffffff;"></i>
        </div>

            
        <div class="box4">
            <input type="password" class="password" id="password" placeholder="Password" required>
            <i class="fa-solid fa-lock" style="color: #ffffff;"></i>
        </div>

        <div class="box5">
            <input type="submit" class="submit" value="Login">
        </div>

        
        <div class="box6">
            <div class="right">
                <input type="checkbox" id="check" class="check">
                <label for="check">Remember Me</label>
            </div>
            <div class="left">
                <label><a href="#">Forget password?</a></label>
            </div>
        </div>
        <div style="margin-left: 77px; margin-top: 35px; color: black; margin-bottom:60px;">
            <a href="signin.html" style="color: black;font-size: 21px; ">Don't Have an Account?</a>
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