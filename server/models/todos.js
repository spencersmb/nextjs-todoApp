const mongoose = require('mongoose');

// USE TRY CATCH IF USING MOCHA AND DO NOT IMPORT/REQUIRE THE MODEL
// Try catch to use with Mocha testing
module.exports.getTodoModel = () => {
    try {
        Todo = mongoose.model('Todo', {
            text: {
                type: String,
                required: true,
                minLength: 2,
                trim: true
            },
            completed: {
                type: Boolean,
                default: false
            },
            completedAt:{
                type: Number,
                default: null
            }
        });

    } catch (error) {
        Todo = mongoose.model('Todo')
    }

    return Todo;
}
// Data Model
// const Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minLength: 2,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt:{
//         type: Number,
//         default: null
//     }
// });

// module.exports = {Todo};

