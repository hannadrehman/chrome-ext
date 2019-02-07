app.directive("formA", function() {
  return {
    restrict: "E",
    templateUrl: "../views/unknown.html",
    link: function(scope, elem, attrs) {
      var allNutrients = [
        { name: "AlphaLinolenicAcid18isto3", unit: "gms", value: 0 },
        { name: "TotalNitrogen", unit: "gms", value: 0 },
        { name: "ArachidicAcid20isto0", unit: "gms", value: 0 },
        { name: "Arginine", unit: "gms", value: 0 },
        { name: "BehenicAcid22isto0", unit: "gms", value: 0 },
        { name: "Calcium", unit: "mg", value: 0 },
        { name: "Carbohydrates", unit: "gms", value: 0 },
        { name: "Chlorine", unit: "mg", value: 0 },
        { name: "Cholestrol", unit: "mg", value: 0 },
        { name: "Choline", unit: "mcg", value: 0 },
        { name: "Chromium", unit: "gms", value: 0 },
        { name: "Copper", unit: "mg", value: 0 },
        { name: "InsolubleFibre", unit: "gms", value: 0 },
        { name: "Cystine", unit: "gms", value: 0 },
        { name: "Energy", unit: "Kcal", value: 0 },
        { name: "Fats", unit: "gms", value: 0 },
        { name: "FoodFolicAcid", unit: "mcg", value: 0 },
        { name: "TotalFolicAcid", unit: "mcg", value: 0 },
        { name: "Histidine", unit: "gms", value: 0 },
        { name: "InsolubleDietaryFibre", unit: "gms", value: 0 },
        { name: "Iron", unit: "mg", value: 0 },
        { name: "Isoleucine", unit: "gms", value: 0 },
        { name: "Leucine", unit: "gms", value: 0 },
        { name: "LignocericAcid24isto0", unit: "gms", value: 0 },
        { name: "LinoleicAcid18isto2", unit: "gms", value: 0 },
        { name: "Lysine", unit: "gms", value: 0 },
        { name: "Magnesium", unit: "mg", value: 0 },
        { name: "Manganese", unit: "mg", value: 0 },
        { name: "Methionine", unit: "gms", value: 0 },
        { name: "Minerals", unit: "gms", value: 0 },
        { name: "Moisture", unit: "gms", value: 0 },
        { name: "Molybdenum", unit: "gms", value: 0 },
        { name: "Niacin", unit: "mg", value: 0 },
        { name: "OleicAcid18isto1", unit: "gms", value: 0 },
        { name: "OxalicAcid", unit: "gms", value: 0 },
        { name: "PalmiticAcid16isto0", unit: "gms", value: 0 },
        { name: "PalmitoleicAcid16isto1", unit: "gms", value: 0 },
        { name: "Phenylalanine", unit: "gms", value: 0 },
        { name: "Phosphorous", unit: "mg", value: 0 },
        { name: "PhytinPhosphorous", unit: "gms", value: 0 },
        {
          name: "PhytinPhosphorousAsPercentageOfTotalPhosphorous",
          unit: "gms",
          value: 0
        },
        { name: "Potassium", unit: "mg", value: 0 },
        { name: "Protein", unit: "gms", value: 0 },
        { name: "VitaminB2Riboflavin", unit: "mg", value: 0 },
        { name: "Sodium", unit: "mg", value: 0 },
        { name: "SolubleDietaryFibre", unit: "gms", value: 0 },
        { name: "BetaCarotene", unit: "mcg", value: 0 },
        { name: "StearicAcid18isto0", unit: "gms", value: 0 },
        { name: "Sulphur", unit: "gms", value: 0 },
        { name: "VitaminB1Thiamine", unit: "mg", value: 0 },
        { name: "Threonine", unit: "gms", value: 0 },
        { name: "VitaminB6", unit: "mg", value: 0 },
        { name: "TotalCarotene", unit: "gms", value: 0 },
        { name: "TotalDietaryFibre", unit: "gms", value: 0 },
        { name: "TotalMonounsaturatedFattyAcids", unit: "gms", value: 0 },
        { name: "TotalPolyunsaturatedFattyAcids", unit: "gms", value: 0 },
        { name: "TotalSaturatedFattyAcids", unit: "gms", value: 0 },
        { name: "TotalTransFat", unit: "gms", value: 0 },
        { name: "Tryptophan", unit: "gms", value: 0 },
        { name: "Tyrosine", unit: "gms", value: 0 },
        { name: "Valine", unit: "gms", value: 0 },
        { name: "VitaminA", unit: "mcg", value: 0 },
        { name: "VitaminB12", unit: "mcg", value: 0 },
        { name: "VitaminC", unit: "mg", value: 0 },
        { name: "Zinc", unit: "mg", value: 0 },
        { name: "VitaminK", unit: "mcg", value: 0 },
        { name: "Alanine", unit: "gms", value: 0 },
        { name: "Selenium", unit: "mcg", value: 0 },
        { name: "Iodine", unit: "mcg", value: 0 },
        { name: "Sugar", unit: "gms", value: 0 }
      ];
      var self = scope;
      scope.ingredientNames = [{}];
      scope.nutrientsList = [];
      scope.measuresList = [];
      scope.addIngredientNames = addIngredientNames;
      scope.removeNutrients = removeNutrients;
      scope.submitIngredient = submitIngredient;
      scope.removeMeasure = removeMeasure;
      self.simulateQuery = false;
      self.isDisabled = false;

      // list of `state` value/display objects
      self.states = loadAll();
      self.querySearch = querySearch;
      self.selectedItemChange = selectedItemChange;
      self.searchTextChange = searchTextChange;
      self.addMeasureRow = addMeasureRow;

      self.newState = newState;
      function newState(state) {
        alert(
          "Sorry! You'll need to create a Constitution for " + state + " first!"
        );
      }

      // ******************************
      // Internal methods
      // ******************************

      /**
       * Search for states... use $timeout to simulate
       * remote dataservice call.
       */
      function querySearch(query) {
        var results = query
            ? self.states.filter(createFilterFor(query))
            : self.states,
          deferred;
        if (self.simulateQuery) {
          deferred = $q.defer();
          $timeout(
            function() {
              deferred.resolve(results);
            },
            Math.random() * 1000,
            false
          );
          return deferred.promise;
        } else {
          return results;
        }
      }

      function searchTextChange(text) {
        console.log(text);
      }

      function selectedItemChange(item) {
        if (item) {
          scope.nutrientsList.push({
            nutrient: item.value,
            units: 1
          });
        }
        // $log.info('Item changed to ' + JSON.stringify(item));
      }
      /**
       * Build `states` list of key/value pairs
       */
      function loadAll() {
        return allNutrients.map(function(nutrient) {
          return {
            value: nutrient.name,
            name: nutrient.name + '('+ nutrient.unit + ')',
            unit: nutrient.unit,
          };
        });
      }
      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
        var lowercaseQuery = query.toLowerCase();
        return function filterFn(state) {
          return state.value.toLowerCase().indexOf(lowercaseQuery) > -1 ;
        };
      }
      function addIngredientNames() {
        scope.ingredientNames.push({});
      }
      function addMeasureRow() {
        scope.measuresList.push({});
      }
      function removeNutrients(nutrientIndex) {
        scope.nutrientsList.splice(nutrientIndex, 1);
      }
      function removeMeasure(measuresIndex) {
        scope.measuresList.splice(measuresIndex, 1);
      }
      function submitIngredient() {
        
      }
    }
  };
});
