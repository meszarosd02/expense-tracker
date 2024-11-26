package com.mesdominik.expensetracker

import com.mesdominik.expensetracker.entity.Expense
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate

@Repository
interface ExpenseRepository: JpaRepository<Expense, Long>{
    @Modifying
    @Transactional
    @Query(value = "update expenses set name=:name, description=:desc, date=:date, amount=:amount, category_id=:cat_id where id=:id", nativeQuery = true)
    fun updateExpense(
        @Param("id") id: Long,
        @Param("name") name: String,
        @Param("desc") desc: String?,
        @Param("date") date: LocalDate,
        @Param("amount") amount: Double,
        @Param("cat_id") catId: Long
        )
}