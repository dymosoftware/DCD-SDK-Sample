Imports DymoSDK.Implementations
Imports System.IO.Path

Module Module1

    Sub Main()
        DymoSDK.App.Init()

        Dim fullpath As String = System.IO.Path.GetFullPath("samplelabel.dymo")
        Dim dymoSDKLabel = DymoLabel.Instance
        dymoSDKLabel.LoadLabelFromFilePath(fullpath)

        Dim dymoSDKPrinter = DymoPrinter.Instance

        Dim Printers = DymoPrinter.Instance.GetPrinters()
        Dim ConnectedPrinter = Printers.FirstOrDefault()

        For Each prt In Printers    ' Iterate through each element and find a connected printer.  
            Console.WriteLine($"Printer info: {prt.DriverName}, {prt.Name}, {prt.IsTwinTurbo}")
            If prt.IsConnected Then
                ConnectedPrinter = prt
            End If
        Next

        If dymoSDKPrinter.PrintLabel(dymoSDKLabel, ConnectedPrinter.Name, 1, False, False, 0, False, False) Then
            Console.WriteLine("Print successful.")
        End If

        Console.ReadKey()

    End Sub

End Module
