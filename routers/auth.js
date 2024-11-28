const express = require("express");
const router = express.Router();
const UserModel = require('../config/Schema/user')
const bcrypt = require('bcrypt')

// Routers

router.get("/signup", (req, res) => {
  res.render('user/auth/signup',{errormes:null})
});

router.get("/signin", (req, res) => {
  res.render('user/auth/signin')
});

// POST

router.post("/signup", async (req, res) => {
  try {
    const { email, password, cpassword } = req.body;
    let errormes = null
    const user = await UserModel.findOne({ email:email })
    if(user){
      errormes = 'already this account exists'
      return res.status(200).render('user/auth/signup',{errormes})
    }
    if(password === cpassword){
      const hash = await bcrypt.hash(password, 10)
      const NewUser = new UserModel({
        email:email,
        password:hash
      })
      await NewUser.save()
      res.redirect('/')
      console.log(`Create Account: ${email}`)
    }else{
      errormes = 'password do not match'
      return res.render('user/auth/signup',{errormes})
    }
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
