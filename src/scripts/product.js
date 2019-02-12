/*
    Author: Abbey
    Name: product.js
    Purpose: This page builds a product representation in HTML. Doesn't require importing
*/

const productHTML = {
    createProductListHTML: function (newProduct) { // assign product id to container so we can find it later to append reviews
        return `
        <section id="product-${newProduct.id}"> 
            <div class="image"><img class="images" src=${newProduct.image}></div>
            <h3>${newProduct.name}</h3>
            <div>Description: ${newProduct.description}</div>
            <div>Price: $${newProduct.price}</div>
            <div>In Stock: ${newProduct.quantity}</div>
        </section>
        </hr>
    `
    }
}

export default productHTML