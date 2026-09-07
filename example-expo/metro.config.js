const { getDefaultConfig } = require('expo/metro-config')
const exclusionList =
  require('metro-config/private/defaults/exclusionList').default
const path = require('path')
const rootPackage = require('../package.json')

const root = path.resolve(__dirname, '..')
const appNodeModules = path.join(__dirname, 'node_modules')
const sharedModules = [
  ...Object.keys(rootPackage.peerDependencies),
  'buffer',
  'react-native-safe-area-context',
]

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const blockedNodeModules = [root, path.join(root, 'example')]

const config = getDefaultConfig(__dirname)

config.watchFolders = [root]
config.resolver.blockList = exclusionList(
  blockedNodeModules.flatMap((directory) =>
    sharedModules.map(
      (moduleName) =>
        new RegExp(
          `^${escapeRegExp(path.join(directory, 'node_modules', moduleName))}\\/.*$`,
        ),
    ),
  ),
)
config.resolver.extraNodeModules = {
  ...sharedModules.reduce((modules, moduleName) => {
    modules[moduleName] = path.join(appNodeModules, moduleName)
    return modules
  }, {}),
  [rootPackage.name]: root,
}

module.exports = config
