document.getElementById("addButton").addEventListener("click", async function() {
    const name = document.getElementById("isim").value;
    const age = document.getElementById("yas").value;

    if(!name || !age){
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    try{
        const response = await fetch("http://localhost:3000/kayitBE", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, age})
        });
        const data = await response.json();
        console.log(data);
        await getUsers();
        
        // Show sliding notification
        const notification = document.getElementById("notification");
        notification.classList.add("show");
        setTimeout(() => {
            notification.classList.remove("show");
            // Wait for the transition to complete before resetting position
            setTimeout(() => {
                notification.style.transition = 'none';
                notification.style.left = '-300px';
                setTimeout(() => {
                    notification.style.transition = 'left 3s ease-in-out';
                }, 50);
            }, 3000);
        }, 3000);
        
    } catch(error){
        console.log("Error:", error);
    }
});

async function getUsers(){
    const response = await fetch("http://localhost:3000/getUsers");
    const data = await response.json();
    console.log(data);

    document.getElementById("kullaniciListesi").innerHTML = data.map(user => `<li>${user.Name} - ${user.Age}</li>`).join("");
}

document.addEventListener("DOMContentLoaded", async function() {
    await getUsers();
});