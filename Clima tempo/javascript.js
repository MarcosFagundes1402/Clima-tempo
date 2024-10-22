document.querySelector('#btn-reset').addEventListener('click', () => {
    const input = document.querySelector('input')
    input.value = ''
    input.focus()
    
    clearInfo()
})

document.querySelector('#search').addEventListener('click', async(event) => {
    event.preventDefault();
    clearInfo()

    let input = document.querySelector('#searchInput').value

    if (input !== '') {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`)

        let json = await response.json()

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })} else {
            clearInfo()
            console.log('Não encontramos esta localização.');
        }
    } else {
        clearInfo()
    }

    clearInfo()
})
