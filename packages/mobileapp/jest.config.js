module.exports = {
  preset: 'react-native',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/?!(react-native)',
    'node_modules/(?!(jest-)?react-native)',
    'node_modules/?!(react-navigation)',
  ],
};
