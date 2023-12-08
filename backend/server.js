const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(cors())

const connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password: 'THANUSmysql@2005',
  database: 'NonTaxRevenue'
})
connection.connect((error)=>{
  if(error){
    console.log("Couldn't connect to SQL")
  }
  else{
    console.log("Connected to SQL")
  }
})

app.get('/sql/indian-trend',(req,res)=>{
  const q = "SELECT year, TotalAmount from financialData where Country='INDIA' order by year;"
  connection.query(q,(error, results) =>{
    if(error){
      console.log(error)
      throw error
    }
    else{
      res.json(results)
      console.log(results)
    }
  })
})

app.get('/sql/pie',(req,res)=>{
  let q=""
  if(req.query.cat=='All'){
    q = "select category, sum(actual) as tot_actual from actualexpenditure a join categories c on a.subcategoryname = c.subcategoryname where year = ?  group by category;"
    connection.query(q,[req.query.year],(error,results)=>{
      if(error) throw error
      else{
        console.log(results)
        res.json(results)
      }
    })
  }
  else{
    q="select a.subcategoryname, sum(actual) as tot_actual from actualexpenditure a join categories c on a.subcategoryname = c.subcategoryname where year = ? and category = ?;"
    connection.query(q,[req.query.year,req.query.cat],(error,results)=>{
      if(error) throw error
      else{
        console.log(results)
        res.json(results)
      }
    })
  }
})

app.get('/sql/categories',(req,res)=>{
  connection.query("select distinct category from categories;",(error,results)=>{
    if(error){
      console.error(error)
    }
    else{
      console.log(results)
      res.json(results)
    }
  })
})

app.listen(8000,()=>{
  console.log("Listening on port 8000")
})