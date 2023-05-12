const express = require('express')
const cors = require ('cors')
const sqlite3 =require ('sqlite3')
const mysql= require  ('mysql')
const myconn = require ('express-myconnection')


const routes = require ('./routes')

const app = express()
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'library'
}

//middlewares----------------------------
app.use( myconn(mysql, dbOptions, 'single'))
app.use( express.json())
app.use(cors()) //05.05----------------------------




//25.04----------------------------
const bookArr = []


//routes----------------------------
// app.get('/', (req, res) => {
//     res.send('welcome to my api')
// })
// app.use('/api', routes)



//25.04----------------------------
app.get('/', (req, res) => {
    res.send(JSON.stringify(bookArr));
})
app.use('/api', routes)


//25.04----------------------------
app.post('/api', (req, res) => {
    const api = req.body;
    bookArr.push(api);
    res.send(JSON.stringify("Guardado"));
    console.log(bookArr);
})
app.use('/api', routes)


//server running-----------------------------
app.listen(app.get('port'), ()=>{
console.log('server running on port', app.get('port'))
})

