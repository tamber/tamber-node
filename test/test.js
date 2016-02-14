var tamber = require('../lib/Tamber');
var assert = require('assert');

var engine = tamber.New('IVRiX25dr5rsJ0TDdVOD', null);

describe('Behavior', function() {
	describe('#Create()', function() {
	    it('should create without error', function(done) {
	    	engine.Behavior.Create({
			name : "like",
			desirability: 0.6
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Retrieve()', function() {
	    it('should retrieve without error', function(done) {
	    	engine.Behavior.Retrieve({
			name : "like"
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
});

describe('Event', function() {
	describe('#Track()', function() {
	    it('should track without error', function(done) {
	    	engine.Event.Track({
			user : "user_jctzgisbru",
			behavior : "like",
			item: "item_i5gq90scc1"
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Retrieve()', function() {
	    it('should retrieve without error', function(done) {
	    	engine.Event.Retrieve({
			user : "user_jctzgisbru",
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Batch()', function() {
	    it('should batch without error', function(done) {
	    	engine.Event.Retrieve({
			events : [
					{
						user:     "user_y7u9sv6we0",
						item:     "item_u9nlytt3w5",
						behavior: "like",
					},
					{
						user:     "user_y7u9sv6we0",
						item:     "item_i5gq90scc1",
						behavior: "like",
					},
					{
						user:     "user_k6q76ohppz",
						item:     "item_i5gq90scc1",
						behavior: "like",
					},
					{
						user:     "user_y7u9sv6we0",
						item:     "item_d1zevdf6hl",
						behavior: "like",
					},
					{
						user:     "user_y7u9sv6we0",
						item:     "item_nqzd5w00s9",
						behavior: "like",
					},
					{
						user:     "user_k6q76ohppz",
						item:     "item_nqzd5w00s9",
						behavior: "like",
					}
				]
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
});


describe('Item', function() {
	describe('#Create()', function() {
	    it('should create without error', function(done) {
	    	engine.Item.Create({
			id : "item_nqzd5w00s9",
			properties: {
				"clothing_type": "pants",
				"stock":         90,
			},
			tags: ["casual", "feminine"]
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Update()', function() {
	    it('should update without error', function(done) {
	    	engine.Item.Update({
			id : "item_nqzd5w00s9",
			updates: {
				add: {
					properties: {"stock": 89}
				},
				remove: {
					tags: ["casual"],
				}
			}
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Retrieve()', function() {
	    it('should retrieve without error', function(done) {
	    	engine.Item.Retrieve({
			id : "item_nqzd5w00s9"
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Remove()', function() {
	    it('should remove without error', function(done) {
	    	engine.Item.Remove({
			id : "item_nqzd5w00s9"
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Update() after #Remove()', function() {
	    it('should update and reintroduce previously removed item without error', function(done) {
	    	engine.Item.Create({
			id : "item_nqzd5w00s9",
			updates : {}
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
});

describe('Discover', function() {
	describe('#Recommended()', function() {
	    it('should return without error', function(done) {
	    	engine.Discover.Recommended({
			user : "user_jctzgisbru",
			number: 50,
			test_events: [
				{
					user:     "user_jctzgisbru",
					item:     "item_d1zevdf6hl",
					behavior: "like",
				},
				{
					user:     "user_jctzgisbru",
					item:     "item_nqzd5w00s9",
					behavior: "like",
				}
			],
			filter: {
				"or": [
					{
						"gt": [
							{"property": "stock"},
							20
						]
					},
					{
						"eq": [
							{"property": "clothing_type"},
							"shirt"
						]
					}
				]
			}
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Similar()', function() {
	    it('should return without error', function(done) {
	    	engine.Discover.Similar({
			item : "item_i5gq90scc1",
			number: 100
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#RecommendedSimilar()', function() {
	    it('should return without error', function(done) {
	    	engine.Discover.RecommendedSimilar({
			user : "user_jctzgisbru",
			item : "item_i5gq90scc1"
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Popular()', function() {
	    it('should return without error', function(done) {
	    	engine.Discover.Popular({}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Hot()', function() {
	    it('should return without error', function(done) {
	    	engine.Discover.Hot({}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
});

describe('User', function() {
	describe('#Create()', function() {
    	it('should create actor without error', function(done) {
	    	engine.User.Create({
			id : "user_fwu592pwmo", 
			metadata: {
				"city": "San Francisco, CA",
			},
			events: [
				{
					item:     "item_u9nlytt3w5",
					behavior: "like",
				},
				{
					item:     "item_i5gq90scc1",
					behavior: "like",
				}
			]
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Update()', function() {
    	it('should addBehaviors without error', function(done) {
	    	engine.User.Update({
			id : "user_fwu592pwmo", 
			metadata: {
				"city": "Mountain View, CA",
				"age":  "55-65",
				"name": "Rob Pike",
			}
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Retrieve()', function() {
	    it('should retrieve without error', function(done) {
	    	engine.User.Retrieve({
			id : "user_fwu592pwmo"
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
});










