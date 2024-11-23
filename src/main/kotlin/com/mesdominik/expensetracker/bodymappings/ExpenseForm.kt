package com.mesdominik.expensetracker.bodymappings

data class ExpenseForm(
    val name: String,
    val description: String?,
    val date: String,
    val amount: Double,
    val category: Long
    )
