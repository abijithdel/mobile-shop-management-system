const express = require("express");
const router = express.Router();
const { Home } = require("../utiitsl/main");
const { newStore, createNewStore } = require("../utiitsl/admin");

function islogin(req, res, nest) {
  if (req.session.login) {
    nest();
  } else {
    res.redirect("/auth/signin");
  }
}

// Routers

router.get("/", islogin, (req, res) => {
  Home()
  .then(response => {
    res.render("index", { user: req.session.user, store:response.stores });
  })
  .catch(err => {
    console.log(err)
    res.render("index", { user: req.session.user });
  })
});

router.get("/new-store", islogin, (req, res) => {
  const user = req.session.user;
  newStore(user)
    .then((response) => {
      res.render("admin/newstore", { user: req.session.user });
    })
    .catch((err) => res.redirect("/"));
});

router.post('/new-store', (req,res) => {
  const store = req.body.store;
  createNewStore(store)
  .then(response => {
    console.log(response)
    res.redirect('/')
  })
  .catch(err => console.log(err))
})

router.get('/store/:id', islogin, (req,res) => {
  res.render('user/main/store',{user:req.session.user})
})

module.exports = router;
