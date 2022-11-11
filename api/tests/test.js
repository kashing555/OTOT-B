var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index.js');
var Contact = require('../contactModel.js');

chai.use(chaiHttp);
chai.should();

describe('/api/contacts', () => {
  after((done) => {
    Contact.deleteMany({}, () => { done();})
  });

  describe('Create Contact', () => {
    it('Create Contact', (done) => {
      chai.request(app)
        .post('/api/contacts')
        .send({ name: 'Tan Ka Shing', email: 'kashing555@gmail.com', gender: 'male', phone: '96969696'})
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.message.should.equal('New contact created!');
          done();
        });
    });
  })

  describe('Find Contact', () => {
    it('Find all contacts', (done) => {
      chai.request(app)
        .get('/api/contacts')
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.message.should.equal('Contacts retrieved successfully');
          done();
        });
    });

    it('Find contact', (done) => {
      chai.request(app)
        .get('/api/contacts' + '/kashing555@gmail.com')
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.message.should.equal('Contact details loading..');
          done();
        });
    });
  })

  describe('Update Contact', () => {
    it('Update Contact', (done) => {
      chai.request(app)
        .put('/api/contacts' + '/kashing555@gmail.com')
        .send({phone: '97979797'})
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.message.should.equal('Contact Info updated');
          done();
        });
    });
  })

  describe('Delete Contact', () => {
    it('Delete Contact', (done) => {
      chai.request(app)
        .delete('/api/contacts' + '/kashing555@gmail.com')
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.message.should.equal('Contact deleted');
          done();
        });
    });
  })
});