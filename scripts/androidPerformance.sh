#!/usr/bin/env bash
set -euo pipefail

package_name="com.mrplcms"
output_dir="${1:-performance-results}"
mkdir -p "$output_dir"

adb shell dumpsys meminfo "$package_name" > "$output_dir/android-memory.txt"
adb shell dumpsys cpuinfo | grep "$package_name" > "$output_dir/android-cpu.txt" || true

echo "Saved Android RAM and CPU snapshots in $output_dir"
