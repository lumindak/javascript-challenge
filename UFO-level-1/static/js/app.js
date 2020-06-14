// from data.js
var tableData = data;
var tbody = d3.select("tbody");
var form = d3.select("#form");
var button = d3.select("#button");
var heading = d3.select("heading3")
var inputValue;

// YOUR CODE HERE!
tableData.forEach(function(sightings) {
      //console.log(sightings);
      var row = tbody.append("tr");
      Object.entries(sightings).forEach(function([key, value]) {
            //console.log(key, value);
            var cell = row.append("td");
            cell.text(value);
      });
});

//form.on("click",runDate);
//form.on("submit",runDate);
//button.on("click", runDate);

form.on("submit",filteredsightings);
button.on("click", filteredsightings);

////reads the form input
// function runDate() {
//       d3.event.preventDefault();
//       var inputObject = d3.select("#date_input");
//       inputValue = inputObject.property("value")
//       console.log(inputValue);
// }

//returns true for the selected date
function filterDate(sighting) {
      old_date= sighting.datetime;
      new_date = new Date(old_date).toLocaleDateString('fr-CA')
      d3.event.preventDefault();
      var inputObject = d3.select("#date_input");
      inputValue = inputObject.property("value");

      console.log(inputValue==new_date);
      return new_date == inputValue;
     
}

function filteredsightings() {
      var sightings = tableData.filter(filterDate);
      //console.log(sightings);
      //return sightings
      //deleting the rows of the prvious table first
     // $("#ufo tr").remove(); 
      $("tbody tr").remove(); 
      //writing the sightings on the selected date
      sightings.forEach(function(sightings) {
            //console.log(sightings);
            var row = tbody.append("tr");
            Object.entries(sightings).forEach(function([key, value]) {
                  //console.log(key, value);
                  var cell = row.append("td");
                  cell.text(value);
            });
      });

      console.log(sightings);
      var dates = sightings.map(tableData =>  tableData.datetime);
      console.log(dates.length);
      if (((inputValue < "2010-01-01") ||(inputValue > "2010-01-13")) & (dates.length==0) ) {
            console.log("incorrect date");
            //uncomment these lines if you want a medssage box
            // var myWindow = window.open("", "MsgWindow", "width=200,height=100");
            // myWindow.document.write("<p>The dtae you entered in not in January 2010</p>");
            document.getElementById("heading3").innerHTML = "The date you enterd, is not between January 1, 2010 and January 13, 2010!";
            

      }

      if ( (inputValue >= "2010-01-01") & (inputValue <= "2010-01-13") & (dates.length==0) ) {
           
                  document.getElementById("heading3").innerHTML = "No sightings on this day!"; 
      
      }



      
}

