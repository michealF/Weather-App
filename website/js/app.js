/*Global Variables*/
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//update day by name
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Friday"];
let dayName = days[new Date().getDay()];

//URL For Open Weather map Parts
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2def57304f539da0e65fd8d084cb3975&units=imperial';

// add Event Listener 
document.getElementById('generate').addEventListener('click', (e) => {
    //get user-input search
    const newZip = document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;
    const msg = document.getElementById('msg');
    
    //To Hide Wrong Message When The Field On Focus
    document.getElementById('zip').onfocus = function () {
       msg.style.display = 'none';
    };

    //validate User-Input

    if (newZip === '') {
        msg.style.display = 'block';
        msg.innerHTML = `That No zip-code Provided &nbsp; &nbsp; &nbsp;*`;
    } else if (isNaN(newZip)) {
        msg.style.display = 'block';
        msg.innerHTML = `That No zip-code Provided &nbsp; &nbsp; &nbsp;*`;
    } else if(newZip === '0') {
        msg.style.display = 'block';
        msg.innerHTML = `That No zip-code Provided &nbsp; &nbsp; &nbsp;*`;
    }else if(newZip < 0) {
        msg.style.display = 'block';
        msg.innerHTML = `That No zip-code Provided &nbsp; &nbsp; &nbsp;*`;
    } else {
        msg.style.display = 'none';
        getWeatherMap(baseURL, newZip, apiKey)
        .then(
            (data) => {
                console.log(data);
                postData('/addWeather', {
                     day: dayName,
                    date: newDate,
                    temp: data.main.temp,
                    feel : feel,
                    newZip : newZip
                     });
                updateUI();
            }
        );
        document.getElementById('card').classList.add('rotate');
    }
});

//get Weather map API
const getWeatherMap = async(baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + key);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }catch(error) {
        console.log('error', error)
    }
} 

//Post Request
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-type' : 'application/json'},
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log('error', error);
    }
};

//Update UI
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('day').innerHTML = allData.day;
        document.getElementById('code').innerHTML = allData.newZip;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp + ' &#8451';
        document.getElementById('content').innerHTML = allData.feel;
    }catch(error) {
        console.log('error', error);
    }
}
//Go To Bak 
document.getElementById('return').addEventListener('click', (e) => {
    document.getElementById('card').classList.add('re-rotate'); 
});