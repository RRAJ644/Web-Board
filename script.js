let optCont = document.querySelector(".opt-cont")
let optFlag = true
let toolsCont = document.querySelector(".tools-cont")
let pencilToolCont = document.querySelector(".pencil-tool-cont")
let eraserToolCont = document.querySelector(".eraser-tool-cont")
let pencil = document.querySelector("#pencil")
let eraser = document.querySelector("#eraser")
let pencilFlag = false
let eraserFlag = false
let stickyNotes = document.querySelector("#stickynotes")
let upload = document.querySelector("#upload")

optCont.addEventListener("click",(e)=>{
    optFlag = !optFlag
    if (optFlag) {
        openTools()
    }
    else{
        closeTools()
    }
})
function openTools() {
    let iconElem = optCont.children[0];
    iconElem.classList.remove("fa-times")
    iconElem.classList.add("fa-bars")
    toolsCont.style.display = "flex"
    // pencilToolCont.style.display = ""
    // eraserToolCont.style.display = ""
}
function closeTools() {
    let iconElem = optCont.children[0];
    iconElem.classList.remove("fa-bars")
    iconElem.classList.add("fa-times")
    pencilToolCont.style.display = "none"
    eraserToolCont.style.display = "none"
    toolsCont.style.display = "none"
}
pencil.addEventListener("click", (e)=>{
    pencilFlag = !pencilFlag
    if (pencilFlag) {
        pencilToolCont.style.display="block"
    } else {
        pencilToolCont.style.display="none"
    }
})
eraser.addEventListener("click", (e)=>{
    eraserFlag = !eraserFlag
    if (eraserFlag) {
        eraserToolCont.style.display="flex"
    } else {
        eraserToolCont.style.display="none"
    }
})
stickyNotes.addEventListener("click",(e)=>{
    let stickyCont =  document.createElement("div")
    stickyCont.setAttribute("class", "sticky-cont")
    stickyCont.innerHTML = `
    <div class="header-cont">
        <div class="minimise">
           <i class="fa-solid fa-minus"></i>
        </div>
        <div class="remove">
           <i class="fa-solid fa-xmark"></i>
        </div>
    </div>
    <div class="note-cont">
       <textarea spellcheck="false"></textarea>
    </div>
    `
    document.body.appendChild(stickyCont)

    let minimise = stickyCont.querySelector(".minimise")
    let remove = stickyCont.querySelector(".remove")
    notesActions(minimise, remove, stickyCont)

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event)
    }
    stickyCont.ondragstart = function () {
        return false
    }
})


function notesActions(minimise, remove, stickyCont) {
    remove.addEventListener("click", (e)=>{
        stickyCont.remove();
    })
    minimise.addEventListener("click",(e)=>{
        let noteCont = stickyCont.querySelector(".note-cont")
        let display = getComputedStyle(noteCont).getPropertyValue("display")
        if (display==="none") {
            noteCont.style.display = "block"
        }
        else{
            noteCont.style.display = "none"
        }
    })
}

function dragAndDrop(element, event) {
    element.onmousedown = function(event) {

        let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;
      
        element.style.position = 'absolute';
        element.style.zIndex = 1000;
        moveAt(event.pageX, event.pageY);
        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // drop the ball, remove unneeded handlers
        element.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          element.onmouseup = null;
        };
      
      };
      
      element.ondragstart = function() {
        return false;
      };
}

upload.addEventListener("click",(e)=>{
    let input = document.createElement("input")
    input.setAttribute("type","file")
    input.click()

    input.addEventListener("change",(e)=>{
       let file =  input.files[0];
       let url = URL.createObjectURL(file)

       let stickyCont =  document.createElement("div")
       stickyCont.setAttribute("class", "sticky-cont")
       stickyCont.innerHTML = `
       <div class="header-cont">
           <div class="minimise">
            <i class="fa-solid fa-minus"></i>
           </div>
        <div class="remove">
           <i class="fa-solid fa-xmark"></i>
        </div>
        </div>
        <div class="note-cont">
           <img src="${url}">
        </div>
        `
    document.body.appendChild(stickyCont)

    let minimise = stickyCont.querySelector(".minimise")
    let remove = stickyCont.querySelector(".remove")
    notesActions(minimise, remove, stickyCont)

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event)
    }
    stickyCont.ondragstart = function () {
        return false
    }

    })
    
})

