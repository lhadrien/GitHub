var links = document.getElementsByTagName('a'),
			linksLen = links.length;

			function displayImg(link) {

				var img = new Image(),
					overlay = document.getElementById('overlay');

				img.onload = function() {
					overlay.innerHTML = '';
					overlay.appendChild(img);
				};

				img.src = link.href;
				overlay.style.display = 'block';
				overlay.innerHTML = '<span>Chargement en cours...</span>';

			}
			
			document.getElementById('overlay').onclick = function() {
				this.style.display = 'none';
			};
			
			for (var i = 0 ; i < linksLen ; i++) {

				links[i].onclick = function() { // Vous pouvez très bien utiliser le DOM-2
					displayImg(this); // On appelle notre fonction pour afficher les images et on lui passe le lien concerné
					return false; // Et on bloque la redirection
				};

			}