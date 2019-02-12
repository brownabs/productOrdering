/*
    Author: Abbey
    Name: reviewlist.js
    Purpose: This page will take the HTML component from Review and the actual data object from ReviewData
             and append it to the DOM.
*/

import APIObject from "./dataManager"
import reviewHTML from "./review"
import { printReview } from "./printToDom"



const getReviewForProduct = function (productId) { //product id of the product the review is associated with 
    let productReviews = []                         //.filter always creates a new array and returns the results based off what condition you've given it 
    APIObject.getReviewList()
        .then(reviews => {
            productReviews = reviews.filter(review => productId === review.product_id) //filters through the array and only includes the review if it matches the product id
            productReviews.forEach(review => {
                const reviewHTMLVariable = reviewHTML.createReviewHTML(review) //must create an HTML representation structure in separate file
                printReview(reviewHTMLVariable, productId) //passing in the productId again so we know what div to find in printReview in printToDom
            })
        })
}



export default getReviewForProduct

