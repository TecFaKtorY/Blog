// ===============================
// TEC FAKTORY SINGLE POST LOADER
// ===============================


// GET POST ID FROM URL

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





// LOAD ARTICLE


async function loadPost(){


try{


if(!postId){

throw new Error(
"No article ID provided"
);

}





// LOAD POSTS JSON

const response = await fetch(
"data/posts.json"
);



if(!response.ok){

throw new Error(
"Unable to load posts.json"
);

}



const posts =
await response.json();





// FIND CURRENT ARTICLE


const post =
posts.find(
item => item.id == postId
);





if(!post){


title.innerHTML =
"Article Not Found";


content.innerHTML =
`

<p>
The article you requested does not exist.
</p>

<a href="index.html">
← Back To Home
</a>

`;

return;

}






// UPDATE PAGE TITLE


document.title =
`${post.title} | Tec Faktory`;





// UPDATE IMAGE


image.src =
post.image;


image.alt =
post.title;






// UPDATE TITLE


title.innerHTML =
post.title;







// UPDATE META


meta.innerHTML = `

<span>${post.category}</span>

|

<span>${post.author}</span>

|

<span>${post.date}</span>

|

<span>${post.readingTime}</span>

`;








// SHOW LOADING


content.innerHTML = `

<p>
Loading article content...
</p>

`;






// FETCH ARTICLE FILE


const articleResponse =
await fetch(post.content);




if(!articleResponse.ok){

throw new Error(
"Article file not found"
);

}



const articleHTML =
await articleResponse.text();





// INSERT ARTICLE


content.innerHTML =
articleHTML;







// GOOGLE ANALYTICS PAGE VIEW

if(typeof gtag === "function"){


gtag(
'event',
'page_view',
{

page_title:
post.title,

page_location:
window.location.href


}

);


}





}



catch(error){


console.error(
"Post loading error:",
error
);



title.innerHTML =
"Unable To Load Article";



content.innerHTML = `

<p>
Something went wrong while loading this article.
</p>


<p>
${error.message}
</p>


<a href="index.html">
← Return Home
</a>

`;



}



}





loadPost();
