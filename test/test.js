var tamber = require('../lib/Tamber')('Mu6DUPXdDYe98cv5JIfX');
var assert = require('assert');
var expect = require('chai').expect;

tamber.setTimeout(80000);

var behavior_1 = "mention";
var user_1 = "user_jctzgisbru";
var user_2 = "user_y7u9sv6we0";
var user_3 = "user_k6q76ohppz";
var user_4 = "user_fwu592pwmo";
var user_5 = "user_faa666arma";

var item_1 = "item_i5gq90scc1";
var item_2 = "item_u9nlytt3w5";
var item_3 = "item_d1zevdf6hl";
var item_4 = "item_nqzd5w00s9";
var item_5 = "item_faa666arma";

var t_1 = 708652800;
var t_2 = 1454465400;
var tc = Math.floor(Date.now() / 1000);

randStr = () => (Math.random() + 1).toString(36).substring(7)
currentTime = () => Math.floor(Date.now() / 1000)

const arrProp1 = "countries_"+randStr();
const arrProp2 = "languages_"+randStr();

describe('Tamber Test', function() {
  this.timeout(tamber.getAttribute('timeout'));
  describe('Behavior', function() {
    describe('#Create()', function() {
      it('should create without error', function(done) {
        tamber.behavior.create({
          name : behavior_1,
          desirability: 0.6
        }).then(result => done()).catch(e => done(e));
      });
    });
    describe('#Retrieve()', function() {
      it('should retrieve without error', function(done) {
        tamber.behavior.retrieve({
          name : behavior_1
      }).then(result => done()).catch(e => done(e));
      });
    });
  });

  describe('Event', function() {

    describe('#Track()', function() {
      it('should track without error', function(done) {
        tamber.event.track({
          user : user_1,
          behavior : behavior_1,
          item: item_1,
          hit: true,
          context:{"section":"recommended"}
        }).then(result => done()).catch(e => done(e));
      });
    });
    describe('#Retrieve() - user', function() {
      it('should retrieve without error', function(done) {
        tamber.event.retrieve({
          user : user_1,
        }).then(result => {
          expect(result.events).to.be.an('array');
          result.events.every(e => expect(e).to.have.property('user', user_1));
          done();
        }).catch(e => done(e));
      });
    });
    describe('#Retrieve() - item', function() {
      it('should retrieve without error', function(done) {
        tamber.event.retrieve({
          item : item_1,
        }).then(result => {
          expect(result.events).to.be.an('array');
          result.events.every(e => expect(e).to.have.property('item', item_1));
          done();
        }).catch(e => done(e));
      });
    });
    describe('#Retrieve() - behavior', function() {
      it('should retrieve without error', function(done) {
        tamber.event.retrieve({
          behavior : behavior_1,
        }).then(result => {
          expect(result.events).to.be.an('array');
          result.events.every(e => expect(e).to.have.property('behavior', behavior_1));
          done();
        }).catch(e => done(e));
      });
    });
    // describe('#Retrieve() - created_since, created_before', function() {
    //   it('should retrieve created_since, created_before without error', function(done) {
    //     tamber.event.retrieve({
    //       created_since : t_1,
    //       created_before: currentTime(),
    //       number: 5
    //     }).then(result => done()).catch(e => done(e));
    //   });
    // });
    describe('#Retrieve() - user, created_since, created_before', function() {
      it('should retrieve without error', function(done) {
        tamber.event.retrieve({
          user : user_1,
          created_since : t_1,
          created_before: currentTime(),
          number: 5
        }).then(result => {
          expect(result.events).to.be.an('array').and.to.have.lengthOf.within(0, 6);
          result.events.every(e => expect(e).to.have.property('user', user_1));
          done();
        }).catch(e => done(e));
      });
    });
    describe('#Retrieve() - item, created_since, created_before', function() {
      it('should retrieve without error', function(done) {
        tamber.event.retrieve({
          item : item_1,
          created_since : t_1,
          created_before: currentTime(),
          number: 5
        }).then(result => {
          expect(result.events).to.be.an('array').and.to.have.lengthOf.within(0, 6);
          result.events.every(e => expect(e).to.have.property('item', item_1));
          done();
        }).catch(e => done(e));
      });
    });
    describe('#Retrieve() - behavior, created_since, created_before', function() {
      it('should retrieve without error', function(done) {
        tamber.event.retrieve({
          behavior : behavior_1,
          created_since : t_1,
          created_before: currentTime(),
          number: 5
        }).then(result => {
          expect(result.events).to.be.an('array').and.to.have.lengthOf.within(0, 6);
          result.events.every(e => expect(e).to.have.property('behavior', behavior_1));
          done();
        }).catch(e => done(e));
      });
    });
    describe('#Retrieve() - user, behavior, created_since, created_before', function() {
      it('should retrieve without error', function(done) {
        tamber.event.retrieve({
          user: user_1,
          behavior : behavior_1,
          created_since : t_1,
          created_before: currentTime(),
          number: 5
        }).then(result => {
          expect(result.events).to.be.an('array').and.to.have.lengthOf.within(0, 6);
          result.events.every(e => expect(e).to.deep.include({behavior: behavior_1, user: user_1}));
          done();
        }).catch(e => done(e));
      });
    });
    describe('#Retrieve() - item, behavior, created_since, created_before', function() {
      it('should retrieve without error', function(done) {
        tamber.event.retrieve({
          item: item_1,
          behavior : behavior_1,
          created_since : t_1,
          created_before: currentTime(),
          number: 5
        }).then(result => {
          expect(result.events).to.be.an('array').and.to.have.lengthOf.within(0, 6);
          result.events.every(e => expect(e).to.deep.include({behavior: behavior_1, item: item_1}));
          done();
        }).catch(e => done(e));
      });
    });
    describe('#Batch()', function() {
      it('should batch without error', function(done) {
        tamber.event.batch({
          events : [
            {
              user:     user_2,
              item:     item_2,
              behavior: behavior_1,
            },
            {
              user:     user_2,
              item:     item_1,
              behavior: behavior_1,
            },
            {
              user:     user_3,
              item:     item_1,
              behavior: behavior_1,
            },
            {
              user:     user_2,
              item:     item_3,
              behavior: behavior_1,
            },
            {
              user:     user_2,
              item:     item_4,
              behavior: behavior_1,
            },
            {
              user:     user_3,
              item:     item_4,
              behavior: behavior_1,
            }
          ]
        }).then(result => done()).catch(e => done(e));
      });
    });
  });

  describe('Item', function() {
    describe('#Create()', function() {
      it('should create without error', function(done) {
        tamber.item.create({
          id : item_5,
          properties: {
            clothing_type:   "pants",
            stock:           90,
            color:           "blue"
          },
          tags: ["casual", "feminine"]
        }).then(result => done()).catch(e => done(e));
      });
    });
    describe('#Update()', function() {
      it('should update without error', function(done) {
        var props = {"stock": 89};
        props[arrProp1] = [];
        tamber.item.update({
          id : item_5,
          updates: {
            add: {
              properties: props,
              tags: ["weird"]
            },
            remove: {
              tags: ["casual"],
              properties: {"color": ""}
            }
          }
        }).then(item => {
          expect(item.tags).to.not.include('casual');
          expect(item.properties).to.not.have.property('color');
          done();
        }).catch(e => done(e));
      });
    });
    describe('#Retrieve()', function() {
      it('should retrieve without error', function(done) {
        tamber.item.retrieve({
          id : item_5
        }).then(result => done()).catch(e => done(e));
      });
    });
    describe('#Hide()', function() {
      it('should remove without error', function(done) {
        tamber.item.hide({
          id : item_4
        }).then(result => done()).catch(e => done(e));
      });
    });
  });

  describe('Discover', function() {
    describe('#Recommended()', function() {
      it('should return without error', function(done) {
        tamber.discover.recommended({
          user : user_1,
        }).then(items => {
          expect(items).to.be.an('array').and.to.have.lengthOf.above(0);
          done();
        }).catch(e => done(e));
      });
    });
    describe('#Next()', function() {
      it('should return without error', function(done) {
        tamber.discover.next({
          user : user_1,
          number: 8,
          get_properties: true
        }).then(items => {
          expect(items).to.be.an('array').and.to.have.lengthOf.above(0);
          done();
        }).catch(e => done(e));
      });
    });
    describe('#Weekly()', function() {
      it('should return without error', function(done) {
        tamber.discover.weekly({
          user : user_1,
          number: 8,
          get_properties: true
        }).then(items => {
          expect(items).to.be.an('array').and.to.have.lengthOf.above(0);
          done();
        }).catch(e => done(e));
      });
    });
    describe('#Daily()', function() {
      it('should return without error', function(done) {
        tamber.discover.daily({
          user : user_1,
          number: 8,
          get_properties: true
        }).then(items => {
          expect(items).to.be.an('array').and.to.have.lengthOf.above(0);
          done();
        }).catch(e => done(e));
      });
    });
    
    describe('#Popular()', function() {
      it('should return without error', function(done) {
        tamber.discover.popular()
        .then(result => done()).catch(e => done(e));
      });
    });
    describe('#Hot()', function() {
      it('should return without error', function(done) {
        tamber.discover.hot()
        .then(result => done()).catch(e => done(e));
      });
    });
  });

  describe('User', function() {
    describe('#Create()', function() {
      it('should create actor without error', function(done) {
        tamber.user.create({
          id : user_4, 
          metadata: {
            "city": "San Francisco, CA",
          },
          events: [
            {
              item:     item_2,
              behavior: behavior_1,
            },
            {
              item:     item_1,
              behavior: behavior_1,
            }
          ]
        }).then(result => done()).catch(e => done(e));
      });
    });
    describe('#Update()', function() {
      it('should addBehaviors without error', function(done) {
        tamber.user.update({
          id : user_4, 
          metadata: {
            "city": "Mountain View, CA",
            "age":  "55-65",
            "name": "Rob Pike",
          }
        }).then(result => done()).catch(e => done(e));
      });
    });
    describe('#Retrieve()', function() {
      it('should retrieve without error', function(done) {
        tamber.user.retrieve({
          id : user_4
        }).then(result => done()).catch(e => done(e));
      });
    });
  });
});
