const {compile} = require('nexe');

compile({
    input: './build/index.js',
    output: './release/server.exe',
    make: ['release'],
    vcBuild: ['nosign', 'release'],
    resources: ['./config/**/*', './static'],
    ico: './config/logo.ico',
    rc: {
        CompanyName: "ACME Corp",
        PRODUCTVERSION: "17,3,0,0",
        FILEVERSION: "1,2,3,4"
    },
    // build: true
}).then(() => {
    console.log('success')
});
