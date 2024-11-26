$(document).on("change", "#new-category", function(e){
    console.log($(this).val())
    if($(this).val() == "-1"){
        $("#modal-add-category").modal('show')
    }
});
$(document).on("click", "#add-new-category", function(){
    let new_name = $("#new-category-name").val();
    $.ajax({
        url: "/expense/api/category",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: new_name
        }),
        success: function(category){
            console.log("created new category resource with name: " + category.name + " | id: " + category.id)
            $(`<option value=${category.id}>${category.name}</option>`).insertBefore($("#add-category"))
            $("#modal-add-category").modal("hide")
            $("#new-category").val(category.id).change()
        }
    })
});
$(document).on("click", "#postExpense", function(){
    $.ajax({
        url: "/expense/api/expense",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: "Teszt",
            description: "Teszt123",
            date: "2024-10-10",
            amount: 20.4,
            category: 1
        }),
        success: function(expense){
            console.log("asd");
            $("#expense-tbody").append(`
            <tr data-id=${expense.id}>
                <td id="expense-id">${expense.id}</td>
                <td id="expense-name">${expense.name}</td>
                <td id="expense-desc">${expense.description}</td>
                <td id="expense-date">${expense.date}</td>
                <td id="expense-amount">${expense.amount}</td>
                <td id="expense-category">${expense.category.name}</td>
                <td>
                    <div class="expense-actions dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Műveletek</button>
                        <ul class="dropdown-menu">
                            <li><a id="expense-delete" class="dropdown-item" th:attr="data-target=${category.id}">Törlés</a></li>
                            <li><a id="expense-modify" class="dropdown-item" th:attr="data-target=${category.id}">Módosítás</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
            `)
        }
    });
});

$(document).on("click", "#expense-modify", function(){
    let id = $(this).attr("data-target");
    let name = $(`#expense-tbody>tr[data-id=${id}]>td#expense-name`).text();
    let desc = $(`#expense-tbody>tr[data-id=${id}]>td#expense-desc`).text();
    let date = $(`#expense-tbody>tr[data-id=${id}]>td#expense-date`).text();
    let amount = $(`#expense-tbody>tr[data-id=${id}]>td#expense-amount`).text();
    let category_id = $(`#expense-tbody>tr[data-id=${id}]>td#expense-category`).attr("data-cat-id");
    console.log(category_id);
    $(`#expense-tbody>tr[data-id=${id}]`).replaceWith(
        `<tr data-id=${id}>
            <td>${id}</td>
            <td><input type="text" name="Név" id="modify-expense-name" value=${name}></td>
            <td><input type="text" name="Leírás" id="modify-expense-desc" value=${desc}></td>
            <td><input type="date" name="Dátum" id="modify-expense-date" value=${date}></td>
            <td><input type="number" name="Összeg" id="modify-expense-amount" value=${amount}></td>
            <td>
                <select name="Kategória" id="modify-expense-category" class="form-select">
                </select>
            </td>
            <td>
                <button class="btn btn-secondary" id="modify-expense-modify" data-target="${id}">Módosítás</button>
            </td>
        </tr>`
    )
    $.ajax({
        url: "/expense/api/category",
        type: "GET",
        success: function(categories){
            $(`#expense-tbody>tr[data-id=${id}] select#modify-expense-category`).append(
                `<option selected disabled>Válassz egy kategóriát</option>`
            );
            categories.forEach(function(category){
                $(`#expense-tbody>tr[data-id=${id}] select#modify-expense-category`).append(
                    `<option value=${category.id}>${category.name}</option>`
                )
            })
            $(`#expense-tbody>tr[data-id=${id}] select#modify-expense-category`).append(
                `<option id="add-category" value="-1">Új...</option>`
            );
            $(`#expense-tbody>tr[data-id=${id}] select#modify-expense-category`).val(category_id).change();
        }
    });
});

$(document).on("click", "#modify-expense-modify", function(){
    let id = $(this).attr("data-target");
    let name = $(`#expense-tbody>tr[data-id=${id}] input#modify-expense-name`).val();
    let desc = $(`#expense-tbody>tr[data-id=${id}] input#modify-expense-desc`).val();
    let date = $(`#expense-tbody>tr[data-id=${id}] input#modify-expense-date`).val();
    let amount = $(`#expense-tbody>tr[data-id=${id}] input#modify-expense-amount`).val();
    let category_id = $(`#expense-tbody>tr[data-id=${id}] select#modify-expense-category`).val();
    $.ajax({
        url: "/expense/api/expense",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            id: id,
            name: name,
            description: desc,
            date: date,
            amount: amount,
            category: category_id
        }),
        success: function(expense){
            $(`#expense-tbody>tr[data-id=${expense.id}]`).replaceWith(
                `<tr data-id=${expense.id}>
                    <td id="expense-id">${expense.id}</td>
                    <td id="expense-name">${expense.name}</td>
                    <td id="expense-desc">${expense.description}</td>
                    <td id="expense-date">${expense.date}</td>
                    <td id="expense-amount">${expense.amount}</td>
                    <td id="expense-category" data-cat-id=${expense.category.id}>${expense.category.name}</td>
                    <td><div class="expense-actions dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Műveletek</button>
                        <ul class="dropdown-menu">
                            <li><a id="expense-delete" class="dropdown-item" data-target=${expense.id}>Törlés</a></li>
                            <li><a id="expense-modify" class="dropdown-item" data-target=${expense.id}>Módosítás</a></li>
                        </ul>
                    </div></td>
                </tr>`
            )
        }
    })
});

$(document).on("click", "#expense-delete", function(){
    let id = $(this).attr("data-target");
    $.ajax({
        url: "/expense/api/expense",
        type: "DELETE",
        contentType : "application/json",
        data: JSON.stringify({
            id: id
        }),
        success: function(expense){
            console.log("deleted ${expense}");
            $("#expense-tbody>tr[data-id=" + id + "]").empty()
        }
    })
});
$(document).on("click", "#category-modify", function(){
    let id = $(this).attr("data-target");
    let name = $(`#category-tbody>tr[data-id=${id}]>td#category-name`).text();
    $("#category-tbody>tr[data-id=" + id + "]").replaceWith(
        `<tr data-id=${id}>
            <td>${id}</td>
            <td><input type="text" name="category-name" id="modify-category-name" value=${name}></td>
            <td><button class="btn btn-secondary" id="modify-category-modify" data-target=${id}>Módosítás</button></td>
        </tr>`
    )
            
});
$(document).on("click", "#modify-category-modify", function(){
    let id = $(this).attr("data-target");
    let new_name = $(`#category-tbody>tr[data-id=${id}] input#modify-category-name`).val();
    $.ajax({
        url: "/expense/api/category",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            id: id,
            name: new_name
        }),
        success: function(category){
            console.log(`id: ${category.id} | name: ${category.name}`)
            $(`#category-tbody>tr[data-id=${category.id}]`).replaceWith(
                `<tr data-id=${category.id}>
                    <td id="category-id">${category.id}</td>
                    <td id="category-name">${category.name}</td>
                    <td><div class="category-actions dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Műveletek</button>
                        <ul class="dropdown-menu">
                            <li><a id="category-delete" class="dropdown-item" data-target=${category.id}>Törlés</a></li>
                            <li><a id="category-modify" class="dropdown-item" data-target=${category.id}>Módosítás</a></li>
                        </ul>
                    </div></td>
                </tr>`
            )
        }
    })
});
$(document).on("click", "#category-delete", function(){
    let id = $(this).attr("data-target");
    $.ajax({
        url: "/expense/api/category",
        type: "DELETE",
        contentType : "application/json",
        data: JSON.stringify({
            id: id
        }),
        success: function(category){
            console.log("deleted ${expense}");
            $("#category-tbody>tr[data-id=" + id + "]").empty()
        }
    })
});
$(document).on("click", "#add", function(){
    let name = $("#new-name").val();
    let desc = $("#new-desc").val();
    let date = $("#new-date").val();
    let amount = $("#new-amount").val();
    let category = $("#new-category").val();
    console.log(category)
    $.ajax({
        url: "/expense/api/expense",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: name,
            description: desc,
            date: date,
            amount: amount,
            category: category
        }),
        success: function(expense){
            console.log("POST /api/expense/");
            $("#expense-tbody").append(`
            <tr data-id=${expense.id}>
                <td>${expense.id}</td>
                <td>${expense.name}</td>
                <td>${expense.description}</td>
                <td>${expense.date}</td>
                <td>${expense.amount}</td>
                <td>${expense.category.name}</td>
                <td>
                    <div class="expense-actions dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Műveletek</button>
                        <ul class="dropdown-menu">
                            <li><a id="expense-delete" class="dropdown-item" th:attr="data-target=${category.id}">Törlés</a></li>
                            <li><a id="expense-modify" class="dropdown-item" th:attr="data-target=${category.id}">Módosítás</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
        `)
        }
    });
});