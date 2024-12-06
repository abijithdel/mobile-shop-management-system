const StoreModel = require("../config/Schema/store");
const RoleModel = require("../config/Schema/role");
const UserModel = require("../config/Schema/user");

function Home() {
  let stores;
  return new Promise(async (resolve, reject) => {
    try {
      stores = await StoreModel.find();
      for (let key in stores) {
        stores[key].name = stores[key].name.substring(16, 1);
      }
      resolve({ stores });
    } catch (error) {
      stores = null;
      reject({ stores });
    }
  });
}

function CreateRole(body, store_id, user) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        name,
        add_product,
        add_sale,
        all_products,
        all_sales,
        manage_role,
        manage_user,
      } = body;
      let RoleData = {};
      RoleData.store_id = store_id;
      RoleData.name = name;
      if (add_product) {
        RoleData.add_product = true;
      }
      if (add_sale) {
        RoleData.add_sale = true;
      }
      if (all_products) {
        RoleData.all_products = true;
      }
      if (all_sales) {
        RoleData.all_sales = true;
      }
      if (manage_role) {
        RoleData.manage_role = true;
      }
      if (manage_user) {
        RoleData.manage_user = true;
      }
      const NewRole = new RoleModel(RoleData);
      await NewRole.save();
      resolve({ status: true });
      console.log("New Role Created!");
    } catch (error) {
      reject({ status: false });
      console.log(error);
    }
  });
}

function RolePage(store_id){
  let rolse = []
  return new Promise(async (resolve, reject) => {
    try {
      if(store_id){
        const role = await RoleModel.find()
        const users = await UserModel.find()

        for(let key in role){
          let count = 0
          if(store_id == role[key].store_id){
            const s_role = role[key]
            for(let x in users){
              const user = users[x]
              for(let i in user.role_info){
                if(user.role_info[i].role_id == s_role._id){
                  count = count + 1
                }
              }
            }
            const a_role = s_role.toObject()
            a_role.count = count
            rolse.push(a_role)
          }
        }
        resolve({ status:true, rolse })
      }
    } catch (error) {
      reject({ status:false })
    }
  })
}

async function AddRole(store_id) {
  let UserArray = [];
  return new Promise(async (resolve, reject) => {
    try {
      const users = await UserModel.find();
      for (let user of users) {
        let found = false; 
        for (let role of user.role_info) {
          if (role.store_id === store_id) {
            found = true;
            break;
          }
        }
        
        user = user.toObject(); 
        user.status = found;
        UserArray.push(user);
      }
      resolve({ status: true, user: UserArray });
    } catch (error) {
      console.error(error);
      reject({ status: false, error });
    }
  });
}

module.exports = { Home, CreateRole, RolePage, AddRole };
