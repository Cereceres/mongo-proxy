const assert = require('assert');


describe('description', () => {
    it('should', function(done) {
        this.agent
            .post('/user')
            .send({ test:'testing', user:1 })
            .expect('Content-Type', 'application/json')
            .expect(200, (err, res) => {
                console.log(res.body);
                assert(res);
                done();
            });
    });

    // it('should', function(done) {
    //     this.agent
    //         .get('/user')
    //         .expect('Content-Type', 'application/json')
    //         .expect(200, (err, res) => {
    //             console.log(res.body);
    //             assert(res);
    //             done();
    //         });
    // });


    // it('should', function(done) {
    //     this.agent
    //         .put('/user')
    //         .expect('Content-Type', 'application/json')
    //         .expect(200, (err, res) => {
    //             console.log(res.body);
    //             assert(res);
    //             done();
    //         });
    // });
});
