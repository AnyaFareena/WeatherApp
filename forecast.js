$(document).ready(function(){
    $("#submitForecast").click(function(){
        return getForecast();
    });
});

//function to derive all the required responses from weather API and display in table format
function getForecast(){
    var city = $("#city").val();
    if(city != ''){
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + "&cnt=5"+'&APPID=3a69a889db4d459297262d350c735e27',
            type: "GET",
            dataType: "jsonp",
            success: function(data){
                console.log(data);
                var table = '';
                var header = '<h2 style="font-weight:bold; font-size:30px; margin-top:20px;">Weather forecast for ' + data.city.name + ', ' + data.city.country + '</h2>'
                for(var i = 0; i < data.list.length; i++){
                    var temp = data.list[i].main.temp -273.15;
                    var tempMax = data.list[i].main.temp_max-273.15;
                    var tempMin=data.list[i].main.temp_min - 273.15;
                    table += "<tr>";
                    table += "<td><img src='http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png'></td>";
                    table += "<td>" + data.list[i].weather[0].main + "</td>";
                    table += "<td>" + data.list[i].weather[0].description + "</td>";
                    table += "<td>" + temp.toFixed(2) + "&deg;C</td>";
                    table += "<td>" + tempMin.toFixed(2) + "&deg;C</td>";
                    table += "<td>" + tempMax.toFixed(2) + "&deg;C</td>";
                    table += "<td>" + data.list[i].main.pressure + "hpa</td>";
                    table += "<td>" + data.list[i].main.humidity + "%</td>";
                    table += "<td>" + data.list[i].wind.speed + "m/s</td>";
                    table += "<td>" + data.list[i].wind.deg + "&deg;</td>";
                    table += "</tr>";
                }
                
                $("#forecastWeather").html(table);
                $("#header").html(header);
                $("#city").val('');
                
            }
            
            
        });
        
    }
    else{
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>");
    }
    
}