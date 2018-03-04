naviGation(); //anropar navigationens functionen
let itemsOf;
$valdaItemsArray = []; //array med items som valda
let cartItemsCount = 0; //variabel för att räknar hur många produkter är i varukorgen
$jsonString ='{ "database" : []}';  //tum jsonstring för att när den körs första gången ska man inte få fel meddelande på grund av en tum string
$arrayViews =[];

//navigationen på sidan hanteras i denna function med jQuery
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
        showItems();
    })
};

//Object med arrays som innerhåller kläd produkter
const clothes = [
    { name: "Kappa",
        price: 700,
        description: 'Snygg höst kappa',
        url:'http://www.mixstudio.se/images/se4/Exklusivt%20Dam%20Kappa%20med%20syntetp%20lskrage%20Sales%20Nej%203290%202153.jpg'},

    { name: "Skjorta",
        price: 660,
        description: 'Ralph lauren nyheten',
        url:'http://www.stockholmstemcells.se/images/stockholmstemcells.se/kvinna-ralph-lauren-skjortor-mercer-polo-68ZH.jpg',},

    { name: "Jeans",
        price: 400,
        description: 'Vårens snyggaste jeans',
        url:'http://www.junkyard.com/media/catalog/product/7/8/789004.jpg'},

    { name: "Mössa",
        price: 290,
        description: 'Tuff mössa för tuffa tjejer',
        url:'http://www.setthetable.se/images/large/products2/Billiga%20K%C3%B6pa%20Karl%20Lagerfeld%20Ikonik%20Beanie%20Dam%20M%C3%B6ssa%20Ru53g5F%20-%20Svart%20Utg%C3%A5ng%203415_2_LRG.jpg'},

    { name: "Klänning",
        price: 290,
        description: 'Den perfekta sommarklänningen ',
        url:'http://nlyscandinavia.scene7.com/is/image/nlyscandinavia/914262-0093_2?$productpage_slider_desktop$&cropN=0.02,0,0.955,1'}
];

//function för att skapa listor med alla produktena i arrayn och knappar där man kan ändra antalet varor i korgen
let printClothes = clothes.map(cloth =>
    `<ul>
       <span class="linken" id="${cloth.name}">
       <img src="${cloth.url}">
       <li>${cloth.name}</li>
       <li>${cloth.price} kr</li> 
       <li>${cloth.description}</li> 
       </span>
        </a>
         <button id="${cloth.name}" class="submit">Lägg i varukorg</button>
     </ul>`);
printsClothes = printClothes.join(" "); // använder join("") för att bli av med comma tecknet som finns i arrayn
document.getElementById('products').innerHTML=printsClothes;

cartItems();
//funktionen för att lägga till items i varukorgen och räkna dem
function cartItems() {
    $btn =$('.submit');         // reffererar till  köp knappar

    for (var i = 0; i < $btn.length; i++) {                     // går genom alla knapparna
        $btn[i].onclick = function () {                        // ger till varje knapp en event listener
            var valdaItemNamn = this.id;                     //valda item får this.Id som är {cloth.name}
            if ($valdaItemsArray[valdaItemNamn]) {           //om arrayn med valda produkt innerhåller redan valdaItemNamnet
                $valdaItemsArray[valdaItemNamn]++;          //ska den valdaItemNamnet plussas med 1
            } else {
                $valdaItemsArray[valdaItemNamn] = 1;      //om den valdaItemNamnet inte finns ska den få 1
            }

            itemsOf = Object.getOwnPropertyNames($valdaItemsArray); //The Object.getOwnPropertyNames() method returns an array of all properties
            itemsOf.shift(); // supper sexy monster hack för att ta bort första elementet 'lenght' som man inte ved vart den kommer ifrån:P
            cartItemsCount++;// räknare som visar hur många items man vald
            document.getElementById('visaAntalet').innerHTML = cartItemsCount;//skriver ut räknare vid varukorgen
        }
    }
}

//Function för att visa items på checkout sidan
function showItems () {

    document.getElementById('checkoutCart').innerHTML = "";
    for (var i = 0; i < itemsOf.length; i++) {  //går genom  alla items namn (kappa,mössa osv)
        var itemName = itemsOf[i];

        for (var j = 0; j < clothes.length; j++) {    //går genom alla kläd produkter
            if (clothes[j].name === itemName) {      // kollar om namn på kläder är likadan som namn på item och skriver ut isåfall en sträng med informationen
                document.getElementById('checkoutCart').innerHTML +=
                    ` <ul><img src="${clothes[j].url}">
                           <li>${clothes[j].name}</li>
                            <li>${clothes[j].price} kr</li>
                            <div id="quantitys">
                            <button type="button" class="sub" id="${clothes[j].name}" title="If u want less quantity">-</button>
                            <input type="text" value="${$valdaItemsArray[itemName]}"  class="totalQuantity">
                            <button type="button" class="add" id="${clothes[j].name}"title="If u want more quantity" >+</button>
                            </div>
                            </ul>`;
                addRemoveItems();

                /*  Utskriften är fel,inte hunnit fixa till det tyvärr
                                let total=0;
                                [clothes[j].price].forEach(price => { total +=price * [valdaItemsArray[itemName]];});
                                parseInt(total);`
                                */
                document.getElementById('totalSum').innerHTML=`Den totala summan är :`
            }
        }
    }
} //showItems function stängs här

//Function för att kunna lägga till och ta bort items i varukorgen
function addRemoveItems() {
    $subBtn = $('.sub');     //ref till knapp för att ta bort varan
    $addBtn = $('.add');    //ref till knapp för att lägga till vara på checkout sidan

    for (var i = 0; i < $subBtn.length; i++) {             //går genom knappar för att ta bort
        $subBtn[i].onclick = function () {                //lägger till eventlistener
            cartItemsCount--;
            let itemNames = this.id;                    //kollar om namnet är samma med denna id
            document.getElementById('visaAntalet').innerHTML = cartItemsCount;//skriver ut räknare vid varukorgen}
            if ($valdaItemsArray[itemNames] === 1) {
                let lastItem=itemsOf.indexOf(itemNames);
                delete $valdaItemsArray[itemNames];
                itemsOf.splice(lastItem,1);
            }
            else {
                $valdaItemsArray[itemNames]--;
            }
            showItems();
        }
    }

    for (var i = 0; i < $addBtn.length; i++) {
        $addBtn[i].onclick = function () {
            let itemNames = this.id;
            $valdaItemsArray[itemNames]++;
            cartItemsCount++;
            document.getElementById('visaAntalet').innerHTML = cartItemsCount;//skriver ut räknare vid varukorgen}
            showItems();
        }
    }
}

//form validation function
function validateForm() {
    //validation for name
    $fname = document.forms["myForm"]["fname"].value;
    if ( $fname === "" || isNaN( $fname)===false){  //kollar om input saknas eller är ett nummer
        document.getElementsByTagName('p')[0].innerHTML='Korrekt förnamn måste fyllas i !';
    } else {  document.getElementsByTagName('p')[0].innerHTML = "";}

    //validation for last name
    let lname = document.forms["myForm"]["lname"].value;
    if (lname === "" || isNaN(lname)===false) { //kollar om input saknas eller är ett nummer
        document.getElementsByTagName('p')[1].innerHTML = 'Korrekt efternamn måste fyllas i !';
    }else {  document.getElementsByTagName('p')[1].innerHTML = "";}

    //validation for email
    let email = document.forms["myForm"]["email"].value;
    if (email === ""){ //kollar om input saknas eller är för kort.
        document.getElementsByTagName('p')[2].innerHTML='Prova igen och fyll i din korrekta e-post adressen !';
    }else {  document.getElementsByTagName('p')[2].innerHTML = "";}

    //validation for telefonen
    let tel = document.forms["myForm"]["telnr"].value;
    if (isNaN(tel)){ //kollar om input saknas eller är för kort.
        document.getElementsByTagName('p')[3].innerHTML='Telefon nr ska bestå av nummers!';
    }else {  document.getElementsByTagName('p')[3].innerHTML = "";}

    //validation for adress
    let adress = document.forms["myForm"]["adress"].value;
    if (adress === "" || adress.length < 5  ){ //kollar om input saknas eller är för kort.
        document.getElementsByTagName('p')[4].innerHTML="Fyll i korrekt adress!";
    }else {  document.getElementsByTagName('p')[4].innerHTML = "";}

    //validation for zip code
    let zip = document.forms["myForm"]["zip"].value;
    if (zip.length !== 5 || isNaN(zip)){ //kollar att längden på input är 5 samt om den är inte ett nummer
        document.getElementsByTagName('p')[5].innerHTML="Postnummer måste bestå av fem siffror !";
    }else {  document.getElementsByTagName('p')[5].innerHTML = "";}

    //validation for city
    let city = document.forms["myForm"]["city"].value;
    if (city === "" || isNaN(city)===false){ //kollar om input saknas eller är ett nummer
        document.getElementsByTagName('p')[6].innerHTML="Skriv in korrekt stads namn ! ";
    }else {  document.getElementsByTagName('p')[6].innerHTML = "";}
};
document.getElementById('subBtn').addEventListener("click", validateForm);


//lägger till click event på class .linken (span elementer på product page ligger i den)
$('.linken').on('click', function() {
    $("#products").hide();                // döljer produktena
    $itemNameforReview = this.id;        // item som klickad på ska få this.id som är då klädplaggens namn
    $('#myID').val($itemNameforReview); //myID får namnet på produkten som sin value

    $('#stars span').on('click', function() {
        $onStar = parseInt($(this).data('value'), 10); // The star currently selected
        $('#stars').val($onStar);
    });

    openReviewPage();                  // öppnar reviewpage för att visa produkten som man klickat på
});

function openReviewPage() {
    $("#reviewPage").show();                               //visar sidan då den är hide från början
    for (var j = 0; j < clothes.length; j++) {            //går genom alla clothes
        if (clothes[j].name === $itemNameforReview) {   //kollar om namn på clothes är samma som namnet på item som klickades på
            $('#itemForRew').html(                      //skriver ut bilden, pris och url på denna item
                `<img src="${clothes[j].url}">                                                                                                                   
                     <h4>Snygg ${clothes[j].name} som är en av våran favoriter! Denna plagg kostar bara  ${clothes[j].price} kr !</h4>                                                                                                                                                                                                                                                                     
                  `)}
        saveReviews();                              //anropar saveReviews functionen
        printJSONDB("utskrift");                    //anropar funktionen för att skriva ut sparade reviews
    }
}
function saveReviews() {
    $reviewButtons = $('.reviewButtons');

    for (var i = 0; i < $reviewButtons.length; i++) {
        $reviewButtons[i].onclick = function () {
            $myInputIDs = ["firstName","textareans","myID","stars"];        //sparar id på elements som jag vill skriva ut
            makeJSONString($myInputIDs);                                   //anropar funktionen makeJSONSTRING och lägger in myInputIDs som parameter
            printJSONDB("utskrift");
            $('#textareans').val('');                                    //tömmer values efter dom har blivit skickade
            $('#firstName').val('');
        }
    }
}

function makeJSONString (inputIDArray){
    $tempInputArray = [];
    for(var i = 0;i<inputIDArray.length;i++){                     //går genom arrayn med alla id's
        $inputID = inputIDArray[i];
        $temp = document.getElementById(inputIDArray[i]);
        $input = '"' + $inputID + '":"' + $temp.value + '"';
        $tempInputArray.push($input);
    }
    $arrayViews.push('{' + $tempInputArray.toString() +'}');
    $inputArrayToString = $arrayViews.toString();
    $jsonString = '{ "database" : [' + $inputArrayToString + ']}';
    console.log($jsonString);
}

function printJSONDB (elementID) {
    $dataToPrint = JSON.parse($jsonString);                         //gör  jasonString till object för att sen kunna jobba på den
    $resultsField = document.getElementById(elementID);           //där ska resultatet skrivas ut
    $resultsField.innerHTML = "";                                //tömmer
    for (var i = 0; i < $arrayViews.length; i++) {
        if ($dataToPrint.database[i].myID === $itemNameforReview) {
            $resultsField.innerHTML += (" Stars: " + $dataToPrint.database[i].stars + "<br>" + " Name: " + $dataToPrint.database[i].firstName +  "<br>" + " Message: " + $dataToPrint.database[i].textareans + "<br>" + "<hr>");
        }
    }
}


