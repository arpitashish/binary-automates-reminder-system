const asyncHandler = require('../utils/asyncHandler');
const { getDashboardStats, overdueRefresh } = require('../services/invoiceService');
const { listActivity } = require('../services/activityService');

const dashboard = asyncHandler((req, res) => {
  overdueRefresh();
  const stats = getDashboardStats();
  const activity = listActivity(10);
  res.json({ data: { ...stats, recentActivity: activity } });
});

module.exports = { dashboard };
