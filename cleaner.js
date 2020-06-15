const input = document.querySelector("#csvFile");
const comparisonArea = document.querySelector(".data-comparison");
const saveArea = document.querySelector(".data-save");
const imgClean = document.querySelector(".data-images-clean");
const imgCheck = document.querySelector(".data-images-check");
const dataClassName = document.querySelector(".data-classname");
const save = document.querySelector("#saveCSV");

let currentLine = 0;
let originalDataArray = [];
const resultDataArray = [];


const processCSV = (event) => {
  const csvFile = event.currentTarget.files[0];
  dataClassName.innerText = csvFile.name.replace(/\..+/,"");
  if (window.FileReader) {
    // FileReader are supported.
    currentLine = 0;
    getAsText(csvFile);
  } else {
      alert('FileReader are not supported in this browser.');
  }
}

const getAsText = (fileToRead) => {
  const reader = new FileReader();
  // Read file into memory as UTF-8
  reader.readAsText(fileToRead);
  // Handle errors load
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
};

const loadHandler = (event) => {
  const csv = event.target.result;
  // console.log(event, csv);
  processData(csv);
};

const processData = (csv) => {
  originalDataArray =  csv.split(/\r\n|\n/);
  resultDataArray.push(originalDataArray[0])
  // console.log(originalDataArray);
  initalizeComparison();
  showANewImage();
};

const errorHandler = (evt)  => {
  if(evt.target.error.name == "NotReadableError") {
      alert("Cannot read file !");
  }
};

const initalizeComparison = () => {
  imgClean.innerHTML =
  `
    <img src="${originalDataArray[0]}" alt="image to be checked">
    <p>Clean image</p>
  `;
  comparisonArea.style.display = "block";
  saveArea.style.display = "block";
};

const showANewImage = () => {
  currentLine += 1;

  if (currentLine >= originalDataArray.length) {
    imgCheck.innerHTML = `<p>Great, no more images!</p>`
    return;
  }

  imgCheck.innerHTML =
  `
    <img src="${originalDataArray[currentLine]}" alt="image to be checked">
    <p>Image to check</p>
  `;
};

const likeDislike = (event) => {
  if (event.key === "p")  {
    // If the image to be checked is cleaned, we keep it
    if (originalDataArray[currentLine]) resultDataArray.push(originalDataArray[currentLine]);
    showANewImage();
  }
  if (event.key === "q")  {
    // If not is cleaned, we don't
    showANewImage();
  }

  // console.log(resultDataArray);
}

const saveCSV = () => {
  const str = encodeURI(resultDataArray.join('\n'));
  const uri = 'data:text/csv;charset=utf-8,' + str;

  const downloadLink = document.createElement("a");
  downloadLink.href = uri;
  downloadLink.download = dataClassName.innerText;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

input.addEventListener("change", processCSV);
document.addEventListener("keyup", likeDislike);
save.addEventListener("click", saveCSV)
