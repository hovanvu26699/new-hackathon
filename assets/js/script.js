
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCi6ZtgEDzObqHnZSAA4iO6pUKQxti11Dg",
    authDomain: "khoaci.firebaseapp.com",
    databaseURL: "https://khoaci.firebaseio.com",
    projectId: "khoaci",
    storageBucket: "khoaci.appspot.com",
    messagingSenderId: "140014124727",
    appId: "1:140014124727:web:bd13e4c253d6a91cda9732",
    measurementId: "G-HNRPLX1YE8"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
///////////////////////////////*******************************//////////////////////////////////////////////////
///////////////////////////////****************************/////////////////////////////////////////////////////
// let Name = document.getElementById("name")
// let Price = document.getElementById("gia")
// let Quantity = document.getElementById("soluong")
// let Category = document.getElementById("loai")
// let Images = document.getElementById("img")

// ///////////////////////////// thêm data lên firebase
// function Dang() {
//     let id = localStorage.id
//     db.collection("products").add({
//         name: Name.value,
//         price: Price.value,
//         quantity: Quantity.value,
//         category: Category.value,
//         pic: Images.src,
//         saler: id
//     })
//         .then(function (docRef) {
//             alert(' đã đăng thành công.');
//             console.log("Document written with ID: ", docRef.id);
//         })
//         .catch(function (error) {
//             alret('đăng  bài thất bại')
//             console.error("Error adding document: ", error);
//         });
// }

////////////////////// đọc data
function renderData() {
    db.collection("products").get()
        .then(function (querySnapshot) {
            let comic = document.getElementById("comic")
            let economy = document.getElementById("economy")
            let history = document.getElementById("history")
            let other = document.getElementById("other")
            querySnapshot.forEach(function (doc) {
                let temp = `
            <div class="col-lg-3 col-md-6">
                <div class="single-product-card">
                    <div class="thumb">
                        <img src="assets/img/product/home-4/05.png" alt="top-product">
                    </div>
                    <div class="product-card-details">
                        <p class="categories">${doc.data().category}</p>
                        <h4 class="title"><a href=" #">${doc.data().name}</a></h4>
                        <div class="star-rating">
                            <span><i class="fa fa-star"></i></span>
                            <span><i class="fa fa-star"></i></span>
                            <span><i class="fa fa-star"></i></span>
                            <span><i class="fa fa-star"></i></span>
                            <span><i class="fa fa-star-half-o"></i></span>
                        </div>
                        <div class="price">
                            <span> $${doc.data().price}</span>
                        </div>
                        <div class="product-cart">
                            <span class="shop-cart-icon"><a href="#"><i class="las la-shopping-cart"></i></a></span>
                        </div>
                    </div>
                </div>
            </div>
            `
                if (doc.data().category == 'comic') {
                    comic.insertAdjacentHTML("beforeend", temp)
                }
                else if (doc.data().category == 'economy') {
                    economy.insertAdjacentHTML("beforeend", temp)
                }
                else if (doc.data().category == 'history') {
                    history.insertAdjacentHTML("beforeend", temp)
                }
                else if (doc.data().category == 'other') {
                    other.insertAdjacentHTML("beforeend", temp)
                }
                console.log(doc.id, " => ", doc.data());
            });
        });
}
renderData()

/////***********Đăng Nhập*****************//////////////////
// function logIn() {
document.getElementById("btn").addEventListener("click", () => {
    let userName = document.getElementById("usernm").value
    let passWord = document.getElementById("pass").value
    console.log(userName, passWord)

    db.collection("users").get()
        .then((querySnapshot) => {
            let users = querySnapshot.docs.map(val => {
                return {
                    id: val.id,
                    ...val.data()
                }
            })
            return users
        })
        //normalize data 
        .then(users => {
            for (let i = 0; i < users.length; i++) {
                if (users[i].username == userName) {
                    if (users[i].password == passWord) {
                        alert("Log in Successful")
                        return users[i];
                    } else {
                        alert("Log in Unsuccessful")
                        return null;
                    }
                }
            }
            alert("Tài khoản không tồn tại")
        })
        // checking
        .then((user) => {
            localStorage.setItem("id", user.id)
            if (user.type == "customers") {
                window.location = "./index.html";
            } else {
                window.location = "./sale.html";
            }
            renderData()
            // result.innerHTML = "Xin chào " + username

        })
        // co infomation ve user
        .catch(er => {
            console.log(er.message)
        })
        ;
})


// }

/////**********Đăng Ký**********//////////////////////////////
// function signUp() {
document.getElementById("dk").addEventListener("click", () => {
    let userName = document.getElementById("usernm2").value
    let passWord = document.getElementById("matkhau").value
    let repass = document.getElementById("nhaplai").value
    let type = document.getElementById("user").value
    // console.log(type)
    if (repass == passWord) {
        db.collection("users").get()
            .then((querySnapshot) => {
                let user = querySnapshot.docs.map(val => {
                    return val.data()
                })
                return user
            })
            /////
            .then(user => {
                console.log(user)
                let UserExists = user.some(val => val.username == userName)
                if (UserExists) {
                    alert("User is exists!")
                } else {
                    db.collection("users").add({
                        username: userName,
                        password: passWord,
                        type: type,
                        dob: new Date()
                    })
                        .then(doc => {
                            console.log("Document written with ID: ", doc.id);
                        })
                        .catch(er => {
                            console.log(er.message)
                        })
                    // window.location = "./index.html";
                }
            })
    } else {
        alert("Your password does not match")
    }
})

// }

//////// render list products
// function renderPro() {
//     let list = document.getElementById("list")
//     db.collection("products").get()
//         .then(function (querySnapshot) {
//             querySnapshot.forEach(function (doc) {
//                 let temp = `
//                 <tr>
//                                 <th scope="row"><img src="assets/img/card/01.png" alt="img"></th>
//                                 <td colspan="2" class="item-name">${doc.data().name}</td>
//                                 <td class="price">${doc.data().category}</td>
//                                 <td class="price">$${doc.data().price}</td>
//                                 <td class="table-quantity">
//                                     <form>
//                                         <div class="quantity buttons_added">
//                                             <input type="button" value="-" class="minus">
//                                             <input type="number" class="input-text qty text" step="1" min="1"
//                                                 max="10000" name="quantity" value="${doc.data().quantity}">
//                                             <input type="button" value="+" class="plus">
//                                         </div>
//                                     </form>
//                                 </td>
//                                 <td class="price"> <button>Sửa</button> </td>
//                                 <td class="table-close-btn"> <button>Xóa</button> </td>
//                             </tr>
//             `
//                 if (doc.data().saler == localStorage.id) {
//                     list.insertAdjacentHTML("beforeend", temp)
//                 }
//             });
//         });
// }