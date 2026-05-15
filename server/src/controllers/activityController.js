const asyncHandler = require('../utils/asyncHandler');
const { listActivity } = require('../services/activityService');

const activity = asyncHandler((req, res) => {
  const limit = Math.min(Number(req.query.limit || 20), 100);
  res.json({ data: listActivity(limit) });
});

module.exports = { activity };
