const { Router } = require('express');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');
const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter');
const router = Router();

router.get('/', (req, res) => {
  // 프로덕트 등록한거 전부다 조회해서 뿌려주기
  res.send('Server is Good!');
});

router.use('/api/products', productRouter);
router.use('/api/cart', cartRouter);
router.use('/api/order', orderRouter);
router.use('/api/user', userRouter);

module.exports = router;
