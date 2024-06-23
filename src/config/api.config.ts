const apiRoutes = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    getProfile: '/auth/me',
    changePassword: '/auth/user/password/change',
    google: '/auth/google/callback',
    googleLogin: '/auth/login/google',
    activateAccount: '/otp/activateAccount',
    resendOTP: '/otp/resendActivateAccount',
    resetPasswordOtp: '/otp',
    profileUpdate: '/auth/user',
  },
  notification: {
    base: '/notification',
  },
  products: {
    base: '/product/user',
    featured: '/category/featured/all',
    navbar: '/category/featured/navbar',
    search: '/product/user/search',
    admin: '/product/products/search',
    category: '/product/category',
  },
  crousel: {
    crousel: '/crousel',
  },
  orders: {
    base: '/order',
    user: '/order/finall-by-user',
    cancel: '/order/cancel',
  },
  payement: {
    esewa: '/checkout/esewa/verify',
    khalti: '/checkout/khalti/verify',
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
    user: '/blog/all/user',
    findOne: '/blog/user',
  },
  familySharing: {
    user: '/family-sharing/findAll-by-user',
  },
  ticket: {
    base: '/ticketing',
    user: '/ticketing/user',
    getAll: '/ticketing/find-all-user',
  },
  contactUs: {
    base: '/contactus',
  },
  category: {
    base: '/category',
  },
};

export default apiRoutes;
