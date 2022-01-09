const tokenConstants = {
  TTLS: { // represented in seconds (Redis)
    access: 60 * 60, // access token is valid for one (1) hour
    refresh: 60 * 60 * 24 * 5, // refresh token is valid for thirty (30) days
  },
};

module.exports = tokenConstants;
