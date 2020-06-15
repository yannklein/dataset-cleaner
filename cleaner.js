const input = document.querySelector("#csvFile");
const comparisonArea = document.querySelector(".data-comparison");
const imgClean = document.querySelector(".data-images-clean img");
const imgCheck = document.querySelector(".data-images-check img");
const dataClassName = document.querySelector(".data-classname");

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
  imgClean.src = originalDataArray[0];
  comparisonArea.style.display = "block";
};

const showANewImage = () => {
  currentLine += 1;
  imgCheck.src = originalDataArray[currentLine];
};

input.addEventListener("change", processCSV);
