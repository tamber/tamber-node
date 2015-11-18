var tamber = require('../lib/Tamber');
var assert = require('assert');

var engine = tamber.New('f68jZIyq2gqS18mg3wvl', null);

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
			name : "length"
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
	describe('#Create() -- again, for item funcs', function() {
	    it('should create again without error', function(done) {
	    	engine.Property.Create({
			name : "length",
			type : "float"
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});

});

describe('Actor', function() {
	describe('#Create()', function() {
    	it('should create actor without error', function(done) {
	    	engine.Actor.Create({
			id : "2197054087", 
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
	describe('#Remove()', function() {
	    it('should remove without error', function(done) {
	    	engine.Actor.Remove({
			id : "2197054087"
			}, function(result, err){
				if (result) throw result;
	        	done();
			});
	    });
	});
});



describe('Item', function() {
	describe('#Create()', function() {
	    it('should retrieve without error', function(done) {
	    	engine.Item.Create({
			id : "JJJJ",
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#AddProperties()', function() {
	    it('should add properties without error', function(done) {
	    	engine.Item.AddProperties({
			id : "HZNP",
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
			id : "HZNP",
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
			name : "share"
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Remove()', function() {
	    it('should remove without error', function(done) {
	    	engine.Behavior.Remove({
			name : "share",
			}, function(result, err){
				if (result) throw result;
	        	done();
			});
	    });
	});
});

describe('Discover', function() {
	describe('#Recommended()', function() {
	    it('should return without error', function(done) {
	    	engine.Discover.Recommended({
			id : "2197054086"
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#Similar()', function() {
	    it('should return without error', function(done) {
	    	engine.Discover.Similar({
			id : "HZNP"
			}, function(result, err){
				if (err) throw err;
	        	done();
			});
	    });
	});
	describe('#RecommendedSimilar()', function() {
	    it('should return without error', function(done) {
	    	engine.Discover.RecommendedSimilar({
			actor : "2197054086",
			item : "HZNP"
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


