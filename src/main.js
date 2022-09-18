//==================================== main.js ===================================//


//--------------------------------- Description ----------------------------------//
//
// This file contains all methods to translate a CSV file into a COBOL Copy
//
//--------------------------------------------------------------------------------//


//----------------------------------- Authors ------------------------------------//
//
// Sébastien HERT
//
//--------------------------------------------------------------------------------//


//------------------------------- Global Variables -------------------------------//
//
var csvLines;
// 
//--------------------------------------------------------------------------------//


//------------------------------- Global Constants -------------------------------//
//
const FILE_NAME = "GeneratedCSV.csv";
const PARSER = ";"; 
const ENCODING = 'ISO-8859-1';
const NEWLINE = "\n"
// 
//--------------------------------------------------------------------------------//


//------------------------------------- Main -------------------------------------//
//

// this part contains the event Listener used to display the choosen file's name
const actualBtn = document.getElementById('txtFile');
const fileChosen = document.getElementById('chosenFile');
actualBtn.addEventListener('change', function(){
	fileChosen.textContent = this.files[0].name
})

/**
* Description : Generates the COBOL Copy with the given file
*
* Input :
* - None
*
* Output :
* - None
*
* Authors :
* - Sébastien HERT
*/
function generateCSV() {
	
	// Getting the File
	var txtFile = document.getElementById("txtFile");

	console.log(txtFile);
	
	// Init the lines
	csvLines = [];
	
	// Reading the file
	this.readFile(txtFile);
}

function readFile(file){
	var reader = new FileReader();
	
	reader.onload = function(e){
		var content = reader.result;
		var lines = content.replaceAll('\r', '').split('\n');
		
		// For each line
		var currentCSVLine = new Line();
		
		lines.forEach(line => {
			
			// Init of the first Char and the lineContent
			var firstChar = "";
			var lineContent = "";
			if (line.length > 0) {
				firstChar = line.substring(0, 1);
				lineContent = line.substring(1, line.length);
			}
			
			// Depending of the first Char
			switch (firstChar) {
				case "0":
					currentCSVLine.element0 = lineContent;
					break;
				case "1":
					currentCSVLine.element1 = lineContent;
					break;
				case "2":
					currentCSVLine.element2 = lineContent;
					break;
				case "3":
					currentCSVLine.element3 = lineContent;
					break;
				case "4":
					currentCSVLine.element4 = lineContent;
					break;
				case "5":
					currentCSVLine.element5 = lineContent;
					break;
				case "6":
					currentCSVLine.element6 = lineContent;
					break;
				case "7":
					currentCSVLine.element7 = lineContent;
					break;
				case "8":
					currentCSVLine.element8 = lineContent;
					break;
				case "9":
					currentCSVLine.element9 = lineContent;
					break;
				case "*":
					csvLines.push(currentCSVLine);
					currentCSVLine = new Line();
					break;				
				default:
					break;
			}
		});

		// We add the last 
		csvLines.push(currentCSVLine);
		download();
	}
	reader.readAsText(file.files[0], ENCODING);
	
}

function download() {
	console.log(csvLines);

	// Generate text
	var text = "";
	csvLines.forEach(csvLine => {
		console.log(csvLine);
		console.log(csvLine.toString());
		text = text+csvLine.toString();
	});

	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', FILE_NAME);
	
	element.style.display = 'none';
	document.body.appendChild(element);
	
	element.click();
	
	document.body.removeChild(element);
}

//--------------------------------------------------------------------------------//

//================================== Class Line ==================================//

//--------------------------------- Description ----------------------------------//
//
// Contains the structure of a CSV line
//
//--------------------------------------------------------------------------------//

class Line {
	element0 = "";
	element1 = "";
	element2 = "";
	element3 = "";
	element4 = "";
	element5 = "";
	element6 = "";
	element7 = "";
	element8 = "";
	element9 = "";
	
	//--------------------------------- Constructor ----------------------------------//
	
	constructor(){}
	
	//--------------------------------------------------------------------------------//
	
	toString(){
		return this.element0 + PARSER
		+ this.element1 + PARSER
		+ this.element2 + PARSER
		+ this.element3 + PARSER
		+ this.element4 + PARSER
		+ this.element5 + PARSER
		+ this.element6 + PARSER
		+ this.element7 + PARSER
		+ this.element8 + PARSER
		+ this.element9 + NEWLINE;
	}
}

//================================================================================//