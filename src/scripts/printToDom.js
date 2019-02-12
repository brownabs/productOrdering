/*
    Author: Abbey
    Name: printToDom.js
    Purpose: Function that will print any HTML elements to the DOM
*/

const printToDom = product => {  //prints products to DOM
    const contactDomElement = document.querySelector("#productList")

    contactDomElement.innerHTML += product
}

const printReview = (review, productId) => { //inserts review HTML after the corresponding product using ids 
    const productDomElement = document.querySelector(`#product-${productId}`) //product id of the product the review is associated with 

    productDomElement.innerHTML += review //adds review to the end of the product container
}

export { printToDom, printReview }