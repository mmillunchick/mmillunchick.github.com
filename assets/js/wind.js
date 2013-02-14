$(document).ready(function() {

	var stations = [
	  { name: "Drogden", id: "6183" },
	  { name: "Kbh lufthavn", id: "6180" },
	  { name: "Gniben", id: "6169" },			
	  { name: "Thorsminde", id: "6052" }			
	];

	function initialize (){
		
		// create each of the stations
		$.each(stations, function(i, item) {

			// create the gauge markup
			createWindGauge( item.id, item.name );

			// load the data
			getGaugeData( item.id, item.name );
			
		});
	}

	function getGaugeData( stationID, stationName ) {
		
		//console.log("init weather station");
		
		$.ajax({
			type: "GET",
			url: 'http://hamsterboy.dk/dev/wind/proxy.php',
			data: { id : stationID },
			success : function( data ) {
				//console.log("	done!");
				fillData(data, stationID);
	        },
			complete: function(data) {
				//setTimeout( getGaugeData(data, stationID), 6000);
				console.log("Refreshing the data... hang on please.");
			},
			dataType: "json"
		});
	}

	function createWindGauge( stationID, stationName ){
		if ( $("#content .weather-stations").length == 0 ) {
			// create the list element
			$("#content").append("<ul class='weather-stations'></ul>");
		}

		var listItem = 
			"<li class=\"station-" + stationID + "\">" +
				"<h3>" + stationName + "</h3>" +
				"<a>" +
					"<ul>" +
						"<li class=\"speed\"><b>0.0</b> m/s</li>" +
						"<li class=\"direction\"><i class=\"direction-icon\"></i> <span class=\"degrees\">0&deg;</span></li>" +
					"</ul>" +
				"</a>" +
			"</li>";
			
		// append list item
		$("#content .weather-stations").append( listItem );
		
		return listItem;
	}

	function setWindAngle( elm, angle ) {
		$(elm[0]).css("-moz-transform","rotate("+ angle + "deg)");	
		$(elm[0]).css("-webkit-transform","rotate("+ angle + "deg)");	
		$(elm[0]).css("-ms-transform","rotate("+ angle + "deg)");	
		$(elm[0]).css("-o-transform","rotate("+ angle + "deg)");	
	}

	function fillData( data, stationID ) {

		// create reference to the list item
		var listItem = $(".weather-stations li.station-"+ stationID);
		
		// fill in the wind speed
		$(listItem).find(".speed b").html(data.windspeed);

		// fill in the wind direction
		$(listItem).find(".degrees").html(data.degrees + "&deg;");
		
		// set the rotation of the wind arrow
		setWindAngle( $(listItem).find(".direction"), data.degrees ); 

		var arrow = $(listItem).find(".direction");

		//worker(arrow);

	}

	(function worker(elm) {
		
		// get the current rotation
		//console.log("her: " + elm);
		
		//setTimeout(worker, 5000);
	})();
	
	
	// Ready... set... go!
	initialize();
});
