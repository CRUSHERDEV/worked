module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
            "@/assets": "./assets",
            "@/components": "./src/components",
            "@/themes": "./assets/themes",
            "@/styles": "./assets/styles",
          },
        },
      ],
    ],
  };
};
