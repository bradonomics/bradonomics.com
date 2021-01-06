// Hold locations.json data in variable
var locationsArray = (function() {
  var locationsAjax = null;
  jQuery.ajax({
    'async': false,
    'global': false,
    'url': "/data/locations.json",
    'dataType': "json",
    'success': function(data) {
      locationsAjax = data;
    }
  });
  return locationsAjax;
})();

// Build select menus on change event
function locationChange(selectedId, selectedName) {

  // Get ID of selected dropdown
  var selectedId = selectedId.id;
    // console.log('selectedId is: ' + selectedId);

  // Add 1 to the number on the end of selectedId
  var selectedIdCount = selectedId.split("-").pop();
    // console.log('selectedIdCount is: ' + selectedIdCount);
  var selectedIdPlusOne = Number(selectedIdCount) + 1;
    // console.log('selectedIdPlusOne is: ' + selectedIdPlusOne);
  var newMenuId = 'location-' + selectedIdPlusOne;
    // console.log('newMenuId is: ' + newMenuId);

  // Check if there is a menu below the one being changed and if it has already be populated
  if (document.getElementById(newMenuId) && document.getElementById(newMenuId).hasChildNodes()) {

    // Remove any options menu before adding it back
    document.getElementById(newMenuId).innerHTML = '';

  }

  // Check if there is a menu below the one being changed
  if (document.getElementById(newMenuId)) {

    // Add `distance` part of object to variable based on selected `name`
    var selectedDistancefilter = locationsArray.filter(function(item) {
      return item.name === selectedName.textContent;
    });
    var selectedObjDistance = selectedDistancefilter[0].distance;
      // console.log('selectedObjDistance is: ' + JSON.stringify(selectedObjDistance));

    // Build the options dropdown
    var distanceMenu;
    Object.keys(selectedObjDistance).forEach(function(location) {
      distanceMenu += '<option value="' + selectedObjDistance[location] + '">' + location + '</option>';
    });

    // Add distanceMenu dropdown options to the `select` menu below the one changed
    document.getElementById(newMenuId).insertAdjacentHTML('afterbegin', distanceMenu);
    // document.getElementById(newMenuId).innerHTML(distanceMenu);

  }

  // Call singleDistance() function
  singleDistance();
}

// Calculate distance from each location to the next
function singleDistance() {

  // Build array of all dropdowns
  var dropdownElements = document.getElementsByClassName('dropdown');
  // console.log('Number of dropdowns: ' + dropdownElements.length);

  // Loop the dropdown object and create array of only the values
  var dropdownValues = [];
  var dropdownNumber = 2;
  for (var i = 0; i < dropdownElements.length - 1; i++) {
    // dropdownValues.push(dropdownElements[i].value);

    var selectedValue = document.getElementById('location-' + dropdownNumber).value;
    // console.log('selectedValue is: ' + selectedValue);

    var distance = document.getElementById('mileage-' + dropdownNumber);
    distance.innerHTML = '';
    distance.insertAdjacentHTML('beforeend', selectedValue);

    dropdownNumber++;
  }

  // Call totalDistance() function to sum all
  totalDistance();

}

// Sum all distances and add to total at bottom
function totalDistance() {

  // Capture all dropdown values in an object
  var dropdownElements = document.getElementsByClassName('dropdown');

  // Loop the dropdown object and create array of only the values
  var dropdownValues = [];
  for (var i = 0; i < dropdownElements.length; i++) {
    dropdownValues.push(dropdownElements[i].value);
  }

  // Convert strings to numbers
  var dropdownToNumbers = dropdownValues.map(Number);

  // Sum the numbers from the above array
  var sum = 0;
  for (var j = 0; j < dropdownToNumbers.length; j++) {
    sum += dropdownToNumbers[j];
  }

  // Output sum to DOM
  document.getElementById('total_miles').textContent = sum;
}

// Number of next dropdown
var locationNumber = 3;

// Add another location button
function addLocation() {

  // Hold location div in variable
  var newLocation = '<div class="location"><select class="dropdown" id="location-' + locationNumber + '" onchange="locationChange(this, this.options[this.selectedIndex])"></select><span class="distance" id="mileage-' + locationNumber + '"></span></div>';

  // Add newLocation string above as a new dropdown
  document.getElementById('locations').insertAdjacentHTML('beforeend', newLocation);

  // Get the previous location to build the correct options menu
  var locationNumberMinusOne = locationNumber - 1;
  var previousLocation = 'location-' + locationNumberMinusOne;
  var getPreviousLocation = document.getElementById(previousLocation);
  var previousLocationValue = getPreviousLocation.options[getPreviousLocation.selectedIndex].text;

  // Add `distance` part of object to variable based on previousLocationValue
  var Distancefilter = locationsArray.filter(function(item) {
    return item.name === previousLocationValue;
  });
  var selectedObjDistance = Distancefilter[0].distance;

  // Build the options dropdown
  var distanceMenu = '';
  Object.keys(selectedObjDistance).forEach(function(location) {
    distanceMenu += '<option value="' + selectedObjDistance[location] + '">' + location + '</option>';
  });

  // Add options dropdown to new dropdown
  document.getElementById('location-' + locationNumber).insertAdjacentHTML('afterbegin', distanceMenu);

  // Increase the locationNumber for the next dropdown
  locationNumber++;

  // Call singleDistance() to output distance value for processing
  singleDistance();

}
