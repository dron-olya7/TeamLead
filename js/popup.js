// popup.js - полная версия с обработчиком кнопки
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен, инициализируем попап...");

  // Элементы попапа
  const modal = document.getElementById("orderModal");
  const closeBtn = document.querySelector(".close");
  const quickForm = document.getElementById("quickForm");
  const quickName = document.getElementById("quickName");
  const quickPhone = document.getElementById("quickPhone");
  const quickNameError = document.getElementById("quickNameError");
  const quickPhoneError = document.getElementById("quickPhoneError");
  const loader = document.querySelector(".loader");
  const btnPopup = document.getElementById("btn-popup"); // Новая кнопка

  // Проверяем, что все элементы найдены
  console.log("Элементы:", {
    modal,
    closeBtn,
    quickForm,
    quickName,
    quickPhone,
    quickNameError,
    quickPhoneError,
    loader,
    btnPopup,
  });

  if (!modal || !quickForm || !quickName || !quickPhone || !btnPopup) {
    console.error("Не все элементы попапа найдены!");
    return;
  }

  // Открыть попап при клике на кнопки "Заказать сейчас"
  const orderButtons = document.querySelectorAll('a[href="#order"]');
  console.log("Найдено кнопок заказа:", orderButtons.length);

  orderButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Клик по кнопке заказа");
      openModal();
    });
  });

  // Функция открытия попапа
  function openModal() {
    console.log("Открываем попап");
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    quickForm.reset();
    hideAllErrors();
  }

  // Функция закрытия попапа
  function closeModal() {
    console.log("Закрываем попап");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Скрыть все ошибки
  function hideAllErrors() {
    quickNameError.style.display = "none";
    quickPhoneError.style.display = "none";
    quickName.style.borderColor = "";
    quickName.style.backgroundColor = "";
    quickPhone.style.borderColor = "";
    quickPhone.style.backgroundColor = "";
    console.log("Все ошибки скрыты");
  }

  // Закрыть попап при клике на крестик
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Закрыть при клике вне попапа
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Закрыть при нажатии Escape
  document.addEventListener("keyup", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // ОСНОВНОЙ ОБРАБОТЧИК ДЛЯ КНОПКИ
  btnPopup.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("🟢 КЛИК ПО КНОПКЕ ПОПАПА!");

    const name = quickName.value.trim();
    const phone = quickPhone.value.trim();
    let hasError = false;

    console.log("Данные формы:", {
      name,
      phone,
      nameLength: name.length,
      phoneLength: phone.length,
    });

    // Скрываем предыдущие ошибки
    hideAllErrors();

    // Валидация имени
    // В функции валидации - ИСПОЛЬЗУЕМ КЛАССЫ
    if (!name) {
      console.log("❌ Имя пустое, показываем ошибку");
      quickName.classList.add("error");
      quickNameError.classList.add("show");
      hasError = true;
    }

    if (!phone) {
      console.log("❌ Телефон пустой, показываем ошибку");
      quickPhone.classList.add("error");
      quickPhoneError.classList.add("show");
      hasError = true;
    } else if (phone.length < 11) {
      console.log("❌ Телефон слишком короткий:", phone.length);
      quickPhone.classList.add("error");
      quickPhoneError.classList.add("show");
      hasError = true;
    }

    console.log("Результат валидации - hasError:", hasError);

    if (!hasError) {
      console.log("✅ Ошибок нет, отправляем форму");
      // Показываем загрузку
      if (loader) {
        loader.style.display = "flex";
      }

      // Имитация отправки на сервер
      setTimeout(function () {
        if (loader) {
          loader.style.display = "none";
        }
        closeModal();
        alert(
          "Спасибо! Ваш заказ оформлен. Мы свяжемся с вами в течение 15 минут."
        );
        quickForm.reset();
      }, 1500);
    } else {
      console.log("🚫 Есть ошибки, форма не отправляется");
    }
  });

  // Скрываем ошибки при вводе в поля формы
  quickName.addEventListener("input", function () {
    console.log("Ввод в поле имени");
    this.style.borderColor = "";
    this.style.backgroundColor = "";
    quickNameError.style.display = "none";
  });

  quickPhone.addEventListener("input", function () {
    console.log("Ввод в поле телефона");
    this.style.borderColor = "";
    this.style.backgroundColor = "";
    quickPhoneError.style.display = "none";
  });

  // Маска для телефона в попапе
  quickPhone.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    if (value.length > 0) {
      if (value[0] !== "8") {
        value = "8" + value.substring(1);
      }
    }
    this.value = value;
  });

  // Таймер обратного отсчета для попапа
  let quickTimerSeconds = 30 * 60;
  const countdownSmall = document.querySelector(".countdown-small");

  function updateQuickTimer() {
    const minutes = Math.floor(quickTimerSeconds / 60);
    const seconds = quickTimerSeconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    if (countdownSmall) {
      countdownSmall.textContent = formattedMinutes + ":" + formattedSeconds;
      if (quickTimerSeconds <= 300) {
        countdownSmall.classList.add("warning");
      }
      if (quickTimerSeconds <= 60) {
        countdownSmall.classList.add("critical");
      }
    }
    quickTimerSeconds--;
    if (quickTimerSeconds < 0) {
      clearInterval(quickTimerInterval);
      if (countdownSmall) {
        countdownSmall.textContent = "00:00";
        countdownSmall.classList.add("expired");
      }
    }
  }

  // Запускаем таймер для попапа
  if (countdownSmall) {
    updateQuickTimer();
    const quickTimerInterval = setInterval(updateQuickTimer, 1000);
  }

  // Авто-открытие попапа через 10 секунд
  setTimeout(function () {
    if (!localStorage.getItem("orderCompleted")) {
      openModal();
    }
  }, 10000);

  console.log("🎉 Попап инициализирован успешно!");
});
