/*
    Author: Abbey
    Name: main.js
    Purpose: This page will display all the products and their corresponding images 
*/

import APIObject from "./dataManager"
import productHTML from "./product"
import { printToDom } from "./printToDom" //had to add curly braces bc it was exporting multiple objects
import getReviewForProduct from "./reviewList"


const productList = function () {
    APIObject.getProductList()
        .then(products => {
            products.forEach(product => {
                const html = productHTML.createProductListHTML(product)
                printToDom(html)
                getReviewForProduct(product.id) //actual id of the products object
            })
        })
}

export default productList
