(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
    Author: Abbey
    Name: dataManager.js
    Purpose: this js file is a data manager that gets the data from the json file
*/
const APIObject = {
  getProductList: function () {
    return fetch("http://localhost:8088/products").then(response => response.json());
  },
  getReviewList: function () {
    //try running this without the object populated
    return fetch("http://localhost:8088/reviews").then(response => response.json());
  }
};
var _default = APIObject;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

var _navBar = _interopRequireDefault(require("./navBar"));

var _productList = _interopRequireDefault(require("./productList"));

var _reviewList = _interopRequireDefault(require("./reviewList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    Author: Abbey
    Name: main.js
    Purpose: Entry point of my application
*/
(0, _navBar.default)();
(0, _productList.default)();
(0, _reviewList.default)();

},{"./navBar":3,"./productList":6,"./reviewList":8}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const navBar = document.querySelector("#navBar");

const createNavBar = () => {
  navBar.innerHTML = `
    <div class="topnav">
    <a id="companyName" style= "text-decoration: none" href="#home" class="navLinks">Abbey's Amazing Shirts</a>
    <a style= "text-decoration: none" href="#categories" class="navLinks">Categories</a>
    <a style= "text-decoration: none" href="#orders" class="navLinks">Orders</a>
    <a style= "text-decoration: none" href="#logout" class="navLinks">Logout</a>
  </div>
    `;
};

var _default = createNavBar;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printReview = exports.printToDom = void 0;

/*
    Author: Abbey
    Name: printToDom.js
    Purpose: Function that will print any HTML elements to the DOM
*/
const printToDom = product => {
  //prints products to DOM
  const contactDomElement = document.querySelector("#productList");
  contactDomElement.innerHTML += product;
};

exports.printToDom = printToDom;

const printReview = (review, productId) => {
  //inserts review HTML after the corresponding product using ids 
  const productDomElement = document.querySelector(`#product-${productId}`); //product id of the product the review is associated with 

  productDomElement.innerHTML += review; //adds review to the end of the product container
};

exports.printReview = printReview;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
    Author: Abbey
    Name: product.js
    Purpose: This page builds a product representation in HTML. Doesn't require importing
*/
const productHTML = {
  createProductListHTML: function (newProduct) {
    // assign product id to container so we can find it later to append reviews
    return `
        <section id="product-${newProduct.id}"> 
            <div class="image"><img class="images" src=${newProduct.image}></div>
            <h3>${newProduct.name}</h3>
            <div>Description: ${newProduct.description}</div>
            <div>Price: $${newProduct.price}</div>
            <div>In Stock: ${newProduct.quantity}</div>
        </section>
        </hr>
    `;
  }
};
var _default = productHTML;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dataManager = _interopRequireDefault(require("./dataManager"));

var _product = _interopRequireDefault(require("./product"));

var _printToDom = require("./printToDom");

var _reviewList = _interopRequireDefault(require("./reviewList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    Author: Abbey
    Name: main.js
    Purpose: This page will display all the products and their corresponding images 
*/
//had to add curly braces bc it was exporting multiple objects
const productList = function () {
  _dataManager.default.getProductList().then(products => {
    products.forEach(product => {
      const html = _product.default.createProductListHTML(product);

      (0, _printToDom.printToDom)(html);
      (0, _reviewList.default)(product.id); //actual id of the products object
    });
  });
};

var _default = productList;
exports.default = _default;

},{"./dataManager":1,"./printToDom":4,"./product":5,"./reviewList":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
    Author: Abbey
    Name: main.js
    Purpose: This page will set up the HTML component 
            that ReviewList will use to append to the DOM
*/
const reviewHTML = {
  createReviewHTML: newReview => {
    //createReviewHTML requires a colon because it's an object with a function
    return `
            <section id="reviewContainer">
                <div><h>User: ${newReview.user}</h></div>
                <div>Date: ${newReview.date}</div>
                <div>Review: ${newReview.description}</div>
            </section>
            </hr>
        `;
  }
};
var _default = reviewHTML;
exports.default = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dataManager = _interopRequireDefault(require("./dataManager"));

var _review = _interopRequireDefault(require("./review"));

var _printToDom = require("./printToDom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    Author: Abbey
    Name: reviewlist.js
    Purpose: This page will take the HTML component from Review and the actual data object from ReviewData
             and append it to the DOM.
*/
const getReviewForProduct = function (productId) {
  //product id of the product the review is associated with 
  let productReviews = []; //.filter always creates a new array and returns the results based off what condition you've given it 

  _dataManager.default.getReviewList().then(reviews => {
    productReviews = reviews.filter(review => productId === review.product_id); //filters through the array and only includes the review if it matches the product id

    productReviews.forEach(review => {
      const reviewHTMLVariable = _review.default.createReviewHTML(review); //must create an HTML representation structure in separate file


      (0, _printToDom.printReview)(reviewHTMLVariable, productId); //passing in the productId again so we know what div to find in printReview in printToDom
    });
  });
};

var _default = getReviewForProduct;
exports.default = _default;

},{"./dataManager":1,"./printToDom":4,"./review":7}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGFNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy9uYXZCYXIuanMiLCIuLi9zY3JpcHRzL3ByaW50VG9Eb20uanMiLCIuLi9zY3JpcHRzL3Byb2R1Y3QuanMiLCIuLi9zY3JpcHRzL3Byb2R1Y3RMaXN0LmpzIiwiLi4vc2NyaXB0cy9yZXZpZXcuanMiLCIuLi9zY3JpcHRzL3Jldmlld0xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7Ozs7O0FBTUEsTUFBTSxTQUFTLEdBQUc7QUFDZCxFQUFBLGNBQWMsRUFBRSxZQUFZO0FBQ3hCLFdBQU8sS0FBSyxDQUFDLGdDQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUDtBQUVILEdBSmE7QUFLZCxFQUFBLGFBQWEsRUFBRSxZQUFZO0FBQUU7QUFDekIsV0FBTyxLQUFLLENBQUMsK0JBQUQsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixDQUFQO0FBR0g7QUFUYSxDQUFsQjtlQVllLFM7Ozs7OztBQ1pmOztBQUNBOztBQUNBOzs7O0FBUkE7Ozs7O0FBV0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNiQSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixDQUFmOztBQUVBLE1BQU0sWUFBWSxHQUFHLE1BQU07QUFDekIsRUFBQSxNQUFNLENBQUMsU0FBUCxHQUNEOzs7Ozs7O0tBREM7QUFTRCxDQVZEOztlQWFlLFk7Ozs7Ozs7Ozs7O0FDZmY7Ozs7O0FBTUEsTUFBTSxVQUFVLEdBQUcsT0FBTyxJQUFJO0FBQUc7QUFDN0IsUUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixDQUExQjtBQUVBLEVBQUEsaUJBQWlCLENBQUMsU0FBbEIsSUFBK0IsT0FBL0I7QUFDSCxDQUpEOzs7O0FBTUEsTUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFELEVBQVMsU0FBVCxLQUF1QjtBQUFFO0FBQ3pDLFFBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBd0IsWUFBVyxTQUFVLEVBQTdDLENBQTFCLENBRHVDLENBQ21DOztBQUUxRSxFQUFBLGlCQUFpQixDQUFDLFNBQWxCLElBQStCLE1BQS9CLENBSHVDLENBR0Q7QUFDekMsQ0FKRDs7Ozs7Ozs7Ozs7O0FDWkE7Ozs7O0FBTUEsTUFBTSxXQUFXLEdBQUc7QUFDaEIsRUFBQSxxQkFBcUIsRUFBRSxVQUFVLFVBQVYsRUFBc0I7QUFBRTtBQUMzQyxXQUFROytCQUNlLFVBQVUsQ0FBQyxFQUFHO3lEQUNZLFVBQVUsQ0FBQyxLQUFNO2tCQUN4RCxVQUFVLENBQUMsSUFBSztnQ0FDRixVQUFVLENBQUMsV0FBWTsyQkFDNUIsVUFBVSxDQUFDLEtBQU07NkJBQ2YsVUFBVSxDQUFDLFFBQVM7OztLQU56QztBQVVIO0FBWmUsQ0FBcEI7ZUFlZSxXOzs7Ozs7Ozs7OztBQ2ZmOztBQUNBOztBQUNBOztBQUNBOzs7O0FBVEE7Ozs7O0FBUTBDO0FBSTFDLE1BQU0sV0FBVyxHQUFHLFlBQVk7QUFDNUIsdUJBQVUsY0FBVixHQUNLLElBREwsQ0FDVSxRQUFRLElBQUk7QUFDZCxJQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLE9BQU8sSUFBSTtBQUN4QixZQUFNLElBQUksR0FBRyxpQkFBWSxxQkFBWixDQUFrQyxPQUFsQyxDQUFiOztBQUNBLGtDQUFXLElBQVg7QUFDQSwrQkFBb0IsT0FBTyxDQUFDLEVBQTVCLEVBSHdCLENBR1E7QUFDbkMsS0FKRDtBQUtILEdBUEw7QUFRSCxDQVREOztlQVdlLFc7Ozs7Ozs7Ozs7O0FDdkJmOzs7Ozs7QUFRQSxNQUFNLFVBQVUsR0FBRztBQUNmLEVBQUEsZ0JBQWdCLEVBQUcsU0FBUyxJQUFJO0FBQUk7QUFDaEMsV0FBUTs7Z0NBRWdCLFNBQVMsQ0FBQyxJQUFLOzZCQUNsQixTQUFTLENBQUMsSUFBSzsrQkFDYixTQUFTLENBQUMsV0FBWTs7O1NBSjdDO0FBUUg7QUFWYyxDQUFuQjtlQWFlLFU7Ozs7Ozs7Ozs7O0FDZGY7O0FBQ0E7O0FBQ0E7Ozs7QUFUQTs7Ozs7O0FBYUEsTUFBTSxtQkFBbUIsR0FBRyxVQUFVLFNBQVYsRUFBcUI7QUFBRTtBQUMvQyxNQUFJLGNBQWMsR0FBRyxFQUFyQixDQUQ2QyxDQUNHOztBQUNoRCx1QkFBVSxhQUFWLEdBQ0ssSUFETCxDQUNVLE9BQU8sSUFBSTtBQUNiLElBQUEsY0FBYyxHQUFHLE9BQU8sQ0FBQyxNQUFSLENBQWUsTUFBTSxJQUFJLFNBQVMsS0FBSyxNQUFNLENBQUMsVUFBOUMsQ0FBakIsQ0FEYSxDQUM4RDs7QUFDM0UsSUFBQSxjQUFjLENBQUMsT0FBZixDQUF1QixNQUFNLElBQUk7QUFDN0IsWUFBTSxrQkFBa0IsR0FBRyxnQkFBVyxnQkFBWCxDQUE0QixNQUE1QixDQUEzQixDQUQ2QixDQUNrQzs7O0FBQy9ELG1DQUFZLGtCQUFaLEVBQWdDLFNBQWhDLEVBRjZCLENBRWM7QUFDOUMsS0FIRDtBQUlILEdBUEw7QUFRSCxDQVZEOztlQWNlLG1CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLypcbiAgICBBdXRob3I6IEFiYmV5XG4gICAgTmFtZTogZGF0YU1hbmFnZXIuanNcbiAgICBQdXJwb3NlOiB0aGlzIGpzIGZpbGUgaXMgYSBkYXRhIG1hbmFnZXIgdGhhdCBnZXRzIHRoZSBkYXRhIGZyb20gdGhlIGpzb24gZmlsZVxuKi9cblxuY29uc3QgQVBJT2JqZWN0ID0ge1xuICAgIGdldFByb2R1Y3RMaXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9wcm9kdWN0c1wiKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIH0sXG4gICAgZ2V0UmV2aWV3TGlzdDogZnVuY3Rpb24gKCkgeyAvL3RyeSBydW5uaW5nIHRoaXMgd2l0aG91dCB0aGUgb2JqZWN0IHBvcHVsYXRlZFxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvcmV2aWV3c1wiKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBUElPYmplY3QiLCIvKlxuICAgIEF1dGhvcjogQWJiZXlcbiAgICBOYW1lOiBtYWluLmpzXG4gICAgUHVycG9zZTogRW50cnkgcG9pbnQgb2YgbXkgYXBwbGljYXRpb25cbiovXG5cbmltcG9ydCBjcmVhdGVOYXZCYXIgZnJvbSBcIi4vbmF2QmFyXCI7XG5pbXBvcnQgcHJvZHVjdExpc3QgZnJvbSBcIi4vcHJvZHVjdExpc3RcIjtcbmltcG9ydCByZXZpZXdMaXN0IGZyb20gXCIuL3Jldmlld0xpc3RcIjtcblxuXG5jcmVhdGVOYXZCYXIoKVxucHJvZHVjdExpc3QoKVxucmV2aWV3TGlzdCgpXG5cblxuIiwiY29uc3QgbmF2QmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYXZCYXJcIilcblxuY29uc3QgY3JlYXRlTmF2QmFyID0gKCkgPT4ge1xuICBuYXZCYXIuaW5uZXJIVE1MID1cbmBcbiAgICA8ZGl2IGNsYXNzPVwidG9wbmF2XCI+XG4gICAgPGEgaWQ9XCJjb21wYW55TmFtZVwiIHN0eWxlPSBcInRleHQtZGVjb3JhdGlvbjogbm9uZVwiIGhyZWY9XCIjaG9tZVwiIGNsYXNzPVwibmF2TGlua3NcIj5BYmJleSdzIEFtYXppbmcgU2hpcnRzPC9hPlxuICAgIDxhIHN0eWxlPSBcInRleHQtZGVjb3JhdGlvbjogbm9uZVwiIGhyZWY9XCIjY2F0ZWdvcmllc1wiIGNsYXNzPVwibmF2TGlua3NcIj5DYXRlZ29yaWVzPC9hPlxuICAgIDxhIHN0eWxlPSBcInRleHQtZGVjb3JhdGlvbjogbm9uZVwiIGhyZWY9XCIjb3JkZXJzXCIgY2xhc3M9XCJuYXZMaW5rc1wiPk9yZGVyczwvYT5cbiAgICA8YSBzdHlsZT0gXCJ0ZXh0LWRlY29yYXRpb246IG5vbmVcIiBocmVmPVwiI2xvZ291dFwiIGNsYXNzPVwibmF2TGlua3NcIj5Mb2dvdXQ8L2E+XG4gIDwvZGl2PlxuICAgIGBcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVOYXZCYXIiLCIvKlxuICAgIEF1dGhvcjogQWJiZXlcbiAgICBOYW1lOiBwcmludFRvRG9tLmpzXG4gICAgUHVycG9zZTogRnVuY3Rpb24gdGhhdCB3aWxsIHByaW50IGFueSBIVE1MIGVsZW1lbnRzIHRvIHRoZSBET01cbiovXG5cbmNvbnN0IHByaW50VG9Eb20gPSBwcm9kdWN0ID0+IHsgIC8vcHJpbnRzIHByb2R1Y3RzIHRvIERPTVxuICAgIGNvbnN0IGNvbnRhY3REb21FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9kdWN0TGlzdFwiKVxuXG4gICAgY29udGFjdERvbUVsZW1lbnQuaW5uZXJIVE1MICs9IHByb2R1Y3Rcbn1cblxuY29uc3QgcHJpbnRSZXZpZXcgPSAocmV2aWV3LCBwcm9kdWN0SWQpID0+IHsgLy9pbnNlcnRzIHJldmlldyBIVE1MIGFmdGVyIHRoZSBjb3JyZXNwb25kaW5nIHByb2R1Y3QgdXNpbmcgaWRzIFxuICAgIGNvbnN0IHByb2R1Y3REb21FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2R1Y3QtJHtwcm9kdWN0SWR9YCkgLy9wcm9kdWN0IGlkIG9mIHRoZSBwcm9kdWN0IHRoZSByZXZpZXcgaXMgYXNzb2NpYXRlZCB3aXRoIFxuXG4gICAgcHJvZHVjdERvbUVsZW1lbnQuaW5uZXJIVE1MICs9IHJldmlldyAvL2FkZHMgcmV2aWV3IHRvIHRoZSBlbmQgb2YgdGhlIHByb2R1Y3QgY29udGFpbmVyXG59XG5cbmV4cG9ydCB7IHByaW50VG9Eb20sIHByaW50UmV2aWV3IH0iLCIvKlxuICAgIEF1dGhvcjogQWJiZXlcbiAgICBOYW1lOiBwcm9kdWN0LmpzXG4gICAgUHVycG9zZTogVGhpcyBwYWdlIGJ1aWxkcyBhIHByb2R1Y3QgcmVwcmVzZW50YXRpb24gaW4gSFRNTC4gRG9lc24ndCByZXF1aXJlIGltcG9ydGluZ1xuKi9cblxuY29uc3QgcHJvZHVjdEhUTUwgPSB7XG4gICAgY3JlYXRlUHJvZHVjdExpc3RIVE1MOiBmdW5jdGlvbiAobmV3UHJvZHVjdCkgeyAvLyBhc3NpZ24gcHJvZHVjdCBpZCB0byBjb250YWluZXIgc28gd2UgY2FuIGZpbmQgaXQgbGF0ZXIgdG8gYXBwZW5kIHJldmlld3NcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJwcm9kdWN0LSR7bmV3UHJvZHVjdC5pZH1cIj4gXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2VcIj48aW1nIGNsYXNzPVwiaW1hZ2VzXCIgc3JjPSR7bmV3UHJvZHVjdC5pbWFnZX0+PC9kaXY+XG4gICAgICAgICAgICA8aDM+JHtuZXdQcm9kdWN0Lm5hbWV9PC9oMz5cbiAgICAgICAgICAgIDxkaXY+RGVzY3JpcHRpb246ICR7bmV3UHJvZHVjdC5kZXNjcmlwdGlvbn08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+UHJpY2U6ICQke25ld1Byb2R1Y3QucHJpY2V9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PkluIFN0b2NrOiAke25ld1Byb2R1Y3QucXVhbnRpdHl9PC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgPC9ocj5cbiAgICBgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwcm9kdWN0SFRNTCIsIi8qXG4gICAgQXV0aG9yOiBBYmJleVxuICAgIE5hbWU6IG1haW4uanNcbiAgICBQdXJwb3NlOiBUaGlzIHBhZ2Ugd2lsbCBkaXNwbGF5IGFsbCB0aGUgcHJvZHVjdHMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgaW1hZ2VzIFxuKi9cblxuaW1wb3J0IEFQSU9iamVjdCBmcm9tIFwiLi9kYXRhTWFuYWdlclwiXG5pbXBvcnQgcHJvZHVjdEhUTUwgZnJvbSBcIi4vcHJvZHVjdFwiXG5pbXBvcnQgeyBwcmludFRvRG9tIH0gZnJvbSBcIi4vcHJpbnRUb0RvbVwiIC8vaGFkIHRvIGFkZCBjdXJseSBicmFjZXMgYmMgaXQgd2FzIGV4cG9ydGluZyBtdWx0aXBsZSBvYmplY3RzXG5pbXBvcnQgZ2V0UmV2aWV3Rm9yUHJvZHVjdCBmcm9tIFwiLi9yZXZpZXdMaXN0XCJcblxuXG5jb25zdCBwcm9kdWN0TGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBBUElPYmplY3QuZ2V0UHJvZHVjdExpc3QoKVxuICAgICAgICAudGhlbihwcm9kdWN0cyA9PiB7XG4gICAgICAgICAgICBwcm9kdWN0cy5mb3JFYWNoKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGh0bWwgPSBwcm9kdWN0SFRNTC5jcmVhdGVQcm9kdWN0TGlzdEhUTUwocHJvZHVjdClcbiAgICAgICAgICAgICAgICBwcmludFRvRG9tKGh0bWwpXG4gICAgICAgICAgICAgICAgZ2V0UmV2aWV3Rm9yUHJvZHVjdChwcm9kdWN0LmlkKSAvL2FjdHVhbCBpZCBvZiB0aGUgcHJvZHVjdHMgb2JqZWN0XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBwcm9kdWN0TGlzdFxuIiwiLypcbiAgICBBdXRob3I6IEFiYmV5XG4gICAgTmFtZTogbWFpbi5qc1xuICAgIFB1cnBvc2U6IFRoaXMgcGFnZSB3aWxsIHNldCB1cCB0aGUgSFRNTCBjb21wb25lbnQgXG4gICAgICAgICAgICB0aGF0IFJldmlld0xpc3Qgd2lsbCB1c2UgdG8gYXBwZW5kIHRvIHRoZSBET01cbiovXG5cblxuY29uc3QgcmV2aWV3SFRNTCA9IHtcbiAgICBjcmVhdGVSZXZpZXdIVE1MOiAobmV3UmV2aWV3ID0+IHsgICAvL2NyZWF0ZVJldmlld0hUTUwgcmVxdWlyZXMgYSBjb2xvbiBiZWNhdXNlIGl0J3MgYW4gb2JqZWN0IHdpdGggYSBmdW5jdGlvblxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPHNlY3Rpb24gaWQ9XCJyZXZpZXdDb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PjxoPlVzZXI6ICR7bmV3UmV2aWV3LnVzZXJ9PC9oPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+RGF0ZTogJHtuZXdSZXZpZXcuZGF0ZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlJldmlldzogJHtuZXdSZXZpZXcuZGVzY3JpcHRpb259PC9kaXY+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICA8L2hyPlxuICAgICAgICBgXG4gICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmV2aWV3SFRNTCIsIi8qXG4gICAgQXV0aG9yOiBBYmJleVxuICAgIE5hbWU6IHJldmlld2xpc3QuanNcbiAgICBQdXJwb3NlOiBUaGlzIHBhZ2Ugd2lsbCB0YWtlIHRoZSBIVE1MIGNvbXBvbmVudCBmcm9tIFJldmlldyBhbmQgdGhlIGFjdHVhbCBkYXRhIG9iamVjdCBmcm9tIFJldmlld0RhdGFcbiAgICAgICAgICAgICBhbmQgYXBwZW5kIGl0IHRvIHRoZSBET00uXG4qL1xuXG5pbXBvcnQgQVBJT2JqZWN0IGZyb20gXCIuL2RhdGFNYW5hZ2VyXCJcbmltcG9ydCByZXZpZXdIVE1MIGZyb20gXCIuL3Jldmlld1wiXG5pbXBvcnQgeyBwcmludFJldmlldyB9IGZyb20gXCIuL3ByaW50VG9Eb21cIlxuXG5cblxuY29uc3QgZ2V0UmV2aWV3Rm9yUHJvZHVjdCA9IGZ1bmN0aW9uIChwcm9kdWN0SWQpIHsgLy9wcm9kdWN0IGlkIG9mIHRoZSBwcm9kdWN0IHRoZSByZXZpZXcgaXMgYXNzb2NpYXRlZCB3aXRoIFxuICAgIGxldCBwcm9kdWN0UmV2aWV3cyA9IFtdICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmZpbHRlciBhbHdheXMgY3JlYXRlcyBhIG5ldyBhcnJheSBhbmQgcmV0dXJucyB0aGUgcmVzdWx0cyBiYXNlZCBvZmYgd2hhdCBjb25kaXRpb24geW91J3ZlIGdpdmVuIGl0IFxuICAgIEFQSU9iamVjdC5nZXRSZXZpZXdMaXN0KClcbiAgICAgICAgLnRoZW4ocmV2aWV3cyA9PiB7XG4gICAgICAgICAgICBwcm9kdWN0UmV2aWV3cyA9IHJldmlld3MuZmlsdGVyKHJldmlldyA9PiBwcm9kdWN0SWQgPT09IHJldmlldy5wcm9kdWN0X2lkKSAvL2ZpbHRlcnMgdGhyb3VnaCB0aGUgYXJyYXkgYW5kIG9ubHkgaW5jbHVkZXMgdGhlIHJldmlldyBpZiBpdCBtYXRjaGVzIHRoZSBwcm9kdWN0IGlkXG4gICAgICAgICAgICBwcm9kdWN0UmV2aWV3cy5mb3JFYWNoKHJldmlldyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV2aWV3SFRNTFZhcmlhYmxlID0gcmV2aWV3SFRNTC5jcmVhdGVSZXZpZXdIVE1MKHJldmlldykgLy9tdXN0IGNyZWF0ZSBhbiBIVE1MIHJlcHJlc2VudGF0aW9uIHN0cnVjdHVyZSBpbiBzZXBhcmF0ZSBmaWxlXG4gICAgICAgICAgICAgICAgcHJpbnRSZXZpZXcocmV2aWV3SFRNTFZhcmlhYmxlLCBwcm9kdWN0SWQpIC8vcGFzc2luZyBpbiB0aGUgcHJvZHVjdElkIGFnYWluIHNvIHdlIGtub3cgd2hhdCBkaXYgdG8gZmluZCBpbiBwcmludFJldmlldyBpbiBwcmludFRvRG9tXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgZ2V0UmV2aWV3Rm9yUHJvZHVjdFxuXG4iXX0=
