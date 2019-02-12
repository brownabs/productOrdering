/*
    Author: Abbey
    Name: main.js
    Purpose: This page will set up the HTML component 
            that ReviewList will use to append to the DOM
*/


const reviewHTML = {
    createReviewHTML: (newReview => {   //createReviewHTML requires a colon because it's an object with a function
        return `
            <section id="reviewContainer">
                <div><h>User: ${newReview.user}</h></div>
                <div>Date: ${newReview.date}</div>
                <div>Review: ${newReview.description}</div>
            </section>
            </hr>
        `
    })
}

export default reviewHTML