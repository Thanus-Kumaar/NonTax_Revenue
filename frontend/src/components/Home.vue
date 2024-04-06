<template>
  <div class="home-main">
    <div class="home-text">Hello India,<br>
      Non Tax Revenue Analysis<br>
      To its Core
    </div>
    <div style="display: flex; flex-direction: row; padding-bottom: 20px;">
      <div style="font-size: 24px; text-align: center; padding-top: 100px;">India's 2023 <br>category wise collection</div>
      <div width="250px" height="250px" >
        <canvas ref="piechart"></canvas>
      </div>
    </div>
  </div>

  <div class="global-2023">
    <p style="font-size: 24px; text-align: center;">Global Non Tax Revenue Collection in 2023</p>
    <div class="countries">
      <div v-for="country in countries" style="text-align: center; font-size: 20px;">{{ country.country }}<br><div class="country-round"><span style="z-index: 1; position: relative; top: 38px; font-size: 20px; color: white;">{{ country.TotalAmount }}</span></div></div>
    </div>
  </div>
</template>

<style scoped>
  @import '../assets/Home.css';
</style>

<script>
import axios from 'axios';
import Chart, { registerables } from 'chart.js/auto'

  export default{
    data(){
      return{
        animate :false,
        countries :[],
        pie_cat :[],
        pie_cat_actual :[],
        piechartdata :null,
        piechart :null,
        country_currency :{
          "India": 8377,
          "America":36,
          "Japan":165,
        }
      }
    },
    methods:{
      piegraph_init_cat(list){
        var i=0
        this.pie_cat = []
        this.pie_cat_actual = []  
        this.piechartdata = null
        list.forEach(element => {
          this.pie_cat[i] = element['category']
          this.pie_cat_actual[i] = element['tot_actual']
          i++
        });
        this.piechartdata = {
            labels: this.pie_cat,
            datasets:[{
              data: this.pie_cat_actual,}],
            }
      },
      async getCountrydata(){
        await axios.get('http://localhost:8000/sql/home')
        .then(Response=>{
          console.log(Response)
          this.countries = Response.data
        })
        .catch(error=>{
          console.log(error)
        })
      },
      async renderPie(){
        await axios.get('http://localhost:8000/sql/home-pie')
        .then(response=>{
          console.log(response.data)
          this.piegraph_init_cat(response.data)
        })
        .catch(error=>{
          console.error(error)
        })
        if (this.piechart) {
          this.piechart.destroy();
        }

        const ctx = this.$refs.piechart.getContext('2d')
        this.piechart = new Chart(ctx,{
          type: 'doughnut',
          data:this.piechartdata,
          options:{
            maintainAspectRatio: true,
            legend: {
              display :true,
              position : 'top'
            },
            layout: {
            padding: {
                left: 25, // Adjust the left padding to create space for the legend
                right: 0,
                top: 0,
                bottom: 0
              }
            },
          }
        })
      },
    },
    async mounted(){
      this.animate = true
      this.getCountrydata();
      this.renderPie();
    }
  }
</script>