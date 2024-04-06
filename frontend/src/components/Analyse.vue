<template>
  <div style="display: flex; flex-direction: row; justify-content: space-between; padding: 75px; padding-top: 0px; padding-bottom: 0px;">
    <div style="height: 400px; width: 600px; background-color: rgb(211, 255, 201); padding: 30px; border-radius: 15px;">
      <p style="text-align: center; font-size: 25px; margin: 0px; padding: 8px;">India's Trend</p>
      <canvas ref="lineChart" class="custom-chart"></canvas>
    </div>
    <div style=" background-color: rgb(211, 255, 201); padding: 60px; padding-top: 15px; padding-bottom: 15px; border-radius: 15px; margin-right: 40px;">
      <p  style="text-align: center; font-size: 25px; margin: 0px;">Actual Collection</p><br>
      <label for="yearDropdown">Select Year:</label>
      <select v-model="selectedYear" id="yearDropdown" @click="getCategories()" style="margin:5px;">
        <option v-for="year in years_pie">{{ year }}</option>
      </select>
      <div v-show="selectedYear!=null">
        <label for="catDropDown">Select Category:</label>
        <select v-model="selectedCat" id="catDropDown">
          <option v-for="cat in categories">{{ cat }}</option>
        </select>
      </div>
      <button v-if="selectedCat!=null" @click="renderPie()" style="margin: 5px;">Submit</button>
      <div style="width: 300px; height: 300px;">
        <canvas ref="piechart"></canvas>
      </div>
    </div>
  </div>
  <div style="display: flex; flex-direction: row; justify-content: space-between; margin: 10px; margin-top: 0px; padding: 75px; padding-top: 0px; padding-bottom: 0px;">
    <div style="height: 400px; width: 600px; background-color: rgb(211, 255, 201); padding: 30px; border-radius: 15px;">
      <p style="text-align: center; font-size: 25px; margin: 0px; padding: 8px;">Global Trend Comparison</p>
      <canvas ref="barChart" class="custom-chart"></canvas>
    </div>
    <div style="height: 400px; width: 400px; background-color: rgb(211, 255, 201); padding: 30px; border-radius: 15px; font-size: 30px; text-align: center;">
      <div style="margin-top: 140px;">The expected total non-tax revenue for India next year<br> <div style="display: block; font-size: 50px; margin-top: 10px;">&#8377 {{ exp_tot }}</div></div>
    </div>
  </div>
</template>

<script>
  import Chart, { registerables } from 'chart.js/auto'
  import axios from 'axios'

  export default {
    data() {
      return {
        chart: null,
        piechart: null,
        barchart: null,
        years: [],
        byears: ['2015','2016','2017','2018','2019','2020','2021','2022'],
        totamt: [],
        b_totamt_cty: {},
        years_pie: [2015,2016,2017,2018,2019,2020,2021,2022,2023],
        selectedYear: null,
        categories: ["All"],
        selectedCat: null,
        pie_cat: [],
        pie_sub_cat: [],
        pie_cat_actual: [],
        pie_sub_cat_actual: [],
        linechartdata: null,
        piechartdata:null,
        barchartdata:null,
        exp_tot:0,
      }
    },
    async mounted() {
      await this.renderLineChart();
      await this.renderBarChart();
      await this.renderPie();
      await this.getprediction();
  },
    methods: {
      linegraph_init(list){
        var i=0
        this.years = []
        this.totamt = []
        this.linechartdata = null
        list.forEach(element => {
          this.years[i] = String(element['year'])
          this.totamt[i] = element['TotalAmount']
          i++
        })
        this.linechartdata = {
            labels: this.years,
            datasets: [{
              label: 'India',
              data: this.totamt,
              borderColor: 'rgba(0,0,0, 1)',
              backgroundColor:'rgb(255, 64, 105)',
              borderWidth: 2,
              fill: false,},],
            }
      },
      bar_init(list){
        console.log(list)
        var i=0
        this.b_totamt_cty = {}
        list.forEach(element => {
          if(!this.b_totamt_cty[element['country']]){
            this.b_totamt_cty[element['country']] = [element['TotalAmount']]
          }
          else{
            this.b_totamt_cty[element['country']].push(element['TotalAmount'])
          }
          i++
        })
        console.log(this.byears,this.b_totamt_cty)
        this.barchartdata = {
            labels: this.byears,
            datasets: [{
              label: 'India',
              data: this.b_totamt_cty['India'],
              backgroundColor :'rgb(5, 155, 255,1)',
              borderColor: 'rgba(0, 0, 0, 1)',
              borderWidth: 2,
              fill: false,},
              {
              label: 'America',
              data:this.b_totamt_cty['America'],
              backgroundColor: 'rgb(255, 144, 32,1)',
              borderColor: 'rgba(0, 0, 0, 1)',
              borderWidth: 2,
              fill: false,}],
            }
      },
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
      piegraph_init_subcat(list){
        var i=0
        this.pie_sub_cat = []
        this.pie_sub_cat_actual = []  
        this.piechartdata = null
        list.forEach(element => {
          this.pie_sub_cat[i] = element['subcategoryname']
          this.pie_sub_cat_actual[i] = element['tot_actual']
          i++
        });
        this.piechartdata = {
            labels: this.pie_sub_cat,
            datasets:[{
              data: this.pie_sub_cat_actual,}],
            }
      },
      async renderLineChart() {
        await axios.get('http://localhost:8000/sql/indian-trend')
        .then(response =>{
          this.linegraph_init(response.data)
        })
        .catch(error =>{
          console.error('Error fetching data:', error);
        })
        if (this.chart) {
          this.chart.destroy();
        }
        
        const ctx = this.$refs.lineChart.getContext('2d')
        this.chart = new Chart(ctx, {
          type: 'line',
          data: this.linechartdata,
          options:{
            scales:{
              x:{
                grid :{
                  color :'rgba(0,0,0,0.5)',
                  lineWidth: 2
                }
              },
              y:{
                grid :{
                  color :'rgba(0,0,0,0.5)',
                  lineWidth: 2
                }
              }
            }
          }
        })
      },
      async renderBarChart() {
        await axios.get('http://localhost:8000/sql/global-trend')
        .then(response =>{
          this.bar_init(response.data)
        })
        .catch(error =>{
          console.error('Error fetching data:', error);
        })
        if (this.barchart) {
          this.barchart.destroy();
        }

        const ctx = this.$refs.barChart.getContext('2d')
        this.barchart = new Chart(ctx, {
          type: 'bar',
          data: this.barchartdata,
          options:{
            scales:{
              x:{
                grid :{
                  color :'rgba(0,0,0,0.5)',
                  lineWidth: 2
                }
              },
              y:{
                grid :{
                  color :'rgba(0,0,0,0.5)',
                  lineWidth: 2
                }
              }
            }
          }
        })
      },
      async renderPie(){
        const pieoptions = {
          year: this.selectedYear,
          cat: this.selectedCat
        }
        await axios.get('http://localhost:8000/sql/pie',{params:pieoptions})
        .then(response=>{
          console.log(response.data)
          if(this.selectedCat=="All") this.piegraph_init_cat(response.data)
          else this.piegraph_init_subcat(response.data)
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
          }
        })
      },
      async getCategories(){
        this.categories = ["All"]
        await axios.get('http://localhost:8000/sql/categories')
        .then(response=>{
          let d = response.data
          var i=1
          d.forEach(element => {
            this.categories[i] = element['category']
            i++
          });
        })
        .catch(error=>{
          console.error(error)
        })
      },
      async getprediction(){
        await axios.get('http://localhost:8000/sql/prediction')
        .then(response=>{
          this.exp_tot = response.data[0].pred
        })
        .catch(err=>{
          console.log(err)
        })
      }
    },
  }
</script>

<style>
.custom-chart {
  width: 800px;
  height: 500px;
}
</style>