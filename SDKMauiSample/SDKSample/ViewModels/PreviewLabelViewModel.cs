namespace SDKSample.ViewModels
{
	public class PreviewLabelViewModel : BaseVM
	{
        private ImageSource _imageSource;
        public ImageSource ImageSource
        {
            get { return _imageSource; }
            set
            {
                _imageSource = value;
                NotifyPropertyChanged();
            }
        }

        public PreviewLabelViewModel(ImageSource imgSrc)
		{
            _imageSource = imgSrc;
		}
	}
}

