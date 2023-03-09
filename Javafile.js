//============================================*_* variables *_*===============================================
//inputs
let discount =  document.getElementById("discount");
let ads = document.getElementById("ads");
let taxe = document.getElementById('taxe');
let price = document.getElementById("price");
let total  = document.getElementById("total");
let title = document.getElementById("input");

let Search = document.getElementById("Search");
let category = document.getElementById("category");
let count = document.getElementById("count");

//buttons 
let  del = document.getElementById("Delete");
let  update  = document.getElementById("Update");
let  searchByCategory = document.getElementById("SearchByCategory");
let  searchByTitle = document.getElementById("SearchByTitle");
let  create = document.getElementById("create");

let mood ='create';
let =searchmood ='Title';
let tmp ;

//localStorage.clear();
//============================================*_* FUNCTIONS *_*===============================================

function getTotal(){ // count the price of the prouduct  
    // in case of all price input has been entered 
    if (price.value != ''){
        let result =(+price.value + +ads.value  +  +taxe.value)- +discount.value ;
        total.innerHTML =  result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML =  '';
        total.style.background = ' rgb(165, 9, 165)';
    }
 }

 function clearData(){ //clear inputs

    title.value ='';
    ads.value='';
    taxe.value='';
    price.value='';
    total.value='';
    discount.value='';
    category.value='';
    count.value='';

 }

/*
        *_*  good point  *_*
        How to avoid to lose the data ??
*/
//save data in local storage using array 
let products ; // to save all product in one array 
if(localStorage.product !=null){ 
    // الهدف هنا اني مش كل مره احمل فيها الصفحه يعمل اراي فاضيه المفروض يسيب القديمه و يبداء عليها لو كان فيها داتا 
    products =JSON.parse(localStorage.product); 
    // product is local storage variable    ,   products is array has every thing 
}
else {products =[];}

// 1. create function
create.onclick = function(){

    let pro ={ // all information about the product 
        title:title.value,
        price:price.value,
        ads:ads.value,
        taxe:taxe.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
   
   //if(title.value!='' && price.value!='' && categorytitle.value!=''){
        if (mood === 'create'){
            if (pro.count > 1 ){
                    for(let i =0 ; i< pro.count ;i++ ) {products.push(pro);}
                } 
            else{products.push(pro);}
            total.innerHTML ='';
        
        } 
        else{ 
            //update
            products[tmp] = pro;
            total.innerHTML ='';
            create.innerHTML = 'create'; // after update make it create again as a defult 
            count.style.display='block';  
        }
    

   
   

    
    localStorage.setItem('product',JSON.stringify(products)); // عمل متعير يحفظ فيه الداتا في ال localstorage 
    // clear  data from input 
    clearData();
    showData();
 }
// 2. read function 
 function showData(){
    let  table ='';
    
    for( let i = 0  ; i < products.length ; i++){
        
        table+=`
        <tr>
        <td>${i}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxe}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick='updateData(${i})' id="Update">Update</button></td>
        <td><button onclick='deleteData(${i})'   id="Delete">Delete</button></td>
        </tr>`;
        
     
       
    }
    document.getElementById('tablebody') .innerHTML =table; 

    let delall = document.getElementById('deleteall');

        if(products.length > 0){
          
           delall.innerHTML=`<button onclick ='deleteAll()'>Delete All</button>`;

        }
        else{delall.innerHTML=``;}
   
   
}
// 3.Delete functions
 function deleteData(i){
    products.splice(i,1); // delete from jte array  products
    localStorage.product =JSON.stringify(products);  // to delete it from the local storage  by updating the array"product " and send it again to the local storage
    showData(); // to show all update in the same time without making reload 

   // problem is ------------------> اخر عمصر لما بيتمسح مش بيتعدل علي الشاشه انه ممسوح <--------------------
}
function deleteAll(){

     products.splice(0); // delete from the array  products
     localStorage.clear() ;  // to delete it from the local storage  by updating the array"product " and send it again to the local storage
     
     showData(); 

     // the same problem the update is not working in the screan <><><><><><><>
    
 }
//4.update 
 function updateData(i){

    // get all index from the array to inputs
    title.value =products[i].title ;
    price.value =products[i].price;
    taxe.value =products[i].taxe;
    ads.value =products[i].ads;
    discount.value =products[i].discount;
    category.value =products[i].category;
    getTotal();
    

    // the updates in the html 
    count.style.display='none'; // i do not need it now
    create.innerHTML= 'Update';
    mood = 'Update';
    tmp = i;
    scroll({
       top:0,
       behavior:"smooth" ,
    })


}
//6. search 
function searchMood(id){
    if(id=='SearchByTitle'){
        searchmood='Title';
        //Search.placeholder='Search By Title';
    }
    else{
        searchmood='Category';
        //Search.placeholder='Search By Category';
    }
    Search.placeholder='Search By '+searchmood;
    Search.focus();
    //  المفروض اني يدوس عليها يظهر لي كل الداتا و يمسح لي الموجودفي السيرش 
    Search.value=''; // عشان لما ادوس علي الزرار يمسح محتواها 
    showData();
}
function searchData(value){
    let table='';
    /*
    if(searchmood=='Title'){
        
        for( let i = 0  ; i < products.length ; i++){
            if(products[i].title.includes(value)){
                table+=`
                <tr>
                <td>${i}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxe}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button onclick='updateData(${i})' id="Update">Update</button></td>
                <td><button onclick='deleteData(${i})'   id="Delete">Delete</button></td>
                </tr>`;
                
            }
        }
        
    }else{
        for( let i = 0  ; i < products.length ; i++){
            if(products[i].category.includes(value)){
                table+=`
                <tr>
                <td>${i}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxe}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button onclick='updateData(${i})' id="Update">Update</button></td>
                <td><button onclick='deleteData(${i})'   id="Delete">Delete</button></td>
                </tr>`;
                
            }
        }
        
    }
*/
//---------------------------
    for( let i = 0  ; i < products.length ; i++){
        if(searchmood=='Title'){
            if(products[i].title.includes(value)){
                table+=`
                <tr>
                <td>${i}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxe}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button onclick='updateData(${i})' id="Update">Update</button></td>
                <td><button onclick='deleteData(${i})'   id="Delete">Delete</button></td>
                </tr>`;
                
            }

        }
        else{
            if(products[i].category.includes(value)){
                table+=`
                <tr>
                <td>${i}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxe}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button onclick='updateData(${i})' id="Update">Update</button></td>
                <td><button onclick='deleteData(${i})'   id="Delete">Delete</button></td>
                </tr>`;
                
            }
        }

    }

    //--------------------
    document.getElementById('tablebody') .innerHTML =table; 

}
// we can do serch when we write in search input not from the button 
// we use button only for know is it search by title or by category 

//======================================================*_* function calls *_*====================================
getTotal();
showData();
