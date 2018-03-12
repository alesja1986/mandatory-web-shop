naviGation();                 //anropar navigationens functionen
$cartItemsCount = 1;         //visar till användaren hur många items har man i varukorget
$valdaItemsArray = [];      //array med items som lagda till varukorgen
$products = "";

//>>>>---------------navigationen på sidan-------------<<<<<<//
function naviGation () {

    $('#showProducts').click(function(){
        $("#checkout").hide(); $("#products").show();
        $("#showProducts").css("backgroundColor", "lightblue");
        $("#checkOutPage").css("backgroundColor", "white");
        $("#reviewPage").hide();
    });

    $('#checkOutPage').click(function(){
        $("#products").hide(); $("#checkout").show();
        $("#checkOutPage").css("backgroundColor", "lightblue");
        $("#showProducts").css("backgroundColor", "white");
        $("#reviewPage").hide();
    })
};


//>>>>>-------------Hämtar ut produkterna till product page sidan-----------<<<<<<//
fetch('http://demo.edument.se/api/products')
    .then(response => response.json())                   //read response and return a promise (json)
    .then(products => {
        showDbProducts = products.map(dbProducts =>    //hämtar ut alla  producter från databasen sen skriver ut dom
            ` <ul>
                 <span class="linkToThisProduct" id="${dbProducts.Id}">
                 <img src="${dbProducts.Image}"</img>
                 <h3>${dbProducts.Name}</h3>
                 <li>${dbProducts.Description}</li>
                 <li>Price: ${dbProducts.Price}</li>
                 </span>
                 <a href="${dbProducts.Url}">Link To Amazone</a>
                 <button type="submit" id="${dbProducts.Id}" class="submit">Lägg i varukorg</button>
                 <div id="quantitys">
                            <button type="button" class="sub" id="${dbProducts.Id}}" title="If u want less quantity">-</button>
                            <input type="text" value="${dbProducts.Quantity = 0}"  class="totalQuantity">
                            <button type="button" class="add" id="${dbProducts.Id}"title="If u want more quantity" >+</button>
                 </div>
             </ul>`
        );

        showDbProducts = showDbProducts.join(" ");                     //tar bort comma tecknen
        document.getElementById('products').innerHTML=showDbProducts; //skriver ut alla hämtade produkter
        openReviewPage(products);
        addProducts(products);
        $products = products;
    });


//>>>>>-------funktionen för att öppna reviewPage för produkter och visa alla reviews---------<<<<<<//
function openReviewPage(x) {
    $openSpecPrroduct = $('.linkToThisProduct');

    for (let i = 0; i < x.length; i++) {
        let klickedProductId = x[i].Id;                 //id på klickta produkten
        let klickedProductPrint = x[i];

        $openSpecPrroduct[i].onclick = function () {
            $("#reviewPage").show();
            $("#products").hide();

            document.getElementById('itemForRew').innerHTML =
                ` <ul>
                          <img src="${klickedProductPrint.Image}"</img>
                          <h3>${klickedProductPrint.Name}</h3>
                          <li>${klickedProductPrint.Description}</li>
                          <li>Price: ${klickedProductPrint.Price}</li>
                          <a href="${klickedProductPrint.Url}">Link To Amazone</a>
                          <button type="button" id="${klickedProductPrint.Id}" class="submit">Lägg i varukorg</button>
                       </ul>`;

            productIdToSend = `${klickedProductPrint.Id}`;
            sendReview();

            fetch('http://demo.edument.se/api/reviews')
                .then(response => response.json())                   //read response and return a promise (json)
                .then(reviews => {
                    document.getElementById('utskrift').innerHTML = '';

                        showDbReviews = reviews.map(reviewsToShow => {
                        $productId = reviewsToShow.ProductID;

                        if(klickedProductId === reviewsToShow.ProductID) {
                            document.getElementById('utskrift').innerHTML +=
                                `<h4>Name: ${reviewsToShow.Name}</h4>
                                  <h4>Rating: ${reviewsToShow.Rating}</h4>
                                  <h4>Comment : ${reviewsToShow.Comment}</h4><hr>`
                        }
                    });
                });
        }
    }
} //functionen openReviewPage stängs


$('#stars span').on('mouseover', function(){
    let onStars = parseInt($(this).data('value'), 10);
    $(this).parent().children('#stars span').each(function(e){
        if (e < onStars) {
            $(this).css("color", "orange");
        }
        else {
            $(this).css("color", "black");
        }
    });
});


//>>>>>-------funktionen för att Posta review---------<<<<<<//
function sendReview() {

//när man klicka på star ska detta value sparas
    $('#stars span').on('click', function() {
        $onStar = parseInt($(this).data('value'), 10);
    });

    $('#skickaRew').on('click', function() {
        $fname = $('#firstName').val();
        $message = $('#textareans').val();

        fetch('http://demo.edument.se/api/reviews', {
            method: 'POST',
            body: JSON.stringify({
                ProductID:productIdToSend,
                Name:$fname,
                Comment:$message,
                Rating:$onStar}),

                 headers: new Headers({
                'Content-Type':'application/json'
            })
        })
        return
    })//click function end
}//sendReview function end


//>>>>>-------add products to checkout cart and count quantity---------<<<<<<//
function addProducts(products) {
    const submBtn = document.getElementsByClassName('submit');

    for (let i = 0; i < submBtn.length; i++) {

        submBtn[i].onclick = function () {

            document.getElementById('visaAntalet').innerHTML = $cartItemsCount++;//skriver ut räknare vid varukorgen
            let itemID = +this.id;

            for (let i = 0; i < products.length; i++) {
                if (products[i].Id === itemID) {

                    products[i].Quantity++;
                    let quantity = products[i].Quantity;
                    printProducts(products,quantity);
                }
            }
        }
    }
}


//>>>>>-------print products to checkout page---------<<<<<<//
function printProducts(products,quantity) {

    console.log(quantity);
    document.getElementById('checkoutCart').innerHTML ='';
    for(let i = 0; i < products.length; i++) {
        //console.log(products[i].Quantity);

        if (products[i].Quantity >0) {
             document.getElementById('checkoutCart').innerHTML +=
                ` <ul><img src="${products[i].Image}">
                                  <li>${products[i].Name}</li>
                                  <li>${products[i].Price} kr</li>
                            <div id="quantitys">
                            <button type="button" class="sub" id="${products[i].Name}" title="If u want less quantity">-</button>
                            <input type="text" value="${products[i].Quantity}"  class="totalQuantity">
                            <button type="button" class="add" id="${products[i].Name}"title="If u want more quantity" >+</button>
                            </div>
                            </ul>`;
        }
    }

}

//<<<---------Inte klar med add / remove items i varukorgen--------->>>>//
/*
function addRemoveItems(products,quantity) {
        $subBtn = $('.sub');     //ref till knapp för att ta bort varan
        $addBtn = $('.add');    //ref till knapp för att lägga till vara på checkout sidan

        for (let i = 0; i < $subBtn.length; i++) {             //går genom knappar för att ta bort
            $subBtn[i].onclick = function () {                //lägger till eventlistener
                $cartItemsCount--;
                document.getElementById('visaAntalet').innerHTML = $cartItemsCount;//skriver ut räknare vid varukorgen}
            }
        }


        for (let i = 0; i < $addBtn.length; i++) {
            $addBtn[i].onclick = function () {
                $cartItemsCount++;
                document.getElementById('visaAntalet').innerHTML = $cartItemsCount;//skriver ut räknare vid varukorgen}
                printProducts();
            }
        }
}
*/
// functionen för att skriva ut inte klar,bara form som skrivs ut:/
function jsonItemsList(x){
    let productsToPost = [];
    for(let i = 0; i < x.length; i++) {
        if (x[i].Quantity > 0) {
            for(let j = 0; j < x[i].Quantity; j++) {

                productsToPost.push(JSON.stringify(x[i]));
            }
        }
    }
    $makestring = productsToPost.join();

    $fname = document.forms["myForm"]["fname"].value;
    $lname = document.forms["myForm"]["lname"].value;
    $email = document.forms["myForm"]["email"].value;
    $tel = document.forms["myForm"]["telnr"].value;
    $adress = document.forms["myForm"]["adress"].value;
    $zip = document.forms["myForm"]["zip"].value;
    $city = document.forms["myForm"]["city"].value;
    $comment = $('#textarean').val();

    fetch('http://demo.edument.se/api/orders', {
        method: 'POST',
        body: JSON.stringify({
            FirstName: $fname,
            LastName: $lname,
            Email: $email,
            Phone: $tel,
            StreetAddress: $adress,
            ZipCode: $zip,
            City: $city,
            Comment: $comment,
            OrderItems:$makestring}),

        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
}

//form validation function
function sendOrder(e) {
    //validation for name
    $fname = document.forms["myForm"]["fname"].value;
    if ($fname === "" || isNaN($fname) === false) {  //kollar om input saknas eller är ett nummer
        $('p')[0].innerHTML = 'Korrekt förnamn måste fyllas i !';
    } else {
        $('p')[0].innerHTML = "";
    }

    //validation for last name
    $lname = document.forms["myForm"]["lname"].value;
    if ($lname === "" || isNaN($lname) === false) { //kollar om input saknas eller är ett nummer
        $('p')[1].innerHTML = 'Korrekt efternamn måste fyllas i !';
    } else {
        $('p')[1].innerHTML = "";
    }

    //validation for email
    $email = document.forms["myForm"]["email"].value;
    if ($email === "") { //kollar om input saknas eller är för kort.
        $('p')[2].innerHTML = 'Prova igen och fyll i din korrekta e-post adressen !';
    } else {
        $('p')[2].innerHTML = "";
    }

    //validation for telefonen
    $tel = document.forms["myForm"]["telnr"].value;
    if (isNaN($tel)) { //kollar om input saknas eller är för kort.
        $('p')[3].innerHTML = 'Telefon nr ska bestå av nummers!';
    } else {
        $('p')[3].innerHTML = "";
    }

    //validation for adress
    $adress = document.forms["myForm"]["adress"].value;
    if ($adress === "" || $adress.length < 5) { //kollar om input saknas eller är för kort.
        $('p')[4].innerHTML = "Fyll i korrekt adress!";
    } else {
        $('p')[4].innerHTML = "";
    }

    //validation for zip code
    $zip = document.forms["myForm"]["zip"].value;
    if ($zip.length !== 5 || isNaN($zip)) { //kollar att längden på input är 5 samt om den är inte ett nummer
        $('p')[5].innerHTML = "Postnummer måste bestå av fem siffror !";
    } else {
        $('p')[5].innerHTML = "";
    }

    //validation for city
    $city = document.forms["myForm"]["city"].value;
    if ($city === "" || isNaN($city) === false) { //kollar om input saknas eller är ett nummer
        $('p')[6].innerHTML = "Skriv in korrekt stads namn ! ";
    } else {
        $('p')[6].innerHTML = "";
    }
    $comment = $('#textarean').val();
}

    $('#subBtn').on('click', function () {
        jsonItemsList($products);

})

