setInterval(() => {
    const dt = new Date();
    const date = dt.getDate();
    const month = dt.getMonth() + 1;
    const year = dt.getFullYear();
    const hours = dt.getHours();
    const minutes = dt.getMinutes();
    const seconds = dt.getSeconds();
    const a = document.querySelector(".datetime");
    a.innerHTML = "Date & Time" + "-" + " " + date + "/" + month + "/" + year + "   " + hours + ":" + minutes + ":" + seconds;

}, 1000);


function getWeatherByCity(city){



const apikey = "be579613d014457911adb207d68b5a11"


    const url2 = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`
    fetch(url2).then(res => res.json())
        .then(value => {
            console.log(value)
            if (value.length > 0) {


                const lat = value[0].lat
                const lon = value[0].lon


                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`



                fetch(url).then(response => response.json())
                    .then(data => {
                        const a = data.main.temp;
                        document.querySelector(".temperature").innerHTML = "Temperature" + "-" + a;
                        document.querySelector(".humidity").innerHTML = "Humidity" + "-" + data.main.humidity
                        document.querySelector(".visibility").innerHTML = "Visibility" + "-" + data.visibility
                        document.querySelector(".feels ").innerHTML = "Feels like " + data.main.feels_like
                        document.querySelector(".min").innerHTML = "Temp_min -" + data.main.temp_min
                        document.querySelector(".max").innerHTML = "Temp_max -" + data.main.temp_max
                        console.log(data)
                        url3 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=7`
                        fetch(url3).then(res => res.json()).then(data => {
                            console.log(data)
                            for (i = 0; i < 7; i++){

                                
                                     document.querySelector(`.d${i+1}`).innerHTML=data.daily.time[i]
                                     document.querySelector(`.max${i+1}`).innerHTML=data.daily.temperature_2m_max[i]+"°C"
                                     document.querySelector(`.min${i+1}`).innerHTML=data.daily.temperature_2m_min[i]+"°C"
                                     document.querySelector(`.p${i+1}`).innerHTML=data.daily.precipitation_sum[i]+"mm"
                              
                               
                            } 
                                
                            })


                        })
                    }

            else {
                alert("city not found")
            }

        })
}


getWeatherByCity("Delhi")

const button = document.querySelector("button")
button.addEventListener("click", () => {
    const city = document.querySelector(".input").value.trim()
    getWeatherByCity(city)
})

