const navBar = document.querySelector("#navBar")

const createNavBar = () => {
  navBar.innerHTML =
`
    <div class="topnav">
    <a id="companyName" style= "text-decoration: none" href="#home" class="navLinks">Abbey's Amazing Shirts</a>
    <a style= "text-decoration: none" href="#categories" class="navLinks">Categories</a>
    <a style= "text-decoration: none" href="#orders" class="navLinks">Orders</a>
    <a style= "text-decoration: none" href="#logout" class="navLinks">Logout</a>
  </div>
    `
}


export default createNavBar