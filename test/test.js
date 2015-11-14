var tamber = require('../lib/Tamber');
var assert = require('assert');

var engine = tamber.New('sBW1WHQ4bP4Ryfz3AQOo', null);

describe('Property', function() {
	describe('#Create()', function() {
	    it('should create without error', function(done) {
	    	engine.Property.Create({
			name : "length",
			type : "float"
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Retrieve()', function() {
	    it('should retrieve without error', function(done) {
	    	engine.Property.Retrieve({
			name : "length",
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Remove()', function() {
	    it('should remove without error', function(done) {
	    	engine.Property.Remove({
			name : "length",
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});

});

describe('Actor', function() {
	describe('#AddBehaviors()', function() {
    	it('should addBehaviors without error', function(done) {
	    	engine.Actor.AddBehaviors({
			id : "2197054086", 
			behaviors :[
				{
					behavior: "like",
					item : "HZNP",
					value: 1.0,
					created: 1446417346
				}]
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Retrieve()', function() {
	    it('should retrieve without error', function(done) {
	    	engine.Actor.Retrieve({
			id : "2197054086"
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
});


engine.Property.Create({
	name : "length",
	type : "float"
	}, function(result, err){
		if (err) throw err;
});

describe('Item', function() {
	describe('#Create()', function() {
	    it('should retrieve without error', function(done) {
	    	engine.Item.Create({
			id : "9342",
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#AddProperties()', function() {
	    it('should add properties without error', function(done) {
	    	engine.Item.AddProperties({
			id : "JJJJ",
			properties: {
				"length": 5.0
			}
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#AddTags()', function() {
	    it('should add tags without error', function(done) {
	    	engine.Item.AddTags({
			id : "JJJJ",
			tags: ["sweet"]
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Retrieve()', function() {
	    it('should retrieve without error', function(done) {
	    	engine.Item.Retrieve({
			id : "JJJJ"
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
});

describe('Behavior', function() {
	describe('#Create()', function() {
	    it('should create without error', function(done) {
	    	engine.Behavior.Create({
			name : "share",
			type : "decay",
			params : {
				"step":2.0,
			},
			desirability: 0.3
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Retrieve()', function() {
	    it('should retrieve without error', function(done) {
	    	engine.Behavior.Retrieve({
			name : "share",
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	// describe('#Remove()', function() {
	//     it('should remove without error', function(done) {
	//     	engine.Behavior.Remove({
	// 		name : "share",
	// 		}, function(result, err){
	// 			if (err) throw err;
	//         	done();
	// 		});
	//     });
	// });

});

