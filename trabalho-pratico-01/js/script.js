window.addEventListener('load', start);

console.log("TRABALHO PRATICO - 01");

var redInput = null;
var greenInput = null;  
var blueInput = null;
var redValue = null;
var greenValue = null;
var blueValue = null;
var color_quad = null;
var background = null;

function start(){
  redInput = document.querySelector("#redInput");
  greenInput = document.querySelector("#greenInput");
  blueInput = document.querySelector("#blueInput");

  redValue = document.querySelector("#redValue");
  greenValue = document.querySelector("#greenValue");
  blueValue = document.querySelector("#blueValue");

  color_quad = document.querySelector("#color-quad");
  background = document.querySelector("body");

  redInput.addEventListener('input',setColor);
  greenInput.addEventListener('input',setColor);
  blueInput.addEventListener('input',setColor);

  setColor();
}

function setColor(){
  var R = parseInt(redInput.value, 10);
  var G = parseInt(greenInput.value, 10);
  var B = parseInt(blueInput.value, 10);

  redValue.value = R;
  greenValue.value = G;
  blueValue.value = B;

  var rgbCSS = "rgb(" + R + "," + G+ "," + B + ")";

  color_quad.style.backgroundColor = rgbCSS;
  background.style.backgroundColor = rgbCSS;
}