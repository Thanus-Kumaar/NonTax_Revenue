<template>
<div class="Tables">
    <div class="Data" style="height: 315px;">
        <p class="Data_name">Financial Data</p>
        <label class="Name">Country:</label>
        <input type="text" class="Text" v-model="country" id="countryInput">
        <label class="Name">Year:</label>
        <input type="text" class="Text" style="width: 80px;" v-model="year" id="yearInput">
        <label class="Name">Total Amount:</label>
        <input type="text" class="Text" v-model="totalAmount" id="totalAmountInput">
        <button class="update" @click="getFinancialData()">Update</button>
    </div>
    <div style="display: flex;flex-direction: column;">
        <div class="Data" style="margin-bottom: 5px;">
            <p class="Data_name">Schemes</p>
            <label class="Name">Scheme Name:</label>
            <input type="text" class="Text" id="schemeNameInput">
            <button class="update" @click="getSchemeData()">Update</button>
        </div>
        <div class="Data" style="margin-top: 10px;">
            <p class="Data_name">Agencies</p>
            <label class="Name">Agency:</label>
            <input type="text" class="Text" id="agencyInput">
            <button class="update" @click="getAgencyData()">Update</button>
        </div>
    </div>
    <div class="Data">
        <p class="Data_name">Actual Expenditure</p>
        <label class="Name">Sub Category:</label>
        <input type="text" class="Text" id="actualSubCategoryInput">
        <label class="Name">Year:</label>
        <input type="text" class="Text" style="width: 80px;" id="actualYearInput">
        <label class="Name">Agency:</label>
        <input type="text" class="Text" id="actualAgencyInput">
        <label class="Name">Scheme Name:</label>
        <input type="text" class="Text" id="actualSchemeNameInput">
        <label class="Name">Actual:</label>
        <input type="text" class="Text" id="actualAmountInput">
        <button class="update" @click="getActualExpenditure()">Update</button>
    </div>
    <div class="Data">
        <p class="Data_name">Budget</p>
        <label class="Name">Sub Category:</label>
        <input type="text" class="Text" id="budgetSubCategoryInput">
        <label class="Name">Year:</label>
        <input type="text" class="Text" style="width: 80px;" id="budgetYearInput">
        <label class="Name">Agency:</label>
        <input type="text" class="Text" id="budgetAgencyInput">
        <label class="Name">Scheme Name:</label>
        <input type="text" class="Text" id="budgetSchemeNameInput">
        <label class="Name">Budget:</label>
        <input type="text" class="Text" id="budgetAmountInput">
        <button class="update" @click="getBudget()">Update</button>
    </div>
</div>
</template>

<style>
@import url('../assets/Admin.css');</style>

<script>
  import axios from 'axios'
  export default{
    data(){
        return{
            country:'',
            year:null,
            totalAmount:null
        }

    },
    methods:{
      getFinancialData() {
        const dataToSend = {country: this.country, year: this.year, amt: this.totalAmount}
        axios.post('http://localhost:8000/sql/add-global', dataToSend)
        .then(Response=>{
            alert(Response.data)
        })
        .catch(error=>{
            alert(error)
        })
    },

    getSchemeData() {
        const schemeName = document.getElementById('schemeNameInput').value;
        console.log('Scheme Name:', schemeName);
        axios.post('http://localhost:8000/sql/add-scheme',{scheme: schemeName})
        .then(Response=>{
            alert(Response.data)
        })
        .catch(error=>{
            alert(error)
        })
    },

    getAgencyData() {
        const agency = document.getElementById('agencyInput').value;
        console.log('Agency:', agency);
        axios.post('http://localhost:8000/sql/add-agency',{agency: agency})
        .then(Response=>{
            alert(Response.data)
        })
        .catch(error=>{
            alert(error)
        })
    },

    getActualExpenditure() {
        const actualSubCategory = document.getElementById('actualSubCategoryInput').value;
        const actualYear = document.getElementById('actualYearInput').value;
        const actualAgency = document.getElementById('actualAgencyInput').value;
        const actualSchemeName = document.getElementById('actualSchemeNameInput').value;
        const actualAmount = document.getElementById('actualAmountInput').value;

        console.log('Actual Sub Category:', actualSubCategory);
        console.log('Actual Year:', actualYear);
        console.log('Actual Agency:', actualAgency);
        console.log('Actual Scheme Name:', actualSchemeName);
        console.log('Actual Amount:', actualAmount);
    },

    getBudget() {
        const budgetSubCategory = document.getElementById('budgetSubCategoryInput').value;
        const budgetYear = document.getElementById('budgetYearInput').value;
        const budgetAgency = document.getElementById('budgetAgencyInput').value;
        const budgetSchemeName = document.getElementById('budgetSchemeNameInput').value;
        const budgetAmount = document.getElementById('budgetAmountInput').value;

        console.log('Budget Sub Category:', budgetSubCategory);
        console.log('Budget Year:', budgetYear);
        console.log('Budget Agency:', budgetAgency);
        console.log('Budget Scheme Name:', budgetSchemeName);
        console.log('Budget Amount:', budgetAmount);
    }
    }
  }
</script>