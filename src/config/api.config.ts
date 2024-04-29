const apiRoutes = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    getProfile: '/auth/me',
    changePassword: '/auth/user/password/change',
    google: '/auth/google/callback',
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
  familySharing: {
    user: '/family-sharing/findAll-by-user',
  },
  ticket: {
    base: '/ticketing',
    user: '/ticketing/user',
  },
};

export default apiRoutes;
