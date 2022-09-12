module.exports = {
  displayName: 'custom-device',
  preset: '../../jest.preset.js',
  transform: {
    '^.+.vue$': 'vue3-jest',
    '.+.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'vue', 'js', 'json'],
  coverageDirectory: '../../coverage/libs/custom-device',
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'ts-jest': {
      tsconfig: 'libs/custom-device/tsconfig.spec.json',
    },
    'vue-jest': {
      tsConfig: 'libs/custom-device/tsconfig.spec.json',
    },
  },
};
