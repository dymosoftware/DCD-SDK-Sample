using DymoSDK.Implementations;
using DymoSDK.Interfaces;
using System.Collections.ObjectModel;
using ILabelObject = DymoSDK.Interfaces.ILabelObject;
using IPrinter = DymoSDK.Interfaces.IPrinter;

namespace SDKSample.ViewModels
{
    /// <summary>
    /// ViewModel for the main application interface, managing label files, printers, and consumable information.
    /// Provides commands to open, update, preview, and print labels.
    /// </summary>
    public class MainViewModel : BaseVM
    {
        #region Private members

        /// <summary>
        /// CancellationTokenSource used to manage cancellation of asynchronous operations.
        /// </summary>
        private CancellationTokenSource _cancellationTokenSource;

        /// <summary>
        /// Flag indicating if the label has been successfully loaded.
        /// </summary>
        private bool _isLabelLoaded;

        #endregion

        #region Public members

        /// <summary>
        /// Navigation service used for navigating between views.
        /// </summary>
        public INavigation Navigation;

        #endregion

        #region Properties

        #region FileName

        private string _fileName;

        /// <summary>
        /// The name of the currently selected file. If no file is selected, returns "No file selected".
        /// </summary>
        public string FileName
        {
            get => string.IsNullOrEmpty(_fileName) ? "No file selected" : _fileName;
            set
            {
                _fileName = value;
                NotifyPropertyChanged();
            }
        }

        #endregion

        #region Label Objects

        private List<ILabelObject> _labelObjects;

        /// <summary>
        /// List of label objects loaded from the current label file.
        /// </summary>
        public List<ILabelObject> LabelObjects
        {
            get
            {
                if (_labelObjects == null)
                    _labelObjects = new List<ILabelObject>();
                return _labelObjects;
            }
            set
            {
                _labelObjects = value;
                NotifyPropertyChanged();
            }
        }

        private ILabelObject _selectedLabelObject;

        /// <summary>
        /// The currently selected label object.
        /// </summary>
        public ILabelObject SelectedLabelObject
        {
            get { return _selectedLabelObject; }
            set
            {
                _selectedLabelObject = value;
                NotifyPropertyChanged();
            }
        }

        private string _objectValue;

        /// <summary>
        /// The value to set for the selected label object.
        /// </summary>
        public string ObjectValue
        {
            get { return _objectValue; }
            set
            {
                _objectValue = value;
                NotifyPropertyChanged();
            }
        }

        #endregion

        #region Printers

        private ObservableCollection<IPrinter> _printers;

        /// <summary>
        /// Collection of printers available for use.
        /// </summary>
        public ObservableCollection<IPrinter> Printers
        {
            get
            {
                if (_printers == null)
                    _printers = new ObservableCollection<IPrinter>();
                return _printers;
            }
            set
            {
                _printers = value;
                NotifyPropertyChanged();
            }
        }

        private IPrinter _selectedPrinter;

        /// <summary>
        /// The currently selected printer.
        /// </summary>
        public IPrinter SelectedPrinter
        {
            get { return _selectedPrinter; }
            set
            {
                _selectedPrinter = value;
                NotifyPropertyChanged();

                if (_cancellationTokenSource != null)
                    _cancellationTokenSource.Cancel();

                _cancellationTokenSource = new CancellationTokenSource();

                DisplayConsumableInformation(_cancellationTokenSource.Token);
            }
        }

        /// <summary>
        /// The number of printers currently found.
        /// </summary>
        public int PrintersFound
        {
            get { return Printers.Count(); }
        }

        #endregion

        #region Consumable Info

        private string _consumableInfoText;

        /// <summary>
        /// Text displaying the consumable information for the selected printer.
        /// </summary>
        public string ConsumableInfoText
        {
            get { return _consumableInfoText; }
            set
            {
                _consumableInfoText = value;
                NotifyPropertyChanged();
            }
        }

        #endregion

        #region Twin Turbo Rolls

        private List<string> _twinTurboRolls;

        /// <summary>
        /// List of available twin turbo rolls options.
        /// </summary>
        public List<string> TwinTurboRolls
        {
            get { return _twinTurboRolls; }
            set
            {
                _twinTurboRolls = value;
                NotifyPropertyChanged();
            }
        }

        #endregion

        #endregion

        #region SDK instances
        private IDymoLabel DymoLabelSDK => DymoLabel.LabelSharedInstance;
        private IDymoPrinter DymoPrinterSDK => DymoPrinter.Instance;
        #endregion
        #region Constructor

        /// <summary>
        /// Initializes the MainViewModel, sets up commands, and updates the list of printers.
        /// </summary>
        public MainViewModel()
        {
            DymoSDK.App.Init();
            _fileName = string.Empty;
            TwinTurboRolls = new List<string>() { "Auto", "Left", "Right" };
            OpenFileCommand = new Command(OnFileSelectedAsync);
            PrintLabelCommand = new Command(PrintLabelAction);
            UpdateLabelObjectCommand = new Command(UpdateValueAction);
            ShowPreviewCommand = new Command(ShowPreviewActionAsync);
            DymoPrinterSDK.PrintersFound += DymoPrinterSDK_PrintersFound;
            UpdatePrintersList();
        }

        #endregion

        #region Commands

        #region Open Label

        /// <summary>
        /// Command for opening a label file.
        /// </summary>
        public Command OpenFileCommand { get; private set; }

        /// <summary>
        /// Asynchronously handles file selection and loads the selected label file.
        /// FYI: macOS sample should be MacCatalyst as DevicePlatform.
        /// Using "MacCatalyst" is the right thing here. "MacOS" refers to AppKit macOS applications, which MAUI Essentials can use.
        /// https://github.com/dotnet/maui/issues/9394
        /// </summary>
        private async void OnFileSelectedAsync()
        {
            var customFileType = new FilePickerFileType(
                new Dictionary<DevicePlatform, IEnumerable<string>>
                {
                    { DevicePlatform.iOS, new[] { "public.xml", "public.content", "public.item" } },
                    { DevicePlatform.Android, new[] { "application/xml", "application/beep+xml", "text/xml", "text/dymo", "application/dymo" } },
                    { DevicePlatform.WinUI, new[] { ".dymo", ".label" } },
                    { DevicePlatform.Tizen, new[] { "*/*" } },
                    { DevicePlatform.MacCatalyst, new[] { "public.xml", "public.content", "public.item" } },
                });
            PickOptions options = new()
            {
                PickerTitle = "Please select a dymo file..",
                FileTypes = customFileType,
            };

            var result = await PickAndShow(options);
            if (result != null)
            {
                LoadLabelInfo(result.FullPath);
            }
        }

        /// <summary>
        /// Displays a file picker dialog and returns the selected file result.
        /// </summary>
        /// <param name="options">Options for the file picker dialog.</param>
        /// <returns>The selected file result, or null if no valid file was selected.</returns>
        public async Task<FileResult> PickAndShow(PickOptions options)
        {
            try
            {
                var result = await FilePicker.Default.PickAsync(options);
                if (result != null && (result.FileName.EndsWith("xml", StringComparison.OrdinalIgnoreCase)
                        || result.FileName.EndsWith("dymo", StringComparison.OrdinalIgnoreCase)
                        || result.FileName.EndsWith("label", StringComparison.OrdinalIgnoreCase)))
                {
                    return result;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message} \n {ex.StackTrace}");
            }
            return null;
        }

        #endregion

        #region Update Label Object

        /// <summary>
        /// Command for updating the value of the selected label object.
        /// </summary>
        public Command UpdateLabelObjectCommand { get; private set; }

        /// <summary>
        /// Updates the value of the selected label object with the current value of <see cref="ObjectValue"/>.
        /// </summary>
        private void UpdateValueAction()
        {
            if (SelectedLabelObject != null)
            {
                if (DymoLabelSDK.UpdateLabelObject(SelectedLabelObject, ObjectValue))
                {
                    ObjectValue = string.Empty;
                }
            }
        }

        #endregion

        #region Preview Label

        /// <summary>
        /// Command for showing a preview of the label.
        /// </summary>
        public Command ShowPreviewCommand { get; private set; }

        /// <summary>
        /// Asynchronously displays a preview of the label in a new view.
        /// </summary>
        private async void ShowPreviewActionAsync()
        {
            byte[] labelPreview = DymoLabelSDK.GetPreviewLabel();
            if (labelPreview == null) return;
            Stream imgstream = new MemoryStream(labelPreview);
            var imageSource = ImageSource.FromStream(() => imgstream);
            var previewVM = new PreviewLabelViewModel(imageSource);
            await Navigation.PushAsync(new Views.PreviewLabelView
            {
                BindingContext = previewVM
            });
        }

        #endregion

        #region Print Label

        /// <summary>
        /// Command for printing the label.
        /// </summary>
        public Command PrintLabelCommand { get; private set; }

        /// <summary>
        /// Asynchronously handles the printing of the label.
        /// Currently not implemented.
        /// </summary>
        private async void PrintLabelAction()
        {
            if (string.IsNullOrWhiteSpace(DymoLabelSDK.XMLContent))
                return;

            if (string.IsNullOrWhiteSpace(SelectedPrinter.Name))
                return;

            int copies = 1;

            //Load DymoLabelSDK's label
            DymoLabelSDK.LoadLabelFromXML(DymoLabelSDK.XMLContent);

            //Send to printer
            await DymoPrinterSDK.PrintLabel(DymoLabelSDK, SelectedPrinter.Name, copies);

            //If the label contains counter objects
            //Update counter object and preview to show the increased value of the counter
            var counterObjects = DymoLabelSDK.GetLabelObjects().Where(w => w.Type == TypeObject.CounterObject).ToList();
            if (counterObjects.Count > 0)
            {
                foreach (var obj in counterObjects)
                    DymoLabelSDK.UpdateLabelObject(obj, copies.ToString());
            }
        }

        #endregion

        #endregion

        #region Private methods

        /// <summary>
        /// Loads label information from the specified file path and updates the view model properties.
        /// </summary>
        /// <param name="filePath">The path of the file to load.</param>
        private void LoadLabelInfo(string filePath)
        {
            try
            {
                string labelXML = File.ReadAllText(filePath);
                DymoLabelSDK.LoadLabelFromXML(labelXML);
                FileName = Path.GetFileName(filePath);
                LabelObjects = DymoLabelSDK.GetLabelObjects().ToList();
                _isLabelLoaded = true;
            }
            catch (Exception)
            {
                _isLabelLoaded = false;
            }
        }

        /// <summary>
        /// Asynchronously retrieves and displays the consumable information for the selected printer.
        /// This includes roll status, consumable name, and labels remaining.
        /// If the printer connection is established and the roll status is supported, the information is fetched and shown.
        /// The method can be canceled using the provided <paramref name="cancellationToken"/>.
        /// </summary>
        /// <param name="cancellationToken">The token used to cancel the operation if needed.</param>
        private async void DisplayConsumableInformation(CancellationToken cancellationToken)
        {
            if (cancellationToken.IsCancellationRequested)
                return;

            try
            {
                ConsumableInfoText = string.Empty;
                if (SelectedPrinter != null &&
                    await DymoPrinter.Instance.IsRollStatusSupported(SelectedPrinter.DriverName))
                {
                    IRollStatusInPrinter cons = await DymoPrinter.Instance.GetRollStatusInPrinter(SelectedPrinter.Name);
                    if (cancellationToken.IsCancellationRequested)
                        return;

                    if (cons != null)
                    {
                        ConsumableInfoText =
                            $"Status: {cons.RollStatus} \nConsumable: {cons.Name} \nLabels remaining: {cons.LabelsRemaining}";
                    }
                }
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex);
            }
        }

        /// <summary>
        /// Updates the list of available printers and notifies the view model of the change.
        /// </summary>
        private async void UpdatePrintersList()
        {
            Printers.Clear();
            var printersResult = await DymoPrinterSDK.GetPrinters();
            foreach (var item in printersResult)
            {
                Printers.Add(item);
            }
        }

        /// <summary>
        /// Event handler for when new printers are found. Updates the list of printers.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="newPrinter">Indicates whether a new printer was found.</param>
        private void DymoPrinterSDK_PrintersFound(object? sender, bool newPrinter)
        {
            UpdatePrintersList();
        }

        #endregion
    }
}
