const apiRoutes = {
  auth: {
    login: '/auth/login',
  },
  suppliers: {
    supplier: '/supplier',
    suppliersById: (id: any) => `/supplier/${id}`,
    getAllSuppliers: (params?: string) => `/supplier?${params}`,
    searchSuppliers: `/supplier/find/`,
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
};

export default apiRoutes;
