const express = require("express");
const router = express.Router();
const { Home, CreateRole, RolePage, AddRole, AllUserInTheRole, CreateCategory, GetMyCategories, AddProducts } = require("../utiitsl/main");
const { newStore, createNewStore } = require("../utiitsl/admin");
const { AddProduct } = require('../utiitsl/permission');
const upload = require('../config/multer')

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
  res.render('user/main/store',{user:req.session.user, store_id, ErrorMessage:null})
})

router.get('/roles/:store_id' , islogin, (req,res) => {
  const { store_id } = req.params
  const req_user = req.session.user
  RolePage(store_id, req_user)
  .then(response => {
    if(response.manage_role){
      res.render('user/main/roles', {user:req.session.user, store_id, rolse:response.rolse, count:response.count})
    }else{
      res.render('user/main/store',{user:req.session.user, store_id, ErrorMessage: 'sorry, you are not allowed to access this page '})
    }
    
  })
  .catch(err => console.log(err))
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

router.get('/give-role/:store_id/:role_id', islogin, (req,res) => {
  const { store_id, role_id } = req.params
  AddRole(store_id)
  .then(response => {
    res.render('user/main/give-role',{user:req.session.user, users:response.user, store_id, role_id})
  })
  .catch(err => console.log(err))
})

router.get('/add-user/:role_id', islogin, (req,res) => {
  const { role_id } = req.params
  AllUserInTheRole(role_id)
  .then(response => {
    const Roles = response.UserArray
    const Role = response.Role
    res.render('user/main/all_user_in_role',{user:req.session.user, Roles, Role})
  })
  .catch(err => console.log(err))
})

router.get('/delete-role/:role_id/:store_id', islogin, (req,res) => {
  const { role_id, store_id } = req.params
  res.render('admin/delete-role',{user:req.session.user, role_id, store_id})
})

router.get('/add-products/:store_id', islogin, (req,res) => {
  const user = req.session.user
  const { store_id } = req.params
  AddProduct(user, store_id)
  .then(response => {
    if(response.permission){
      GetMyCategories(store_id)
      .then(data => {
        console.log()
        res.render('user/main/add-products',{user:req.session.user, store_id, categories:data.MyCategories, message:null})
      })
      .catch(err => console.log(err))
    }else{
      res.render('user/main/store',{user:req.session.user, store_id, ErrorMessage: 'sorry, you are not allowed to access this page '})
    }
  })
  .catch(err => console.log(err))
})

router.get('/create-category/:store_id', islogin, (req,res) => {
  const { store_id } = req.params
  res.render('user/main/category-create',{user:req.session.user, store_id, message:null})
})

router.post('/create-category/:store_id', (req,res) => {
  const { store_id } = req.params
  const { name } = req.body
  CreateCategory(name , store_id)
  .then(response => {
    res.render('user/main/category-create',{user:req.session.user, store_id, message:response.message})
  })
  .catch(err => {
    console.log(err)
  })
})

router.post('/add-products/:store_id', upload.single('img'), (req,res) => {
  const { name,category,price } = req.body;
  const { store_id } = req.params
  let filename = null
  if(req.file){
    filename = req.file.filename
  }
  AddProducts({name,category,price,filename},store_id)
  .then(response => {
    res.render('user/main/add-products',{user:req.session.user, store_id, categories:[], message: 'Product Added Successfully'})
  })
  .catch(err => console.log(err) + ' ' + __dirname)
})

module.exports = router;
