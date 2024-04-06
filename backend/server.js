const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

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

app.get('/sql/global-trend',(req,res)=>{
  const q = "SELECT year, TotalAmount, country from financialData order by country, year asc;"
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

app.post('/sql/add-global',(req,res)=>{
  console.log(req.body)
  const {year, country, amt} = req.body
  const q = "INSERT INTO financialData (year, TotalAmount, country) VALUES(?,?,?);"
  connection.query(q,[year,amt,country],(error, results)=>{
    if(error){
      console.log(error)
      res.status(504).json(err="Couldn't add Data")
    }
    else if(results.affectedRows>0){
      res.status(200).json(msg="Data added successfully")
    }
  })
})

app.post('/sql/update-global',(req,res)=>{
  const {year, country, amt} = req.body
  const q = "UPDATE financialData SET TotalAmount = ? WHERE country = ? AND Year = ?;"
  connection.query(q,[amt,country,year],(error, results)=>{
    if(error){
      console.log(error)
      res.status(504).json(err="Update incomplete")
    }
    else if(results.affectedRows>0){
      res.status(200).json(msg="Data modified successfully")
    }
  })
})

app.post('/sql/delete-global',(req,res)=>{
  const {year, country} = req.body
  const q = "DELETE FROM financialData WHERE country = ? AND Year = ?;"
  connection.query(q,[country,year],(error, results)=>{
    if(error){
      console.log(error)
      res.status(504).json(err="Deletion incomplete")
    }
    else if(results.affectedRows>0){
      res.status(200).json(msg="Data deleted successfully")
    }
  })
})

app.post('/sql/add-agency',(req,res)=>{
  const {agency} = req.body
  const q1 = "SELECT max(agencyID) as ID from agencies;"
  let curr_index;
  connection.query(q1,(err,result)=>{
    curr_index = result[0].ID
    const q = "INSERT INTO agencies (agencyID, Agency) VALUES(?,?);"
    connection.query(q,[curr_index+1,agency],(error, results)=>{
      if(error){
        console.log(error)
        res.status(504).json(err="Couldn't add Data")
      }
      else if(results.affectedRows>0){
        res.json(msg="Data added successfully")
      }
    })
  })
})

app.post('/sql/delete-agency',(req,res)=>{
  const {agency} = req.body
  const q = "DELETE FROM agencies WHERE Agency=?;"
  connection.query(q,[agency],(error, results)=>{
    if(error){
      console.log(error)
      res.status(504).json(err="Couldn't delete Data")
    }
    else if(results.affectedRows>0){
      res.status(200).json(msg="Data deleted successfully")
    }
  })
})

app.post('/sql/add-scheme',(req,res)=>{
  const {scheme} = req.body
  const q1 = "SELECT max(AgencyID) as ID from Agencies;"
  let curr_index;
  connection.query(q1,(err,result)=>{
    curr_index = result[0].ID
    const q = "INSERT INTO schemes (AgencyID, schemeName) VALUES(?,?);"
    connection.query(q,[curr_index+1,scheme],(error, results)=>{
      if(error){
        console.log(error)
        res.status(504).json(err="Couldn't add Data")
      }
      else if(results.affectedRows>0){
        res.json(msg="Data added successfully")
      }
    })
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

app.get('/sql/prediction',(req,res)=>{
  connection.query("select round(avg(TotalAmount),2) as pred from financialData where country='India';",(error,results)=>{
    if(error){
      console.error(error)
    }
    else{
      console.log(results)
      res.json(results)
    }
  })
})

app.get('/sql/home',(req,res)=>{
  connection.query("select country, TotalAmount from financialData where Year = 2023;",(error,results)=>{
    if(error){
      console.error(error)
    }
    else{
      console.log(results)
      res.json(results)
    }
  })
})
app.get('/sql/home-pie',(req,res)=>{
  connection.query("select category, sum(actual) as tot_actual from actualexpenditure a join categories c on a.subcategoryname = c.subcategoryname where year = 2023 group by category;"
  ,(error,results)=>{
    if(error){
      console.error(error)
    }
    else{
      console.log(results)
      res.json(results)
    }
  })
})

app.post('/sql/login',(req,res)=>{
  const {email,password} = req.body
  const q = "select * from admin where email = ? and password = ?;"
  connection.query(q,[email,password],(err,r)=>{
    if(err) console.log(err)
    else{
      if(r.length>0){
        
      }
    }
  })
})

app.listen(8000,()=>{
  console.log("Listening on port 8000")
})