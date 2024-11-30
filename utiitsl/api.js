function enderStore(store_id, user) {
    return new Promise((resolve, reject) => {
        try {
            if(user.admin){
                resolve({status:true})
            }else{
                resolve({status:false})
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { enderStore }