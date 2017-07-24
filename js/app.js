$('.input-food').keyup(function() {
	fireAjaxRequest($('.input-food').val());
});

var fireAjaxRequest = function(foodItem) {
	//console.log(foodItem);
	var askForFoods = $.ajax({
		url: "https://api.nutritionix.com/v1_1/search/" + foodItem,
		data: {
			results: "0:20",
			cal_min: 0,
			cal_max: 50000,
			fields: "item_name,item_id,brand_name,nf_calories",
			appId: 'mykey',
			appKey: 'mykey'
		},
		success: function(data) {
			//console.log(askForFoods);
			//console.log(data);
			parseRequestData(data.hits);
		},
		error: function() {
			console.log("you made a mistake");
		}
	});
};

var parseRequestData = function(dataArr) {
	var itemName, brandName, calories, qty;
	$(".search-matches").empty();
	dataArr.forEach(function(element) {

		itemName = element.fields.item_name;
		brandName = element.fields.brand_name;
		calories = element.fields.nf_calories;
		qty = element.fields.nf_serving_size_qty + ' ' + element.fields.nf_serving_size_unit;

		$(".search-matches").append(returnHTMLFoodMatch(itemName, brandName, calories, qty));
		$(".search-matches li:last").click(function(e) {
			//console.log("you clicked a food match!");
			chosenFoodIntoTrackedData(e.currentTarget);
		});


	});
};

var returnHTMLFoodMatch = function(foodName, brand, numCalories, servings) {
	//return "<li><p>" + foodName + "</p><p>" + numCalories + "</p></li>";
	return "<li><p>Name: " + foodName + "</p><p>Brand: " + brand + "</p><p>Calories: " + numCalories + "</p><p>Num. Servings: " + servings + "</p></li>";
};

var chosenFoodIntoTrackedData = function(chosenFoodElement) {
	var indexOfColon;
	var foodItemAttributes = [];
	$(chosenFoodElement)[0].childNodes.forEach(function(pElement) {
		indexOfColon = $(pElement)[0].innerText.indexOf(':');
		//console.log($(pElement)[0].innerText.slice(indexOfColon + 1));
		foodItemAttributes.push(($(pElement)[0].innerText.slice(indexOfColon + 1)).trim());
	});

	//userTrackedFoods.push(new FoodItem(foodItemAttributes[0], foodItemAttributes[1], foodItemAttributes[2], foodItemAttributes[3]));
	userTrackFoodsAry.addFoodItem(foodItemAttributes[0], foodItemAttributes[1], parseInt(foodItemAttributes[2]), foodItemAttributes[3]);
	//console.log(userTrackedFoods);

};