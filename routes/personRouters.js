const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

// POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        // Check if Email already exists
        const existingPerson = await Person.findOne({ Email: data.Email });
        if (existingPerson) {
            return res.status(400).json({ error: 'Email already exists!' });
        }

        // Create and save the new person
        const newPerson = new Person(data);
        const savedPerson = await newPerson.save();
        console.log('Person saved successfully:', savedPerson);
        res.status(200).json(savedPerson);
    } catch (err) {
        console.error('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET all people
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET people by work type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;

        if (['chef', 'waiter', 'manager'].includes(workType)) {
            const response = await Person.find({ work: workType });
            console.log('Response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//update
router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id;  //Extract the id from the URL paarameter
        const updatePersonData = req.body;  //Update data for the person
        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true, // return the updated document
            runValidators: true, //run mongoose validation
        });

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


//Delete
router.delete('/:id', async (req, res)=>{
    try{
        const personId = req.params.id;  //Extract the id from the URL paarameter
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data delete', response);
        res.status(200).json({message: 'Person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Export the router
module.exports = router;
