# Performance workflow

Firebase Performance collects native startup and network metrics. The app also
records the custom `js_app_interactive` trace after React Native interactions
settle.

For render investigations, temporarily call `useRenderCount` inside the target
component and inspect development logs. Remove the call after profiling.

For an Android device or emulator, collect point-in-time RAM and CPU evidence:

```sh
bash scripts/androidPerformance.sh
```

Store baselines outside source control and compare the same release build,
device, screen, and interaction sequence. Use Android Studio Profiler and Xcode
Instruments for leak and sustained CPU investigations.

## Review checklist

- Measure a release build; development instrumentation distorts results.
- Record cold startup, warm startup, and the primary navigation path.
- Compare render counts before and after UI changes.
- Capture idle and active RAM snapshots and check for retained growth.
- Capture sustained CPU during repeated navigation and network activity.
- Inspect Firebase slow/frozen frames, startup, network, and custom traces.
- Record device model, OS, app version, and test steps with each baseline.

Firebase metrics are aggregated production telemetry. Android Studio Profiler,
Xcode Instruments, and `scripts/androidPerformance.sh` provide local diagnostic
evidence; none should be treated as a substitute for the others.

## Production optimizations

- Metro inline-requires defers JavaScript module evaluation until first use.
- Tabs mount lazily and inactive screens freeze to avoid off-screen work.
- Concurrent Remote Config checks are coalesced and foreground refreshes avoid
  unnecessary loading renders.
- Android release builds enable R8 code minification and resource shrinking.
- Gradle parallel execution and the build cache reduce repeat native build time.
- Hermes and React Native's new architecture are enabled on Android.
