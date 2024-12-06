const express = require("express");
const router = express.Router();
const { enderStore, AddRole } = require("../utiitsl/api");

function islogin(req, res, nest) {
  if (req.session.login) {
    nest();
  } else {
    console.log("Auth Error");
  }
}

router.get("/ender-store/:store_id", islogin, (req, res) => {
  const { store_id } = req.params;
  const user = req.session.user;
  enderStore(store_id, user)
  .then(response => {
    if(response.status){
        res.json({status:true})
    }else{
        res.json({status:false})
    }
  })
  .catch(err => console.log(err))
});

router.post('/add-role', (req,res) => {
  AddRole(req.body)
  .then(response => {
    res.json(response)
  })
  .catch(err => console.log(err))
})

module.exports = router;
