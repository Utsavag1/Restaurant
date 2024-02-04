const prices = {
    "Panner Tikka":130,
    "Babycorn Chilly":125,
    "Chinese Bhel":135 ,
    "Veg Thali":220 ,
    "Chicken Biryani":250,
    "Chicken ":300,
    "Veg Biryani":250,
    "Ice Cream":60,
    "Pastry":40,
    "Gulab Jamun":30,
    "Brownie":40,
};

const items = [
    "Panner Tikka",
    "Babycorn Chilly",
    "Chinese Bhel" ,
    "Veg Thali" ,
    "Chicken Biryani",
    "Chicken ",
    "Veg Biryani",
    "Ice Cream",
    "Pastry",
    "Gulab Jamun",
    "Brownie",
];

let ordernums = [];

document.addEventListener("DOMContentLoaded", function(){
    const addButtons = document.querySelectorAll(".add-btn");
    const notification = document.getElementById("notification");

    let itemCounter = document.getElementById("item-counter");
    addButtons.forEach(button => {
        button.addEventListener("click", function(){
            if (button.textContent !== "Added"){
                itemCounter.textContent++;
                button.textContent = "Added";

                showNotification("Item added to cart !");

                const ordernum = this.id;
                ordernums.push(ordernum);
                sessionStorage.setItem("ordernumsLS", JSON.stringify(ordernums));
            }
            else{
                showNotification("Item already added !");
            }
        });
    });

    function showNotification(message) {
        notification.innerHTML = message;
        notification.style.display = "block";

        setTimeout(() => {
            notification.style.display = "none";
        }, 2500);
    }

    // cart script

    const storedOrders = sessionStorage.getItem("ordernumsLS");
    const orders = JSON.parse(storedOrders);

    let tablehead = document.querySelector("thead");
    if(!orders){
        cardBody = document.querySelector(".cart-items");
        cardBody.innerHTML = `<h2>Your cart is empty !</h2> <br>
                                <p>Redirecting to home page...</p>`;
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    }
    else{
        tablehead.innerHTML = `<tr>
                                <th>ORDER</th>
                                <th>ITEM NAME</th>
                                <th>QUANTITY</th>
                                <th>PRICE</th>
                            </tr>`;
    }

    let table = document.querySelector("tbody");
    table.innerHTML = "";
    for(let i = 0; i < orders.length; i++){
        table.innerHTML += `<tr id="cart-order">
                                <th class="item-number">${i+1}</th>
                                <td class="item-name">${items[orders[i]-1]}</td>
                                <td class="quantity">1</td>
                                <td class="price">${prices[items[orders[i]-1]]}</td>
                                <td><button id="change-qty">+</button></td>
                                <td><button id="change-qty">-</button></td>
                                <td><button id="delete">Remove</button></td>
                            </tr>`
    };

    let totalPrice = document.getElementById("total-price");
    let total = 0;
    const initialPrices = document.querySelectorAll(".price");
    initialPrices.forEach( initialPrice => {
        total += parseInt(initialPrice.textContent);
    });
    totalPrice.textContent = total;

    const changeBtns = document.querySelectorAll("#change-qty");

    changeBtns.forEach(button => {
        button.addEventListener("click", function(){
            const parent = this.closest("tr");
            const quantity = parent.querySelector(".quantity");
            let quantityValue = parseInt(quantity.textContent);
            if(quantity){
                if(this.textContent === "+"){
                    quantityValue++;
                    quantity.textContent = quantityValue;
                }
                else {
                    if(quantityValue > 1){
                        quantityValue--;
                        quantity.textContent = quantityValue;
                    }
                }
            }
            const itemName = parent.querySelector(".item-name");
            const price = parent.querySelector(".price");
            price.textContent = prices[itemName.textContent] * quantityValue;

            let totalPrice = document.getElementById("total-price");
            let total = 0;
            const initialPrices = document.querySelectorAll(".price");
            initialPrices.forEach( initialPrice => {
                total += parseInt(initialPrice.textContent);
            });
            totalPrice.textContent = total;
        });
    });

    const deleteBtns = document.querySelectorAll("#delete");

    deleteBtns.forEach(button => {
        button.addEventListener("click", function(){
            const parent = this.closest("tr");
            parent.remove();

            const itemSlNo = document.querySelectorAll(".item-number");
            let i = 1;
            itemSlNo.forEach(slNo => {
                slNo.textContent = i;
                i++;
            });

            let totalPrice = document.getElementById("total-price");
            let total = 0;
            const initialPrices = document.querySelectorAll(".price");
            initialPrices.forEach( initialPrice => {
                total += parseInt(initialPrice.textContent);
            });
            totalPrice.textContent = total;
        });
    });

});