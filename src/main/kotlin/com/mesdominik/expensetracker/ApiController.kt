package com.mesdominik.expensetracker

import com.fasterxml.jackson.databind.JsonNode
import com.mesdominik.expensetracker.bodymappings.CategoryForm
import com.mesdominik.expensetracker.bodymappings.CategoryFormWithId
import com.mesdominik.expensetracker.bodymappings.ExpenseForm
import com.mesdominik.expensetracker.bodymappings.ExpenseFormWithId
import com.mesdominik.expensetracker.entity.Category
import com.mesdominik.expensetracker.entity.Expense
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RequestMapping("/expense/api")
@RestController
class ApiController(
    private val expenseService: ExpenseService,
    private val categoryService: CategoryService
) {
    //EXPENSES
    @PostMapping("/expense")
    fun postExpense(@RequestBody expenseForm: ExpenseForm): Expense {
        val newExpense = Expense(
            name = expenseForm.name,
            description = expenseForm.description,
            date = LocalDate.parse(expenseForm.date),
            amount = expenseForm.amount,
            category = categoryService.findCategoryById(expenseForm.category)
        )
        expenseService.saveExpense(newExpense)
        return newExpense
    }

    @GetMapping("/expense")
    fun getExpenses(): List<Expense> {
        return expenseService.getExpenses()
    }

    @DeleteMapping("/expense")
    fun deleteExpense(@RequestBody body: JsonNode): Long {
        expenseService.deleteExpense(body.get("id").asLong())
        return body.get("id").asLong()
    }

    @PutMapping("/expense")
    fun modifyExpense(@RequestBody body: ExpenseFormWithId): Expense {
        val newExpense = Expense(
            id = body.id,
            name = body.name,
            description = body.description,
            date = LocalDate.parse(body.date),
            amount = body.amount,
            category = categoryService.findCategoryById(body.category)
        )
        expenseService.updateExpense(newExpense)
        return newExpense
    }

    //CATEGORIES
    @GetMapping("/category")
    fun getCategory(): List<Category>{
        return categoryService.findAllCategories()
    }

    @PostMapping("/category")
    fun postCategory(@RequestBody body: CategoryForm): Category {
        val newCategory = Category(name = body.name)
        categoryService.saveCategory(newCategory)
        return newCategory
    }

    @DeleteMapping("/category")
    fun deleteCategory(@RequestBody body: JsonNode): Long {
        categoryService.deleteCategory(body.get("id").asLong())
        return body.get("id").asLong()
    }

    @PutMapping("/category")
    fun updateCategory(@RequestBody body: CategoryFormWithId): Category {
        val newCategory = Category(id = body.id, name = body.name)
        categoryService.updateCategory(newCategory)
        return newCategory
    }
}