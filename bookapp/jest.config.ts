module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
        '\\.(css|scss)$': 'identity-obj-proxy',
        '\\.(svg|png|jpg)$': '<rootDir>/__mocks__/fileMock.js',
    },
};