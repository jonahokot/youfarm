const express = require('express');
const mongoose = require('mongoose');
const Manager = require('../models/Manager')

const router = express.Router();

router.get('/', (req,res)=>{
    res.render('fa_m_reg',);
});

router.post('/', async(req, res) => {
     const manager = new Manager(req.body); 
     await Manager.register(manager, req.body.password, (err) => {
         if (err) {
             res.status(400).render('fa_m_reg', { 
                title: 'users' 
            }) 
            console.log(err) 
        }
         else { 
            res.redirect('/login') 
        }
     })
 })   




module.exports = router