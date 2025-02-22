const apiKey= '233709d423c0fb4798295a4c7da19b07'; 

const cityInput = document.querySelector('.city-input')
const searchButton = document.querySelector('.search-button')

const notFound = document.querySelector('.not-found')
const information = document.querySelector('.information')
const search = document.querySelector('.search')

const locationTxt = document.querySelector('.location-text')
const dateTxt = document.querySelector('.date-text')
const temperatureTxt = document.querySelector('.temperature')
const conditionTxt = document.querySelector('.condition')
const humidityTxt = document.querySelector('.humidity-info')
const windTxt = document.querySelector('.wind-info')
const weatherImg = document.querySelector('.weather-img')

const forcastContainer = document.querySelector('.forcast-container')

searchButton.addEventListener('click', ()=>{
    if(cityInput.value.trim()!=''){
        updateWeatherInfo(cityInput.value)
        cityInput.value=''
        cityInput.blur()
    }
})

cityInput.addEventListener('keydown', (event)=>{
    if(event.key =="Enter"){
        if(cityInput.value.trim()!=''){
            updateWeatherInfo(cityInput.value)
            cityInput.value=''
            cityInput.blur()
        }
    }
})

async function getFetchData(goal, city){
    const apiurl = `https://api.openweathermap.org/data/2.5/${goal}?q=${city}&appid=${apiKey}&units=metric`
    
    const data = await fetch(apiurl)

    return data.json()
}

async function updateWeatherInfo(city){
    const weatherData= await getFetchData('weather', city)

    if (weatherData.cod!=200){
        showDisplaySection(notFound)
        return
    }

    const {
        name : city_name, 
        main:{temp, humidity},  
        weather :[{id, main}], 
        wind: {speed}
    } = weatherData

    locationTxt.textContent = city_name
    dateTxt.textContent = getDate()
    temperatureTxt.textContent= Math.round(temp) + '°C'
    conditionTxt.textContent= main
    humidityTxt.textContent = humidity +"%"
    windTxt.textContent = speed +" M/s"
    weatherImg.src = `assets/weather/${getIcon(id)}`
    await updateForecastInfo(city)

    showDisplaySection(information)
    
}

async function updateForecastInfo(city){
    const forecastData= await getFetchData('forecast', city)

    const time = '12:00:00'
    const today = new Date().toISOString().split('T')

    forcastContainer.innerHTML=''
    forecastData.list.forEach(forecastInfo => {
        if( forecastInfo.dt_txt.includes(time)&& !forecastInfo.dt_txt.includes(today)){
            console.log(forecastInfo)
            updateForecastItem(forecastInfo)
        }
    })
}

function updateForecastItem(forecastInfo){
    const{
        dt_txt:date, 
        weather : [{id}], 
        main:{temp}
    }= forecastInfo

    options = {
        weekday: 'short', 
        day: '2-digit', 
        month: 'short'
    }

    const newdate = new Date(date)

    const forcastItem = `
            <div class="forcast-item">
                <h3 class="forcast-date regular-text">${newdate.toLocaleDateString('en-GB', options)}</h3>
                <img src="assets/weather/${getIcon(id)}" class="forcast-img">
                <h3 class="forcast-temperature regular-text">${Math.round(temp)}°C</h3>
             </div>
    `
    forcastContainer.insertAdjacentHTML('beforeend', forcastItem)
}

function showDisplaySection(section){
    [notFound, information, search].forEach(section => section.style.display='none')

    section.style.display = 'flow'
}

function getDate(){
    const current = new Date()
    options = {
        weekday: 'short', 
        day: '2-digit', 
        month: 'short'
    }
    return current.toLocaleDateString('en-GB', options)
}

function getIcon(id){
    if(id<=232) return 'thunderstorm.svg'
    if(id<=321) return  'drizzle.svg'
    if(id<=531) return  'rain.svg'
    if(id<=622) return  'snow.svg'
    if(id<=781) return  'atmosphere.svg'
    if(id<=800) return 'clear.svg'
    else return 'clouds.svg'
}
