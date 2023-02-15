var map = L.map('map').setView([47.2454, -122.4385], 14);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXl1c2hqb3NoaTEzODAiLCJhIjoiY2xhajN2bjV0MDhuYTNzbGZ4eXY3aWV0YyJ9.-t8ccvCJhwwHcOdi435HrQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXl1c2hqb3NoaTEzODAiLCJhIjoiY2xhajN2bjV0MDhuYTNzbGZ4eXY3aWV0YyJ9.-t8ccvCJhwwHcOdi435HrQ'
}).addTo(map);

var drawnItems = L.featureGroup().addTo(map);

new L.Control.Draw({
    draw : {
        polygon : false,
        polyline : false,
        rectangle : false,     // Rectangles disabled
        circle : false,        // Circles disabled
        circlemarker : false,  // C
        marker: true
    },
    edit : {
        featureGroup: drawnItems
    }
}).addTo(map);

function createFormPopup() {
    var popupContent =
      //replace this block
        '<form>' +
        'Enter date and time:<br><input type="datetime-local" id="input_DT"><br>' +
        'How many spots do you see:<br><input type="number" id="input_spots"><br>' +
        'How packed is parking: <br><label>Empty</label><input type="range" id="input_rate" min="0" max="10"><label>Full</label><br>' +
        'Upload picture:<br><input type="file" id="input_pic"><br>' +
        'Your name:<br><input type="text" id="input_name"><br>' +
        '<input type="button" value="Submit" id="submit">' +
        '</form>'
     //but leave this part
    drawnItems.bindPopup(popupContent).openPopup();
}

//change the event listener code to this
map.addEventListener("draw:created", function(e) {
    e.layer.addTo(drawnItems);
    createFormPopup();
});

function setData(e) {
    if(e.target && e.target.id == "submit") {
        // Get user name and description
        	// CHANGE THE VAR NAMES TO SOMETHING THAT MAKES SENSE FOR YOUR FORM
        	// CHANGE THE ELEMENT IDs TO MATCH THE IDs YOU GAVE YOUR FORM INPUTS IN STEP 6.2
        	// INSERT ADDITIONAL VARS AND .getElementById STATEMENTS FOR EACH OF YOUR FORM INPUTS
        var enteredDT = document.getElementById("input_DT").value;
        var enteredspots = document.getElementById("input_spots").value;
        var enteredrate = document.getElementById("input_rate").value;
        var enteredpic = document.getElementById("input_pic").value;
        var enteredname = document.getElementById("input_name").value;
        // Print user name and description
        	// LOG TO THE CONSOLE ALL OF THE VARIABLES THAT HOLD THE INPUT VALUES FOR YOUR FORM
        console.log(enteredDT);
        console.log(enteredspots);
        console.log(enteredrate);
        console.log(enteredpic);
        console.log(enteredname);
        // Get and print GeoJSON for each drawn layer
        drawnItems.eachLayer(function(layer) {
            var drawing = JSON.stringify(layer.toGeoJSON().geometry);
            console.log(drawing);
        });
        // Clear drawn items layer
        drawnItems.closePopup();
        drawnItems.clearLayers();
    }
}

document.addEventListener("click", setData);

map.addEventListener("draw:editstart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:deletestart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:editstop", function(e) {
    drawnItems.openPopup();
});
map.addEventListener("draw:deletestop", function(e) {
    if(drawnItems.getLayers().length > 0) {
        drawnItems.openPopup();
    }
});
