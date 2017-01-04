var nameField = document.getElementById("name");
var usernameField = document.getElementById("lastname");
var skillsField = document.getElementById("skills");
var arr = [];

nameField.addEventListener("input", symLeft);
usernameField.addEventListener("input", function(e) {
	symLeft(e);
	simpleGet(e);
});

skillsField.addEventListener("change", getKeywords);
skillsField.addEventListener("keydown", function(e) {
	if (event.keyCode == 13) {
		getKeywords(e);
		return false;
	}
});

document.getElementById("userpic").addEventListener( "change", getUserPic );
document.getElementById("userpicwp").addEventListener( "change", getUserPic );
document.getElementById("getbanner").addEventListener( "click", bannershow );

var allModals = document.getElementsByClassName("modalholder");
for (var i = 0; i < allModals.length; i++) {
	allModals[i].addEventListener( "click", closeModal );
}

var links = document.querySelectorAll("ul a");
for (var i = 0; i < links.length; i++) {
	links[i].addEventListener("click", modaltoggle);
}

function modaltoggle(e) {
	var box = e.target.getAttribute("data-modal");
	document.getElementById(box).style.display = "block";
}

function bannershow(e) {
	var banner = e.target.getAttribute("data-banner");
	//console.log(banner);
	document.getElementById(banner).style.top = 0;
	document.getElementById("modalresetpwd").style.display = "none";
	setTimeout( function() {
		document.getElementById(banner).style.top = "";
	}, 3000);
}

function closeModal(e) {
	if(e.target.classList.contains("modalholder")) {
		e.target.style.display = "none";
	}
}

function getUserPic(e) {
	var container = e.target.getAttribute("data-pic");
	document.getElementById(container).innerHTML = "";
	console.log(container);
	var userImg = document.createElement("img");
	userImg.src = window.URL.createObjectURL(e.target.files[0]);	
	userImg.onload = function() {
		//document.getElementById("userimage").style.backgroundImage = "url(" + userImg.src + ")";
		if(document.getElementById(container).clientWidth >= 150) {
			console.log("big");
			userImg.style.width = "100%";
		}
		else if(userImg.naturalWidth > userImg.naturalHeight) {
			userImg.style.height = "100%";
		}
		else { userImg.style.width = "100%"; }
		document.getElementById(container).appendChild(userImg);
		//window.URL.revokeObjectURL(this.src);
	};
}


function symLeft(e) {
	var txt = e.target.value.length;
	var fieldId = e.target.id;
	var outputDiv = document.querySelector( "#" + fieldId + " + .underinput" );
	outputDiv.innerHTML = 80 - txt;
  
}

function simpleGet(e) {
	var txt = e.target.value;
	var regexp = /[^a-zA-Z\d\s:]/;
	document.getElementById("namepreview").innerHTML = txt;
	if( txt.match(regexp) ) {
		document.getElementById(e.target.id).style.borderColor = "red";
	}
	else {document.getElementById(e.target.id).style.borderColor = "";}
}

function getKeywords(e) {
	e.preventDefault();
	var txt = e.target.value;
	if(!arr.length) {
	arr = txt.split(", ");
	}

	else {
		var newArr = txt.split(", ");
		console.log("New Arr Created = " + newArr);
		arr = arr.concat(newArr);
	}
  
	document.getElementById("skillsoutput").innerHTML = "";
	arr.map(function(item, index) {
		var newSpan = document.createElement("span");
		newSpan.innerHTML = item;
		document.getElementById("skillsoutput").appendChild(newSpan);
		newSpan.addEventListener("click", function(e) {
			delindex = arr.indexOf(e.target.innerHTML);
			arr.splice(delindex, 1);
      // console.log(arr);
			document.getElementById("skillsoutput").removeChild(e.target);      
		});
		e.target.value = "";
	});

}


