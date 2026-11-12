// getPrinters() should be at the beginning
var printers = dymo.label.framework.getPrinters(); //Get list of DYMO printers installed
console.log("printers: " + printers);
printerSelected = printers[0]["name"];
console.log("printerSelected: " + printerSelected);
dymo.label.framework.init();
var result = dymo.label.framework.checkEnvironment();
console.log("isBrowserSupported: " + result.isBrowserSupported);
console.log("isFrameworkInstalled: " + result.isFrameworkInstalled);
if(dymo.label.framework.init){
    console.log("isWebServicePresent: " + result.isWebServicePresent);
}
console.log("errorDetails: " + result.errorDetails);		

var label = dymo.label.framework.openLabelXml(simpleXML);

var check1=label.isValidLabel(); //Validate if the current content is a valid label based on the current service installed
var check2=label.isDCDLabel(); //Validate if the current content is a valid DYMO Connect label based on DYMO Connect service
var check3=label.isDLSLabel(); //Validate if the current content is a valid DYMO Label Software label based on DYMO Label Software service
console.log("label check1: " + check1 + ', check2: ' + check2 + ', check3: ' + check3);

label.print(printerSelected);


