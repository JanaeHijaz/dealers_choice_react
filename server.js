// set up database and seed data
const express = require('express');
const app = express();
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://localhost/dealers_choice_react');
const path = require('path');


const Books = sequelize.define('book', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    published: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        } 
    }
})



// ------------------------------------------------------------

app.get('/', async (req, res, next) => {
    res.redirect('/api/chimamanda') // want to keep this? decide later
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/chimamanda' , async(req, res, next) => {
    try{
        const response = await Books.findAll();
        res.send(response)
    }
    catch(error){
        next(error)
    }
})



// ------------------------------------------------------------


const init = async () => {
    try{
        await sequelize.sync({force: true});

        await Books.create({name: 'Decisions', published: 1997 })
        await Books.create({name: 'For Love of Biafra', published: 1998 })
        await Books.create({name: 'Purple Hibiscus', published: 2003 })
        await Books.create({name: 'Half Of a Yellow Sun', published: 2006 })
        await Books.create({name: 'the Thing Around Your Neck', published: 2009 })
        await Books.create({name: 'Americanah', published: 2013 })
        await Books.create({name: 'Notes on Grief', published: 2021 })

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Listening on Port ${port}`)
        });
    }
    catch(error){
        next(error);
    }
} 

init();