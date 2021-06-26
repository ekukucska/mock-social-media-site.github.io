// // to load all html before calling js
// $(document).ready(function(){

// // closing (document).ready
// });

// index.html
// Login / Register Tabs SWITCH
function openCity(event, tabSwitch) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(tabSwitch).style.display = "block";
  event.currentTarget.className += " active";
}

// index.html
// LOGIN
let usernameForCheck = "nickname";
let passwordForCheck = "pass";

function checkLogin(event) {
  event.preventDefault(); // sa oprim default action de pe form sa trimita pe pagina newsletter
  let inputUsername = document.getElementById("inputUsername").value;
  let inputPassword = document.getElementById("inputPassword").value;

  if (inputUsername == "" || inputPassword == "") {
    alert("The username or password field can't be empty!");
  } else if (
    inputUsername !== usernameForCheck ||
    inputPassword !== passwordForCheck
  ) {
    alert("The username or password are incorrect!");
  } else {
    window.location = "newsfeed.html";
  }
}

// index.html
// REGISTER
function checkRegister(event) {
  event.preventDefault(); // sa oprim default action de pe form sa trimita pe pagina newsletter
  let registerFullName = document.getElementById("registerFullName").value;
  let registerEmail = document.getElementById("registerEmail").value;
  let registerUsername = document.getElementById("registerUsername").value;
  let registerPassword = document.getElementById("registerPassword").value;

  if (registerEmail == "" || registerPassword == "") {
    alert("'E-Mail' and 'Password' are mandatory fields!");
  } else {
    $.post(
      "https://reqres.in/api/register",
      {
        email: registerEmail,
        password: registerPassword,
      },
      function (data, status) {
        alert("Data: " + data.token + "\nStatus: " + status);
      }
    );
  }
}

// newsfeed.html
// ONLINE FRIENDS - DROPDOWN LIST
$.get("https://jsonplaceholder.typicode.com/users", function (result) {
  console.log(result); //just to check
  for (let i = 0; i < result.length; i++) {
    let names = result[i].name;
    console.log(names); //just to check
    // $("ul.links").append(`<li id="item-${i}"><span>&#8226;</span>${names}</li>`); //test
    $("#dropdown-friends-list").append(` 
            <a href="#" id="item-${i}">${names}</a>
		`);
  }
}).fail(function () {
  $("#dropdown-friends-list").append(
    `<li id="error-message">Can't acess friends list.</li>`
  );
});

// newsfeed.html
// MESSAGES - DROPDOWN LIST
$.get("https://jsonplaceholder.typicode.com/comments", function (result) {
  console.log(result); //just to check
  for (let i = 0; i < 10; i++) {
    let posts = result[i].name;
    console.log(posts); //just to check
    // $("ul.links").append(`<li id="item-${i}"><span>&#8226;</span>${names}</li>`); //test
    $("#dropdown-comments-list").append(` 
            <a href="#" id="item-${i}">${posts}</a>
        `);
  }
}).fail(function () {
  $("#dropdown-friends-list").append(
    `<li id="error-message">Can't acess friends list.</li>`
  );
});

// newsfeed.html
// POSTS
$.get("https://jsonplaceholder.typicode.com/posts", function (result) {
  console.log(result); //just to check
  for (let i = 0; i < 30; i++) {
    let userId = result[i].userId;
    let title = result[i].title;
    let body = result[i].body;
    let imgCount = i + 1;
    console.log(title + body); //just to check

    $("main").append(`
           <article>
                <div class="header row">
                    <a href="#">
                        <div class="profile-image">
                        
                        </div>
                        <div class="profile-details">
                            <h3>User: ${userId}</h3>
                        </div>
                    </a>
                </div>
                <div class="content">
                    <img src="https://picsum.photos/400?random=${imgCount}">
                    <a href="#">
                    	<h4>${title}</h4>
                    </a>
                    <p>${body}</p>
                </div>
                <div class="footer">
                    <ul class="row">
                        <li>
                            <a href="">
                                <i class="fa fa-thumbs-up"></i>
                                <span>Like</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="fa fa-thumbs-down"></i>
                                <span>Dislike</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="fa fa-retweet"></i>
                                <span>Share</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="comment">
                    <form>
                        <input type="text" placeholder="Write something...">
                        <button type="submit">
                            <i class="fa fa-send"></i>
                        </button>
                    </form>
                </div>
            </article>  
 		`);
  }
}).fail(function () {
  $("main").append(`
			<article>
                <div class="header row">
                    <h3>We can't show any posts. Please check your internet connection.</h3>
                </div>
            </article>  
      	`);
});

// newsfeed.html
// USER PROFILE
$.get("https://reqres.in/api/users/2", function (result) {
  let id = result.data.id;
  let firstName = result.data.first_name;
  let lastName = result.data.last_name;
  let profilePic = result.data.avatar;
  $("#userData").append(`
                    <div class="profile-details">
                        <h3>${firstName} ${lastName}</h3>
                        <p>User ID: ${id}</p>
                    </div>
 		`);
}).fail(function () {
  $("#userData").append(`
			<article>
                <div class="header row">
                    <h3>We can't show any posts. Please check your internet connection.</h3>
                </div>
            </article>  
      	`);
});

// newsfeed.html
// ADDS SLIDER
let addsSliderImages = [
  { imgSource: "img/adds/add-img-1.jpg", addText: "Try Colorado's best!" },
  {
    imgSource: "img/adds/add-img-2.jpg",
    addText: "Gandy Digital - Best digital services",
  },
  {
    imgSource: "img/adds/add-img-3.jpg",
    addText: "Find the latest deals on Amazon",
  },
];
let x = 0;
let timer;

window.onload = function () {
  auto();
};

function auto() {
  timer = setInterval(function () {
    next();
  }, 5000);
}

function next() {
  if (x < addsSliderImages.length - 1) {
    x++;
  } else {
    x = 0;
  }
  document
    .getElementById("addsImage")
    .setAttribute("src", addsSliderImages[x].imgSource);
  document
    .getElementById("addsText")
    .setAttribute("src", addsSliderImages[x].imgSource);
  document.getElementById(
    "addsText"
  ).innerHTML = `<a href="#" id="add-link">${addsSliderImages[x].addText}</a>`;
}
