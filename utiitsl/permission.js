const RoleModel = require("../config/Schema/role");

function ManageRole(store_id, user) {
    let permission = false;
    return new Promise(async (resolve, reject) => {
        if (store_id && user) {
            for (let key in user.role_info) {
                if (store_id == user.role_info[key].store_id) {
                    try {
                        let role_id = user.role_info[key].role_id;
                        const Role = await RoleModel.findById(role_id);
                        if (Role.manage_role) {
                            permission = true;
                        }
                    } catch (error) { 
                        reject({message:'Server Error'})
                    }
                }
            }
            resolve({ permission, message: "yes! you have this permission" });
        } else {
            resolve({ permission, message: "Oops! Server Error" });
        }
    });
}

module.exports = { ManageRole };
