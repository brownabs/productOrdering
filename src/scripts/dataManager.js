/*
    Author: Abbey
    Name: dataManager.js
    Purpose: this js file is a data manager that gets the data from the json file
*/

const APIObject = {
    getProductList: function () {
        return fetch("http://localhost:8088/products")
            .then(response => response.json())
    },
    getReviewList: function () { //try running this without the object populated
        return fetch("http://localhost:8088/reviews")
            .then(response => response.json())

    }
}

export default APIObject