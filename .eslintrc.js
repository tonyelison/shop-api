export default {
    env: {
        browser: true,
        es2021: true
    },
    extends: "airbnb-base",
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    rules: {
        "import/no-extraneous-dependencies": [
            error, {
               devDependencies: false, 
               optionalDependencies: false, 
               peerDependencies: false, 
               packageDir: __dirname,
            }
        ]
    }
}
