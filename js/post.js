// GET POST ID

const params = new URLSearchParams(
window.location.search
);


const postId = params.get("id");



// ELEMENTS

const title =
document.getElementById("postTitle");


const image =
document.getElementById("postImage");


const meta =
document.getElementById("postMeta");


const content =
document.getElementById("postContent");




// LOAD POST

async function loadPost(){


try{


// GET JSON

const response =
await fetch("data/posts.json");


const posts =
await response.json();




// FIND POST

const post =
posts.find(
item => item.id == postId
);




if(!post){


title.innerHTML =
"Article Not Found";


content.innerHTML =
"<p>This article does not exist.</p>";


return;


}




// BASIC DETAILS


document.title =
post.title + " | Tec Faktory Blog";



title.innerHTML =
post.title;



image.src =
post.image;


image.alt =
post.title;



meta.innerHTML = `

${post.category}

|

${post.author}

|

${post.date}

|

${post.readingTime}

`;






// LOAD ARTICLE HTML


const articleResponse =

await fetch(post.content);



const articleHTML =

await articleResponse.text();




content.innerHTML = articleHTML;




}



catch(error){


console.log(
error
);


content.innerHTML =

`

<p>
Unable to load article content.
</p>

`;



}



}



loadPost();
