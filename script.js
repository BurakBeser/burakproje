document.addEventListener('DOMContentLoaded', function() {
    const events = document.querySelectorAll('.event');
    
    events.forEach(function(event) {
        event.addEventListener('click', function() {
            alert("Eğitim Aşaması: " + event.querySelector('div').textContent);
        });
    });
});

// Başlangıç JSON verisi
const veri = {
    "kullanıcılar": [
        { "id": 1, "isim": "Burak", "yas": 21 },
        { "id": 2, "isim": "Onur", "yas": 20 }
    ]
};

// Kullanıcıları listele
function listele() {
    const liste = document.getElementById('kullaniciListesi');
    liste.innerHTML = ''; // Önceki listeyi temizle

    veri.kullanıcılar.forEach(kullanici => {
        const li = document.createElement('li');
        li.textContent = `${kullanici.isim} - ${kullanici.yas} yaşında`;

        // Silme butonu ekle
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sil';
        deleteButton.style.marginLeft = '10px';
        deleteButton.onclick = () => sil(kullanici.id);

        li.appendChild(deleteButton);
        liste.appendChild(li);
    });
}

// Kullanıcı ekle
document.getElementById('addButton').onclick = () => {
    const isim = document.getElementById('isim').value;
    const yas = document.getElementById('yas').value;

    if (isim && yas) {
        const yeniKullanici = {
            id: veri.kullanıcılar.length + 1,
            isim: isim,
            yas: parseInt(yas)
        };
        veri.kullanıcılar.push(yeniKullanici);
        listele(); // Listeyi yeniden güncelle
        document.getElementById('isim').value = ''; // Formu temizle
        document.getElementById('yas').value = ''; // Formu temizle
    } else {
        alert('Lütfen tüm alanları doldurun!');
    }
};

// Kullanıcı sil
function sil(id) {
    veri.kullanıcılar = veri.kullanıcılar.filter(kullanici => kullanici.id !== id);
    listele(); // Listeyi yeniden güncelle
}

// Sayfa yüklendiğinde listeyi göster
window.onload = () => {
    listele();
};
