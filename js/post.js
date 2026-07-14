// GET ARTICLE ID FROM URL

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


const response =
await fetch("data/posts.json");



const posts =
await response.json();




const post =
posts.find(
item => item.id == postId
);





if(!post){


title.innerHTML =
"Article Not Found";


content.innerHTML =
"<p>The article you requested does not exist.</p>";


return;


}







// DISPLAY DATA



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

`;




// ARTICLE CONTENT


content.innerHTML = `


<p>

${post.description}

</p>


<h2>

Introduction

</h2>


<p>

${post.description}

Tec Faktory provides educational content to help readers understand technology, cybersecurity and digital safety.

</p>



<h2>

Full Article

</h2>



<p>

This article is currently being prepared.

More detailed information will be added soon.

</p>



`;




}



catch(error){


console.log(
"Error loading article:",
error
);


content.innerHTML =
"Unable to load article.";

}



}




loadPost();
