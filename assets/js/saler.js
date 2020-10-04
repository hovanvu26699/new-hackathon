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

///////////////////////////////
let Name = document.getElementById("name")
let Price = document.getElementById("gia")
let Quantity = document.getElementById("soluong")
let Category = document.getElementById("loai")
let Images = document.getElementById("img")

///////////////////////////// thêm data lên firebase
function Dang() {
    let id = localStorage.id
    db.collection("products").add({
        name: Name.value,
        price: Price.value,
        quantity: Quantity.value,
        category: Category.value,
        pic: Images.src,
        saler: id
    })
        .then(function (docRef) {
            alert(' đã đăng thành công.');
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            alret('đăng  bài thất bại')
            console.error("Error adding document: ", error);
        });
}
//////// render list products
function renderPro() {
    let list = document.getElementById("list")
    db.collection("products").get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let temp = `
                <tr>
                                <th scope="row"><img src="assets/img/card/01.png" alt="img"></th>
                                <td colspan="2" class="item-name">${doc.data().name}</td>
                                <td class="price">${doc.data().category}</td>
                                <td class="price">$${doc.data().price}</td>
                                <td class="table-quantity">
                                    <form>
                                        <div class="quantity buttons_added">
                                            <input type="button" value="-" class="minus">
                                            <input type="number" class="input-text qty text" step="1" min="1"
                                                max="10000" name="quantity" value="${doc.data().quantity}">
                                            <input type="button" value="+" class="plus">
                                        </div>
                                    </form>
                                </td>
                                <td class="price"> <button>Sửa</button> </td>
                                <td class="table-close-btn"> <button>Xóa</button> </td>
                            </tr>
            `
                if (doc.data().saler == localStorage.id) {
                    list.insertAdjacentHTML("beforeend", temp)
                }
            });
        });
}
renderPro()
/////////////////////
/////Xóa
function del() {

}