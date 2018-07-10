document.addEventListener('DOMContentLoaded', function() {	
	
	// VARIABLES
	//  variables representing radio buttons - 'dimensions from recipe' section
	var circleRecipe = document.querySelector('#circle-recipe');
	var rectangleRecipe = document.querySelector('#rectangle-recipe');
	
	// variables representing fields for data entry - 'dimensions from recipe' section
	var circleRecipeSection = document.querySelector('.circle-recipe-section');
	var rectangleRecipeSection = document.querySelector('.rectangle-recipe-section');	
	var diameterRecipe = document.querySelector('#diameter-recipe');
	var lengthARecipe = document.querySelector('#length-a-recipe');
	var lengthBRecipe = document.querySelector('#length-b-recipe');
	
	//  variables representing radio buttons - 'user dimensions' section
	var circleUser = document.querySelector('#circle-user');
	var rectangleUser = document.querySelector('#rectangle-user');
	
	// variables representing fields for data entry - 'user dimensions' section
	var circleUserSection = document.querySelector('.circle-user-section');
	var rectangleUserSection = document.querySelector('.rectangle-user-section');
	var diameterUser = document.querySelector('#diameter-user');
	var lengthAUser = document.querySelector('#length-a-user');
	var lengthBUser = document.querySelector('#length-b-user');
	
	// variable representing 'ingredients section'
	var ingredientsSection = document.querySelector('.ingredients-section');	
	
	// variables representing 'button section'
	var clearBtn = document.querySelector('#clear');
	var moreBtn	= document.querySelector('#more');
	var acceptBtn = document.querySelector('#accept');
	
	// variables representing 'output recipe section'	
	var recipeSection = document.querySelector('.output-recipe-section');
	var ingredientsList = document.querySelector('#ingredients-list');
	var convertAlert = document.querySelector('#convert-alert');
	
	
	// USED FUNCTIONS	
	clear();
	
	// switch sections visibility by adding and removing 'visible' class
	function switchVisibility(visibleElement, invisibleElement) {
		visibleElement.classList.add('visible');
		invisibleElement.classList.remove('visible');
	}
	
	// return value	from input field
	function returnValue(inputField) {
		return inputField.value;
	}	
	
	// clear ingredients list from 'output recipe section'
	function clearIngredientsList() {
		ingredientsList.innerHTML = '';
	}
	
	// remove class 'visible' from element
	function makeInvisible(elem) {
		elem.classList.remove('visible');
	}
		
	// changing the visibility of input fields in 'recipe' and 'user' section	
	circleRecipe.addEventListener('click', function() {switchVisibility(circleRecipeSection, rectangleRecipeSection)});
	rectangleRecipe.addEventListener('click', function() {switchVisibility(rectangleRecipeSection, circleRecipeSection)});
	circleUser.addEventListener('click', function() {switchVisibility(circleUserSection, rectangleUserSection)});
	rectangleUser.addEventListener('click', function() {switchVisibility(rectangleUserSection, circleUserSection)});	
	
	// getting values from input fields
	lengthARecipe.onkeyup = function() {returnValue(lengthARecipe)};
	lengthBRecipe.onkeyup = function() {returnValue(lengthBRecipe)};
	lengthAUser.onkeyup = function() {returnValue(lengthAUser)};
	lengthBUser.onkeyup = function() {returnValue(lengthBUser)};	
	diameterRecipe.onkeyup = function() {recipeCircleArea()};
	diameterUser.onkeyup = function() {userCircleArea()};
	
	// calculations of surface areas	
	function recipeCircleArea() {
		var recipeCircleArea = (Math.pow((diameterRecipe.value/2),2))*3.14;
		return recipeCircleArea;
	}	
	
	function userCircleArea() {
		var userCircleArea = (Math.pow((diameterUser.value/2),2))*3.14;
		return userCircleArea;
	}		
	
	function recipeRectangleArea() {
		return returnValue(lengthARecipe)*returnValue(lengthBRecipe);
	}
	function userRectangleArea() {
		return returnValue(lengthAUser)*returnValue(lengthBUser);
	}		
	
	//  add ingredients function	
	function addIngredient() {		
		var newIngredientArea = document.createElement('div');
		ingredientsSection.appendChild(newIngredientArea);	
		newIngredientArea.classList.add('particular-ingredient-area');
		var newIngredientForm = document.createElement('form');
		newIngredientArea.appendChild(newIngredientForm);
		newIngredientForm.classList.add('input-data');
		
		var ingredientLabel = document.createElement('label');
		newIngredientForm.appendChild(ingredientLabel);
		ingredientLabel.setAttribute = ('for', 'ingredient');
		ingredientLabel.innerHTML = 'ingredient: ';
		var ingredientInput = document.createElement('input');
		newIngredientForm.appendChild(ingredientInput);
		ingredientInput.type = 'text';
		ingredientInput.id = 'ingredient';
		
		var quantityLabel = document.createElement('label');
		newIngredientForm.appendChild(quantityLabel);
		quantityLabel.for = 'quantity';
		quantityLabel.innerHTML = ' quantity: ';
		var quantityInput = document.createElement('input');
		newIngredientForm.appendChild(quantityInput);
		quantityInput.type = 'number';
		quantityInput.id = 'quantity';
		quantityInput.min = '1';
		quantityInput.step = '0.01';
		
		var unitLabel = document.createElement('label');
		newIngredientForm.appendChild(unitLabel);
		unitLabel.for = 'unit';
		unitLabel.innerHTML = ' unit: ';
		var unitInput = document.createElement('input');
		newIngredientForm.appendChild(unitInput);
		unitInput.type = 'text';
		unitInput.id = 'unit';
	}	
	
	// count proportion
	function proportion() {
		var proportion = 0;
		
		if (circleRecipe.checked == true && circleUser.checked == true) {			
			proportion = recipeCircleArea()/userCircleArea();				
		}
		else if (circleRecipe.checked == true && rectangleUser.checked == true) {				
			proportion = recipeCircleArea()/userRectangleArea();						
		}
		else if (rectangleRecipe.checked == true && circleUser.checked == true) {
			proportion = recipeRectangleArea()/userCircleArea();			
		}
		else if (rectangleRecipe.checked == true && rectangleUser.checked == true) {
			proportion = recipeRectangleArea()/userRectangleArea();				
		}
		
		return proportion;
	}	
	
	// convert ingredients values	
	function convert() {
		var ingredient = document.querySelectorAll('#ingredient');
		var quantity = document.querySelectorAll('#quantity');
		var unit = document.querySelectorAll('#unit');
		
		if (quantity[0].value.length <= 0) {			
			convertAlert.innerHTML = 'You must inscribe quantity before convert!';
		}
		else {
			clearIngredientsList();
			for (var i=0; i<ingredient.length; i++) {			
				if (quantity[i].value.length > 0) {					
					var message = document.createElement('p');
					ingredientsList.appendChild(message);				
					message.innerHTML = "- " + ingredient[i].value + ' ' + (quantity[i].value/proportion()).toFixed(2) + ' ' + unit[i].value;
				}
			}	
			recipeSection.classList.add('visible');
		}		
	}	
	
	// verification if every measure was declared
	function validation() {
		if ((circleRecipe.checked == true && recipeCircleArea() > 0) || (rectangleRecipe.checked == true && returnValue(lengthARecipe) > 0 && returnValue(lengthBRecipe) > 0)) {
			if ((circleUser.checked == true && userCircleArea() > 0) || (rectangleUser.checked == true && returnValue(lengthAUser) > 0 && returnValue(lengthBUser) > 0)) {
				convertAlert.innerHTML = '';
				convert();
			}
			else {
				convertAlert.innerHTML = '<p>You must define what kind of baking mold you use and inscribe its dimensions before convert!</p>';
			}
		}
		else {
			convertAlert.innerHTML = '<p>You must define what kind of baking mold is used in the recipe and inscribe its dimensions before convert!</p>';
		}
	}	
	
	// clear all
	function clear() {
		var formContent = document.querySelectorAll('.input-data');
		for (var i=0; i<formContent.length; i++) {
			formContent[i].reset();
		}		
		makeInvisible(circleRecipeSection);
		makeInvisible(rectangleRecipeSection);
		makeInvisible(circleUserSection);
		makeInvisible(rectangleUserSection);
		makeInvisible(recipeSection);
		convertAlert.innerHTML = '';
	}		
	
	// actions triggered by current button	
	moreBtn.addEventListener('click', addIngredient);
	acceptBtn.addEventListener('click', validation);
	clearBtn.addEventListener('click', clear);		
	
});