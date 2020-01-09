using DymoSDK.Implementations;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;

namespace WPFSDKSample.ViewModels
{
    public class MainViewModel : BaseViewModel
    {
        #region Commands
        private ICommand _openFileCommand;
        public ICommand OpenFileCommand
        {
            get { return _openFileCommand = _openFileCommand ?? new CommandHandler(() => OpenFileAction(), true); }
        }

        private ICommand _printLabelCommand;
        public ICommand PrintLabelCommand
        {
            get { return _printLabelCommand = _printLabelCommand ?? new CommandHandler(() => PrintLabelAction(), true); }
        }

        private ICommand _updateLabelCommand;
        public ICommand UpdateLabelCommand
        {
            get { return _updateLabelCommand = _updateLabelCommand ?? new CommandHandler(() => UpdateValueAction(), true); }
        }

        private ICommand _updatePreviewCommand;
        public ICommand UpdatePreviewCommand
        {
            get { return _updatePreviewCommand = _updatePreviewCommand ?? new CommandHandler(() => UpdatePreviewAction(), true); }
        }



        #endregion

        #region Props
        IEnumerable<DymoSDK.Interfaces.IPrinter> _printers;

        public IEnumerable<DymoSDK.Interfaces.IPrinter> Printers
        {
            get
            {
                if (_printers == null)
                    _printers = new List<DymoSDK.Interfaces.IPrinter>();
                return _printers;
            }
            set
            {
                _printers = value;
                NotifyPropertyChanged("Printers");
            }
        }

        public int PrintersFound
        {
            get { return Printers.Count(); }
        }

        string _fileName;
        public string FileName
        {
            get
            {
                if (string.IsNullOrEmpty(_fileName))
                    return "No file selected";

                return _fileName;
            }
            set
            {
                _fileName = value;
                NotifyPropertyChanged("FileName");
            }
        }

        private BitmapImage _imageSourcePreview;

        public BitmapImage ImageSourcePreview
        {
            get { return _imageSourcePreview; }
            set
            {
                _imageSourcePreview = value;
                NotifyPropertyChanged("ImageSourcePreview");
            }
        }


        List<DymoSDK.Interfaces.ILabelObject> _labelObjects;
        public List<DymoSDK.Interfaces.ILabelObject> LabelObjects
        {
            get
            {
                if (_labelObjects == null)
                    _labelObjects = new List<DymoSDK.Interfaces.ILabelObject>();
                return _labelObjects;
            }
            set
            {
                _labelObjects = value;
                NotifyPropertyChanged("LabelObjects");
            }
        }

        private DymoSDK.Interfaces.ILabelObject _selectedLabelObject;
        public DymoSDK.Interfaces.ILabelObject SelectedLabelObject
        {
            get { return _selectedLabelObject; }
            set
            {
                _selectedLabelObject = value;
                NotifyPropertyChanged("SelectedLabelObject");
            }
        }

        private string _objectValue;
        public string ObjectValue
        {
            get { return _objectValue; }
            set
            {
                _objectValue = value;
                NotifyPropertyChanged("ObjectValue");
            }
        }


        DymoSDK.Interfaces.IPrinter _selectedPrinter;
        public DymoSDK.Interfaces.IPrinter SelectedPrinter
        {
            get { return _selectedPrinter; }
            set
            {
                _selectedPrinter = value;
                NotifyPropertyChanged("FileName");
            }
        }

        List<string> _twinTurboRolls;
        public List<string> TwinTurboRolls
        {
            get
            {
                if (_twinTurboRolls == null)
                    _twinTurboRolls = new List<string>();
                return _twinTurboRolls;
            }
            set
            {
                _twinTurboRolls = value;
                NotifyPropertyChanged("TwinTurboRolls");
            }
        }

        private string _selectedRoll;
        public string SelectedRoll
        {
            get { return _selectedRoll; }
            set
            {
                _selectedRoll = value;
                NotifyPropertyChanged("SelectedRoll");
            }
        }
        #endregion

        DymoSDK.Implementations.DymoLabel dymoSDKLabel;


        public MainViewModel()
        {
            dymoSDKLabel = new DymoLabel();
            Printers = DymoPrinter.Instance.GetPrinters();
            TwinTurboRolls = new List<string>() { "Auto", "Left", "Right" };
        }
        /// <summary>
        /// Open a Dymo label file and load the content in the instance of the class
        /// Get the preview image of the label
        /// Get the list of object names
        /// </summary>
        private void OpenFileAction()
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "DYMO files |*.label;*.dymo|All files|*.*";

            if (openFileDialog.ShowDialog() == true)
            {
                FileName = openFileDialog.FileName;
                //Load label from file path
                dymoSDKLabel.LoadLabelFromFilePath(FileName);
                //Get image preview of the label
                dymoSDKLabel.GetPreviewLabel();
                //Load image preview in the control 
                ImageSourcePreview = LoadImage(dymoSDKLabel.Preview);
                //Get object names list
                LabelObjects = dymoSDKLabel.GetLabelObjects().ToList();
            }
        }
        /// <summary>
        /// Print the current loaded label using the selected printer name
        /// </summary>
        private void PrintLabelAction()
        {
            int copies = 1;
            if (SelectedPrinter != null)
            {
                //Send to print
                if (SelectedPrinter.Name.Contains("Twin Turbo"))
                {
                    //0: Auto, 1: Left roll, 2: Right roll
                    int rollSel = SelectedRoll == "Auto" ? 0 : SelectedRoll == "Left" ? 1 : 2;
                    DymoPrinter.Instance.PrintLabel(dymoSDKLabel, SelectedPrinter.Name, copies, rollSelected: rollSel);
                }
                else
                    DymoPrinter.Instance.PrintLabel(dymoSDKLabel, SelectedPrinter.Name, copies);

                //If the label contains counter objects
                //Update counter object and preview to show the incresead value of the counter
                var counterObjs = dymoSDKLabel.GetLabelObjects().Where(w => w.Type == DymoSDK.Interfaces.TypeObject.CounterObject).ToList();
                if (counterObjs.Count > 0)
                {
                    foreach (var obj in counterObjs)
                        dymoSDKLabel.UpdateLabelObject(obj, copies.ToString());
                    UpdatePreviewAction();
                }
            }
        }
        /// <summary>
        /// Update the object value using the object name selected
        /// </summary>
        private void UpdateValueAction()
        {
            if (SelectedLabelObject != null)
            {
                //Update label object value
                dymoSDKLabel.UpdateLabelObject(SelectedLabelObject, ObjectValue);
                UpdatePreviewAction();
            }
        }
        /// <summary>
        /// Update the preview image of the label
        /// </summary>
        private void UpdatePreviewAction()
        {
            dymoSDKLabel.GetPreviewLabel();
            if (dymoSDKLabel != null)
                ImageSourcePreview = LoadImage(dymoSDKLabel.Preview);
        }
        /// <summary>
        /// Load the preview image label in the  image control
        /// </summary>
        /// <param name="array">Preview image content</param>
        /// <returns>Bitmap of the content</returns>
        private BitmapImage LoadImage(byte[] array)
        {
            using (var ms = new System.IO.MemoryStream(array))
            {
                var image = new BitmapImage();
                image.BeginInit();
                image.CacheOption = BitmapCacheOption.OnLoad;
                image.StreamSource = ms;
                image.EndInit();
                return image;
            }
        }

    }
}
