package com.mesdominik.expensetracker

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("/expense")
class ExpenseTrackerController {

    @GetMapping("/home")
    fun home(model: Model): String{
        return "home"
    }
}