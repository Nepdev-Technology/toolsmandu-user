const apiRoutes = {
  auth: {
    login: '/auth/login',
    getProfile: '/auth/me',
  },
  products: {
    base: '/product',
    featured: '/category/featured/all',
    search: '/product/products/search',
  },
  crousel: {
    crousel: '/crousel',
  },
  orders: {
    base: '/order',
    user: '/order/finall-by-user',
  },
  payement: {
    esewa: '/checkout/esewa/verify',
  },
  coupon: {
    discount: '/coupon/validate-coupon',
  },
  review: {
    create: '/review/create',
    find: '/review/find',
  },
  qAndA: {
    create: '/qa/create',
    find: '/qa/find',
  },
  blog: {
    base: '/blog',
    all: '/blog/all',
  },
};

export default apiRoutes;
