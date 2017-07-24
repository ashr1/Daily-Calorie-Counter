//var userTrackedFoods = [];

var userTrackedFoods = function() {
	var self = this;
	this.trackedFoods = [];
	this.calories = 0;
	this.viewRepresentation = $('.tracked-foods');
	/*this.viewRepresentation.click(function(e) {
		self.removeFoodItem(e);
		//console.log(this);
	});*/ 
};

userTrackedFoods.prototype.addFoodItem = function(foodName, brandName, cal, servSize) {
	this.trackedFoods.push(new FoodItem(foodName, brandName, cal, servSize));
	//don't forget to add to the total calorie count
	this.calories += this.trackedFoods[this.trackedFoods.length - 1].calories;
	this.updateView();
};

userTrackedFoods.prototype.removeFoodItem = function(trackedFoodToRemove) {
	//console.log(trackedFoodToRemove);
	var self = this;
	var ind = 0;
	var junkElement;

	this.trackedFoods.forEach(function(foodItemObj) {
		if($(trackedFoodToRemove).prop('outerHTML') === foodItemObj.viewEl) {
			//console.log('found the matching food item object in data');
			 junkElement = self.trackedFoods.splice(ind, 1);
			$(trackedFoodToRemove).remove();
			console.log(self.trackedFoods);
		}
		ind = ind + 1;
	});
	//$(trackedFoodToRemove).remove();
};

userTrackedFoods.prototype.updateView = function() {
	var self = this;

	self.viewRepresentation.empty();
	self.trackedFoods.forEach(function(foodItemObj) {
		self.viewRepresentation.append(foodItemObj.viewEl);
		$('.tracked-foods li:last').click(function(e) {
			self.removeFoodItem(e.currentTarget);
		});
	});

	$('.tracked-total-calories').empty();
	$('.tracked-total-calories').append(self.calories.toString());
};

userTrackedFoods.prototype.getNumTracked = function() {
	return this.trackedFoods.length;
};

//---------------------------------------------------------------------------------------------------------

var FoodItem = function(foodName, brandName, cal, servSize) {
	this.id = userTrackedFoods.length; //kinda redundant
	this.name = foodName;
	this.brand = brandName;
	this.calories = cal;
	this.servings = servSize;
	this.viewRepresentation();

};

FoodItem.prototype.viewRepresentation = function() {
	this.viewEl = "<li><p>Name: " + this.name + "</p><p>Brand: " + this.brand + "</p><p>Calories: " + this.calories + "</p><p>Num. Servings: " + this.servings + "</p></li>";
};

//-------------------------------------------------------------------------------------------------------------
var userTrackFoodsAry = new userTrackedFoods();

//---------------------------------------------------------------------------------------------------------

