const StoreModel = require("../config/Schema/store");
const RoleModel = require("../config/Schema/role");

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

module.exports = { Home, CreateRole };
