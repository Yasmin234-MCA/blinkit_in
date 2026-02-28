# Fix: React Native Android Build "Different Roots" Error

## Problem Description

When running `npx react-native run-android`, the build fails with the following error:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':react-native-gesture-handler:generateCodegenSchemaFromJavaScript'.
> this and base files have different roots: 
  C:\repository\blinkit_in\node_modules\@react-native\codegen\lib\cli\combine\combine-js-to-schema-cli.js 
  and 
  E:\react native\MyApp\node_modules\react-native-gesture-handler\android.
```

## Root Cause

This error occurs when:
1. Your project has conflicting Node modules from **two different locations**
2. Gradle's build process finds codegen references pointing to an **old/previous project location** (e.g., `E:\react native\MyApp\`)
3. The Gradle cache retains references to these stale paths even after moving or reinstalling the project
4. The codegen schema generator tries to combine files from different root directories, which is not allowed

### Why This Happens
- Project was moved or copied from another location without cleaning up
- Node modules were not fully cleaned during setup
- Gradle cache contains references to old paths
- react-native-gesture-handler or other libraries cached incorrect paths

## Solution

Follow these steps in order to resolve the issue:

### Step 1: Clean Android Build Artifacts
```bash
cd android
./gradlew clean --refresh-dependencies
cd ..
```

**What this does:** Removes compiled classes, generated files, and refreshes all dependency references in Gradle.

### Step 2: Remove Gradle Cache
```bash
rm -r $env:USERPROFILE\.gradle\caches -Force  # Windows PowerShell
# or
rm -rf ~/.gradle/caches  # Linux/Mac
```

**What this does:** Clears the global Gradle cache that may contain stale path references.

### Step 3: Remove Local Build Directories
```bash
rm -r android/app/build -Force
rm -r android/build/generated -Force
```

**What this does:** Removes all generated build files that may contain old path references.

### Step 4: Clean Node Modules
```bash
rm -r node_modules -Force
npm cache clean --force
```

**What this does:** Completely removes all dependencies and npm's internal cache.

### Step 5: Fresh Installation
```bash
npm install --legacy-peer-deps
```

**What this does:** Reinstalls all dependencies cleanly without any cached data. The `--legacy-peer-deps` flag helps with compatibility issues in React Native projects.

### Step 6: Run the Build
```bash
npx react-native run-android
```

**Expected output:** The build should now progress successfully through compilation stages without the "different roots" error.

---

## Quick Fix Script (All Steps at Once)

Create a file named `fix-build.bat` (Windows) or `fix-build.sh` (Linux/Mac):

### Windows (PowerShell)
```powershell
# fix-build.bat
Write-Host "Cleaning Android build..."
cd android
.\gradlew.bat clean --refresh-dependencies
cd ..

Write-Host "Removing Gradle cache..."
rm -r $env:USERPROFILE\.gradle\caches -Force -ErrorAction SilentlyContinue

Write-Host "Removing build directories..."
rm -r android/app/build -Force -ErrorAction SilentlyContinue
rm -r android/build/generated -Force -ErrorAction SilentlyContinue

Write-Host "Removing node_modules..."
rm -r node_modules -Force -ErrorAction SilentlyContinue

Write-Host "Cleaning npm cache..."
npm cache clean --force

Write-Host "Installing dependencies..."
npm install --legacy-peer-deps

Write-Host "Build cleanup complete! Run: npx react-native run-android"
```

Run with:
```bash
powershell -ExecutionPolicy Bypass -File fix-build.bat
```

### Linux/Mac
```bash
#!/bin/bash
# fix-build.sh

echo "Cleaning Android build..."
cd android
./gradlew clean --refresh-dependencies
cd ..

echo "Removing Gradle cache..."
rm -rf ~/.gradle/caches

echo "Removing build directories..."
rm -rf android/app/build
rm -rf android/build/generated

echo "Removing node_modules..."
rm -rf node_modules

echo "Cleaning npm cache..."
npm cache clean --force

echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Build cleanup complete! Run: npx react-native run-android"
```

Run with:
```bash
chmod +x fix-build.sh
./fix-build.sh
```

---

## Prevention Tips

### 1. **Always Clean Before Reinstalling**
When setting up an existing project:
```bash
npm install
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

### 2. **Use .gitignore Properly**
Ensure your `.gitignore` includes:
```
node_modules/
android/app/build/
android/build/
.gradle/
*.keystore
```

### 3. **Don't Copy Projects Between Locations**
Instead of copying, use:
```bash
git clone <repo>
npm install
```

### 4. **Regular Cache Cleanup**
Monthly or before major changes:
```bash
npm cache clean --force
rm -rf $env:USERPROFILE\.gradle\caches  # Windows
rm -rf ~/.gradle/caches  # Linux/Mac
```

### 5. **Use android Doctor**
Check your environment regularly:
```bash
npx react-native doctor
```

---

## Verify the Fix

After applying the solution, you should see:
- ✅ No "different roots" error
- ✅ Smooth progression through build tasks (0%, 25%, 50%, 75%, 100%)
- ✅ Compilation of Kotlin/Java files completes
- ✅ CMake native builds complete
- ✅ App installs on device/emulator

Note: Deprecation warnings are normal and don't block the build.

---

## Troubleshooting

### Still Getting the Error?
1. Check if other React Native projects exist on your machine
2. Make sure you're not in a symlinked directory
3. Verify ANDROID_HOME points to the correct SDK location
4. Check for multiple Node installations

### Build Takes Too Long?
- Gradle is downloading dependencies for the first time
- First build after cleanup can take 5-10 minutes
- Consider using `--info` flag for verbose output:
```bash
cd android && ./gradlew assembleDebug --info && cd ..
```

### Device/Emulator Not Found?
Ensure your device is connected:
```bash
adb devices
```

---

## Additional Resources

- [React Native Doctor](https://github.com/react-native-community/cli/blob/main/packages/cli-doctor/README.md#doctor)
- [Gradle Documentation](https://docs.gradle.org/9.0.0/userguide/command_line_interface.html)
- [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting)

