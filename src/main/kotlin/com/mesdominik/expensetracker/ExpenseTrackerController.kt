package com.mesdominik.expensetracker

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("/expense")
class ExpenseTrackerController(
    private val expenseService: ExpenseService,
    private val categoryService: CategoryService,
    private val api: ApiController
) {
    @GetMapping("/home")
    fun home(model: Model): String{
        model.addAttribute("expenses", expenseService.getExpenses())
        model.addAttribute("categories", categoryService.findAllCategories())
        return "home"
    }
}