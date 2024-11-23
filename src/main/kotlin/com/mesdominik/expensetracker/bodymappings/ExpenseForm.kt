package com.mesdominik.expensetracker.bodymappings

import com.mesdominik.expensetracker.entity.Category
import java.time.LocalDate

data class ExpenseForm(
    val name: String,
    val description: String?,
    val date: String,
    val amount: Double,
    val category: Long
    )
