(() => {

  "use strict";
  const GOOGLE_SCRIPT_URL = 
  "https://script.google.com/macros/s/AKfycbx8AYDy1DwCGeDI4GtoH0UpWewf79NwUilHsYhRadRG9_1kRaPhDlpIaM_ObFOJNb4B8A/exec";

  /* =========================
     SHORT SELECTORS
  ========================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  const menuButton = $("#menuButton");
  const navMenu = $("#navMenu");

  const scrollProgress = $("#scrollProgress");

  const form = $("#registrationForm");

  const toast = $("#toast");

  const message = $("#formMessage");

  const seatCount = $("#seatCount");


  /* =========================
     MOBILE NAVIGATION
  ========================= */

  menuButton?.addEventListener("click", () => {

    const isOpen =
      navMenu.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen
        ? "Close menu"
        : "Open menu"
    );

  });


  $$(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("open");

      menuButton?.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton?.setAttribute(
        "aria-label",
        "Open menu"
      );

    });

  });


  /* =========================
     SCROLL PROGRESS
  ========================= */

  const updateProgress = () => {

    const max =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percent =
      max > 0
        ? (window.scrollY / max) * 100
        : 0;

    if (scrollProgress) {

      scrollProgress.style.width =
        `${percent}%`;

    }

  };


  window.addEventListener(
    "scroll",
    updateProgress,
    {
      passive:true
    }
  );


  window.addEventListener(
    "resize",
    updateProgress
  );


  updateProgress();


  /* =========================
     REVEAL ANIMATION
  ========================= */

  const revealItems =
    $$(".reveal");


  if (
    "IntersectionObserver" in window &&
    !window
      .matchMedia(
        "(prefers-reduced-motion: reduce)"
      )
      .matches
  ) {

    const observer =
      new IntersectionObserver(
        (entries, obs) => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target
                .classList
                .add("visible");

              obs.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold:0.12
        }
      );


    revealItems.forEach(item => {

      observer.observe(item);

    });

  } else {

    revealItems.forEach(item => {

      item.classList.add(
        "visible"
      );

    });

  }


  /* =========================
     FORM VALIDATION
  ========================= */

  const validators = {

    name: value =>

      value.trim().length >= 2
        ? ""
        : "Please enter your full name.",


    email: value =>

      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
        .test(value.trim())

        ? ""

        : "Enter a valid email address.",


    college: value =>

      value.trim().length >= 2
        ? ""
        : "Please enter your college / university.",


    interest: value =>

      value
        ? ""
        : "Please select an area of interest."

  };


  function setFieldError(
    id,
    text
  ){

    const field =
      document.getElementById(id);

    if (!field) return;


    const wrapper =
      field.closest(".field");


    const error =
      $(`[data-error="${id}"]`);


    wrapper.classList.toggle(
      "invalid",
      Boolean(text)
    );


    field.setAttribute(
      "aria-invalid",
      String(Boolean(text))
    );


    if (error) {

      error.textContent = text;

    }

  }


  Object.keys(validators)
    .forEach(id => {

      const field =
        document.getElementById(id);


      field?.addEventListener(
        "blur",
        () => {

          setFieldError(
            id,
            validators[id](
              field.value
            )
          );

        }
      );


      field?.addEventListener(
        "input",
        () => {

          if (
            field
              .closest(".field")
              ?.classList
              .contains("invalid")
          ){

            setFieldError(
              id,
              validators[id](
                field.value
              )
            );

          }

        }
      );


      field?.addEventListener(
        "change",
        () => {

          setFieldError(
            id,
            validators[id](
              field.value
            )
          );

        }
      );

    });


  /* =========================
     TOAST
  ========================= */

  function showToast(text){

    if (!toast) return;


    clearTimeout(
      showToast.timer
    );


    toast.textContent =
      text;


    toast.classList.add(
      "show"
    );


    showToast.timer =
      setTimeout(
        () => {

          toast.classList.remove(
            "show"
          );

        },
        3200
      );

  }


  /* =========================
     LOCAL STORAGE
  ========================= */

  const STORAGE_KEY =
    "studentBuilderDemoRegistrations";


  let registrations =
    Number(
      localStorage.getItem(
        STORAGE_KEY
      ) || 0
    );


  const renderSeats = () => {

    if (seatCount) {

      seatCount.textContent =
        Math.max(
          0,
          100 - registrations
        );

    }

  };


  renderSeats();


  /* =========================
     FORM SUBMIT
  ========================= */

  form?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      let valid = true;

      let firstInvalid = null;


      Object.keys(validators)
        .forEach(id => {

          const field =
            document.getElementById(id);


          const error =
            validators[id](
              field.value
            );


          setFieldError(
            id,
            error
          );


          if (error) {

            valid = false;

            if (!firstInvalid) {

              firstInvalid =
                field;

            }

          }

        });


      const consent =
        $("#consent");


      if (!consent.checked) {

        valid = false;

        showToast(
          "Please accept the demo event update consent."
        );

      }


      if (!valid) {

        if (firstInvalid) {

          firstInvalid.focus();

        }


        if (message) {

          message.className =
            "form-message error";

          message.textContent =
            "Please fix the highlighted fields.";

        }


        if (
          !consent.checked &&
          !firstInvalid
        ){

          consent.focus();

        }

        return;

      }


      const name =
        $("#name")
          .value
          .trim();
const email = $("#email").value.trim();
const college = $("#college").value.trim();
const interest = $("#interest").value;

const formData = new FormData();

formData.append("name", name);
formData.append("email", email);
formData.append("college", college);
formData.append("interest", interest);
formData.append("registeredAt", new Date().toISOString());

try {
    await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
    });
} catch (error) {
    console.error("Google Sheets error:", error);
}

      registrations += 1;


      localStorage.setItem(
        STORAGE_KEY,
        String(registrations)
      );


      renderSeats();


      if (message) {

        message.className =
          "form-message success";

        message.textContent =
          `✓ Thanks ${name}! Your demo registration is confirmed.`;

      }


      showToast(
        "Registration confirmed successfully."
      );


      form.reset();


      Object.keys(validators)
        .forEach(id => {

          setFieldError(
            id,
            ""
          );

        });

    }
  );


  /* =========================
     FAQ ACCORDION
  ========================= */

  $$(".faq-list details")
    .forEach(detail => {

      detail.addEventListener(
        "toggle",
        () => {

          if (!detail.open)
            return;


          $$(".faq-list details")
            .forEach(other => {

              if (
                other !== detail
              ){

                other.removeAttribute(
                  "open"
                );

              }

            });

        }
      );

    });


})();