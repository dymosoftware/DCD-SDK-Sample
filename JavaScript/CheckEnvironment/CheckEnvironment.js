//----------------------------------------------------------------------------
//
//  $Id: CheckEnvironment.js 38773 2015-09-17 11:45:41Z nmikalko $ 
//
// Project -------------------------------------------------------------------
//
//  DYMO Label Framework
//
// Content -------------------------------------------------------------------
//
//  DYMO Label Framework JavaScript Library Samples: Check Environment
//
//----------------------------------------------------------------------------
//
//  Copyright (c), 2010, Sanford, L.P. All Rights Reserved.
//
//----------------------------------------------------------------------------


(function() {
    // called when the document completly loaded
    function onload() {
        var checkButton = document.getElementById('checkButton');
        var outputDiv = document.getElementById('output');

        function clearOutput() {
            while (outputDiv.children.length > 0)
                outputDiv.removeChild(outputDiv.firstChild);
        }

        function outputLine(text) {
            var elem = document.createElement("div");
            elem.appendChild(document.createTextNode(text));

            outputDiv.appendChild(elem);
        }


        // prints the label
        checkButton.onclick = function() {
            try {
                //clearOutput();
                var result = dymo.label.framework.checkEnvironment();
                outputLine(" ");
                outputLine("isBrowserSupported: " + result.isBrowserSupported);
                outputLine("isFrameworkInstalled: " + result.isFrameworkInstalled);
				if(dymo.label.framework.init){
					outputLine("isWebServicePresent: " + result.isWebServicePresent);
				}
                outputLine("errorDetails: " + result.errorDetails);				
            }
            catch(e) {
                alert(e.message || e);
            }
        }
    };
	
	
	
	function initTests() {
		if(dymo.label.framework.init) {
			//dymo.label.framework.trace = true;
			dymo.label.framework.init(onload);
		} else {
			onload();
		}
	}

	// register onload event
	if (window.addEventListener)
		window.addEventListener("load", initTests, false);
	else if (window.attachEvent)
		window.attachEvent("onload", initTests);
	else
		window.onload = initTests;
	
	

} ());