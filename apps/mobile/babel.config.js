const isTest = process.env.NODE_ENV === 'test';

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [['babel-preset-expo', isTest ? {} : { jsxImportSource: 'nativewind' }]],
  plugins: isTest ? [] : ['nativewind/babel'],
};
