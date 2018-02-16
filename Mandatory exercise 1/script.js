naviGation(); //denna function ska anropas direkt när man kommer till sidan för att kunna navigera


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

//function för att skapa listor med alla produktena
const printClothes = clothes.map(cloth =>
   `<ul>
      <img src="${cloth.url}">
     <li>${cloth.name}</li>
     <li>${cloth.price} kr</li> 
     <li>${cloth.description}</li> 
    </ul>`);
document.getElementById('products').innerHTML=printClothes; //skriver ut listor i html




//navigationen på sidan hanteras i denna funktion
function naviGation () {

    document.getElementById('showProducts').addEventListener('click', function(){
          this.style.backgroundColor = 'pink';
          document.getElementById('checkOutPage').style.backgroundColor = 'white';
          document.getElementById('products').style.display = 'block';
          document.getElementById('checkout').style.display = 'none';
    });

        document.getElementById('checkOutPage').addEventListener('click', function(){
        this.style.backgroundColor = 'pink';
        document.getElementById('showProducts').style.backgroundColor = 'white';
        document.getElementById('products').style.display = 'none';
        document.getElementById('checkout').style.display = 'block';
    });
};



//form validation function
function validateForm() {
    //validation for name
    let fname = document.forms["myForm"]["fname"].value;
    if ( (fname == "") || (isNaN(fname))){
        document.getElementsByTagName('p')[0].innerHTML='Your name must be filled out'; //skriva ut listor i html
        }

    //validation for last name
    let lname = document.forms["myForm"]["lname"].value;
    if (lname == ""){
        document.getElementsByTagName('p')[1].innerHTML='Your Last name must be filled out';
    }

    //validation for email
    let email = document.forms["myForm"]["email"].value;
    if (email == "" || email > 10 ){
        document.getElementsByTagName('p')[2].innerHTML='Invalid email adress';}

    //validation for adress
    let adress = document.forms["myForm"]["adress"].value;
    if (adress == "" || adress < 5  ){
        document.getElementsByTagName('p')[4].innerHTML="Enter correct adress ";}

    //validation for zip code
    let zip = document.forms["myForm"]["zip"].value;
    if (zip !== 4 ){
        document.getElementsByTagName('p')[5].innerHTML="Enter correct zip code! It should have 5 numbers. ";}

    //validation for zip code
    let city = document.forms["myForm"]["zip"].value;
    if (city == ""){
        document.getElementsByTagName('p')[6].innerHTML="Enter correct city name ";}

    console.log(`First name : ${fname}, Last name : ${lname} , Email: ${email},
                 Adress : ${adress}, Zip : ${zip}, City : ${city}`);
    return;
};

document.getElementById('subBtn').addEventListener("click", validateForm);






