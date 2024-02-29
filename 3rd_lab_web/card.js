var hashTable = {};

function Add(tour_country, tour_Price) {
    hashTable[tour_country] = tour_Price;
}

function Remove(tour_country) {
    delete hashTable[tour_country];
}

function Get(tour_country) {
    if (tour_country in hashTable) { return hashTable[tour_country]; }
    else { return "No any information about tours in this country!"; }
}

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

    Add(tour_country, tour_Price);
    
}

function Remove_tour_button() {
    tour_country = undefined;
    while (tour_country == undefined || tour_country == "") {
        tour_country = prompt("Input name of the removing country: ", undefined);
    }

    if (tour_country in hashTable) {
        Remove(tour_country);
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

    console.log("Information about " + tour_country + ": " + Get(tour_country));
}

function List_All_Tours() {
    console.log("Information about your cart: " + List());
}
