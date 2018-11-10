import Http from '@/app/Arch/Http'

const uri = 'categories'

class CategoryService {
  getCategories () {
    return Http
      .get(uri)
  }
}

const categoryService = new CategoryService()
export default categoryService
