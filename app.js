let data;
let cname;
let capital;
let population;
let flag;
let currency;
let language;
let input;

const getAllCountryNames = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    data = await response.json();

    let c_names = await data.map(country => country.name.common);
    await c_names.forEach((name) => {
        document.querySelector('.selectpicker').innerHTML +=
        `<option value="${name}">${name}</option>`;
    });
    await $('.selectpicker').selectpicker('refresh');
}


let getCountryInfo = () => {
    let element = document.querySelector('button');
    new MutationObserver(function(mutationList, observer) {
        mutationList.forEach(function(mutation) {
            if (mutation.attributeName === 'title') {
                cname = mutation.target.title;
                data.forEach((country) => {
                    if (country.name.common === cname) {
                        capital = country.capital[0];
                        population = country.population;
                        flag = country.flags.png;
                        currency = Object.values(country.currencies)[0].name;
                        language = Object.values(country.languages)[0];
                    }})
    
                
                cname == "Select a country" && (
                    cname = 'Country Name', capital = '', population = '', flag = './image/flag.jpg', currency = '', language = ''
                );
    
                document.querySelector('.card-body').innerHTML =
                    `
                    <div class="card-body">
                        <img src="${flag}" class="card-img-top flag" alt="flag">
                        <h5 class="card-title country-name">${cname}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item capital">Capital: ${capital}</li>
                            <li class="list-group-item language">Language: ${language}</li>
                            <li class="list-group-item currency">Currency: ${currency}</li>
                            <li class="list-group-item population">Population: ${population}</li>
                        </ul>
                    </div>
                    `            
            }
        });
          console.log("attributes changed")
    }).observe(element, {
        attributes: true
    });
    }


getAllCountryNames()
.then(() => input = document.querySelectorAll('ul > li a'))
.then(() => getCountryInfo())
.catch(err => {
    console.log(err);
});


