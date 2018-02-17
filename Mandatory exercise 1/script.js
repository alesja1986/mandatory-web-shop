naviGation();

//navigationen på sidan hanteras i denna function
function naviGation () {

    document.getElementById('showProducts').addEventListener('click', function(){
        this.style.backgroundColor = 'lightblue';
        document.getElementById('checkOutPage').style.backgroundColor = 'white';
        document.getElementById('products').style.display = 'block';
        document.getElementById('checkout').style.display = 'none';
    });

    document.getElementById('checkOutPage').addEventListener('click', function(){
        this.style.backgroundColor = 'lightblue';
        document.getElementById('showProducts').style.backgroundColor = 'white';
        document.getElementById('products').style.display = 'none';
        document.getElementById('checkout').style.display = 'block';
    });
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
        url:'http://www.stockholmstemcells.se/images/stockholmstemcells.se/kvinna-ralph-lauren-skjortor-mercer-polo-68ZH.jpg'},

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

//function för att skapa listor med alla produktena i arrayn
let printClothes = clothes.map(cloth =>
   `<ul>
      <img src="${cloth.url}">
     <li>${cloth.name}</li>
     <li>${cloth.price} kr</li> 
     <li>${cloth.description}</li> 
    </ul>`);
printsClothes = printClothes.join(" "); // använder join("") för att bli av med comma tecknet som finns i arrayn
document.getElementById('products').innerHTML=printsClothes;

//form validation function
function validateForm() {

    //validation for name
    let fname = document.forms["myForm"]["fname"].value;
    if (fname == "" || isNaN(fname)===false){  //kollar om input saknas eller är ett nummer
               document.getElementsByTagName('p')[0].innerHTML='Korrekt förnamn måste fyllas i !';
     } else {  document.getElementsByTagName('p')[0].innerHTML = "";}

    //validation for last name
    let lname = document.forms["myForm"]["lname"].value;
    if (lname == "" || isNaN(lname)===false) { //kollar om input saknas eller är ett nummer
             document.getElementsByTagName('p')[1].innerHTML = 'Korrekt efternamn måste fyllas i !';
    }else {  document.getElementsByTagName('p')[1].innerHTML = "";}

    //validation for email
    let email = document.forms["myForm"]["email"].value;
    if (email == "" || email > 8 ){ //kollar om input saknas eller är för kort.
             document.getElementsByTagName('p')[2].innerHTML='Prova igen och fyll i din korrekta e-post adressen !';
    }else {  document.getElementsByTagName('p')[2].innerHTML = "";}

    //validation for adress
    let adress = document.forms["myForm"]["adress"].value;
    if (adress == "" || adress.length < 5  ){ //kollar om input saknas eller är för kort.
             document.getElementsByTagName('p')[4].innerHTML="Fyll i korrekt adress!";
    }else {  document.getElementsByTagName('p')[4].innerHTML = "";}

    //validation for zip code
    let zip = document.forms["myForm"]["zip"].value;
    if (zip.length !== 5 || isNaN(zip)){ //kollar att längden på input är 5 samt om den är inte ett nummer
             document.getElementsByTagName('p')[5].innerHTML="Postnummer måste bestå av fem siffror !";
    }else {  document.getElementsByTagName('p')[5].innerHTML = "";}

    //validation for city
    let city = document.forms["myForm"]["city"].value;
    if (city == "" || isNaN(city)===false){ //kollar om input saknas eller är ett nummer
             document.getElementsByTagName('p')[6].innerHTML="Skriv in korrekt stads namn ! ";
    }else {  document.getElementsByTagName('p')[6].innerHTML = "";}

    //testar om allt är utskrivet som det ska i consolen.
    console.log(`First name : ${fname}, Last name : ${lname} , Email: ${email},
                 Adress : ${adress}, Zip : ${zip}, City : ${city}`);
    return;
};

document.getElementById('subBtn').addEventListener("click", validateForm);






