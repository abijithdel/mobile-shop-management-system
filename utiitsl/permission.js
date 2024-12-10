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
                        if (Role) {
                            if (Role.manage_role) {
                                permission = true;
                            }
                        }
                    } catch (error) {
                        console.log(error);
                        reject({ message: "Server Error" });
                    }
                }
            }
            resolve({ permission, message: "yes! you have this permission" });
        } else {
            resolve({ permission, message: "Oops! Server Error" });
        }
    });
}

function AddProduct(user, store_id){
    let permission = false
    return new Promise(async (resolve, reject) => {

        const role_info = user.role_info

        if(user.admin){
            permission = true
        }
        for(let key in role_info){
            if(store_id == role_info[key].store_id){
                try {
                    let role_id = role_info[key].role_id
                    let Role = await RoleModel.findById(role_id)
                    if(Role.add_product){
                        permission = true
                    }
                } catch (error) {
                    reject({ status:false, permission, message: 'Server Error'})
                }
            }
        }
        if(permission){
            resolve({ status:true, permission, message: 'yes! you have this permission'})
        }else{
            resolve({ status:true, permission, message: 'No Role Here'})
        }
    })
}

module.exports = { ManageRole, AddProduct };
