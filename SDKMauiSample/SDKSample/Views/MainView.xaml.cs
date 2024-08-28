namespace SDKSample.Views;

public partial class MainView : ContentPage
{
	public MainView()
	{
		InitializeComponent();
		var vm = new ViewModels.MainViewModel();
		vm.Navigation = this.Navigation;
		BindingContext = vm;
	}
}