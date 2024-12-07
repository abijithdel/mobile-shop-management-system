const UserModel = require("../config/Schema/user");
const RoleModel = require("../config/Schema/role");

function enderStore(store_id, user) {
  let ok = false
  return new Promise((resolve, reject) => {
    try {
      if (user.admin) {
        resolve({ status: true });
      } else {
        for (let key in user.role_info) {
          if (user.role_info[key].store_id == store_id) {
            ok = true
            break
          }
        }
        if (ok) {
          resolve({ status: true });
        } else {
          resolve({ status: false });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
}

function AddRole(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const { role_id, user_id, store_id } = body;
      const User = await UserModel.findById(user_id)
      for (let key in User.role_info) {

        if (User.role_info[key].role_id == role_id) {
          User.role_info.pull({ role_id: role_id })
          await User.save()
          return resolve({ status: false, message: 'Role Removed' })
        }

        if (User.role_info[key].store_id == store_id) {
          let r_id
          for (let x in User.role_info) {
            if (User.role_info[x].store_id == store_id) {
              r_id = User.role_info[x].role_id
            }
          }
          const role = await RoleModel.findById(r_id)
          return resolve({ status: false, message: `Remove Existing Role: ${role.name}` })
        }
      }
      User.role_info.push({ role_id: role_id, store_id: store_id })
      await User.save()
      resolve({ status: true, message: `successfully Add Role` })
    } catch (error) {
      reject({ status: false, error })
    }
  });
}

function DeleteRole(role_id) {
  return new Promise(async (resolve, reject) => {
    try {
      await RoleModel.findByIdAndDelete(role_id)
      const Users = await UserModel.find()
      for (let key in Users) {
        if (Users[key].role_info) {
          let userRIN = Users[key].role_info
          let user_id =  Users[key]._id
          for(let x in userRIN){
            if(role_id == userRIN[x].role_id){
              await UserModel.findByIdAndUpdate(user_id, { $pull: { role_info: { role_id: role_id } } })
            }
          }
        }
      }
      resolve({ status: true, message: 'Delete Role Successfully' })
    } catch (error) {
      reject({ status: false, error })
    }
  })
}

module.exports = { enderStore, AddRole, DeleteRole };
