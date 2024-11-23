package com.mesdominik.expensetracker

import com.mesdominik.expensetracker.entity.Category
import org.springframework.stereotype.Service

@Service
class CategoryService(private val repository: CategoryRepository) {
    fun saveCategory(c: Category){
        repository.save(c)
    }

    fun findCategoryById(id: Long): Category{
        return repository.findById(id).get()
    }

    fun findAllCategories(): List<Category>{
        return repository.findAll()
    }
}