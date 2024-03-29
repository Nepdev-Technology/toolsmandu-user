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
};

export default apiRoutes;
