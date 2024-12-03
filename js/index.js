// CRUDS
// c ==> create
// r ==> read
// u ==> update
// d ==> delete
// s ==> search

var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var ProductDescInput = document.getElementById("ProductDesc");
var productImgInput = document.getElementById("productImg");
var searchInput = document.getElementById("search");
var addbtn = document.getElementById("add");
var updatebtn = document.getElementById("update");

var myIndex;
var productList;

if (localStorage.getItem("product") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("product"));
  display(productList);
}

function addProduct() {
  if (
    productNameInput.classList.contains("is-valid") &&
    productPriceInput.classList.contains("is-valid") &&
    productCategoryInput.classList.contains("is-valid") &&
    ProductDescInput.classList.contains("is-valid")
  ) {
    var product = {
      code: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      Desc: ProductDescInput.value,
      img: `images/${productImgInput.files[0].name}`,
    };
    productList.push(product);
    console.log(productList);
    localStorage.setItem("product", JSON.stringify(productList));
    display(productList);
    //   clear();
  } else {
    alert("not valid data");
  }
}

function display(arr) {
  var cartona = "";
  for (var i = 0; i < arr.length; i++) {
    cartona += ` <div class="col-md-2">
          <div class="item">
            <img src=" ${arr[i].img}" class="w-100" alt="" />
            <h2 class="h4">Name : ${arr[i].code} </h2>
            <p>Price : ${arr[i].price}</p>
            <p>Category : ${arr[i].category}</p>
            <p>Desc :${arr[i].Desc}</p>
            <button onclick="deleteProduct(${i})" class=" btn btn-outline-danger w-100 mt-2 " > Delete <i class=" fas fa-trash " ></i> </button>
            <button onclick=" edit(${i})" class=" btn btn-outline-warning w-100 my-2 " > Update <i class=" fas fa-pen " ></i> </button>
          </div>
        </div> `;
  }
  document.getElementById("myRow").innerHTML = cartona;
}
function deleteProduct(deletedIndex) {
  productList.splice(deletedIndex, 1);
  display(productList);
  localStorage.setItem("product", JSON.stringify(productList));
}
function search() {
  var word = searchInput.value;
  // var cartona = "";
  var searchProduct = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].code.toLowerCase().includes(word.toLowerCase())) {
      searchProduct.push(productList[i]);
    }
  }
  display(searchProduct);
  // if (cartona == "") {
  //   document.getElementById(
  //     "myRow"
  //   ).innerHTML = `<h2 class="bg-dark text-white text-center p-3  rounded-2" > No Data TO Show</h2>`;
  // } else {
  //   document.getElementById("myRow").innerHTML = cartona;
  // }
}
function clear() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  ProductDescInput.value = null;
}
function validateInputs(element) {
  var regex = {
    productName: /^[A-Z][a-z]{1,10}$/,
    productPrice: /^[1-9][0-9]{1,5}$/,
    productCategory: /^(tv|screens|mobile|labtop)$/i,
    ProductDesc: /^\w{3,}$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
  }
}
function edit(index) {
  myIndex = index;
  productNameInput.value = productList[index].code;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  ProductDescInput.value = productList[index].Desc;

  addbtn.classList.add("d-none");
  updatebtn.classList.remove("d-none");

  productNameInput.classList.add("is-valid");
  productPriceInput.classList.add("is-valid");
  productCategoryInput.classList.add("is-valid");
  ProductDescInput.classList.add("is-valid");
}
function update() {
  if (
    productNameInput.classList.contains("is-valid") &&
    productPriceInput.classList.contains("is-valid") &&
    productCategoryInput.classList.contains("is-valid") &&
    ProductDescInput.classList.contains("is-valid")
  ) {
    productList[myIndex].code = productNameInput.value;
    productList[myIndex].price = productPriceInput.value;
    productList[myIndex].category = productCategoryInput.value;
    productList[myIndex].Desc = ProductDescInput.value;
    localStorage.setItem("products", JSON.stringify(productList));
    display(productList);
    addbtn.classList.remove("d-none");
    updatebtn.classList.add("d-none");
  } else {
    alert("not valid data");
  }
}
