# DYMO Connect SDK  

## Getting Started 🚀

These instructions will help you to understand how DYMO Connect SDK works for .NET and Javascript.

# .NET Sample
This is a WPF sample using DYM.Connect.SDK nuget package.



### Installing 🔧

Open the project on Visual Studio

```
File > Open > Project/Solution > Select WPFSDKSample.csproj
```

Run Package Manager Console

```console 
 update-package -reinstall
```

## Nuget package 📦

* [DYMO.Connect.SDK](https://www.nuget.org/packages/DYMO.Connect.SDK/) - The nuget package required

## Dependencies 🛠️

* [NETStandard](https://www.nuget.org/packages/NETStandard.Library/) - NETStandard.Library (>= 2.0.0) 
* [SkiaSharp](https://www.nuget.org/packages/SkiaSharp/) - SkiaSharp (= 1.68.0)
* [SkiaSharp.Views](https://www.nuget.org/packages/SkiaSharp.Views/) - SkiaSharp.Views (= 1.68.0)

## Classes and methods ⚙️


- #### DymoLabel class

    - **Load label**
    ```csharp
    void LoadLabelFromFilePath(string FileName) // Load label content from file 
    ```
    ```csharp
    void LoadLabelFromXML(string XmlContent) //Load label from XML content
    ```
    - **Manage label objects**
    ```csharp
    IEnumerable<ILabelObject> GetLabelObjects() //Get list of objects(Text, Shapes, Address, etc.) contained in the label
    ```
    ```csharp
    bool UpdateLabelObject(ILabelObject labelObject, string objectValue) //Update value of specified object
    ```
    ```csharp
    bool SetImageFromFilePath(string objectName, string imageFile) //Set content of image object specified from image file 
    ```
    ```csharp
    bool SetImageFromBase64(string objectName, string base64String) //Set content of image object specified from Base64 string
    ```
    - **Get preview**
    ```csharp
    byte[] GetPreviewLabel() //Get preview image's label as byte array
    ```
    - **Save label**
    ```csharp
    bool Save(string fileName) //Save label file
    ```





- ### **DymoPrint instance**
    - **Get printers** 
      - Get list of DYMO printers installed in the current machine.
      ```csharp
      IEnumerable<IPrinter> GetPrinters() 
      ```
    
    - **Print label**  
      - Print an instantiated DymoLabel object in the selected printer.
      ```csharp
         bool PrintLabel(DymoLabel label, string printerName, int copies = 1, bool collate = false, bool mirror = false, int rollSelected = 0, bool chainMarks 
        = false,  bool barcodeGraphsQuality = false) 
       ```
      - Print a list of instantiated DymoLabel objects in the selected printer.      
      ```csharp
      bool PrintLabel(IEnumerable<DymoLabel> labels, string printerName, int copies = 1, bool collate = false, bool mirror = false, int rollSelected = 0, 
      bool chainMarks=false,  bool barcodeGraphsQuality = false)
      ```
    - **LW 550 printer methods(these methods will not have effect when selected printer does not belong to 550 series)**  
      - Verify if selected printer belongs to 550 series.
      ```csharp
         bool Is550Printer(string printerName) 
       ```
      - Get information about current label inserted in the selected printer.      
      ```csharp
      IConsumableInfo550Printer GetCurrentLabelInsertedIn550Printer(string printerName)
      ```


# JavaScript Sample
This is a JavaScript sample using DYMO Connect Framework.

### Prerequisites 📋

DYMO Connect Software installed

* [DYMO Connect Software](https://www.dymo.com/en-US/dymo-connect-for-desktop-v12--windows%C2%AE-dymo-connect-for-desktop-v12#tab=Support)
* DYMO Connect framework has compatibility with DYMO Label Software

Reference to Javascript SDK file

* [DYMO.Connect.Framework](https://s3.amazonaws.com/download.dymo.com/dymo/Software/JavaScript/dymo.connect.framework.js)

### Installing 🔧

Include the framework into your project

* [https://github.com/dymosoftware/dymo-connect-framework/blob/master/dymo.connect.framework.js](https://github.com/dymosoftware/dymo-connect-framework/blob/master/dymo.connect.framework.js)
* [https://s3.amazonaws.com/download.dymo.com/dymo/Software/JavaScript/dymo.connect.framework.js](https://s3.amazonaws.com/download.dymo.com/dymo/Software/JavaScript/dymo.connect.framework.js)

### Functions ⚙️

dymo.connect.framework includes functions from the previous dymo.label.framework

* [DYMO.Label.Framework documentation](http://labelwriter.com/software/dls/sdk/docs/DYMOLabelFrameworkJavaScriptHelp/)

These are the main functions to get start

- #### dymo.connect.framework
    - **Initialize**
    ```javascript 
     dymo.label.framework.init() //Initialize DYMO Label Framework
    ```
    ```javascript
    dymo.label.framework.checkEnvironment() // Validate if the environment meets the requirements
    ```
    - **Load label**
    ```javascript
    dymo.label.framework.openLabelFile(fileName) //Load label from file name and return label instance
    ```
    - **Validate label**
    ```javascript
    dymo.label.framework.openLabelXml(labelXml) //Load label from XML content and return label instance
    ```
     - **Validate label instance** (introduced in dymo.connect.framework)
    ```javascript
    label.isValidLabel() //Validate if the current content is a valid label based on the current service installed
    label.isDCDLabel() //Validate if the current content is a valid DYMO Connect label based on DYMO Connect service
    label.isDLSLabel() //Validate if the current content is a valid DYMO Label Software label based on DYMO Label Software service
    ```
     - **Get printers**
    ```javascript
    dymo.label.framework.getPrinters() //Get list of DYMO printers installed
    ```
    - **Print**
    ```javascript
    dymo.label.framework.printLabel(printerName, printParamsXml, labelXml, labelSetXml) //Print label
    ```
     - **Get preview**
    ```javascript
    dymo.label.framework.renderLabel(labelXml, renderParamsXml, printerName) //Get label preview image of the label
    ```
### Sample Html Pages 📋

Local Web Api service should be running to be able to work with sample pages.

* [https://s3.amazonaws.com/download.dymo.com/dymo/Software/JavaScript/CheckEnvironment/CheckEnvironment.html](https://s3.amazonaws.com/download.dymo.com/dymo/Software/JavaScript/CheckEnvironment/CheckEnvironment.html)
* [https://s3.amazonaws.com/download.dymo.com/dymo/Software/JavaScript/VisitorManagement/VisitorManagement.html](https://s3.amazonaws.com/download.dymo.com/dymo/Software/JavaScript/VisitorManagement/VisitorManagement.html)
* [https://s3.amazonaws.com/download.dymo.com/dymo/Software/JavaScript/PreviewAndPrintLabel/PreviewAndPrintLabel.html](https://s3.amazonaws.com/download.dymo.com/dymo/Software/JavaScript/PreviewAndPrintLabel/PreviewAndPrintLabel.html)

## Important notes

Opening a label file previously created from DYMO Label Software, with DYMO Connect Software installed, it will convert the structure of DLS label into DYMO Connect label.
Therefore, **isDCDLabel** function will return always true after label file has been open, when DYMO Connect is running.

**setTextMarkup** function is not supported for DYMO Connect labels. 

## Authors ✒️

DYMO Team
[www.dymo.com](http://www.dymo.com/en-US)

## Acknowledgments 📢

* [NETStandard documentation](https://docs.microsoft.com/en-us/dotnet/standard/net-standard)
* Questions? [dymoconsumercare@newellco.com](mailto:dymoconsumercare@newellco.com)

