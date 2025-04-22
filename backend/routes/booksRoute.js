import express from 'express'

import { Book } from '../models/bookmodel.js';

const router = express.Router();

//Route to save a new book

router.post('/',async(req,res)=>{
    try{
        // if(
        //      !request.body.title || 
        //      !request.body.author ||
        //  !request.body.publishYear
        //  ){
        //      return response.status(400).send({
        //          message:'Send all required fields: title,author,publishYear',
        //      });
        //  }
         
          const bookItem = new Book({
              title: req.body.title,
              author: req.body.author,
             publishYear: req.body.publishYear
           });
           const savedBook = await bookItem.save();
           res.status(201).json(savedBook);
      
    }
        catch(error){
            console.log(error.message);
            response.status(500).send({message:error.message})
        }
    }
);



//Route for GET all books in the database

router.get('/',async(request,res)=>{
    try{
        const books=await Book.find({});
        return res.status(200).json(books);

    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})

    }
})


//Route for GET one book in the database

router.get('/:id',async(request,res)=>{
    try{
        const {id}=request.params;
        const book=await Book.findById(id);
        return res.status(200).json(book);

    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})

    }
})


//Route for Update a Book
router.put('/:id',async(request,response)=>{
    try{
        if(
            !request.body.title || 
            !request.body.author ||
            !request.body.publishYear

        ){
            return response.status(400).send({
                message:'Send all required fields:Title,author,publishYear'
            });
        }

        const {id}=request.params;
        const result=await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).json({message:'Book not found'});
        }

        return response.status(200).send({message:'Book updated successfully'})


    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})


//Route for Delete a books
router.delete('/:id',async(request,response)=>{
    try{
        const{id}=request.params;
        const result=await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:'Book not found'});

        }
        return response.status(200).send({message:'Book deleted successfully'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

export default router;