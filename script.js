
const trigger = document.querySelectorAll("[data-filter]");

trigger.forEach(item => {
    item.addEventListener("click", ()=> {
        document.querySelectorAll("[data-filter]").forEach(item => {
            item.classList.remove("active");
        });

        item.classList.add("active");

        if(item.dataset.filter == 'All')  {
            document.querySelectorAll('[data-content]').forEach(cart => {
                cart.style.display = "block";
            });
        } else {
            document.querySelectorAll("[data-content]").forEach(link => {
                link.style.display = "none";
            });
            document.querySelectorAll(`[data-content=${item.dataset.filter}]`).forEach(cart => {
                cart.style.display = "block";
            });
        }
    });

});

const scrollTrigger = document.querySelectorAll("[data-goto]");

scrollTrigger.forEach(item => {
    item.addEventListener("click", (e)=>{
        e.preventDefault();
        const offsetHeight = document.querySelector(`${item.dataset.goto}`).offsetTop;
        const headerHeight = document.querySelector("header").offsetHeight;
        
        window.scrollTo({
            top: offsetHeight - headerHeight,
            behavior: "smooth"
        });
    });
});


const btnTop = document.querySelector("#topBtn");

btnTop.addEventListener("click", (e)=> {
    e.preventDefault();
    window.scrollTo({
        top: 0, 
        behavior: "smooth"
    });
});



const forms = document.querySelectorAll("form");

forms.forEach(form => {
    postData(form);
});

const message = {
    loading : "Загрузка", 
    success: "Спасибо! Мы скоро с вами свяжемся свяжемся",
    failure: "  Что-то пошло не так"
};

function postData(form) {
    form.addEventListener("submit", (e)=> {
        e.preventDefault();

        const statusMessage = document.createElement("div");
                statusMessage.classList.add("status");
                statusMessage.textContent = message.loading;
                form.append(statusMessage);
                
        const formData = new FormData(form);

        const object = {};

        formData.forEach((value, key) => {
            object[key] = value;
        });
        fetch("server.php", {
            method: "POST", 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(object)
        })
        .then(data => data.text())
        .then(data => {
            console.log(data);
            statusMessage.textContent = message.success;
            form.reset();
            setTimeout(() => {
                statusMessage.textContent = "";
            }, 2000);
            
        }).catch(()=> {
            statusMessage.textContent = message.failure;
        }).finally(()=> {
            form.reset();
        });

    });
}