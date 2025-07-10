onLoad();

function onLoad(){

  // To add Palettes on Load
  addPalettes(5,25);
  const Palettes = document.querySelectorAll('.palette');
  Palettes.forEach((Palette)=>{
    PaletteHoverFunc(Palette);
  })

  // To add Event Listener on Generate More Button
  const generateMoreBtn = document.querySelector(".generate-more-btn");
  generateMoreBtn.addEventListener("click", () => {
    addPalettes(5,35);
    const Palettes = document.querySelectorAll('.palette');
    Palettes.forEach((Palette)=>{
    PaletteHoverFunc(Palette);
  })
  });

}

function PaletteHoverFunc(Palette) {

  const PaletteColors = Palette.querySelectorAll(".palette-color");
  const totalColors = PaletteColors.length;

  PaletteColors.forEach((color, index) => {

    // To Generate Each new Color
    let newColor = generateColor();
    color.style.backgroundColor = newColor;

    // to format color Value (remove hashtag)
    let formattedColorValue = formatColorValue(newColor);

    //to assign hex value in P tag
    const text = color.querySelector("i");
    text.innerText= formattedColorValue;

    //to give White or Black color to text 
    let textColor = getContrastTextColor(formattedColorValue);
    text.style.color= `#${textColor}`;

    //copy to clipboard
    color.addEventListener("click", ()=>{
      navigator.clipboard.writeText(newColor);
      text.innerText= "";
      text.classList.add("fa-solid");
      text.classList.add("fa-circle-check");
      setTimeout(() => {
            text.innerText = formattedColorValue;
            text.classList.remove("fa-solid");
            text.classList.remove("fa-circle-check");
      }, 1000);
    });

    // When mouse is over the Color
    color.addEventListener("mouseover", () => {
      let columns = [];
      for (let i = 0; i < totalColors; i++) {
        columns.push(i === index ? "3fr" : "1fr");
      }
      Palette.style.gridTemplateColumns = columns.join(" ");
    });

    // When mouse Leaves Color
    color.addEventListener("mouseleave", () => {
      Palette.style.gridTemplateColumns = `repeat(${totalColors}, 1fr)`;
    });
    
    
  });


}

function generateColor(){

  const values = "123456789abcdef";
  let randomColor = "#";
  for(let i=0; i<6; i++){
    randomColor += values[Math.floor(Math.random()*15)];
  }

  return randomColor
}
 
function formatColorValue(newColor){
  let newStr= newColor.replace("#","").toUpperCase();
  return newStr
}
 
function getContrastTextColor(formattedColorValue) {
  const r = parseInt(formattedColorValue.substring(0, 2), 16);
  const g = parseInt(formattedColorValue.substring(2, 4), 16);
  const b = parseInt(formattedColorValue.substring(4, 6), 16);
  return ((r * 299 + g * 587 + b * 114) / 1000 >= 128 ? "000000" : "FFFFFF")
  // returns black or white color based on the given background color
}


function addPalettes(noOfColors,times) { 

  const container= document.querySelector(".palettes-container");

  // Create one .palette block
  let paletteHTML = '<div class="palette">';
  for (let i = 0; i < noOfColors; i++) {
    paletteHTML += `<div class="palette-color"><i></i></div>`;
  }
  paletteHTML += '</div>';

  // Insert the .palette block N times
  for (let i = 0; i < times; i++) {
    container.insertAdjacentHTML("beforeend", paletteHTML);
  }
}

 
