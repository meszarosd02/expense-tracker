package com.mesdominik.expensetracker.entity

import jakarta.persistence.*
import java.time.LocalDate


@Entity
@Table(name = "expenses")
data class Expense
    (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String,
    val description: String? = null,
    val date: LocalDate = LocalDate.now(),
    val amount: Double = 0.0,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    val category: Category
)