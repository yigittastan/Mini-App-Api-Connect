// Modal aç
function openProfile() {
    document.getElementById("openProfileModol").style.display = "flex";
    showLogin();
}
function showLogin() {
    document.getElementById("loginModol").style.display = "flex";
    document.getElementById("registerModol").style.display = "none";
}

function showRegister() {
    document.getElementById("registerModol").style.display = "flex";
    document.getElementById("loginModol").style.display = "none";
}

// Modal kapat
function closeProfile() {
    document.getElementById("openProfileModol").style.display = "none";
}

// Dışarı tıklanınca modal kapansın
window.onclick = function (event) {
    const modal = document.getElementById("openProfileModol");
    if (event.target === modal) {
        closeProfile();
    }
}

// Form verisini al
function postProfil() {
    const postEmail = document.getElementById("emailIconRegister");
    const postKey = document.getElementById("keyInput");

    if (postEmail && postKey) {
        const email = postEmail.value.trim();
        const password = postKey.value.trim();

        // Basit kontrol ve console örneği
        if (email && password) {
            console.log("Giriş Bilgileri:");
            console.log("Email:", email);
            console.log("Şifre:", password);
        } else {
            alert("Lütfen tüm alanları doldurun.");
        }
    }
}





// Benim Kodlarım burada bitiyor

function openAddContent() {
    document.getElementById("addcontentModal").style.display = "flex";
}

function closeAddContent() {
    document.getElementById("addcontentModal").style.display = "none";
}

window.onclick = function (event) {
    let modal = document.getElementById("addcontentModal");
    if (event.target === modal) {
        closeAddContent();
    }
}

function savecontent() {
    let name = document.getElementById("name-content").value;
    let url = document.getElementById("url-content").value;
    let img = document.getElementById("img-content").files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
        let imgSrc = reader.result;

        // API'ye veri gönderme işlemi
        const contentData = {
            name: name,
            url: url,
            image: imgSrc
        };

        // API'ye POST isteği gönderiyoruz
        fetch('https://your-api-url.com/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contentData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Veri başarıyla gönderildi:', data);
                displayContent();  // Verileri tekrar yüklemek için displayContent çağırılır
            })
            .catch((error) => {
                console.error('Hata:', error);
            });
    };
    reader.readAsDataURL(img);
}

function clearcontent() {
    document.getElementById("name-content").value = "";
    document.getElementById("url-content").value = "";
    document.getElementById("img-content").value = "";
    closeAddContent();
}

document.getElementById("add-save-content").addEventListener("click", function () {
    savecontent();
    clearcontent();
});

// API'den içerikleri yükle
function displayContent() {
    fetch('https://your-api-url.com/content')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.querySelector('.content');
            contentDiv.innerHTML = '';

            data.forEach((group, index) => {
                let name = group.name || '';
                let url = group.url || '';
                let img = group.image || '';
                let contentItem = document.createElement("div");
                contentItem.classList.add("content-item");
                contentItem.setAttribute("draggable", "true");
                contentItem.dataset.index = index;
                contentItem.innerHTML = `
                    <div class="content-wrapper">
                        <button class="delete-btn" onclick="deleteContent(${index})">&times;</button>
                        <img class="contentimg" src="${img}" alt="Image">
                        <p class="contentname">${name}</p>
                        <a class="contenturl" href="${url}" target="_blank">${url}</a>
                    </div>
                `;
                contentDiv.appendChild(contentItem);
            });
        })
        .catch((error) => {
            console.error('Veri yüklenirken hata oluştu:', error);
        });
}

function deleteContent(index) {
    // API'ye DELETE isteği gönderiyoruz
    fetch(`https://your-api-url.com/content/${index}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Veri başarıyla silindi:', data);
            displayContent();  // İçeriği yeniden yükle
        })
        .catch((error) => {
            console.error('Silme işlemi sırasında hata oluştu:', error);
        });
}

window.onload = function () {
    displayContent();
};

let dragged = null;

contentDiv.addEventListener("dragstart", (e) => {
    dragged = e.target.closest(".content-item");
    e.target.style.opacity = "0.5";
});

contentDiv.addEventListener("dragover", (e) => {
    e.preventDefault();
    const cards = [...contentDiv.children];

    let closest = null;
    let closestDist = Number.POSITIVE_INFINITY;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < closestDist) {
            closestDist = dist;
            closest = card;
        }
    });

    if (closest && closest !== dragged) {
        const rect = closest.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        if (mouseX < rect.left + rect.width / 2 && mouseY < rect.top + rect.height / 2) {
            contentDiv.insertBefore(dragged, closest);
        } else {
            contentDiv.insertBefore(dragged, closest.nextSibling);
        }
    }
});

// /assets/js/script.js

document.getElementById("add-content-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name-content").value;
    let url = document.getElementById("url-content").value;
    let img = document.getElementById("img-content").files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
        let imgSrc = reader.result;

        const contentData = {
            name: name,
            url: url,
            image: imgSrc
        };

        fetch('/api/content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contentData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Veri başarıyla gönderildi:', data);
                displayContent();  // İçeriği yeniden yükle
            })
            .catch((error) => {
                console.error('Hata:', error);
            });
    };
    reader.readAsDataURL(img);
});
function postRegister() {
    const usernameInputRegister = document.getElementById('usernameInputRegister');
    const emailIconRegister = document.getElementById('emailInputRegister');
    const keyInputRegister = document.getElementById('keyInputRegister');

}

module.exports = { usernameInputRegister, emailIconRegister, keyInputRegister }