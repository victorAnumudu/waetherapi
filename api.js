
// let getCountry = () => {
//     axios.get("https://countriesnow.space/api/v0.1/countries/states")
//     .then( response => {
//         let country = response.data.data;
//         let selectCountry = document.getElementById("country");
//         for(i of country) {
//             let option = document.createElement("option");
//             option.value = i.name;
//             option.innerText = i.name;
//             selectCountry.append(option)
//         }
//     })
//     .catch( error => {
//         console.log(error)
//     })
// }
// document.querySelector("body").onload = getCountry



let requestForecast = () => {
    let location = document.getElementById("location").value;
    let duration = document.getElementById("duration").value;
    let showSpinner = document.getElementById("spinner");
    showSpinner.style.display = "inline-block";

    if(location == "" || duration == "") {
        document.getElementById("error").innerText = "Please fill all inputs";
        showSpinner.style.display = "none";
    } else if(duration > 3 || duration < 1) {
        document.getElementById("error").innerText = "Please select a forecast range between 1 - 3";
        showSpinner.style.display = "none";
    } else {
        document.getElementById("error").innerText = "";

        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=902341b417794d6e9d4101303210110&q=${location}&days=${duration}&aqi=no&alerts=no`)
        .then( response => {
            document.querySelector(".result").style.display = "block";

            let place = `${response.data.location.name}, ${response.data.location.region} State, ${response.data.location.country}`;
            let time = response.data.location.localtime;
            let conditionText = response.data.current.condition.text;
            let conditionIcon = response.data.current.condition.icon;
            let temperature = response.data.current.temp_c;
            let lastUpdated = response.data.current.last_updated;

            let forecastDetail = response.data.forecast.forecastday;
            let forecastResult = document.getElementById("forecast_result");
            forecastResult.innerHTML = "";

            document.getElementById("place").innerHTML = "<strong>LOCATION: </strong>" + place;
            document.getElementById("time").innerHTML = "<strong>DATE/TIME: </strong>" + time;
            document.getElementById("condition").innerHTML = "<strong>WEATHER CONDITION: </strong>" + conditionText + `<br><img src=${conditionIcon}>`;
            document.getElementById("temperature").innerHTML = "<strong>TEMPERATURE: </strong>" + temperature + "&#x2103;";
            document.getElementById("last_updated").innerHTML = "<strong>LAST UPDATED: </strong>" + lastUpdated;

            // for forecast
            let forecastHeading = document.createElement("h2");
            forecastHeading.classList.add("text-center");
            forecastHeading.innerHTML = "Forecast";
            forecastResult.append(forecastHeading)
            for(i of forecastDetail){
                let forecastDiv = document.createElement("div");
                forecastDiv.classList.add("forecast")


                let forecastDate = document.createElement("p");
                forecastDate.innerHTML = "<strong>DATE: </strong>" + i.date;

                let forecastAvgTemp = document.createElement("p");
                forecastAvgTemp.innerHTML = "<strong>AVERAGE TEMPERATURE: </strong>" + i.day.avgtemp_c + "&#x2103;";

                let forecastCondition = document.createElement("p");
                forecastCondition.innerHTML = "<strong>FORECAST WEATHER CONDITION: </strong>" + i.day.condition.text + `<br><img src=${i.day.condition.icon}>`;

                forecastDiv.append(forecastDate, forecastAvgTemp, forecastCondition)
                forecastResult.append(forecastDiv)
            }
            // console.log(forecastDetail)
            showSpinner.style.display = "none";
        })
        .catch( error => {
            showSpinner.style.display = "none";
            document.getElementById("error").innerText = error.name + " occured!";
        })
    }
}

document.getElementById("check").addEventListener("click", requestForecast)