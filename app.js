const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const date = require("./date");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const day = date.day();

app.set("view engine", "ejs");

const port = 3000;

let items = [];
let jobs = [];

app.get("/", (req, res) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   

    // day = days[day];

    // let dayType;
    // if (day === 6) {
    //     dayType = "weekend";
    // }
    // else {
    //     dayType = "weekday";
    // }
    // res.render("day", { currentDay: dayType });

    // using switch statement
    // switch (day) {
    //     case 0:
    //         day = "Sunday";
    //         res.render("day", { currentDay: day });
    //         break;
    //     case 1:
    //         day = "Monday";
    //         res.render("day", { currentDay: day });
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         res.render("day", { currentDay: day });
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         res.render("day", { currentDay: day });
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         res.render("day", { currentDay: day });
    //         break;
    //     case 5:
    //         day = "Friday";
    //         res.render("day", { currentDay: day });
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         res.render("day", { currentDay: day });
    //         break;
    //     default:
    //         console.log("Error! Current day is ", day);
    // }
    res.render("day", { title: day, newItems: items });
})
 
app.get("/work", (req, res) => {
    this.title = "Work";
    res.render("day", { title: this.title, newItems: jobs });
})

app.post("/work", (req, res) => {
    let job = req.body.newItem;
    jobs.push(job);
    res.redirect("/work");
})

app.post("/", (req, res) => {
    let item = req.body.newItem;
    if (req.body.button === "Work") {
        jobs.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
})

app.listen(port, () => {
    console.log("app running on port", port);
})
