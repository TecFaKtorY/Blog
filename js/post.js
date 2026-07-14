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


// =================================
// TEC FAKTORY READING MODE AUDIO
// =================================


let audioContext;

let noiseSource;

let isPlaying = false;




const musicModal =
document.getElementById("musicModal");


const musicPlayer =
document.getElementById("musicPlayer");


const enableMusic =
document.getElementById("enableMusic");


const skipMusic =
document.getElementById("skipMusic");


const pauseMusic =
document.getElementById("pauseMusic");


const closeMusic =
document.getElementById("closeMusic");


const currentTrack =
document.getElementById("currentTrack");




// SHOW POPUP AFTER PAGE LOAD

window.addEventListener(
"load",
()=>{

setTimeout(()=>{

if(musicModal){

musicModal.style.display="flex";

}

},1500);


});






// START READING MODE


enableMusic.onclick = ()=>{


musicModal.style.display="none";



chooseSound();

};





skipMusic.onclick = ()=>{


musicModal.style.display="none";


};






// SOUND MENU


function chooseSound(){


let choice = prompt(

"Choose Reading Sound:\n\n" +

"1 - Rain Focus\n" +

"2 - Digital Ambient\n" +

"3 - Deep Focus"

);



if(choice){

startSound(choice);

}


}







// CREATE AMBIENT SOUND


function startSound(type){


audioContext =
new AudioContext();



let bufferSize =
audioContext.sampleRate * 2;



let buffer =
audioContext.createBuffer(

1,

bufferSize,

audioContext.sampleRate

);



let data =
buffer.getChannelData(0);





for(
let i=0;
i<bufferSize;
i++
){


data[i] =
Math.random() * 2 - 1;


}





noiseSource =
audioContext.createBufferSource();


noiseSource.buffer =
buffer;



let filter =
audioContext.createBiquadFilter();



filter.type =
"lowpass";



filter.frequency.value =

type == 2
?
600
:
300;





noiseSource
.connect(filter);



filter
.connect(
audioContext.destination
);



noiseSource.loop=true;



noiseSource.start();





isPlaying=true;



musicPlayer.style.display="block";



if(type==1){

currentTrack.innerHTML =
"🌧 Rain Focus";

}


else if(type==2){

currentTrack.innerHTML =
"💻 Digital Ambient";

}


else{

currentTrack.innerHTML =
"🎯 Deep Focus";

}


}







// PAUSE / RESUME


pauseMusic.onclick = ()=>{


if(!audioContext)
return;



if(isPlaying){


audioContext.suspend();


pauseMusic.innerHTML =
"▶ Play";


isPlaying=false;



}

else{


audioContext.resume();


pauseMusic.innerHTML =
"⏸ Pause";


isPlaying=true;


}



};







// CLOSE PLAYER


closeMusic.onclick = ()=>{


if(audioContext){

audioContext.close();

}


musicPlayer.style.display="none";


};
