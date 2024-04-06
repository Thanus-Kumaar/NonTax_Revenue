<template>
<div class="option">
        <div class="Add">
            <input type="radio" id="checkbox1" name="ch" v-model="togglecomp" value="Add" @click="toogle()"/>
            <label for="checkbox1"></label>
            <span style="margin-left: 20px;">Add Data</span>
        </div>
        <div class="Modify" style="margin-left: 30px;">
            <input type="radio" id="checkbox2" name="ch" v-model="togglecomp" value="Update" @click="toogle()"/>
            <label for="checkbox2"></label>
            <span style="margin-left: 20px;">Update Data</span>
        </div>
    </div>
    <component :is="activeComp"></component>
</template>

<style>
  @import url('../assets/Admin.css');
</style>

<script>
  export default{
    data(){
      return{
        toggleValue: true,
        togglecomp: "Add",
      }
    },
    computed: {
      activeComp() {
        if(this.toggleValue) {
          return 'add'
        }
        else {
          return 'update'
        }
      }
    },
    methods:{
      toogle(){
        if(this.togglecomp == "Add") this.toggleValue = false
        else if(this.togglecomp == "Update") this.toggleValue = true
        console.log(this.togglecomp)
      }
    }
  }
</script>