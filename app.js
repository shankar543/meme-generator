const canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');
let isMemeReady=false;
const image = document.querySelector("#image");
const createbtn=document.querySelector("#create");
createbtn.classList.add("disabled");
const downloadbtn=document.querySelector("#download");
downloadbtn.classList.add("disabled")
const quote = document.querySelector("#quote");
let fontstyles = document.querySelector(".fontstyles");
fontstyles.style.display='none'
let editicon = document.querySelector('.edit-icon');
let quotes=[];
let myFontColors=[];
ctx.fillStyle="black";
ctx.strokeStyle="white";
ctx.font="30px Arial"
ctx.lineWidth=2;
let fontSize=30;
const maxWidth = canvas.width - 30; // Maximum width for the text (adjust as needed)
const lineHeight = 45; // Height of each line (adjust as needed)
const yOffset  = 150;
let fontList = [
    'Arial',
    'Verdana',
    'Helvetica',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
    'Palatino',
    'Tahoma',
    'Century Gothic',
    'Lucida Sans',
    'Calibri',
    'Trebuchet MS',
    'Book Antiqua',
    'Arial Black',
    'Impact',
    'Comic Sans MS',
    'Franklin Gothic Medium',
    'Copperplate Gothic',
    'Baskerville',
    'Futura',
    'Gill Sans',
    'Optima',
    'Brush Script MT',
    'Didot',
    'Bodoni MT',
    'Rockwell',
    'Myriad Pro',
    'Cambria',
    'Candara',
    'Consolas',
    'Corbel',
    'Eurostile',
    'Franklin Gothic',
    'Helvetica Neue',
    'Hoefler Text',
    'Monaco',
    'OCR A',
    'Papyrus',
    'Segoe UI',
    'Trade Gothic',
    'Univers',
    'Vivaldi',
    'Zapfino',
    'Cooper Black',
    'Lobster',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat'
  ];
  const ctxFonts = [
    'bold 48px Impact, sans-serif',
    'italic 46px Comic Sans MS, cursive',
    'bold 44px Lobster, cursive',
    '44px Arial, sans-serif',
    'italic 42px Verdana, sans-serif',
    'bold 48px Helvetica, sans-serif',
    'bold 40px Times New Roman, serif',
    '48px Georgia, serif',
    'italic 46px Courier New, monospace',
    '42px Tahoma, sans-serif',
    'bold 50px Palatino Linotype, serif',
    'italic 32px Garamond, serif',
    '60px Arial Black, sans-serif',
    'bold 36px Trebuchet MS, sans-serif',
    '64px Impact, sans-serif',
    'italic 24px Comic Sans MS, cursive',
    'bold 24px Lobster Two, cursive',
    '70px Pacifico, cursive',
    'bold 30px Anton, sans-serif',
    'italic 28px Monoton, cursive',
    'bold 28px Bangers, cursive',
    '76px Press Start 2P, cursive',
    '54px Courier New, monospace',
    'bold 20px Arial, sans-serif',
    'italic 24px Verdana, sans-serif',
    'bold 20px Helvetica, sans-serif',
    'bold 24px Times New Roman, serif',
    '20px Georgia, serif',
    'italic 22px Courier New, monospace',
    '22px Tahoma, sans-serif',
    'bold 20px Palatino Linotype, serif',
    'italic 22px Garamond, serif',
    '28px Arial Black, sans-serif',
    'bold 24px Trebuchet MS, sans-serif',
    '16px Impact, sans-serif',
    'italic 18px Comic Sans MS, cursive',
    'bold 18px Lobster Two, cursive',
    '22px Pacifico, cursive',
    'bold 20px Anton, sans-serif',
    'italic 18px Monoton, cursive',
    'bold 18px Bangers, cursive',
    '24px Press Start 2P, cursive',
    '16px Courier New, monospace',
    'bold 16px Arial, sans-serif',
    'italic 18px Verdana, sans-serif',
    'bold 16px Helvetica, sans-serif',
    'bold 18px Times New Roman, serif',
    '16px Georgia, serif',
    'italic 16px Courier New, monospace',
     // 3D Effect Font Styles
  'text-shadow: 3px 3px 0px #000, 5px 5px 0px rgba(255, 255, 255, 0.3)',
  'text-shadow: 4px 4px 0px #000, 6px 6px 0px rgba(255, 255, 255, 0.4)',
  'text-shadow: 5px 5px 0px #000, 7px 7px 0px rgba(255, 255, 255, 0.5)',
  // Animated Font Styles
  'animation: bounce 1s infinite',
  'animation: rotate 2s infinite',
  'animation: blink 1s infinite'
  ];
  
  
editicon.addEventListener("click",function(){
    let icon = editicon.querySelector('.icon')
    if(fontstyles.style.display=="none"){
        fontstyles.style.display = "block"
        icon.classList.remove('fa-arrow-circle-up');
        icon.classList.add('fa-arrow-circle-down');

    }
    else{
        fontstyles.style.display = "none";
        icon.classList.add('fa-arrow-circle-up');
        icon.classList.remove('fa-arrow-circle-down');
    }
})
createbtn.addEventListener("click",function(){
    if(!isMemeReady){return}
    creatememe()
})
quote.addEventListener("blur",function(event){
    createQuote();
    checkbtnStatus();
})
image.addEventListener('blur',(event)=>{
    checkbtnStatus();
});


function checkbtnStatus(){
    if(quote.value && image.value){
        isMemeReady=true;
        createbtn.classList.remove("disabled");
        createbtn.classList.add("active");
    }
    else{
        createbtn.classList.add("disabled");
        createbtn.classList.remove("active");
    }
}
function creatememe(){
    if(!isMemeReady){return}
    let img = new Image()
    // img.setAttribute("crossOrigin","anonymous")
    img.crossOrigin = "anonymous";
   img.onload=function(){
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    quote.value = quote.value?quote.value:currentQuote.text;
   if(quotes.length){
   drawAllQuotes();   
   }
    downloadbtn.classList.add("active");
    downloadbtn.classList.remove("disabled")   
}
let imageUrl = image.value;
let proxyUrl = `http://localhost:3000/proxy?url=${encodeURIComponent(imageUrl)}`;

   img.src = proxyUrl;
   let withoutProxy = false;
   img.onerror = function(e){
    if(withoutProxy){
        alert('error in loading image with out proxy please check server is upi')
        return}
    alert('error in loading image');
    imageUrl = image.value;
    withoutProxy=true;
    img.src = imageUrl;
    }
}


  


downloadbtn.addEventListener("click",function(event){
    let link = document.createElement("a");
    link.href=canvas.toDataURL();
    let saveas=image,value
    if(image.value.length>10){
saveas = prompt("give some name to identify the file")
    }
    link.setAttribute("download",saveas+".jpg");
    document.body.append(link)
    link.click();
    link.remove();
});
canvas.addEventListener("mousedown",function(event){
    event.preventDefault();
    let x = event.pageX - canvas.offsetLeft;
    let y  = event.pageY - canvas.offsetTop;
for(let quote of quotes){
if(x >= quote.x && x <= quote.x+ctx.measureText(quote.text).width && y >= quote.y-parseInt(fontSize) && y<=quote.y){
    quote.selected=true;
}
}
canvas.addEventListener('mousemove',movetext);
canvas.addEventListener('mouseup',function(){
    canvas.removeEventListener('mousemove',movetext);
    for(let quote of quotes){
        if(quote.selected){
            quote.selected=false;
        }
    }
    drawAllQuotes();
});
});

function drawAllQuotes(){
    for(let quote of quotes){
        // ctx.fillText(quote.text,quote.x,quote.y);
        wrapText(quote.text,quote.x,quote.y,maxWidth, lineHeight)
        
    }
}

function movetext(e){
let x = e.pageX-canvas.offsetLeft;
let y = e.pageY-canvas.offesetTop;
for(let quote of quotes){
    if(quote.selected){
        quote.x=x;
        quote.y=y + yOffset;
    }
}
}


document.addEventListener('keydown',(event)=>{
  if(event.code && event.code.toLowerCase() == 'enter'){
     createQuote();
    }

})

function createQuote(){
    let quoteObject={}
    quoteObject.text=JSON.parse(JSON.stringify(quote.value));
    quoteObject.x=50;
    quoteObject.y=50;
    quotes.length=0;
    quotes.push(quoteObject);
    drawAllQuotes();
}


// const quote = "This is a long quote that may overflow the canvas boundaries and needs to be wrapped onto the next line.";
function wrapText(text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      ctx.strokeText(line,x,y);
      line = word + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, y);
  ctx.strokeText(line,x,y);
}

let tools=["fillStyle","strokeStyle","lineWidth","customfonts","changeposition","mylocalcolors","changefontsize"]

function createColorElement(li){
    let colorELm = document.createElement("input");
    colorELm.setAttribute("type","color");
    let verticle = document.querySelector(".vertical")
    verticle.prepend(colorELm);
    colorELm.addEventListener("change",function(){
        ctx[tools.find(tool=>tool.toLowerCase() == li.innerText.toLowerCase())] = colorELm.value;
        creatememe();
        colorELm.remove();
    })
}

function addNumber(li){
let fontsizeelm = document.createElement("input");
fontsizeelm.setAttribute("type","number");
fontsizeelm.setAttribute("min",0);
let verticle = document.querySelector(".vertical")
    verticle.prepend(fontsizeelm);
fontsizeelm.addEventListener("blur",function(){
   ctx[tools.find(tool=>tool.toLowerCase() == li.innerText.toLowerCase())] = fontsizeelm.value;
   creatememe();
   fontsizeelm.remove()
})
}


function createToolBar(){
    let ul=document.createElement("ul");
    tools.forEach(tool=>{
let li = document.createElement("li");
li.getAttribute("value")
li.innerText=tool;
li.addEventListener("click",function(){
switch(li.innerText.toLowerCase()){
    case "fillstyle": { createColorElement(li);break;}
    case "strokestyle": {createColorElement(li);break;}
    case "linewidth": {addNumber(li); break;}
    case "font" :{addFont(li);break;}
    case "customfonts":{addCustomFont(li);break;}
    case "changeposition":{changeXandYpositionOfQuote(li);break;}
    case "stop positioning" : {changeXandYpositionOfQuote(li);break;} 
    case "mylocalcolors": {displayLocalColors(li);break;}
    case "changefontsize":{addRangeelement(li);break;}
}    
});
ul.appendChild(li);
});
// let verticle = document.querySelector('.vertical')
fontstyles.appendChild(ul);
}
function changeXandYpositionOfQuote(li){
    if(li.innerText=="changeposition"){
        li.innerText = "stop positioning"
        canvas.addEventListener('click',addXandYtoQuote)
    }
    else{
        li.innerText = "changeposition"
        canvas.removeEventListener('click',addXandYtoQuote)
    }

}

function addXandYtoQuote(event){
    const rect = canvas.getBoundingClientRect();
    const clickedX = event.clientX - rect.left  
    const clickedY = event.clientY - rect.top 
    for(let quote of quotes){
    quote.x = clickedX;
    quote.y = clickedY;
}
// drawAllQuotes();
creatememe();
}

function addFont(li){
    let fontSelectElm = document.createElement("select");
    for(let font of fontList){
        let optionElm = document.createElement('option')
        optionElm.value = font;
        optionElm.innerText = font
        fontSelectElm.appendChild(optionElm);
    }
    fontSelectElm.addEventListener('change',(e)=>{
        ctx[tools.find(tool=>tool.toLowerCase() == li.innerText.toLowerCase())] = e.target.value;
        // fontSize = parseInt(fontSelectElm.value.split(" ")[0])
        creatememe();
        fontSelectElm.remove();
        myFontColors.push(e.target.value);
        saveFontColorsToLocalStorage()
    })
    // fontSelectElm.setAttribute("type","text");
    // fontSelectElm.setAttribute("placeholder","20px Ariel")
    let verticle = document.querySelector(".vertical")
        verticle.prepend(fontSelectElm);
        fontSelectElm.addEventListener("blur",function(){
       
    })
}

function addCustomFont(li){
    let fontSelectElm = document.createElement("select");
    for(let font of ctxFonts){
        let optionElm = document.createElement('option')
        optionElm.value = font;
        optionElm.innerText = font
        fontSelectElm.appendChild(optionElm);
    }
    fontSelectElm.addEventListener('change',(e)=>{
        // ctx['font'] = e.target.value;
        applyTextStyle(e.target.value);
        // fontSize = parseInt(fontSelectElm.value.split(" ")[0])
        creatememe();
        fontSelectElm.remove()
    })
    // fontSelectElm.setAttribute("type","text");
    // fontSelectElm.setAttribute("placeholder","20px Ariel")
    let verticle = document.querySelector(".vertical")
        verticle.prepend(fontSelectElm);
        fontSelectElm.addEventListener("blur",function(){
       
    })
}

function add3dfont(){

}

function applyTextStyle(textStyle) {
    if (textStyle.startsWith('text-shadow:')) {
      // 3D Effect Style
      const shadowStyle = textStyle.substring(textStyle.indexOf(':') + 1).trim();
      ctx.shadowColor = shadowStyle.split(',')[0].trim();
      ctx.shadowBlur = parseInt(shadowStyle.split(',')[1].trim());
      ctx.shadowOffsetX = parseInt(shadowStyle.split(',')[2].trim().split(' ')[0]);
      ctx.shadowOffsetY = parseInt(shadowStyle.split(',')[2].trim().split(' ')[1]);
    } else if (textStyle.startsWith('animation:')) {
      // Animated Style
      const animationName = textStyle.substring(textStyle.indexOf(':') + 1).trim().split(' ')[0];
      const animationDuration = textStyle.substring(textStyle.indexOf(':') + 1).trim().split(' ')[1];
      const animationIteration = textStyle.substring(textStyle.indexOf(':') + 1).trim().split(' ')[2];
  
      canvas.classList.add('animate-text', animationName);
      canvas.style.animationDuration = animationDuration;
      canvas.style.animationIterationCount = animationIteration;
    } else {
      // Regular Font Style
      ctx.font = textStyle;

    }
  }

window.onload=function(){
createToolBar();
myFontColors = JSON.parse(localStorage.getItem("mylocalcolors"))
}

function saveFontColorsToLocalStorage(){
    localStorage.setItem("mylocalcolors",JSON.stringify(myFontColors))
}


function displayLocalColors(li){
    let fontSelectElm = document.createElement("select");
    for(let font of myFontColors){
        let optionElm = document.createElement('option')
        optionElm.value = font;
        optionElm.innerText = font
        fontSelectElm.appendChild(optionElm);
    }
    fontSelectElm.addEventListener('change',(e)=>{
        (e.target.value);
        fontSelectElm.remove()
    })

    let verticle = document.querySelector(".vertical")
        verticle.prepend(fontSelectElm);
    }


    function addRangeelement(li){
   let fontRangeElm = document.createElement('input');
   fontRangeElm.type="range";
   fontRangeElm.min = 3;
   fontRangeElm.max = 100;
   fontRangeElm.addEventListener('change',(e)=>{
let size = e.target.value + "px";
let text = ctx.fillStyle;
let currentsize = text.split(' ').filter(x=>x.includes('px'));
text = currentsize.length?text:'bold 16px Arial, sans-serif';
currentsize = text.split(' ').filter(x=>x.includes('px'))
text = text.replace(currentsize,size);
ctx.font = text
creatememe();
fontRangeElm.remove();
})
   let verticle = document.querySelector(".vertical")
    verticle.prepend(fontRangeElm);

    }