const router = require('express').Router();
const c = require('../controllers/invoiceController');

router.get('/', c.listInvoices);
router.post('/', c.create);
router.get('/:id', c.getInvoice);
router.put('/:id', c.update);
router.delete('/:id', c.remove);
router.post('/:id/mark-paid', c.markPaid);
router.post('/:id/remind', c.remind);

module.exports = router;
