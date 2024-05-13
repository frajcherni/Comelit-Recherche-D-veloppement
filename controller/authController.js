
const express = require("express");

const userdb = require("../models/user");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

const multer = require('multer');
const path = require('path');


// Set storage engine


// user Login

module.exports.login = async (req, res) => {
    // console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await userdb.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();
                const role =  userValid.role 
                // cookiegenerate
                res.cookie("usercookie",token,{
                  
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token,
                    role
                }
                res.status(201).json({status:201,result})
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
};


// find the current user information 
exports.valid = async (req, res) => {
    try {
      const ValidUserOne = await userdb.findOne({ _id: req.userId });
      res.status(201).json({ status: 201, ValidUserOne });
    } catch (error) {
      res.status(401).json({ status: 401, error });
    }
  };

// delete

