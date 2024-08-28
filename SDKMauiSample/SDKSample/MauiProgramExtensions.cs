using CommunityToolkit.Maui;
using Microsoft.Extensions.Logging;

namespace SDKSample;

public static class MauiProgramExtensions
{
	public static MauiAppBuilder UseSharedMauiApp(this MauiAppBuilder builder)
	{
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
				fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
			});

#if DEBUG
//        builder.Logging.AddDebug();
#endif

		builder.UseMauiCommunityToolkit();
        return builder;
	}
}
