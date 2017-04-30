module.exports.cleanup = (app, mongooseDB) => {

    app.close(function () {
        console.log("Closed out remaining connections.")
        mongooseDB.connection.close();
        // process.exit();
    })

    // setTimeout( function () {
    //     console.error("Could not close connections in time, forcing shut down");
    //     // process.exit(1);
    // }, 30*1000);
}
// module.exports.add = (a,b) => a + b;

// module.exports.square = (x) => x*x;

// module.exports.setName = (user, fullName) => {
//     const nameSplit = fullName.split(" ");
//     const newUser = Object.assign({}, user, {
//         firstName: nameSplit[0],
//         lastName: nameSplit[1]
//     })

//     return newUser;
// }

// module.exports.asyncAdd = (a,b, callback) => {

//     setTimeout(()=>{
//         callback(a+b);
//     }, 1000);

// }