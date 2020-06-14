// from data.js
var tableData = data;
var tbody = d3.select("tbody");
var form = d3.select("#form");
var button = d3.select("#button");
var heading = d3.select("heading3")
var form1 = d3.select("#form1");
var menu = d3.select("#search_options")
var inputValue;
var user_option;
var search_results = [];

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
menu.on("submit",menu_selection);
menu.on("click",menu_selection);
menu.on("change",menu_selection);

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

      //console.log(inputValue==new_date);
      return new_date == inputValue;
     
}

function filteredsightings() {
      var sightings = tableData.filter(filterDate);
      //console.log(sightings);
      //return sightings
      //deleting the rows of the prvious table first
      //$("#ufo tr").remove(); 
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
function menu_selection(){
      console.log(menu);
      d3.event.preventDefault();
      var menu1 = document.getElementById("search_options");
      console.log(menu1);
      user_option = menu1.options[menu1.selectedIndex].text;
     

      if (user_option=="city") {
            console.log(user_option);
            var html_code = '<div class="form-group"></div>' +'<label for="example-form">' +'Enter the name of the City:'+'</label>'+'<input class="form-control" id="user_input" name="user_input" type="string">' +'</div>' +'<button  id="button1" type="button" class="btn btn-default, button">Enter</button>';
      }

      if (user_option=="state") {
            console.log(user_option);
            var html_code = '<div class="form-group"></div>' +'<label for="example-form">' +'Enter the state postal code:'+'</label>'+'<input class="form-control" id="user_input" name="user_input" type="string">' +'</div>' +'<button  id="button1" type="button" class="btn btn-default, button">Enter</button>';
      }

      if (user_option=="country") {
            console.log(user_option);
            var html_code = '<div class="form-group"></div>' +'<label for="example-form">' +'Enter the country abbriviation:'+'</label>'+'<input class="form-control" id="user_input" name="user_input" type="string">' +'</div>' +'<button  id="button1" type="button" class="btn btn-default, button">Enter</button>';
      }

      if (user_option=="shape") {
            console.log(user_option);
            var html_code = '<div class="form-group"></div>' +'<label for="example-form">' +'Enter the shape:'+'</label>'+'<input class="form-control" id="user_input" name="user_input" type="string">' +'</div>' +'<button  id="button1" type="button" class="btn btn-default, button">Enter</button>';
      }


            //document.getElementById("form1").innerHTML = "<div class="form"><label for="example-form">"Enter the name of the City "</label> <input class="form-control" id="user_input" name="user_input" type="string"></div><button  id="button" type="button" class="btn btn-default, button">Enter</button>"; 
            document.getElementById("form1").innerHTML=html_code;
            var button1 = d3.select("#button1");
            form1.on("submit",filteredMenuItem);
            button1.on("click", filteredMenuItem);
            
      //}
}

function filteredMenuItem() {
     
      d3.event.preventDefault();
      var inputObject = d3.select("#user_input");
      inputValue = inputObject.property("value");
      //console.log(inputValue);
     
      var filtereddata = tableData.filter( function (sighting) {
            //console.log(sighting.city);
            //console.log(sighting.city==inputValue);
            if (user_option=="city") {return sighting.city == inputValue;}
            if (user_option=="state") {return sighting.state == inputValue;}
            if (user_option=="country") {return sighting.country == inputValue;}
            if (user_option=="shape") {return sighting.shape == inputValue;}
            
      
      });
      
      //$("#ufo tr").remove(); 
      $("tbody tr").remove(); 
      //writing the sightings on the selected date
     
      filtereddata.forEach(function(sightings) {
            //console.log(sightings);
            var row = tbody.append("tr");
            Object.entries(sightings).forEach(function([key, value]) {
                  //console.log(key, value);
                  var cell = row.append("td");
                  cell.text(value);
                  search_results.push(value);
            });
           
      });
      //console.log(search_results.length);
      
            if (search_results.length==0) {
                  
                  document.getElementById("empty_search").innerHTML="No sightings are found" 
            }
      //var sightings = tableData.filter();

}
