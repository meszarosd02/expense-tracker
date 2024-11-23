package com.mesdominik.expensetracker.entity

import jakarta.persistence.*

@Entity
data class Category (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var name: String
)