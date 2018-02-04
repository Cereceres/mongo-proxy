const assert = require('assert');


describe('test to getters', () => {
    it('description', function () {
        await this.User.create({
            name:'test',
            pass:'test',
            users:{
                test:'__$all',
                user:'__$all',
                _id:'__$all'
            },
            others:{
                test:'__$all',
                user:'__$all',
                _id:'__$all'
            }
        });
    })
});
