import CategoryRepository from '../repositories/CategoryRepository';
import ExerciseRespository from '../repositories/ExerciseRespository';

interface CategoryRequest {
  name: string;
  icon: string;
}

class CategoryService {
  async getAllCategories() {
    const categories = await CategoryRepository.findAll();

    if (categories.length === 0) {
      throw new Error('Theres no categories registred. 🔎');
    }

    return categories;
  }

  async findExercisesByCategory(categoryId: string) {
    const exercises = await ExerciseRespository.findByCategory(categoryId);

    if (exercises.length === 0) {
      throw new Error('Theres no exercises registred in this category. 🔎');
    }

    return exercises;
  }

  async createCategory(categoryRequest: CategoryRequest) {
    const { name, icon } = categoryRequest;

    if (!name || !icon) {
      throw new Error('All fields must be filled 🧐');
    }

    const category = await CategoryRepository.create({ name, icon });

    return category;
  }

  async deleteCategory(id: string) {
    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      throw new Error('This category doesn\'t exist. 😕');
    }

    await CategoryRepository.delete(id);
  }
}

export default new CategoryService;