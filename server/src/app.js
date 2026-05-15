const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const invoiceRoutes = require('./routes/invoiceRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const activityRoutes = require('./routes/activityRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true
  }));
  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/health', (_, res) => res.json({ ok: true }));
  app.use('/api/invoices', invoiceRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/activity', activityRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
