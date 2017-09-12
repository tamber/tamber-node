var tamber = require('../lib/Tamber')('Mu6DUPXdDYe98cv5JIfX', 'SbWYPBNdARfIDa0IIO9L');
var assert = require('assert');

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

describe('Tamber Test', function() {
	this.timeout(tamber.getAttribute('timeout')*1000);
	describe('Behavior', function() {
		describe('#Create()', function() {
		    it('should create without error', function(done) {
		    	tamber.behavior.create({
				name : behavior_1,
				desirability: 0.6
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Retrieve()', function() {
		    it('should retrieve without error', function(done) {
		    	tamber.behavior.retrieve({
				name : behavior_1
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
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
				context:["recommended"]
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Retrieve() - user', function() {
		    it('should retrieve without error', function(done) {
		    	tamber.event.retrieve({
				user : user_1,
				}, function(err, result){
					if (err) throw err;
					var fmatch = filterMatch({
							user: user_1,
						}, result.events);
					if (fmatch) throw fmatch;
		        	done();
				});
		    });
		});
		describe('#Retrieve() - item', function() {
		    it('should retrieve without error', function(done) {
		    	tamber.event.retrieve({
				item : item_1,
				}, function(err, result){
					if (err) throw err;
					var fmatch = filterMatch({
							item: item_1,
						}, result.events);
					if (fmatch) throw fmatch;
		        	done();
				});
		    });
		});
		describe('#Retrieve() - behavior', function() {
		    it('should retrieve without error', function(done) {
		    	tamber.event.retrieve({
				behavior : behavior_1,
				}, function(err, result){
					if (err) throw err;
					var fmatch = filterMatch({
							behavior : behavior_1
						}, result.events);
					if (fmatch) throw fmatch;
		        	done();
				});
		    });
		});
		describe('#Retrieve() - created_since, created_before', function() {
		    it('should retrieve without error', function(done) {
		    	tamber.event.retrieve({
				created_since : t_1,
				created_before: currentTime(),
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Retrieve() - user, created_since, created_before', function() {
		    it('should retrieve without error', function(done) {
		    	tamber.event.retrieve({
				user : user_1,
				created_since : t_1,
				created_before: currentTime(),
				}, function(err, result){
					if (err) throw err;
					var fmatch = filterMatch({
							user: user_1,
						}, result.events);
					if (fmatch) throw fmatch;
		        	done();
				});
		    });
		});
		describe('#Retrieve() - item, created_since, created_before', function() {
		    it('should retrieve without error', function(done) {
		    	tamber.event.retrieve({
				item : item_1,
				created_since : t_1,
				created_before: currentTime(),
				}, function(err, result){
					if (err) throw err;
					var fmatch = filterMatch({
							item: item_1,
						}, result.events);
					if (fmatch) throw fmatch;
		        	done();
				});
		    });
		});
		describe('#Retrieve() - behavior, created_since, created_before', function() {
		    it('should retrieve without error', function(done) {
		    	tamber.event.retrieve({
				behavior : behavior_1,
				created_since : t_1,
				created_before: currentTime(),
				}, function(err, result){
					if (err) throw err;
					var fmatch = filterMatch({
							behavior : behavior_1
						}, result.events);
					if (fmatch) throw fmatch;
		        	done();
				});
		    });
		});
		describe('#Retrieve() - user, behavior, created_since, created_before', function() {
		    it('should retrieve without error', function(done) {
		    	tamber.event.retrieve({
		    	user: user_1,
				behavior : behavior_1,
				created_since : t_1,
				created_before: currentTime(),
				}, function(err, result){
					if (err) throw err;
					var fmatch = filterMatch({
							user: user_1,
							behavior : behavior_1
						}, result.events);
					if (fmatch) throw fmatch;
		        	done();
				});
		    });
		});
		describe('#Retrieve() - item, behavior, created_since, created_before', function() {
		    it('should retrieve without error', function(done) {
		    	tamber.event.retrieve({
		    	item: item_1,
				behavior : behavior_1,
				created_since : t_1,
				created_before: currentTime(),
				}, function(err, result){
					if (err) throw err;
					var fmatch = filterMatch({
							item: item_1,
							behavior : behavior_1
						}, result.events);
					if (fmatch) throw fmatch;
		        	done();
				});
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
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
	});


	describe('Item', function() {
		describe('#Create()', function() {
		    it('should create without error', function(done) {
		    	tamber.item.create({
				id : item_5,
				properties: {
					"clothing_type": "pants",
					"stock":         90,
				},
				tags: ["casual", "feminine"]
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Update()', function() {
		    it('should update without error', function(done) {
		    	tamber.item.update({
				id : item_5,
				updates: {
					add: {
						properties: {"stock": 89}
					},
					remove: {
						tags: ["casual"],
					}
				}
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Retrieve()', function() {
		    it('should retrieve without error', function(done) {
		    	tamber.item.retrieve({
				id : item_5
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Remove()', function() {
		    it('should remove without error', function(done) {
		    	tamber.item.remove({
				id : item_4
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Update() after #Remove()', function() {
		    it('should update and reintroduce previously removed item without error', function(done) {
		    	tamber.item.update({
				id : item_4,
				updates : {}
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Retrieve() ater #Remove() then #Update()', function() {
		    it('should retrieve without error', function(done) {
		    	tamber.item.retrieve({
				id : item_5
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
	});

	describe('Discover', function() {
		describe('#Recommended()', function() {
		    it('should return without error', function(done) {
		    	tamber.discover.recommended({
				user : user_1,
				number: 5
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Similar()', function() {
		    it('should return without error', function(done) {
		    	tamber.discover.similar({
				item : item_1,
				number: 10
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#RecommendedSimilar()', function() {
		    it('should return without error', function(done) {
		    	tamber.discover.recommendedSimilar({
				user : user_1,
				item : item_1
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Next()', function() {
		    it('should return without error', function(done) {
		    	tamber.discover.next({
				user : user_1,
				item : item_1
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Popular()', function() {
		    it('should return without error', function(done) {
		    	tamber.discover.popular({}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Hot()', function() {
		    it('should return without error', function(done) {
		    	tamber.discover.hot({}, function(err, result){
					if (err) throw err;
		        	done();
				});
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
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
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
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Retrieve()', function() {
		    it('should retrieve without error', function(done) {
		    	tamber.user.retrieve({
				id : user_4
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
		describe('#Search()', function() {
		    it('should search without error', function(done) {
		    	tamber.user.search({
				filter : {
					"city": "Mountain View, CA"
					}
				}, function(err, result){
					if (err) throw err;
		        	done();
				});
		    });
		});
	});
});

function filterMatch(filter, results){
	for (var k in filter){
		for (var i = 0; i< results.length; i++){
			if(results[i][k] != filter[k]){
				return "Results do not match filter "+ k+":"+filter[k]+" result val: "+results[i][k];
			}
		}
	}
	return null;
}

function randStr(){
	return (Math.random() + 1).toString(36).substring(7);
}

function currentTime(){
	return Math.floor(Date.now() / 1000);
}






