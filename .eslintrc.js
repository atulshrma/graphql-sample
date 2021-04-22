module.exports = {
    extends: ['prettier'],
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parser: 'babel-eslint',
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error'],
    },
};
