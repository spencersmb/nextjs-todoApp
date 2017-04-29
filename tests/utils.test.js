// const utils = require('./utils');
const expect = require('expect');

// describe('Utils', () => {
//     it('Should Add 2 numbers', () => {

//         const res = utils.add(33, 11);
//         expect(res).toBe(44).toBeA('number');
//     })

//     it('Should Square the number', () => {

//         const res = utils.square(4);
//         expect(res).toBe(16).toBeA('number');;
//     })

//     it('Should Async add 2 numbers', (done) => {

//         utils.asyncAdd(4,3, (sum) => {
            
//             //sum comes back to us after 1 sec
//             expect(sum).toBe(7);
//             done();

//         });
//     })
// })

// it('Should Add Name to User object', () => {

//     const user = {
//         height: '6ft',
//         eyes: 'brown',
//         weight: '185lbs'
//     }

//     const newUser = utils.setName(user, 'Spencer Bigum');

//     expect(newUser).toInclude({
//         firstName: 'Spencer',
//         lastName:'Bigum'
//     });

// })