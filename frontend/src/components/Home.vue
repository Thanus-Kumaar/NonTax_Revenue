<template>
  <div class="home-main">
    <div class="home-text">Hello India,<br>
      Non Tax Revenue Analysis<br>
      To its Core
    </div>
    <div v-if="this.animate"> 
      <div style="display: flex; flex-direction: row;">
        <div :class="{'outer-circle-final': this.animate}"></div>
        <div class="inner-circle"></div>
      </div> 
      <div style="position: relative; top: -160px; left: 120px; font-size: 22px;">INDIA</div>
    </div>
  </div>
  <div class="countries">
    <div v-if="this.animate" class="country-div">  
      <div :class="{'outer-circle-final-small': this.animate}"><div class="inner-circle-small"></div></div>
      <div class="country-name">America</div>
    </div>
    <div v-if="this.animate" class="country-div">  
      <div :class="{'outer-circle-final-small': this.animate}"><div class="inner-circle-small"></div></div>
      <div class="country-name">Japan</div>
    </div>
    <div v-if="this.animate" class="country-div">  
      <div :class="{'outer-circle-final-small': this.animate}"><div class="inner-circle-small"></div></div>
      <div class="country-name">Russia</div>
    </div>
    <div v-if="this.animate" class="country-div">  
      <div :class="{'outer-circle-final-small': this.animate}"><div class="inner-circle-small"></div></div>
      <div class="country-name">China</div>
    </div>
    <div v-if="this.animate" class="country-div">  
      <div :class="{'outer-circle-final-small': this.animate}"><div class="inner-circle-small"></div></div>
      <div class="country-name">Germany</div>
    </div>
  </div>
</template>

<style scoped>
  @import '../assets/Home.css';
</style>

<script>
  export default{
    data(){
      return{
        animate :false
      }
    },
    methods:{

    },
    mounted(){
      this.animate = true
    }
  }
</script>