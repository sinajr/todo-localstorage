let $=document;
let addBtn= $.getElementById('addTodo');
let inpt=$.getElementById('inpt-todo');
let showT=$.getElementById('show-toDo');
let rmLastItem=$.querySelector('#rmTodo');


let todoArr=[]
let todoCounter=0;
function addTodo(){
    addBtn.addEventListener('click',()=>{
        if(inpt.value!=""){
            let inptVal=inpt.value;
            let newArr={id:todoCounter,toDo:inptVal}
            todoArr.push(newArr);
            // let lastitem=todoArr[todoArr.length-1];
            arrayToText(newArr.toDo,newArr.id);

        }  
    })
}




function arrayToText(lastOne,id){
    let randomNum1 = Math.floor(Math.random()*255);
    let randomNum2 = Math.floor(Math.random()*255);
    let randomNum3 = Math.floor(Math.random()*255);
    console.log(randomNum3)
    showT.insertAdjacentHTML('beforeend',`
            <div data-counter="${id}" class="row d-flex justify-content-center flex-wrap my-3">
                <div style="background-color:rgb(${randomNum1},${randomNum2},${randomNum3})" class="border border-2 border-success rounded col-md-5 col-sm-5 col-lg-5 d-flex flex-nowrap">
                    <h4 class="text-center p-2 my-2 text-light col-10 my-1">${lastOne}</h4>
                    <i style="font-size:20px; cursor:pointer;" class="bi bi-trash text-center removeBtn col-2 text-danger align-self-center"></i>
                </div>
            </div>`)
            inpt.value="";
            localStorage.setItem('whatToDo',JSON.stringify(todoArr));
            removeTodo()
            todoCounter++
}
addTodo()
inpt.addEventListener('keydown',(e)=>{
    if(e.code=="Enter" && inpt.value!=""){
        let inptVal=inpt.value;
        let newArr={id:todoCounter,toDo:inptVal}
        todoArr.push(newArr);
        // let lastitem=todoArr[todoArr.length-1];
        arrayToText(newArr.toDo,newArr.id);
    }
})

function removeTodo(){
    let removebt=$.querySelectorAll('.removeBtn');
    let arryItems=JSON.parse(localStorage.getItem('whatToDo'));
    let effectiveValue = [];
    removebt.forEach(btn=>{
        btn.addEventListener('click',(e)=>{
            let elementSelector=e.target.parentElement.parentElement;
            let indexfinder=e.target.parentElement.parentElement.dataset.counter;
            // arryItems.forEach(ee=>{
            //     return  ee.id==indexfinder;
            // })
            // let testValue = e.previousElementSibling.innerHTML;
            let newValue = JSON.parse(localStorage.getItem('whatToDo'));
            
            for(let i = 0; i < newValue.length; i++)
            {
                if(Number(newValue[i].id) === Number(indexfinder))
                    continue;
                else
                    effectiveValue.push(newValue[i]);
            }
            console.log(indexfinder);
            elementSelector.remove();
            arryItems = [...effectiveValue];
            effectiveValue = [];
            localStorage.setItem('whatToDo',JSON.stringify(arryItems));
        })
        localStorage.setItem('whatToDo',JSON.stringify(arryItems));
    })
}

rmLastItem.addEventListener('click',()=>{
    let setMyArr=JSON.parse(localStorage.getItem('whatToDo'));
        setMyArr=setMyArr.slice(0,-1)
    localStorage.setItem('whatToDo',JSON.stringify(setMyArr));
    showT.lastElementChild.remove()
})

window.addEventListener('load',()=>{
    let myarr= JSON.parse(localStorage.getItem('whatToDo'));
    if(myarr.length !== 0){
        let lastitem=myarr[myarr.length-1];
        todoCounter = Number(lastitem.id);
        todoArr=myarr
        todoArr.forEach(elem=>{
        arrayToText(elem.toDo,elem.id);
    })
    }
})