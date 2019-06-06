// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'quotes': 0,
    'semi': 0,
    'space-before-function-paren': 0,
    'arrow-spacing': 0,
    'eqeqeq': 0,
    'spaced-comment': 0,
    'comma-spacing': 0,
    'no-unreachable': 0,
    'key-spacing': 0,
    'indent': 0,
  }
}
