//----------------------------------------------------------------------------
//
//  $Id: PreviewAndPrintLabel.js 10798 2010-01-16 22:38:52Z vbuzuev $ 
//
// Project -------------------------------------------------------------------
//
//  DYMO Label Framework
//
// Content -------------------------------------------------------------------
//
//  DYMO Label Framework JavaScript Library Samples: Preview and Print label
//
//----------------------------------------------------------------------------
//
//  Copyright (c), 2010, Sanford, L.P. All Rights Reserved.
//
//----------------------------------------------------------------------------


(function()
{
    // stores loaded label info
    var _label;

    // list of available layouts
    var _layoutFiles = [getLayout0(), getLayout1(), getLayout2(), getLayout3()];
    var _layouts = null;

    // list of available photo files
    var _photoFiles = ["Photos/photo0.png", "Photos/photo2.jpg"];

    // return list of available layouts, load them from file if nessesary
    function getLayouts()
    {
        if (_layouts == null)
        {
            // load layouts
            var result = new Array();
            var base = document.location.href;
            for (var i = 0; i < _layoutFiles.length; i++)
                result.push(dymo.label.framework.openLabelXml(_layoutFiles[i]));
            _layouts = result;
        }

        return _layouts;
    }

    // current data on the label. For simplicity we support one Text obje t and one Image object
    var _labelData = { text: "Name and other information" };

    // applies data to the label
    function applyDataToLabel(label, labelData)
    {
        var names = label.getObjectNames();

        for (var name in labelData)
            if (itemIndexOf(names, name) >= 0)
            label.setObjectText(name, labelData[name]);
    }

    // updates control states depend on available objects on the label
    function updateControls()
    {
        var selectPhotoButton = document.getElementById('selectPhotoButton');
        var textArea = document.getElementById('labelTextTextArea');

        var names = _label.getObjectNames();

        selectPhotoButton.disabled = itemIndexOf(names, 'photo') == -1;
        textArea.disabled = itemIndexOf(names, 'text') == -1;
    }

    /// replaces the last component of the url with fileName
    function replaceFileName(url, fileName)
    {
        var i = url.lastIndexOf('/');
        var r = url.substr(0, i + 1) + fileName;

        // fix for opera
        if (r.indexOf('file://localhost') == 0)
            r = r.replace('file://localhost', 'file://');

        return r;
    }

    // returns an index of an item in an array. Returns -1 if not found
    function itemIndexOf(array, item)
    {
        for (var i = 0; i < array.length; i++)
            if (array[i] == item) return i;

        return -1;
    }

    // loads the defualt layout at onload()
    function setupDefaultLayout()
    {
        _label = dymo.label.framework.openLabelXml(_layoutFiles[0]);
        applyDataToLabel(_label, _labelData);
    }

    // updates label preview image
    // Generates label preview and updates corresponend <img> element
    // Note: this does not work in IE 6 & 7 because they don't support data urls
    // if you want previews in IE 6 & 7 you have to do it on the server side
    function updatePreview()
    {
        if (!_label)
            return;

        var pngData = _label.render();

        var labelImage = document.getElementById('labelImage');
        labelImage.src = "data:image/png;base64," + pngData;
    }

    // called when clicked on a photo
    function photoClick(e)
    {
        var overlay = document.getElementById('dialog-overlay');
        var wrapper = document.getElementById('dialog-wrapper');

        var targ;
        var ee = e;
        if (!ee)
            ee = window.event;

        if (ee.target)
        {
            targ = ee.target;
        }
        else if (ee.srcElement)
        {
            targ = ee.srcElement;
        }
        if (targ.nodeType == 3) // defeat Safari bug
        {
            targ = targ.parentNode;
        }

        // save selected photo
        var url = targ.src;
        if (url.indexOf('file://localhost') == 0)
            url = url.replace('file://localhost', 'file://');

        _labelData.photo = dymo.label.framework.loadImageAsPngBase64(url);

        // update label
        applyDataToLabel(_label, _labelData);
        updatePreview();

        // close dialog
        wrapper.style.display = "none";
        overlay.style.display = "none";
    }

    // set "dialog" caption 
    function dialogSetCaption(caption)
    {
        header = document.getElementById('dialog-header');

        // remove old caption
        while (header.firstChild)
            header.removeChild(header.firstChild);

        // set new caption
        header.appendChild(document.createTextNode(caption));
    }

    // event handler for selectPhotoButton.onclick event
    function selectPhotoButtonClick()
    {
        var overlay = document.getElementById('dialog-overlay');
        var wrapper = document.getElementById('dialog-wrapper');
        var content = document.getElementById('dialog-content');


        // remove old content
        while (content.firstChild)
            content.removeChild(content.firstChild);

        // add photos
        for (var i = 0; i < _photoFiles.length; i++)
        {
            var a = document.createElement('a');
            //a.setAttribute("class", "photo");
            a.className = "photo";
            a.href = "javascript:void(0)";
            var img = document.createElement('img');
            //img.setAttribute("class", "photo");
            //img.className = "photo";
            img.src = replaceFileName(document.location.href, _photoFiles[i]);

            // this is to set the height to 100px. Just setting height is css does not work in IE
            //var height = 150;
            //img.width = img.width / img.height * height;
            //img.height = height;

            img.onclick = photoClick;
            //img.class = "photo";

            a.appendChild(img);
            content.appendChild(a);
        }

        // show dialog
        dialogSetCaption("Select Photo");
        overlay.style.display = "block";
        wrapper.style.display = "block";
    }

    // called when clicked on a layout
    function layoutClick(e)
    {
        var overlay = document.getElementById('dialog-overlay');
        var wrapper = document.getElementById('dialog-wrapper');

        var targ;
        var ee = e;
        if (!ee)
            ee = window.event;

        if (ee.target)
        {
            targ = ee.target;
        }
        else if (ee.srcElement)
        {
            targ = ee.srcElement;
        }
        if (targ.nodeType == 3) // defeat Safari bug
        {
            targ = targ.parentNode;
        }

        // update label
        _label = targ.labelLayout;
        updatePreview();
        updateControls();

        // close dialog
        wrapper.style.display = "none";
        overlay.style.display = "none";
    }

    // event handler for selectPhotoButton.onclick event
    function changeLayoutButtonClick()
    {
        var overlay = document.getElementById('dialog-overlay');
        var wrapper = document.getElementById('dialog-wrapper');
        var content = document.getElementById('dialog-content');

        // remove old content
        while (content.firstChild)
            content.removeChild(content.firstChild);

        // add layouts
        var layouts = getLayouts();
        for (var i = 0; i < layouts.length; i++)
        {
            // set layout data
            var layout = layouts[i];
            applyDataToLabel(layout, _labelData);

            var a = document.createElement('a');
            //a.setAttribute("class", "photo");
            a.className = "layout";
            a.href = "javascript:void(0)";
            var img = document.createElement('img');
            img.src = "data:image/png;base64," + layout.render();
            img.onclick = layoutClick;

            // remember the layout as well to update _label when clicked on it
            img.labelLayout = layout;

            a.appendChild(img);
            content.appendChild(a);
        }

        // add a dummy div to clear layout's float:left style
        var d = document.createElement('div');
        d.style.clear = "both";
        content.appendChild(d);

        // show dialog
        dialogSetCaption("Select Layout");
        overlay.style.display = "block";
        wrapper.style.display = "block";
    }

    // called when the document completly loaded
    function onload()
    {
        var labelFile = document.getElementById('labelFile');
        var labelTextTextArea = document.getElementById('labelTextTextArea');
        var printersSelect = document.getElementById('printersSelect');
        var printButton = document.getElementById('printButton');
        var selectPhotoButton = document.getElementById('selectPhotoButton');
        var changeLayoutButton = document.getElementById('changeLayoutButton');


        // initialize controls
        //printButton.disabled = true;
        //addressTextArea.disabled = true;
        if (_labelData.text)
            labelTextTextArea.value = _labelData.text;

        // loads all supported printers into a combo box 
        function loadPrinters()
        {
            var printers = dymo.label.framework.getPrinters();
            if (printers.length == 0)
            {
                alert("No DYMO printers are installed. Install DYMO printers.");
                return;
            }

            for (var i = 0; i < printers.length; i++)
            {
                var printerName = printers[i].name;

                var option = document.createElement('option');
                option.value = printerName;
                option.appendChild(document.createTextNode(printerName));
                printersSelect.appendChild(option);
            }
        };

        // updates address on the label when user types in textarea field
        labelTextTextArea.onkeyup = function()
        {
            if (!_label)
            {
                alert('Load label before entering text');
                return;
            }

            // set labelData
            _labelData.text = labelTextTextArea.value;
            applyDataToLabel(_label, _labelData);
            updatePreview();
        }

        // prints the label
        printButton.onclick = function()
        {
            if (!_label)
            {
                alert("Load label before printing");
                return;
            }

            //alert(printersSelect.value);
            _label.print(printersSelect.value);
        }

        selectPhotoButton.onclick = selectPhotoButtonClick;
        changeLayoutButton.onclick = changeLayoutButtonClick;

        // onload() initialization
        loadPrinters();
        setupDefaultLayout();
        updatePreview();
        updateControls();
    };

    function initTests()
	{
		if(dymo.label.framework.init)
		{
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