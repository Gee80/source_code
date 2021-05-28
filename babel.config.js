module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ["./src/"],
        alias: {
          "locales": "./src/locales",
          "components": "./src/components",
          "containers": "./src/containers",
          "config": "./src/config",
          "lib": "./src/lib",
          "styles": "./src/styles",
          "images": "./src/images", 
          "utils": "./src/utils", 
          "values": "./src/values", 
          "epics": "./src/epics", 
          "enum": "./src/enum", 
          "reducers": "./src/reducers", 
          "store": "./src/store", 
          "actions": "./src/actions",
        }
      }
    ]
  ]
};
