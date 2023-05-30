const { Router } = require('express');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');
const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter');
const router = Router();

router.get('/', (req, res) => {
  // ���δ�Ʈ ����Ѱ� ���δ� ��ȸ�ؼ� �ѷ��ֱ�
  res.send('Server is Good!');
});

router.use('/api/products', productRouter);
router.use('/api/cart', cartRouter);
router.use('/api/order', orderRouter);
router.use('/api/user', userRouter);

module.exports = router;
