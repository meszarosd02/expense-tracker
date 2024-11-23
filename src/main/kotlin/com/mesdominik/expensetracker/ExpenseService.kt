package com.mesdominik.expensetracker

import com.mesdominik.expensetracker.entity.Expense
import org.springframework.stereotype.Service

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

    fun updateExpense(){

    }
}