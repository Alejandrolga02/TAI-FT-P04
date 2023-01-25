function peticionAjax() {
	event.preventDefault()

	const http = new XMLHttpRequest();
	const url = "https://jsonplaceholder.typicode.com/photos";
	
	http.onreadystatechange = () => {
		// Validar la respuesta de la petición
		if (http.status == 200 && http.readyState == 4) {
			console.log(http.responseText);
			document.getElementById("respuesta").classList.remove("d-none");
			let res = document.getElementById("tablaResultado");

			const json = JSON.parse(http.responseText);
			console.log(json);

			const fragment = document.createDocumentFragment();

			for (const datos of json) {
				const tr = document.createElement('tr');
				tr.innerHTML += `<td>${datos.id}</td>
				<td>${datos.albumId}</td>
				<td>${datos.title}</td>
				<td><img src="${datos.thumbnailUrl}" class="thumbnail w-100" onclick="showAlert('${datos.url}')"></td>`;
				fragment.appendChild(tr);
			} // terminal for

			res.appendChild(fragment);
		} // termina if
	}; // termina funcion

	http.open("GET", url, true);
	http.send();
} // termina funcion ajax

document.getElementById("btnPeticion").addEventListener("click", peticionAjax);

function showAlert(url) {
	const modalToggle = document.getElementById("alertModal");
	const myModal = new bootstrap.Modal("#alertModal", { keyboard: false });

	document.getElementById("alertImg").src = url;

	myModal.show(modalToggle);
}