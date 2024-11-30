const StoreModel = require('../config/Schema/store')

function newStore(user){
    return new Promise(async (resolve, reject) => {
        if(user.admin){
            resolve({admin:true})
        }else{
            reject({admin:false})
        }
    })

}

function createNewStore(store){
    return new Promise(async(resolve, reject) => {
        try {
            const NewStore = new StoreModel({
                name:store
            })
            await NewStore.save()
            resolve({ok:true})
        } catch (error) {
            console.log(error)
            reject({ok:false})
        }
    })
}

module.exports = { newStore, createNewStore };
