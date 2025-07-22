exports.date = function(){
    const date = new Date();
    // let day = date.getDay();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    return date.toLocaleDateString("en-US", options);
}
exports.day = function(){
    const date = new Date();
    // let day = date.getDay();
    const options = {
        weekday: "long"
    }
    return date.toLocaleDateString("en-US", options);
}