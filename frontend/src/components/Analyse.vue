<template>
  <div style="display: flex; flex-direction: row; justify-content: space-evenly; margin: 10px; margin-top: 40px;">
    <div style="height: 400px; width: 600px;">
      <button @click="renderLineChart()">India's Trend</button>
      <canvas ref="lineChart" class="custom-chart"></canvas>
    </div>
    <div>
      <p  style="text-align: center; font-size: 20px; margin: 0px;">Actual Collection</p><br>
      <label for="yearDropdown">Select Year:</label>
      <select v-model="selectedYear" id="yearDropdown" @click="getCategories()">
        <option v-for="year in years_pie">{{ year }}</option>
      </select>
      <div v-show="selectedYear!=null">
        <label for="catDropDown">Select Category:</label>
        <select v-model="selectedCat" id="catDropDown">
          <option v-for="cat in categories">{{ cat }}</option>
        </select>
      </div>
      <button v-if="selectedCat!=null" @click="renderPie()">Submit</button>
      <div style="width: 300px; height: 300px;">
        <canvas ref="piechart"></canvas>
      </div>
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
        years: [],
        totamt: [],
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
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.renderLineChart();
      })
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
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor:'rgb(220,220,220)',
              borderWidth: 2,
              fill: false,},],
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
      renderLineChart() {
        axios.get('http://localhost:8000/sql/indian-trend')
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
        })
      },
      renderPie(){
        const pieoptions = {
          year: this.selectedYear,
          cat: this.selectedCat
        }
        axios.get('http://localhost:8000/sql/pie',{params:pieoptions})
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
            maintainAspectRatio: true
          }
        })
      },
      getCategories(){
        this.categories = ["All"]
        axios.get('http://localhost:8000/sql/categories')
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