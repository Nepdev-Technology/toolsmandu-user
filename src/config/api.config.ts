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
    featured: '/category/featured/all',
  },
  crousel: {
    crousel: '/crousel',
  },
};

export default apiRoutes;
