const { withAppBuildGradle } = require('expo/config-plugins')

const marker = '// expo-example-core-library-desugaring'
const desugarJdkLibsVersion = '2.1.5'

/**
 * expo-dev-client uses java.time APIs on Android 7.x. Enable core library
 * desugaring so the development build remains usable on supported SUNMI
 * devices such as V2 PRO.
 */
const withAndroidCoreLibraryDesugaring = (config) =>
  withAppBuildGradle(config, (androidConfig) => {
    if (androidConfig.modResults.language !== 'groovy') {
      throw new Error('Android app build.gradle must use Groovy')
    }

    if (!androidConfig.modResults.contents.includes(marker)) {
      androidConfig.modResults.contents += `

${marker}
android {
    compileOptions {
        coreLibraryDesugaringEnabled true
    }
}

dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:${desugarJdkLibsVersion}")
}
`
    }

    return androidConfig
  })

module.exports = withAndroidCoreLibraryDesugaring
