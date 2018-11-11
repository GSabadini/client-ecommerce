import Http from '@/app/Arch/Http'

const uri = 'backoffice/products'

class ProductService {
  getProducts (currentPage = 1, search = '') {
    return Http
      .get(`${uri}?page=${currentPage}&search=${search}`)
  }

  getProductId (id) {
    return Http
      .get(`${uri}/${id}`)
  }

  newProduct (payload) {
    return Http
      .post(uri, payload)
  }

  editProduct (id, payload) {
    return Http
      .put(`${uri}/${id}`, payload)
  }

  deleteProduct (id) {
    return Http
      .delete(`${uri}/${id}`)
  }

  uploadCsv (payload) {
    return Http
      .post(`${uri}/upload-csv`, payload)
  }
}

const productService = new ProductService()
export default productService
