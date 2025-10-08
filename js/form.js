let name = $("#name");
let phone = $("#phone");
let loader = $(".loader");
let hasError = false;

$("#submit").click(function (e) {
  e.preventDefault();
  hasError = false;

  // Скрываем все ошибки
  $(".error-input").hide();
  $(".form-input").removeClass("error");

  // Валидация имени
  if (!name.val().trim()) {
    name.next(".error-input").show();
    name.addClass("error");
    hasError = true;
  }

  // Валидация телефона
  const phoneValue = phone.val().trim();
  if (!phoneValue) {
    phone.next(".error-input").show();
    phone.addClass("error");
    hasError = true;
  } else if (phoneValue.length < 11) {
    phone.next(".error-input").text("Номер должен содержать 11 цифр").show();
    phone.addClass("error");
    hasError = true;
  }

  // Если ошибок нет - отправляем форму
  if (!hasError) {
    loader.css("display", "flex");

    // Имитация отправки на сервер
    setTimeout(function () {
      loader.hide();
      alert("Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.");
      $("#form")[0].reset();
    }, 2000);
  }
});

// Скрываем ошибку при вводе в поле
$(".form-input").on("input", function () {
  $(this).removeClass("error");
  $(this).next(".error-input").hide();
});

// Маска для телефона (улучшенная)
$("#phone").on("input", function () {
  let value = $(this).val().replace(/\D/g, "");

  // Ограничиваем длину
  if (value.length > 11) {
    value = value.substring(0, 11);
  }

  // Форматируем номер
  if (value.length > 0) {
    if (value[0] !== "8") {
      value = "8" + value.substring(1);
    }
  }

  $(this).val(value);
});
