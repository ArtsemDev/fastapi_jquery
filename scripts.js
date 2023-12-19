// let counter = 0;
//
// $("button#increment").on("click", increment)
// $("button#decrement").on("click", decrement)
//
// function increment(e) {
//     e.preventDefault();
//     counter += 1;
//     console.log(counter)
// }
//
// function decrement(e) {
//     e.preventDefault();
//     counter -= 1;
//     console.log(counter)
// }

$(document).ready(function () {
    $.ajax(
        {
            url: "http://0.0.0.0:8000/categories",
            method: "get",
            dataType: "json",
            success: function (data) {
                let table = document.getElementById("categories");
                table.innerHTML = "<thead><tr><th>ID</th><th>NAME</th></tr></thead>"
                for (let category of data) {
                    let category_table = `<tbody id="category-${category.id}"><tr><th>${category.id}</th><th>${category.name}</th></tr></tbody>`;
                    table.innerHTML += category_table;
                }
            }
        }
    )
})

$("#sign-up").on("submit", function (e) {
    e.preventDefault();
    if (this.password.value !== this.password2.value) {
        let divError = document.getElementById("sign-up-error")
        divError.innerHTML = "password does not match with password confirm"
        this.password.value = ""
        this.password2.value = ""
    } else {
        let registrationData = {
            email: this.email.value,
            password: this.password.value,
            password2: this.password2.value
        }
        $.ajax(
            {
                url: "http://0.0.0.0:8000/registration",
                method: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(registrationData),
                success: function (data) {
                    console.log(data)
                }
            }
        )
    }
})

$("#sign-in").on("submit", function (e) {
    e.preventDefault();
    $.ajax(
        {
            url: "http://0.0.0.0:8000/login",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(
                {
                    email: this.email.value,
                    password: this.password.value
                }
            ),
            success: function (data) {
                localStorage.setItem("token", data.token)
                console.log(localStorage.getItem("token"))
            }
        }
    )
})

$("#profile").on("click", function (e) {
    e.preventDefault();
    let token = localStorage.getItem("token");
    if (token !== null) {
        $.ajax(
            {
                url: "http://0.0.0.0:8000/profile",
                method: "get",
                dataType: "json",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                success: function (data) {
                    console.log(data)
                },
                error: function (e) {
                    window.location.href = "https://yandex.by"
                }
            }
        )
    } else {
        window.location.href = "https://yandex.by"
    }
})
