package com.mesdominik.expensetracker

import com.mesdominik.expensetracker.entity.Category
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface CategoryRepository : JpaRepository<Category, Long> {
    @Query(value = "update category set name=:name where id=:id;", nativeQuery = true)
    fun updateCategory(@Param("id") id: Long, @Param("name") name: String)
}