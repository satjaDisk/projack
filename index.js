const { log } = require('console');
const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const pool = require('../Projack/db/pool') 

const app = express();
const post = 8080

app.use(express.json())
app.use(morgan("dev"))



let dataBooks = JSON.parse(fs.readFileSync('./books.txt' ,'utf-8'));

const getBooks = async (req, res) => {
    let sql = 'SELECT NOW()'
    let response = await pool.query(sql)
    console.log(response);
    res.status(200).json({status: "success", data: dataBooks})
}

const createBooks =  (req, res) => {
    let body = req.body
    console.log(body);
    let repoonse = dataBooks.filter((e) => e.Name == body.name)
    res.status(200).json(repoonse) 
    
}

const updataBooks = (req, res) => {
    if(!req.params.id) {
        res.status(400).setDefaultEncoding({ status: "fail", message: "bad request"})
    }
    res.status(200).json({status : "sucess", data : "update successfully"})
}

const deleteBooks = (req, res) => {
    let id = req.params.id
    res.status(200).json({data: "Delete wll"})
}



app.route('/api/v1/books').get(getBooks).post(createBooks)
app.route('/api/v1/books/:id').patch(updataBooks).delete(deleteBooks)

app.listen(post, () =>{
    console.log("Wencome to post 8080"); 
    
})


