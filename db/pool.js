const {Pool} = require('pg')

const pool  = new Pool({
    user: "node1_owner",
    host: "ep-delicate-leaf-a1og07aq.ap-southeast-1.aws.neon.tech",
    database: "node1",
    password: "PbOkUvT0IKn3",
    post: 5432 
})

module.exports = pool