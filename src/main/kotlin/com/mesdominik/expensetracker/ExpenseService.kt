package com.mesdominik.expensetracker

import com.mesdominik.expensetracker.entity.Category
import com.mesdominik.expensetracker.entity.Expense
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class ExpenseService(private val repo: ExpenseRepository) {
    fun saveExpense(e: Expense){
        repo.save(e)
    }

    fun getExpenses(): List<Expense>{
        return repo.findAll()
    }

    fun deleteExpense(id: Long){
        repo.deleteById(id)
    }

    fun updateExpense(newExpense: Expense){
        repo.updateExpense(
            newExpense.id,
            newExpense.name,
            newExpense.description,
            newExpense.date,
            newExpense.amount,
            newExpense.category.id
        )
    }
}