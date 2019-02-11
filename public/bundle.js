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
(0, _reviewList.default)();
(0, _productList.default)(); // reviewList()

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGFNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy9uYXZCYXIuanMiLCIuLi9zY3JpcHRzL3ByaW50VG9Eb20uanMiLCIuLi9zY3JpcHRzL3Byb2R1Y3QuanMiLCIuLi9zY3JpcHRzL3Byb2R1Y3RMaXN0LmpzIiwiLi4vc2NyaXB0cy9yZXZpZXcuanMiLCIuLi9zY3JpcHRzL3Jldmlld0xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7Ozs7O0FBTUEsTUFBTSxTQUFTLEdBQUc7QUFDZCxFQUFBLGNBQWMsRUFBRSxZQUFZO0FBQ3hCLFdBQU8sS0FBSyxDQUFDLGdDQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUDtBQUVILEdBSmE7QUFLZCxFQUFBLGFBQWEsRUFBRSxZQUFZO0FBQUU7QUFDekIsV0FBTyxLQUFLLENBQUMsK0JBQUQsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixDQUFQO0FBR0g7QUFUYSxDQUFsQjtlQVllLFM7Ozs7OztBQ1pmOztBQUNBOztBQUNBOzs7O0FBUkE7Ozs7O0FBV0E7QUFDQTtBQUNBLDRCLENBQ0E7Ozs7Ozs7OztBQ2RBLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLENBQWY7O0FBRUEsTUFBTSxZQUFZLEdBQUcsTUFBTTtBQUN6QixFQUFBLE1BQU0sQ0FBQyxTQUFQLEdBQ0Q7Ozs7Ozs7S0FEQztBQVNELENBVkQ7O2VBYWUsWTs7Ozs7Ozs7Ozs7QUNmZjs7Ozs7QUFNQSxNQUFNLFVBQVUsR0FBRyxPQUFPLElBQUk7QUFBRztBQUM3QixRQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCLENBQTFCO0FBRUEsRUFBQSxpQkFBaUIsQ0FBQyxTQUFsQixJQUErQixPQUEvQjtBQUNILENBSkQ7Ozs7QUFNQSxNQUFNLFdBQVcsR0FBRyxDQUFDLE1BQUQsRUFBUyxTQUFULEtBQXVCO0FBQUU7QUFDekMsUUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF3QixZQUFXLFNBQVUsRUFBN0MsQ0FBMUIsQ0FEdUMsQ0FDbUM7O0FBRTFFLEVBQUEsaUJBQWlCLENBQUMsU0FBbEIsSUFBK0IsTUFBL0IsQ0FIdUMsQ0FHRDtBQUN6QyxDQUpEOzs7Ozs7Ozs7Ozs7QUNaQTs7Ozs7QUFNQSxNQUFNLFdBQVcsR0FBRztBQUNoQixFQUFBLHFCQUFxQixFQUFFLFVBQVUsVUFBVixFQUFzQjtBQUFFO0FBQzNDLFdBQVE7K0JBQ2UsVUFBVSxDQUFDLEVBQUc7eURBQ1ksVUFBVSxDQUFDLEtBQU07a0JBQ3hELFVBQVUsQ0FBQyxJQUFLO2dDQUNGLFVBQVUsQ0FBQyxXQUFZOzJCQUM1QixVQUFVLENBQUMsS0FBTTs2QkFDZixVQUFVLENBQUMsUUFBUzs7O0tBTnpDO0FBVUg7QUFaZSxDQUFwQjtlQWVlLFc7Ozs7Ozs7Ozs7O0FDZmY7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFUQTs7Ozs7QUFRMEM7QUFJMUMsTUFBTSxXQUFXLEdBQUcsWUFBWTtBQUM1Qix1QkFBVSxjQUFWLEdBQ0ssSUFETCxDQUNVLFFBQVEsSUFBSTtBQUNkLElBQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsT0FBTyxJQUFJO0FBQ3hCLFlBQU0sSUFBSSxHQUFHLGlCQUFZLHFCQUFaLENBQWtDLE9BQWxDLENBQWI7O0FBQ0Esa0NBQVcsSUFBWDtBQUNBLCtCQUFvQixPQUFPLENBQUMsRUFBNUIsRUFId0IsQ0FHUTtBQUNuQyxLQUpEO0FBS0gsR0FQTDtBQVFILENBVEQ7O2VBV2UsVzs7Ozs7Ozs7Ozs7QUN2QmY7Ozs7OztBQVFBLE1BQU0sVUFBVSxHQUFHO0FBQ2YsRUFBQSxnQkFBZ0IsRUFBRyxTQUFTLElBQUk7QUFBSTtBQUNoQyxXQUFROztnQ0FFZ0IsU0FBUyxDQUFDLElBQUs7NkJBQ2xCLFNBQVMsQ0FBQyxJQUFLOytCQUNiLFNBQVMsQ0FBQyxXQUFZOzs7U0FKN0M7QUFRSDtBQVZjLENBQW5CO2VBYWUsVTs7Ozs7Ozs7Ozs7QUNkZjs7QUFDQTs7QUFDQTs7OztBQVRBOzs7Ozs7QUFhQSxNQUFNLG1CQUFtQixHQUFHLFVBQVUsU0FBVixFQUFxQjtBQUFFO0FBQy9DLE1BQUksY0FBYyxHQUFHLEVBQXJCLENBRDZDLENBQ0c7O0FBQ2hELHVCQUFVLGFBQVYsR0FDSyxJQURMLENBQ1UsT0FBTyxJQUFJO0FBQ2IsSUFBQSxjQUFjLEdBQUcsT0FBTyxDQUFDLE1BQVIsQ0FBZSxNQUFNLElBQUksU0FBUyxLQUFLLE1BQU0sQ0FBQyxVQUE5QyxDQUFqQixDQURhLENBQzhEOztBQUMzRSxJQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLE1BQU0sSUFBSTtBQUM3QixZQUFNLGtCQUFrQixHQUFHLGdCQUFXLGdCQUFYLENBQTRCLE1BQTVCLENBQTNCLENBRDZCLENBQ2tDOzs7QUFDL0QsbUNBQVksa0JBQVosRUFBZ0MsU0FBaEMsRUFGNkIsQ0FFYztBQUM5QyxLQUhEO0FBSUgsR0FQTDtBQVFILENBVkQ7O2VBY2UsbUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKlxuICAgIEF1dGhvcjogQWJiZXlcbiAgICBOYW1lOiBkYXRhTWFuYWdlci5qc1xuICAgIFB1cnBvc2U6IHRoaXMganMgZmlsZSBpcyBhIGRhdGEgbWFuYWdlciB0aGF0IGdldHMgdGhlIGRhdGEgZnJvbSB0aGUganNvbiBmaWxlXG4qL1xuXG5jb25zdCBBUElPYmplY3QgPSB7XG4gICAgZ2V0UHJvZHVjdExpc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Byb2R1Y3RzXCIpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgfSxcbiAgICBnZXRSZXZpZXdMaXN0OiBmdW5jdGlvbiAoKSB7IC8vdHJ5IHJ1bm5pbmcgdGhpcyB3aXRob3V0IHRoZSBvYmplY3QgcG9wdWxhdGVkXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9yZXZpZXdzXCIpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFQSU9iamVjdCIsIi8qXG4gICAgQXV0aG9yOiBBYmJleVxuICAgIE5hbWU6IG1haW4uanNcbiAgICBQdXJwb3NlOiBFbnRyeSBwb2ludCBvZiBteSBhcHBsaWNhdGlvblxuKi9cblxuaW1wb3J0IGNyZWF0ZU5hdkJhciBmcm9tIFwiLi9uYXZCYXJcIjtcbmltcG9ydCBwcm9kdWN0TGlzdCBmcm9tIFwiLi9wcm9kdWN0TGlzdFwiO1xuaW1wb3J0IHJldmlld0xpc3QgZnJvbSBcIi4vcmV2aWV3TGlzdFwiO1xuXG5cbmNyZWF0ZU5hdkJhcigpXG5yZXZpZXdMaXN0KClcbnByb2R1Y3RMaXN0KClcbi8vIHJldmlld0xpc3QoKVxuXG5cbiIsImNvbnN0IG5hdkJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2QmFyXCIpXG5cbmNvbnN0IGNyZWF0ZU5hdkJhciA9ICgpID0+IHtcbiAgbmF2QmFyLmlubmVySFRNTCA9XG5gXG4gICAgPGRpdiBjbGFzcz1cInRvcG5hdlwiPlxuICAgIDxhIGlkPVwiY29tcGFueU5hbWVcIiBzdHlsZT0gXCJ0ZXh0LWRlY29yYXRpb246IG5vbmVcIiBocmVmPVwiI2hvbWVcIiBjbGFzcz1cIm5hdkxpbmtzXCI+QWJiZXkncyBBbWF6aW5nIFNoaXJ0czwvYT5cbiAgICA8YSBzdHlsZT0gXCJ0ZXh0LWRlY29yYXRpb246IG5vbmVcIiBocmVmPVwiI2NhdGVnb3JpZXNcIiBjbGFzcz1cIm5hdkxpbmtzXCI+Q2F0ZWdvcmllczwvYT5cbiAgICA8YSBzdHlsZT0gXCJ0ZXh0LWRlY29yYXRpb246IG5vbmVcIiBocmVmPVwiI29yZGVyc1wiIGNsYXNzPVwibmF2TGlua3NcIj5PcmRlcnM8L2E+XG4gICAgPGEgc3R5bGU9IFwidGV4dC1kZWNvcmF0aW9uOiBub25lXCIgaHJlZj1cIiNsb2dvdXRcIiBjbGFzcz1cIm5hdkxpbmtzXCI+TG9nb3V0PC9hPlxuICA8L2Rpdj5cbiAgICBgXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTmF2QmFyIiwiLypcbiAgICBBdXRob3I6IEFiYmV5XG4gICAgTmFtZTogcHJpbnRUb0RvbS5qc1xuICAgIFB1cnBvc2U6IEZ1bmN0aW9uIHRoYXQgd2lsbCBwcmludCBhbnkgSFRNTCBlbGVtZW50cyB0byB0aGUgRE9NXG4qL1xuXG5jb25zdCBwcmludFRvRG9tID0gcHJvZHVjdCA9PiB7ICAvL3ByaW50cyBwcm9kdWN0cyB0byBET01cbiAgICBjb25zdCBjb250YWN0RG9tRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZHVjdExpc3RcIilcblxuICAgIGNvbnRhY3REb21FbGVtZW50LmlubmVySFRNTCArPSBwcm9kdWN0XG59XG5cbmNvbnN0IHByaW50UmV2aWV3ID0gKHJldmlldywgcHJvZHVjdElkKSA9PiB7IC8vaW5zZXJ0cyByZXZpZXcgSFRNTCBhZnRlciB0aGUgY29ycmVzcG9uZGluZyBwcm9kdWN0IHVzaW5nIGlkcyBcbiAgICBjb25zdCBwcm9kdWN0RG9tRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9kdWN0LSR7cHJvZHVjdElkfWApIC8vcHJvZHVjdCBpZCBvZiB0aGUgcHJvZHVjdCB0aGUgcmV2aWV3IGlzIGFzc29jaWF0ZWQgd2l0aCBcblxuICAgIHByb2R1Y3REb21FbGVtZW50LmlubmVySFRNTCArPSByZXZpZXcgLy9hZGRzIHJldmlldyB0byB0aGUgZW5kIG9mIHRoZSBwcm9kdWN0IGNvbnRhaW5lclxufVxuXG5leHBvcnQgeyBwcmludFRvRG9tLCBwcmludFJldmlldyB9IiwiLypcbiAgICBBdXRob3I6IEFiYmV5XG4gICAgTmFtZTogcHJvZHVjdC5qc1xuICAgIFB1cnBvc2U6IFRoaXMgcGFnZSBidWlsZHMgYSBwcm9kdWN0IHJlcHJlc2VudGF0aW9uIGluIEhUTUwuIERvZXNuJ3QgcmVxdWlyZSBpbXBvcnRpbmdcbiovXG5cbmNvbnN0IHByb2R1Y3RIVE1MID0ge1xuICAgIGNyZWF0ZVByb2R1Y3RMaXN0SFRNTDogZnVuY3Rpb24gKG5ld1Byb2R1Y3QpIHsgLy8gYXNzaWduIHByb2R1Y3QgaWQgdG8gY29udGFpbmVyIHNvIHdlIGNhbiBmaW5kIGl0IGxhdGVyIHRvIGFwcGVuZCByZXZpZXdzXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgIDxzZWN0aW9uIGlkPVwicHJvZHVjdC0ke25ld1Byb2R1Y3QuaWR9XCI+IFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlXCI+PGltZyBjbGFzcz1cImltYWdlc1wiIHNyYz0ke25ld1Byb2R1Y3QuaW1hZ2V9PjwvZGl2PlxuICAgICAgICAgICAgPGgzPiR7bmV3UHJvZHVjdC5uYW1lfTwvaDM+XG4gICAgICAgICAgICA8ZGl2PkRlc2NyaXB0aW9uOiAke25ld1Byb2R1Y3QuZGVzY3JpcHRpb259PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlByaWNlOiAkJHtuZXdQcm9kdWN0LnByaWNlfTwvZGl2PlxuICAgICAgICAgICAgPGRpdj5JbiBTdG9jazogJHtuZXdQcm9kdWN0LnF1YW50aXR5fTwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIDwvaHI+XG4gICAgYFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJvZHVjdEhUTUwiLCIvKlxuICAgIEF1dGhvcjogQWJiZXlcbiAgICBOYW1lOiBtYWluLmpzXG4gICAgUHVycG9zZTogVGhpcyBwYWdlIHdpbGwgZGlzcGxheSBhbGwgdGhlIHByb2R1Y3RzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIGltYWdlcyBcbiovXG5cbmltcG9ydCBBUElPYmplY3QgZnJvbSBcIi4vZGF0YU1hbmFnZXJcIlxuaW1wb3J0IHByb2R1Y3RIVE1MIGZyb20gXCIuL3Byb2R1Y3RcIlxuaW1wb3J0IHsgcHJpbnRUb0RvbSB9IGZyb20gXCIuL3ByaW50VG9Eb21cIiAvL2hhZCB0byBhZGQgY3VybHkgYnJhY2VzIGJjIGl0IHdhcyBleHBvcnRpbmcgbXVsdGlwbGUgb2JqZWN0c1xuaW1wb3J0IGdldFJldmlld0ZvclByb2R1Y3QgZnJvbSBcIi4vcmV2aWV3TGlzdFwiXG5cblxuY29uc3QgcHJvZHVjdExpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgQVBJT2JqZWN0LmdldFByb2R1Y3RMaXN0KClcbiAgICAgICAgLnRoZW4ocHJvZHVjdHMgPT4ge1xuICAgICAgICAgICAgcHJvZHVjdHMuZm9yRWFjaChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBodG1sID0gcHJvZHVjdEhUTUwuY3JlYXRlUHJvZHVjdExpc3RIVE1MKHByb2R1Y3QpXG4gICAgICAgICAgICAgICAgcHJpbnRUb0RvbShodG1sKVxuICAgICAgICAgICAgICAgIGdldFJldmlld0ZvclByb2R1Y3QocHJvZHVjdC5pZCkgLy9hY3R1YWwgaWQgb2YgdGhlIHByb2R1Y3RzIG9iamVjdFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJvZHVjdExpc3RcbiIsIi8qXG4gICAgQXV0aG9yOiBBYmJleVxuICAgIE5hbWU6IG1haW4uanNcbiAgICBQdXJwb3NlOiBUaGlzIHBhZ2Ugd2lsbCBzZXQgdXAgdGhlIEhUTUwgY29tcG9uZW50IFxuICAgICAgICAgICAgdGhhdCBSZXZpZXdMaXN0IHdpbGwgdXNlIHRvIGFwcGVuZCB0byB0aGUgRE9NXG4qL1xuXG5cbmNvbnN0IHJldmlld0hUTUwgPSB7XG4gICAgY3JlYXRlUmV2aWV3SFRNTDogKG5ld1JldmlldyA9PiB7ICAgLy9jcmVhdGVSZXZpZXdIVE1MIHJlcXVpcmVzIGEgY29sb24gYmVjYXVzZSBpdCdzIGFuIG9iamVjdCB3aXRoIGEgZnVuY3Rpb25cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxzZWN0aW9uIGlkPVwicmV2aWV3Q29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdj48aD5Vc2VyOiAke25ld1Jldmlldy51c2VyfTwvaD48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PkRhdGU6ICR7bmV3UmV2aWV3LmRhdGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5SZXZpZXc6ICR7bmV3UmV2aWV3LmRlc2NyaXB0aW9ufTwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPC9ocj5cbiAgICAgICAgYFxuICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IHJldmlld0hUTUwiLCIvKlxuICAgIEF1dGhvcjogQWJiZXlcbiAgICBOYW1lOiByZXZpZXdsaXN0LmpzXG4gICAgUHVycG9zZTogVGhpcyBwYWdlIHdpbGwgdGFrZSB0aGUgSFRNTCBjb21wb25lbnQgZnJvbSBSZXZpZXcgYW5kIHRoZSBhY3R1YWwgZGF0YSBvYmplY3QgZnJvbSBSZXZpZXdEYXRhXG4gICAgICAgICAgICAgYW5kIGFwcGVuZCBpdCB0byB0aGUgRE9NLlxuKi9cblxuaW1wb3J0IEFQSU9iamVjdCBmcm9tIFwiLi9kYXRhTWFuYWdlclwiXG5pbXBvcnQgcmV2aWV3SFRNTCBmcm9tIFwiLi9yZXZpZXdcIlxuaW1wb3J0IHsgcHJpbnRSZXZpZXcgfSBmcm9tIFwiLi9wcmludFRvRG9tXCJcblxuXG5cbmNvbnN0IGdldFJldmlld0ZvclByb2R1Y3QgPSBmdW5jdGlvbiAocHJvZHVjdElkKSB7IC8vcHJvZHVjdCBpZCBvZiB0aGUgcHJvZHVjdCB0aGUgcmV2aWV3IGlzIGFzc29jaWF0ZWQgd2l0aCBcbiAgICBsZXQgcHJvZHVjdFJldmlld3MgPSBbXSAgICAgICAgICAgICAgICAgICAgICAgICAvLy5maWx0ZXIgYWx3YXlzIGNyZWF0ZXMgYSBuZXcgYXJyYXkgYW5kIHJldHVybnMgdGhlIHJlc3VsdHMgYmFzZWQgb2ZmIHdoYXQgY29uZGl0aW9uIHlvdSd2ZSBnaXZlbiBpdCBcbiAgICBBUElPYmplY3QuZ2V0UmV2aWV3TGlzdCgpXG4gICAgICAgIC50aGVuKHJldmlld3MgPT4ge1xuICAgICAgICAgICAgcHJvZHVjdFJldmlld3MgPSByZXZpZXdzLmZpbHRlcihyZXZpZXcgPT4gcHJvZHVjdElkID09PSByZXZpZXcucHJvZHVjdF9pZCkgLy9maWx0ZXJzIHRocm91Z2ggdGhlIGFycmF5IGFuZCBvbmx5IGluY2x1ZGVzIHRoZSByZXZpZXcgaWYgaXQgbWF0Y2hlcyB0aGUgcHJvZHVjdCBpZFxuICAgICAgICAgICAgcHJvZHVjdFJldmlld3MuZm9yRWFjaChyZXZpZXcgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldmlld0hUTUxWYXJpYWJsZSA9IHJldmlld0hUTUwuY3JlYXRlUmV2aWV3SFRNTChyZXZpZXcpIC8vbXVzdCBjcmVhdGUgYW4gSFRNTCByZXByZXNlbnRhdGlvbiBzdHJ1Y3R1cmUgaW4gc2VwYXJhdGUgZmlsZVxuICAgICAgICAgICAgICAgIHByaW50UmV2aWV3KHJldmlld0hUTUxWYXJpYWJsZSwgcHJvZHVjdElkKSAvL3Bhc3NpbmcgaW4gdGhlIHByb2R1Y3RJZCBhZ2FpbiBzbyB3ZSBrbm93IHdoYXQgZGl2IHRvIGZpbmQgaW4gcHJpbnRSZXZpZXcgaW4gcHJpbnRUb0RvbVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGdldFJldmlld0ZvclByb2R1Y3RcblxuIl19
