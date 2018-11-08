import Http from '@/app/Arch/Http'

const uri = 'products'

class ProductService {
  getProducts () {
    return Http
      .get(uri)
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
}

const productService = new ProductService()
export default productService
