let addBtn = document.querySelector('.add-btn');
let removeBtn = document.querySelector('.rem-btn');
let modalCont = document.querySelector('.modal-cont');
let mainCont = document.querySelector('.main-cont');
let textAreaCont = document.querySelector('.textarea-cont');
let addFlag= false;
let removeFlag = false;
let allPriorityColors = document.querySelectorAll('.priority-colors');
let colors = [ "color1","color2","color3","color4"];
let modalPriorityColor = colors[colors.length-1];
let lockElem = document.querySelectorAll('.ticket-lock');
let toolboxBoxColors = document.querySelectorAll('.color');

let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";

let ticketArr = [];

for(let i=0;i<toolboxBoxColors.length;i++){
    toolboxBoxColors[i].addEventListener("click", (e) => {
        let currentToolBoxColor = toolboxBoxColors[i].classList[0];

        let filteredTickets = ticketArr.filter((ticketObj, idx) => {
            return currentToolBoxColor === ticketObj.ticketColor;
        })

        let allTicketsCont = document.querySelectorAll('.ticket-cont');

        for(let i = 0;i < allTicketsCont.length ; i++){
            allTicketsCont[i].remove();
        }

        filteredTickets.forEach((ticketObj, idx) => {
            createTicket(ticketObj.ticketColor,ticketObj.ticketTask,ticketObj.ticketId);
        })

    })
    toolboxBoxColors[i].addEventListener("dbclick" , (e) => {
        let allTicketsCont = document.querySelectorAll('.ticket-cont');

        for(let i = 0;i < allTicketsCont.length ; i++){
            allTicketsCont[i].remove();
        }

        ticketArr.forEach((ticketObj,idx)=>{
            createTicket(ticketObj.ticketColor,ticketObj.ticketTask,ticketObj.ticketId);
        }) 

    })

}



allPriorityColors.forEach((colorElem, idx) => {
    colorElem.addEventListener("click",(e)=>{
        allPriorityColors.forEach((priorityColorElem,idx)=>{
            priorityColorElem.classList.remove("default");
        })
        colorElem.classList.add("default");

        modalPriorityColor = colorElem.classList[1];
    })
})

addBtn.addEventListener("click",(e)=>{
    addFlag=!addFlag; 
    if(addFlag){
        modalCont.style.display="flex";
        
    }else{
        modalCont.style.display="none";
    }

   
})

removeBtn.addEventListener("click",(e)=>{
    removeFlag=!removeFlag;
})

modalCont.addEventListener("keydown",(e)=>{
    let key = e.key;
    if(key=="Shift"){
        createTicket(modalPriorityColor,textAreaCont.value,shortid());
        setModalDefault();
        addFlag=false;
    }
})


function createTicket(ticketColor,ticketTask,ticketId){
    let id = ticketId || shortid();
    let ticketCont = document.createElement('div');
    ticketCont.setAttribute("class","ticket-cont");
    ticketCont.innerHTML =`
    <div class="ticket-color ${ticketColor}"></div>
    <div class="ticket-id">#${ticketId}</div>
    <div class="task-area">${ticketTask}.</div>
    <div class="ticket-lock">
        <i class="fa-solid fa-lock"></i>
    </div>
    `;
    mainCont.appendChild(ticketCont);

    if(!ticketId) ticketArr.push( { ticketColor,ticketTask,ticketId: id } );

    handleRemoval(ticketCont);
    handleLock(ticketCont);
    handleColor(ticketCont);
}
function handleRemoval(ticket){
    if(removeFlag){
        ticket.remove();
    }

}


function handleLock(ticket){
    let ticketLockElem = ticket.querySelector('.ticket-lock');
    let ticketLock = ticketLockElem.children[0];
    let ticketTaskArea = ticket.querySelector('.task-area');
    ticketLock.addEventListener("click",(e)=> {
        if(ticketLock.classList.contains(lockClass)){
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            ticketTaskArea.setAttribute("contenteditable", "true");

        }else{
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable", "false");

        }

    })
}


function handleColor(ticket){
    let ticketColor = ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click",(e)=> {

   
    let currentTicketColor = ticketColor.classList[1];
    //get ticketColor index

    let currTicketColorIndex = colors.findIndex((color)=>{
         return currentTicketColor === color;
    })

    currTicketColorIndex++;
    let newTicketColorIndex = currTicketColorIndex%colors.length;
    let newTicketColor = colors[newTicketColorIndex];
    ticketColor.classList.remove(currentTicketColor);
    ticketColor.classList.add(newTicketColor);
})
}



function setModalDefault(){
        modalCont.style.display="none";
        textAreaCont.value="";
        modalPriorityColor = colors[colors.length-1];
        allPriorityColors.forEach((priorityColorElem,idx)=>{
            priorityColorElem.classList.remove("default");
        })
        allPriorityColors[allPriorityColors.length-1].classList.add("default");
    }