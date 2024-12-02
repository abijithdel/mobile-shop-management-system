const express = require("express");
const router = express.Router();
const { Home, CreateRole } = require("../utiitsl/main");
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

router.get('/store/:store_id', islogin, (req,res) => {
  const { store_id } = req.params
  res.render('user/main/store',{user:req.session.user, store_id})
})

router.get('/roles/:store_id' , islogin, (req,res) => {
  const { store_id } = req.params
  res.render('user/main/roles', {user:req.session.user, store_id})
})

router.get('/create-role/:store_id' , islogin, (req,res) => {
  const { store_id } = req.params
  res.render('user/main/create-role', {user:req.session.user, store_id})
})

router.post('/create-role/:store_id' , islogin, (req,res) => {
  const body = req.body;
  const { store_id } = req.params
  const user = req.session.user
  CreateRole(body, store_id, user)
  .then(response => {
    res.redirect(`/roles/${store_id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
})

module.exports = router;
