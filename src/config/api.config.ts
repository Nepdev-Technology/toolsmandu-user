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
  },
  crousel: {
    crousel: '/crousel',
  },
  orders: {
    base: '/order',
  },
};

export default apiRoutes;
