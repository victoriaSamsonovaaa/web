
class THashStorage {
    constructor() {
        this.storage = {};
    }

    Reset() {
        this.storage = {};
    }

    Add(key, value) {
        this.storage[key] = value;
    }

    Get(key) {
        return this.storage[key];
    }

    Delete(key) {
        delete this.storage[key];
    }

    GetKeys() {
        return Object.keys(this.storage);
    }
}

let Storage = new THashStorage();

function List() {
    result = "";
    for (object in hashTable) {
        result += "\n" + object + ": " + hashTable[object];
    }

    if (result == "") {
        return "No such countries";
    } else {
        return result;
    }    
}

function Add_tour_button() {
    tour_country = undefined;
    tour_Price = undefined;

    while (tour_country == undefined || tour_Price == undefined || tour_country == "" || tour_Price == "") {
        tour_country = prompt("Input name of the county: ", undefined);
        tour_Price= prompt("Input price of the tour: ", undefined);
    }

    Storage.Add(tour_country, tour_Price);
    
}

function Remove_tour_button() {
    tour_country = undefined;
    while (tour_country == undefined || tour_country == "") {
        tour_country = prompt("Input name of the removing country: ", undefined);
    }

    if (Storage.Get(tour_country)) {
        Storage.Delete(tour_country);
    }
    else {
        alert("No any tours in this country!");
    }
    
}

function Get_Tour_Info() {
    tour_country = undefined;

    while (tour_country == undefined || tour_country == "") {
        tour_country = prompt("Input name of the country: ", undefined);
    }

    const tourInfo = Storage.Get(tour_country);

    if (tourInfo) {
        console.log("Information about " + tour_country + ": " + tourInfo);
    } 
    else {
        console.log("No any information about tours in this country!");
    }
}

function List_All_Tours() {
    const keys = Storage.GetKeys();
    if (keys.length === 0) {
        console.log("No tours available.");
    }
    else {
        console.log("Available tours:");
        keys.forEach(key => {
            console.log(key + ": " + Storage.Get(key));
        });
    }
}