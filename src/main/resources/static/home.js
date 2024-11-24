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
            $("#expenseTBody").append(`
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