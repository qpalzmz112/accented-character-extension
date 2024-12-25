const textElement = "button";

/*
Font size selector
*/
let fontInput = document.getElementById("fontSizeInput");
function updateFontSize(event) {
  let size = fontInput.value;
  for (i = 0; i < document.getElementsByTagName(textElement).length; i++) {
    document.getElementsByTagName(textElement)[i].style.fontSize =
      1.333333 * size + "px";
  }
  chrome.storage.local.set({ fontSize: fontInput.value }, () =>
    console.log("font size successfully saved")
  );
}
fontInput.addEventListener("keydown", updateFontSize);
fontInput.addEventListener("click", updateFontSize);

/*
Font selector
*/
document.getElementById("Arial").addEventListener("click", () => {
  updateFont("Arial");
});
document.getElementById("Times New Roman").addEventListener("click", () => {
  updateFont("Times New Roman");
});
function updateFont(font) {
  for (i = 0; i < document.getElementsByTagName(textElement).length; i++) {
    document.getElementsByTagName(textElement)[i].style.fontFamily = font;
  }
  chrome.storage.local.set({ font: font }, () =>
    console.log("font successfully saved")
  );
}

/*
Copying text to clipboard
*/
let buttons = document.getElementsByClassName("copyOnClick");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    navigator.clipboard.writeText(buttons[i].innerHTML);
  });
}

/*
Loading data
*/
chrome.storage.local.get(["fontSize"], function (s) {
  if (!s.fontSize) {
    fontInput.value = 12;
    console.log("default font size applied");
  } else {
    for (i = 0; i < document.getElementsByTagName(textElement).length; i++) {
      fontInput.value = s.fontSize;
      document.getElementsByTagName(textElement)[i].style.fontSize =
        1.33333 * fontInput.value + "px";
    }
    console.log("font size successfully loaded");
  }
});
chrome.storage.local.get(["font"], function (s) {
  if (!s.font) {
    updateFont("Arial");
    document.getElementById("Arial").checked = true;
    console.log("default font applied");
  } else {
    updateFont(s.font);
    document.getElementById(s.font).checked = true;
  }

  console.log("font successfully loaded");
});
