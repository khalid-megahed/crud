let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let category=document.getElementById('category')
let count=document.getElementById('count')
let total=document.getElementById('total')
let submit=document.getElementById('submit')


function getTotal()
{
if(price.value !=''){
let result = (+price.value + +taxes.value + +ads.value)- +discount.value ;
    total.innerHTML =result ;
    total.style.background ='#040'
}
else{
    total.innerHTML =""
    total.style.background ="red"
}
}
let datapro=[];
if(localStorage.product != null){
    datapro= JSON.parse(localStorage.product)
}else{
    datapro=[]
}


submit.onclick = function(){
    let newpro={
        title :title.value,
        price:price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count: count.value,
        category :category.value
        

    }

    if(newpro.count>1){
        for(let i=0 ; i< newpro.count; i++){
        datapro.push(newpro)}
    }else{
        datapro.push(newpro)
    }

   




    localStorage.setItem('product', JSON.stringify(datapro))
    clearData()
    showData()

}
    
    function clearData(){
        title.value ='';
        price.value ='';
        taxes.value ='';
        ads.value ='';
        discount.value ='';
        total.innerHTML ='';
        category.value ='';
        count.value ='';
    }

    function showData(){
        let table =""
        for(let i =0; i< datapro.length;i++){
            table +=
            `<tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick='update(${i})' id="update">update</button></td>
            <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
        </tr>`
        }

         document.getElementById('tbody').innerHTML=table;
         let btnDelete = document.getElementById('btnDelete')
         if(datapro.length> 0){
            btnDelete.innerHTML =`
            <button onclick='deleteall()'>delete all (${datapro.length})</button>
            `
         }else{
            btnDelete.innerHTML ="";
         }


    }
    
    function deleteData(i){
     datapro.splice(i,1);
     localStorage.product = JSON.stringify(datapro);
     showData()
    }



    function deleteall(){
        localStorage .clear()
        datapro .splice(0)
        showData()
    }
   
    function update(i){
        title.value =datapro[i].title
        price.value =datapro[i].price
        taxes.value =datapro[i].taxes
        ads.value =datapro[i].ads
        discount.value =datapro[i].discount
        getTotal()
        count.style.display= 'none'
        category.value =datapro[i].category
        submit.innerHTML ='update'
    }