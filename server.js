const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const  mongoose  = require('mongoose');
const path = require('path');
const BookStore = require("./models/BookModel");
const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.get('/',(req,res)=>{
//     res.send("Welcome")
// })

// app.get('/news',(req,res)=>{
//     res.send("News")
// })

//mongoose connection

mongoose.connect("mongodb+srv://fatih:test123@cluster0.o6juzcv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
   
}).then(console.log("Connected to Database"))
.catch((err)=>console.log(err))

app.get('/books', async (req,res) => {BookStore.find().then(books => res.json(books))})



app.post('/newbook', async (req,res)=>{
    try{
        const newBook = new BookStore({
            bookName: req.body.bookName,
            author: req.body.author,
            quantity:req.body.quantity,
            department:req.body.department,
            Comment:req.body.Comment
        })

        const book= await newBook.save();
        res.status(200).json(book);
    }catch(err){
        console.log(err)
    }
})

app.delete('/delete/:id',(req,res)=>{
    
    BookStore.findByIdAndDelete(req.params.id,(err) => {
        if(!err)
            {console.log("Book deleted");}
        else
        {
            console.log(err)
        }
    })
    

})

app.put('/lend/:id',async(req,res)=>
{
   try{
        await BookStore.findByIdAndUpdate(req.params.id, {$inc:{quantity:-1}}).then(
        alert(console.log("gelendet"))
    )
   }catch(err
    ){
        console.log(err)
    }
   

})

app.put('/back/:id',async(req,res)=>
    {
       try{
            await BookStore.findByIdAndUpdate(req.params.id, {$inc:{quantity:+1}}).then(
            alert(console.log("geback"))
        )
       }catch(err
        ){
            console.log(err)
        }
       
    
    })
app.listen(5000, ()=>{

    console.log("Console lauft")
})

