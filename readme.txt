Create Super User
mongosh: db.users.updateOne({ email:"your@email.domain"},{ $set: { admin:true }})