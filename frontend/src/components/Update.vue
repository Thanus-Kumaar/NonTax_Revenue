<template>
    <div class="choice1">UPDATE</div>
        <div class="UpdateData" style="height: 320px;">
            <p class="UData_name">Financial Data</p>
            <label class="Name">Country:</label>
            <input type="text" class="Text" id="country">
            <label class="Name">Year:</label>
            <input type="text" class="Text" style="width: 80px;" id="year">
            <label class="Name">Total Amount:</label>
            <input type="text" class="Text" id="totamt">
            <button class="update" @click="updateFinancialData()">Update</button>
    </div>
    <div class="box">
        <div class="choice2">DELETE</div>
        <div class="flexbox">
            <div class="Data" style="height: 255px;">
                <p class="UData_name">Financial Data</p>
                <label class="Name">Country:</label>
                <input type="text" class="Text" id="delcountry">
                <label class="Name">Year:</label>
                <input type="text" class="Text" style="width: 80px;" id="delYear">
                <button class="update" @click="deleteFinancialData()">Delete</button>
            </div>
            <div class="F_Data">
                <div class="Data" style="height: 175px;padding: 20px;padding-left: 30px;">
                    <p class="UData_name">Schemes</p>
                    <label class="Name">Scheme Name:</label>
                    <input type="text" class="Text">
                    <button class="update" style="margin-left: 22%;">Delete</button>
                </div>
                <div class="Data" style="height: 175px;margin-top: 20px;padding-left: 35px;">
                    <p class="UData_name">Agencies</p>
                    <label class="Name">Agency:</label>
                    <input type="text" class="Text" id="delAgency">
                    <button class="update" style="margin-left: 22%;" @click="deleteAgency()">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
  @import url('../assets/Update.css');
</style>

<script>
import axios from 'axios'
  export default{
    data(){
      return{

      }
    },
    methods:{
      deleteFinancialData() {
        const country = document.getElementById('delcountry').value;
        const year = document.getElementById('delYear').value;
        axios.post('http://localhost:8000/sql/delete-global', {country: country, year: year})
        .then(Response=>{
            alert(Response.data)
        })
        .catch(error=>{
            alert(error)
        })
      },
      deleteAgency() {
        const agency = document.getElementById('delAgency').value;
        console.log(agency)
        axios.post('http://localhost:8000/sql/delete-agency', {agency:agency})
        .then(Response=>{
            alert(Response.data)
        })
        .catch(error=>{
            alert(error)
        })
      },
      updateFinancialData() {
        const country = document.getElementById('country').value;
        const year = document.getElementById('year').value;
        const totamt = document.getElementById('totamt').value;
        axios.post('http://localhost:8000/sql/update-global', {country: country, year: year, amt: totamt})
        .then(Response=>{
            alert(Response.data)
        })
        .catch(error=>{
            alert(error)
        })
      },
    }
  }
</script>