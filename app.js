const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const bodyParser = require('body-parser');

app.use(express.json());

app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));

app.post('/receive-dht', (req, res) => {
    const { temperature, humidity } = req.body;

    console.log('Received data:');
    console.log(`Temperature: ${temperature}°C`);
    console.log(`Humidity: ${humidity}%`);

    res.send({ status: 'success', message: 'Data received successfully!' });
});

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});

let dt = [
    {
        long: "",
        lat: "",
        wt: "",
        temp: "",
        feel: "",
        min: "",
        max: "",
        pres: "",
        hu: "",
        visibility: "",
        wind: "",
        deg: "",
        name: "",
        sunrise: "",
        sunset: "",
        sea_l: "",
        grnd_l: "" 
    },
];

let prd_1 = [
    {
        temp: "",
        dew: "",
        tempmax: "",
        tempmin: "",
        humid: "",
        rain: "",
        pressure: "",
        windmax: "",
        windmin: "",
        sky: ""
    }
];

let prd_2 = [
    {
        temp: "",
        dew: "",
        tempmax: "",
        tempmin: "",
        humid: "",
        rain: "",
        pressure: "",
        windmax: "",
        windmin: "",
        sky: ""
    }
];


app.post("/receive-data", (req,res) => {
    // console.log(req.body);
    let {obj_1, obj_2} = req.body;
    prd_1.push(obj_1);
    prd_2.push(obj_2);
});

app.post("/info", (req, res) => {
    // console.log(req.body);
    let {city} = req.body;
    // console.log(city);
    let url = 'https://api.openweathermap.org/data/2.5/weather?';
    let API_KEY = '8e2af9087ac45bfe5bd983edfc8cf915';
    let un = "metric";

    

    async function help(c) {
        let main_url = url+'q='+c+'&appid='+API_KEY+"&units="+un;
        let res = await fetch(main_url);
        let ans = await res.json();

        let longit = await ans.coord.lon;
        let latit = await ans.coord.lat;
        let wtr = await ans.weather[0].description;
        let tempr = await ans.main.temp;
        let feels = await ans.main.feels_like;
        let min_t  = await ans.main.temp_min;
        let max_t = await ans.main.temp_max;
        let press = await ans.main.pressure;
        let humid = await ans.main.humidity;
        let visible = await ans.visibility;
        let w_sp = await ans.wind.speed;
        let de = await ans.wind.deg;
        let nam = await ans.name;
        let sunr = await ans.sys.sunrise;
        let suns = await ans.sys.sunset;
        let sl = await ans.main.sea_level;
        let gl = await ans.main.grnd_level;

        let sr = new Date(sunr * 1000); 
        let ss = new Date(suns * 1000);

        let sunri = sr.toLocaleString();
        let sunse = ss.toLocaleString();

        let obj = {
            long: longit,
            lat: latit,
            wt: wtr,
            temp: tempr,
            feel: feels,
            min: min_t,
            max: max_t,
            pres: press,
            hu: humid,
            visibility: visible,
            wind: w_sp,
            deg: de,
            name: nam,
            sunrise: sunri,
            sunset: sunse,
            sea_l: sl,
            grnd_l: gl
        }
        // return obj;
        dt.push(obj);
        
        // console.log(dt);
        // dt.push({ long, lat, wt, temp, feel, min, max, pres, visibility, wind, deg, name, sunrise, sunset });
        // console.log(dt[dt.length - 1]);
    }

    help(city);
    city = "";
    res.redirect("/home");
    // res.redirect("/home");
    // function t() {
    //     let l = dt[dt.length - 1];
    //     console.log(l);
    // }

    // setTimeout(t, 5000);
});

app.get("/home", (req, res) => {
    // res.render("pages/front.ejs");

    function t() {
        last = dt[dt.length - 1];
        lt_1 = prd_1[prd_1.length - 1]
        lt_2 = prd_2[prd_2.length - 1]
        // console.log(last);   
        res.render("pages/front.ejs", { last, lt_1, lt_2 });    
    }

    setTimeout(t, 3000);
});


app.get("/acts", (req, res) => {
    res.render("pages/act.ejs");
    // console.log(dt);
});

app.get("/acts/chap1", (req, res) => {
    res.render("pages/acts1.ejs");
});

app.get("/acts/chap2", (req, res) => {
    res.render("pages/acts2.ejs");
});

app.get("/acts/chap3", (req, res) => {
    res.render("pages/acts3.ejs");
});

app.get("/acts/chap3a", (req, res) => {
    res.render("pages/acts3a.ejs");
});

app.get("/acts/chap4", (req, res) => {
    res.render("pages/acts4.ejs");
});

app.get("/acts/chap5", (req, res) => {
    res.render("pages/acts5.ejs");
});

app.get("/acts/chap6", (req, res) => {
    res.render("pages/acts6.ejs");
});

app.get("/acts/chap7", (req, res) => {
    res.render("pages/acts7.ejs");
});

app.get("/work", (req, res) => {
    res.render("pages/work.ejs");
});

app.get("/ethics", (req, res) => {
    res.render("pages/ethics.ejs");
});

app.get("/form", (req, res) => {
    res.render("pages/form.ejs");
});

