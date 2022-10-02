import { LightningElement, track } from 'lwc';

export default class WeatherPage extends LightningElement {

    @track result;
    @track name;
    @track desc;
    @track temp;
    @track iconUrl;

    connectedCallback(){
        //window.addEventListener("load", this.listener);
        this.listener();
    }

    listener(){
        let long;
        let lat;
        let apiKey = '';
        console.log('hey');

        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(long);
            console.log(lat);

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
            console.log(api);
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data=> {
                console.log(data);
                this.result = data;
                this.name = data.name;
                this.temp = data.main.temp;
                this.desc = data.weather[0].description;
                const iconId = data.weather[0].icon;
                console.log(iconId);

                this.iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
                console.log(this.iconUrl);

            })
            });
        }    
    }
}
