// =============================
// TEC FAKTORY BLOG JAVASCRIPT
// =============================



let allPosts = [];

let activeCategory = "All";

let currentPage = 1;

let postsPerPage = 6;





const articleContainer =
document.getElementById("articleContainer");



const pagination =
document.getElementById("pagination");



const searchInput =
document.getElementById("searchInput");







// =============================
// LOAD POSTS FROM JSON
// =============================


async function loadPosts(){


try{


const response =

await fetch("data/posts.json");



allPosts =

await response.json();



loadFeatured();



displayPosts(allPosts);



}



catch(error){


console.log(
"Error loading posts:",
error
);



articleContainer.innerHTML = `

<p>
Unable to load articles.
</p>

`;

}


}







// =============================
// FEATURED ARTICLE
// =============================


function loadFeatured(){



const featured =

allPosts.find(
post => post.featured === true
);



if(!featured) return;



document
.getElementById("featuredArticle")
.innerHTML = `


<div class="featured-card">


<span>
⭐ Featured Article
</span>



<h2>

${featured.title}

</h2>



<p>

${featured.description}

</p>



<a href="${featured.link}">

Read Article →

</a>



</div>


`;



}







// =============================
// DISPLAY POSTS
// =============================


function displayPosts(posts){



articleContainer.innerHTML = "";



if(posts.length === 0){


articleContainer.innerHTML = `

<p>
No articles found.
</p>

`;



pagination.innerHTML = "";


return;


}




let start =

(currentPage - 1)

*

postsPerPage;



let end =

start + postsPerPage;



let paginatedPosts =

posts.slice(start,end);







paginatedPosts.forEach(post=>{


articleContainer.innerHTML += `


<article>


<div class="image">

    <img src="${post.image}" alt="${post.title}">

</div>



<div class="content">


<span>

${post.category}

</span>




<h3>

${post.title}

</h3>



<p>

${post.description}

</p>



<small>

${post.date}

</small>



<br><br>



<a href="${post.link}">

Read More →

</a>



</div>



</article>


`;



});




createPagination(posts);



}








// =============================
// PAGINATION
// =============================


function createPagination(posts){


pagination.innerHTML = "";



let totalPages =

Math.ceil(
posts.length / postsPerPage
);




for(
let i = 1;
i <= totalPages;
i++
){



let button =

document.createElement("button");



button.innerText = i;



if(i === currentPage){

button.classList.add("active");

}




button.onclick = ()=>{


currentPage = i;


displayPosts(
posts
);



window.scrollTo({

top:
document
.getElementById("articles")
.offsetTop,

behavior:"smooth"

});



};



pagination.appendChild(button);



}


}








// =============================
// SEARCH
// =============================


searchInput.addEventListener(
"input",
()=>{


currentPage = 1;


filterPosts();


}

);








// =============================
// CATEGORY FILTER
// =============================


document
.querySelectorAll(".filter-btn")
.forEach(button=>{


button.addEventListener(
"click",
()=>{


document
.querySelectorAll(".filter-btn")
.forEach(btn=>{


btn.classList.remove(
"active"
);



});




button.classList.add(
"active"
);




activeCategory =

button.dataset.category;




currentPage = 1;



filterPosts();



}

);


});









function filterPosts(){



let keyword =

searchInput.value
.toLowerCase();




let filtered =

allPosts.filter(post=>{



let searchMatch =



post.title
.toLowerCase()
.includes(keyword)



||



post.description
.toLowerCase()
.includes(keyword)



||



post.category
.toLowerCase()
.includes(keyword);





let categoryMatch =



activeCategory === "All"



||



post.category === activeCategory;





return searchMatch && categoryMatch;



});





displayPosts(filtered);



}










// =============================
// DARK / LIGHT MODE
// =============================


const themeButton =

document.getElementById(
"themeToggle"
);



let savedTheme =

localStorage.getItem(
"theme"
);





if(savedTheme === "light"){


document.body.classList.add(
"light"
);



themeButton.innerHTML =
"🌙";


}







themeButton.addEventListener(
"click",
()=>{



document.body.classList.toggle(
"light"
);





if(
document.body.classList.contains(
"light"
)
){


localStorage.setItem(
"theme",
"light"
);



themeButton.innerHTML =
"🌙";



}

else{


localStorage.setItem(
"theme",
"dark"
);



themeButton.innerHTML =
"☀️";



}



}

);









// =============================
// WHATSAPP SUBSCRIBE
// =============================


const subscribeForm =

document.getElementById(
"subscribeForm"
);




subscribeForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();



let email =

document.getElementById(
"email"
).value;





if(email === ""){


alert(
"Please enter your email"
);


return;


}






let message = `

Hello Tec Faktory 👋


I want to subscribe to Tec Faktory Blog updates.


Email:

${email}

`;






let whatsapp =

"https://wa.me/2349050322014?text="

+

encodeURIComponent(message);





window.open(
whatsapp,
"_blank"
);



}

);







// START BLOG

loadPosts();
