const {fusebox} = require("fuse-box");
const fuse = fusebox({
  entry: 'src/app.tsx',
  target: "browser",
  devServer: false,
  webIndex: true,
  compilerOptions: {
    tsConfig: "src/tsconfig.json",
  },
  hmr: false,
  cache: false
});


fuse.runDev({  bundles: {  distRoot: './dist',  app: 'app.js',}}).catch(err => {
  console.error(err)
})

