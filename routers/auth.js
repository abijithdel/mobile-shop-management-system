const express = require("express");
const router = express.Router();
const UserModel = require("../config/Schema/user");
const bcrypt = require("bcrypt");

function islogin(req,res,nest){
  if(req.session.login){
    res.redirect('/')
  }else{
    nest()
  }
}


// Routers

router.get("/signup", islogin, (req, res) => {
  res.render("user/auth/signup", { errormes: null, user:req.session.user });
});

router.get("/signin", islogin, (req, res) => {
  res.render("user/auth/signin", { errorMessage: null, user:req.session.user });
});

// POST

router.post("/signup", async (req, res) => {
  try {
    const { email, password, cpassword } = req.body;
    let errormes = null;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      errormes = "already this account exists";
      return res.status(200).render("user/auth/signup", { errormes, user:req.session.user });
    }
    if (password === cpassword) {
      const hash = await bcrypt.hash(password, 10);
      const NewUser = new UserModel({
        email: email,
        password: hash,
      });
      await NewUser.save();
      req.session.user = NewUser;
      req.session.login = true;
      res.redirect("/");
      console.log(`Create Account: ${email}`);
    } else {
      errormes = "password do not match";
      return res.render("user/auth/signup", { errormes, user:req.session.user });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  let errorMessage;
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    errorMessage = "user not found";
    return res.render("user/auth/signin", { errorMessage,user:req.session.user });
  }
  const hash = await bcrypt.compare(password, user.password);
  if (!hash) {
    errorMessage = "incorrect password";
    return res.render("user/auth/signin", { errorMessage,user:req.session.user });
  }
  req.session.user = user;
  req.session.login = true;
  res.redirect("/");
});

router.get('/logout', (req,res) => {
  if(req.session.login){
    req.session.user = null
    req.session.login = false
    res.redirect('/')
  }else{
    res.redirect('/auth/signin')
  }
})

module.exports = router;
