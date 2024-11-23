package com.mesdominik.expensetracker

import com.mesdominik.expensetracker.entity.Expense
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ExpenseRepository: JpaRepository<Expense, Long>{

}