//모달
const modalBtn = document.querySelector(".icon6");
const modalClose = document.querySelector(".modal__close");
const modalCont = document.querySelector(".modal__cont");

modalBtn.addEventListener("click", () => {
    modalCont.classList.add("show");
    $(".memory__wrap").css("z-index", "0");
    $(".music__wrap").css("z-index", "0");
    $(".search__wrap").css("z-index", "0");
    modalCont.classList.remove("hide");
});
modalClose.addEventListener("click", () => {
    modalCont.classList.add("hide");
});

//탭 메뉴
const tabBtn = document.querySelectorAll(".modal__box .tabs > div");
const tabCont = document.querySelectorAll(".modal__box .cont > div");

tabBtn.forEach((element, index) => {
    element.addEventListener("click", (event) => {
        event.preventDefault();

        tabBtn.forEach((li) => {
            li.classList.remove("active");
        });

        element.classList.add("active");

        tabCont.forEach((div) => {
            div.style.display = "none";
        });

        tabCont[index].style.display = "block";
    });
});
