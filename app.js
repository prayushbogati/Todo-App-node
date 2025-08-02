const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const date = require("./date");
const mongoose = require("mongoose");
const _ = require("lodash");
const { name } = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const day = date.day();

app.set("view engine", "ejs");

const port = 3000;

mongoose.connect("mongodb://localhost:27017/todoListDB");

const todoSchema = mongoose.Schema({
    name: String
})
const Todo = mongoose.model("Todo", todoSchema);


const list1 = new Todo({
    name: "Task1"
})
const list2 = new Todo({
    name: "Task2"
})
const list3 = new Todo({
    name: "Task3"
})
const defaultItems = [list1, list2, list3];
// List.insertMany(defaultItems)


const listSchema = mongoose.Schema({
    name: String,
    items: [todoSchema]
})
const List = mongoose.model("List", listSchema);

app.get("/", async (req, res) => {
    // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
    const todoItems = await Todo.find({});
    res.render("day", { title: "Day", newItems: todoItems });
})

app.get("/:customlist", async (req, res) => {
    const customList = _.capitalize(req.params.customlist);
    const newListItems = await List.findOne({ name: customList });
    if (newListItems) {
        res.render("day", { title: newListItems.name, newItems: newListItems.items });
    }
    else {
        const list = new List({
            name: customList,
            items: []
        })
        list.save();
        res.redirect("/" + customList);
    };
})

// app.post("/work", (req, res) => {
//     let job = req.body.newItem;
//     jobs.push(job);
//     res.redirect("/work");
// })

app.post("/", async (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Todo({
        name: itemName
    })
    if (listName === "Day") {
        item.save();
        res.redirect('/');
    }
    else {
        const foundList = await List.findOne({ name: listName });
        foundList.items.push(item);
        foundList.save();
        res.redirect('/' + listName);
    }
})

app.post("/delete", async (req, res) => {
    const checkedID = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Day") {
        await Todo.findByIdAndDelete(checkedID);
        res.redirect('/');
    }
    else {
        await List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedID } } });
        res.redirect('/' + listName);
    }

})

app.listen(port, () => {
    console.log("app running on port", port);
})
