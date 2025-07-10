const generateBtn = document.querySelector(".generate-btn");


generateBtn.addEventListener("mousedown", ()=>{
  generateBtn.style.transform = "translateY(0.1rem)";
})
generateBtn.addEventListener("mouseup", ()=>{
  generateBtn.style.transform = "translateY(-0.1rem)";
})


const copyBtn= document.querySelectorAll(".copy-btn");
const colors= document.querySelectorAll(".color");
 

// event listener when button clicked
generateBtn.addEventListener("click", ()=>{

    colors.forEach((color)=>{

    let newColor = generateColorr();
    color.style.backgroundColor = newColor;
    let hexValue =color.querySelector(".hex-value");
    hexValue.textContent= newColor;
    
    })

})

// function for generating color
const generateColorr = ()=>{

  const values = "123456789abcdef";
  let randomColor = "#";
  for(let i=0; i<6; i++){
    randomColor += values[Math.floor(Math.random()*15)];
  }

  return randomColor
}

//event listener for copy hex-value
colors.forEach((color)=>{

  color.addEventListener("click", ()=>{

     // to select text on clipboard
     let value =color.querySelector(".hex-value");
     navigator.clipboard.writeText(value.textContent);

     // to toggle the copy icon to tick
     let icon= color.querySelector(".copy-btn");

     icon.classList.remove("fa-copy");
     icon.classList.remove("fa-regular");
     icon.classList.add("fa-check");
     icon.classList.add("fa-solid");
     icon.classList.add("check-btn");

     setTimeout(() => {
      icon.classList.add("fa-copy");
      icon.classList.add("fa-regular");
      icon.classList.remove("fa-check");
      icon.classList.remove("fa-solid");
      icon.classList.remove("check-btn");

     }, 500); 
  })

})