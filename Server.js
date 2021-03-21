const express = require("express");
const url = require('url');
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const BooksModel = require('./Models/books');

var Op = Sequelize.Op;
require('dotenv').config(); 
const mysql = require('mysql2');

var app = express();
const port = 3005;
const connection = new Sequelize('shoppingpal','root','root',{
    dialect:'mysql'
})

app.use(bodyParser.json());
 
const Books = BooksModel(connection, Sequelize)


connection.sync({
        loging:true
        
})
.then((data) =>{
    console.log('Connection established successfully.');
    app.listen(port,() =>{
        console.log('Running server on port '+ port);
    })
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

    /// Add Books to database
    app.post('/addBooks', async(req, res,next) => {        
        try{

            Books.create({
                author: req.body.author,
                title: req.body.title,
                ISBN: req.body.ISBN,
                release_date: req.body.release_date,
            
            
        })
        .then(newBook =>{
                res.json(newBook);
            })
         } catch (err) {
                next(err);
              }
        }
    )

    // Api for get books list
    app.post('/getBooks', async(req, res,next) => {
        try{
            Books.findAll({

        })
        .then(books =>{
            res.json(books);
        })
        } 
        catch (err) {
            next(err);
        }
    })


        // Api for update books list
        app.post('/updateBook', async(req, res,next) => {
            try{
                var book_id = req.body.book_id;  
                Books.update({
                    author: req.body.author,
                    title: req.body.title,
                    ISBN: req.body.ISBN,
                    release_date: req.body.release_date}
                   ,{
                    where:{
                        id:book_id
                    }
    
            })
            .then(books =>{
                res.json({succes:true});
            })
            } 
            catch (err) {
                next(err);
            }
        })


// Delete Books
app.post('/deleteBook', async(req, res,next) => {
    try{
        var book_id = req.body.book_id; 
        console.log("book id is",book_id) 
        Books.destroy({
            where:{
              id:book_id
            },
            raw:true
        })
        .then(async function(){
            res.json({success:true});
        })   
    }
    catch (err) {
        next(err);
    }
})

