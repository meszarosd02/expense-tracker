package com.mesdominik.expensetracker

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication
@EnableJpaRepositories("com.mesdominik.expensetracker")
class ExpensetrackerApplication

fun main(args: Array<String>) {
	runApplication<ExpensetrackerApplication>(*args)
}
