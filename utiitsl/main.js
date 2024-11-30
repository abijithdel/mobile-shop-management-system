const StoreModel = require('../config/Schema/store')

function Home() {
    let stores
    return new Promise(async (resolve, reject) => {
        try {
            stores = await StoreModel.find()
            for(let key in stores){
                stores[key].name = stores[key].name.substring(16,1)
            }
            resolve({stores})
        } catch (error) {
            stores = null
            reject({stores})
        }
    })
}

module.exports = { Home };
