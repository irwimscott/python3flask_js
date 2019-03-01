$(document).ready(function() {
	$("#retrieve-resources").click(function() {
    var displayResources = $("#display-resources");
    displayResources.text("Loading data from JSON source...");
    $.ajax({
	  headers: {
        "x-apikey": "5c5730ab148a5642e02d79ac",
		"content-type": "application/json",
		"cache-control": "no-cache",
      },
      type: "GET",
      //url: "/static/resources.json" + "?" + (new Date()).getTime(), // Using our resources.json file to serve results
	  //url: "https://jsonplaceholder.typicode.com/posts/1/comments", // Using our resources.json file to serve results
      //url: "https://cofeemachine-543f.restdb.io/rest/action",
	  //url: "https://cofeemachine-543f.restdb.io/rest/action?metafields=true&max=5",	  
	  url: "https://cofeemachine-543f.restdb.io/rest/action?metafields=true?q={}&h={%22$orderby%22:%20{%22_created%22:%20-1}}",
	  success: function(result) {

        console.log(result);
        var output =
          '<table><thead><tr><th>Machine-Name</th><th>Status</th><th>Past-Time</th><th>Brazil-DateTime</th></thead><tbody>';
		  
        for (var i in result) {
			
			//var start = moment(result[i]._created);
			//var start = moment().format('h:mm:ss a');
			//var start = moment(result[i]._created).format('HH:mm:ss');
			var minutesPassed = moment(result[i]._created).fromNow();
				
			if ( result[i].status === 1 ) {
				//var estado = "Café Pronto";
				var estado = '<img src="/static/cofeready_icon.gif" height="35" width="35"/>'
			} else {
				//var estado = "Café no bule";
				var estado = '<img src="/static/hotwater_icon.gif" height="35" width="35"/>'
			}
			
			if ( result[i].machine_code === 1 ) {
				var machinename = 'MACHINE ONE'
			} else {
				var machinename = 'UNDEFINED'
			}
			
          output +=
            "<tr></td>" +
            //result[i].name +
			//result[i]._created +
            "</td><td>" +
			//result[i].machine_name +
			machinename +
            "</td><td>" +
            //result[i].provider +	
			//result[i].status +
			estado +
            "</td><td>" +
			minutesPassed +
            "</td><td>" +
            //result[i].url +
			//result[i]._created;  //(date.toISOString().slice(0,10))
			//result[i]._created.slice(0,10);
			moment(result[i]._created).format('DD-MM-YYYY HH:mm');
;
 +
            "</td></tr>";
        }
        output += "</tbody></table>";

        displayResources.html(output);
        $("table").addClass("table");
      }
    });
  });
});