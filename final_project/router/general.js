const express = require('express');
const axios = require('axios')
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

const apiPath = 'https://dodemabiteni-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/';

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  let data = Promise.resolve(JSON.stringify(books,null,4));
  data.then((data)=> res.send(data))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let data = new Promise((resolve, reject) => {
  const isbn = req.params.isbn;
  resolve(books[isbn])
  });
  data.then((data)=> res.send(data))
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let data = new Promise((resolve, reject) => {
        const author = req.params.author;
        const filteredObject = Object.keys(books).reduce((result, key) => {
            if (books[key].author === author) {
              result[key] = books[key];
            }
            return result;
          }, {});
          resolve(JSON.stringify(filteredObject,null,4))   
    });
    data.then((data)=> res.send(data));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let data = new Promise((resolve, reject) => {
        const title = req.params.title;
        const filtered_title = Object.keys(books).reduce((result, key) => {
            if (books[key].title === title) {
              result[key] = books[key];
            }
            return result;
          }, {});
          resolve(JSON.stringify(filtered_title,null,4))   
    });
    data.then((data)=> res.send(data));;
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    book1 = books[isbn];
    res.send(book1.reviews);    
});

module.exports.general = public_users;
