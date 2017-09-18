module.exports = {
  distDir: '../dist',
  onDemandEntries: {
    // Make sure entries are not getting disposed.
    maxInactiveAge: 1000 * 60 * 60,
  },
  poweredByHeader: false,
};
