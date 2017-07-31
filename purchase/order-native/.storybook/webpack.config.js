var nativeconfig = require('saas-plat-native/web/.storybook/native.config');
var uiconfig = require('saas-plat-ui/.storybook/ui.config');

// Export a function. Accept the base config as the only param.
module.exports = function(storybookBaseConfig, configType) {
  nativeconfig(storybookBaseConfig);
  uiconfig(storybookBaseConfig);
  storybookBaseConfig.module.rules[0].exclude.push(
    /node_modules\/(?!saas-plat-native-core)/
  );
  // console.log(JSON.stringify(storybookBaseConfig, null, 2)); 
  return storybookBaseConfig;
};
