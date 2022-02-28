Imports DymoSDK.Implementations

Module Module1

    Sub Main()
        DymoSDK.App.Init()
        Dim dymoSDKLabel = DymoLabel.Instance
        Dim Printers = DymoPrinter.Instance.GetPrinters()
        For Each prt In Printers    ' Iterate through each element.  
            Console.WriteLine($"Printer info: {prt.DriverName}, {prt.Name}, {prt.IsTwinTurbo}")
        Next
        Console.ReadKey()

    End Sub

End Module
