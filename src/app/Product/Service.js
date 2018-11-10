import Http from '@/app/Arch/Http'

const uri = 'backoffice/products'

class ProductService {
  getProducts (currentPage = 1) {
    return Http
      .get(`${uri}?page=${currentPage}`)
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
}

const productService = new ProductService()
export default productService
