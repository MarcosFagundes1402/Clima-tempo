document.querySelector('#btn-reset').addEventListener('click', () => {
    const input = document.querySelector('input')
    input.value = ''
    input.focus()

})

document.querySelector('#search').addEventListener('click', async(event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value

    if (input !== '') {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`)

        let json = await response.json()

        console.log(json)
        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
            })
        }
    } else {
        console.log('Não encontramos esta localização.');
    }
})

function showInfo(obj) {
    console.log(`${obj.name}`)
    console.log(`${obj.country}`)
    console.log(`${obj.temp}`)
    console.log(`${obj.description}`)
}

