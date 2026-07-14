// =====================================
// TEC FAKTORY POST GLOBAL FUNCTIONS
// =====================================



// =====================================
// DARK / LIGHT MODE
// =====================================


const themeButton = document.getElementById(
"themeToggle"
);



function loadTheme(){


let savedTheme =
localStorage.getItem("theme");



if(savedTheme === "light"){


document.body.classList.add("light");


if(themeButton){

themeButton.innerHTML="🌙";

}


}


}




function toggleTheme(){


document.body.classList.toggle(
"light"
);



if(document.body.classList.contains("light")){


localStorage.setItem(
"theme",
"light"
);



themeButton.innerHTML="🌙";


}


else{


localStorage.setItem(
"theme",
"dark"
);



themeButton.innerHTML="☀️";


}


}



if(themeButton){


loadTheme();


themeButton.addEventListener(
"click",
toggleTheme
);


}







// =====================================
// SHARE ARTICLE
// =====================================



function shareArticle(){


let title =
document.getElementById(
"postTitle"
)?.innerText;



let url =
window.location.href;




if(navigator.share){



navigator.share({

title:title,

text:
"Read this Tec Faktory article",

url:url


})

.catch(()=>{});



}

else{



navigator.clipboard.writeText(url);



alert(
"Article link copied!"
);



}



}







// =====================================
// WHATSAPP SHARE
// =====================================



function shareWhatsApp(){



let title =

document.getElementById(
"postTitle"
)?.innerText;




let url =

encodeURIComponent(
window.location.href
);



let message =

encodeURIComponent(

title +

"\n\nRead more on Tec Faktory:\n"

);



window.open(

"https://wa.me/?text="

+

message

+

url,


"_blank"


);



}








// =====================================
// SCAM REPORT FORM
// =====================================



const reportForm =

document.getElementById(
"contactForm"
);





if(reportForm){



reportForm.addEventListener(
"submit",

function(e){



e.preventDefault();




let name =

document.getElementById(
"name"
).value;



let email =

document.getElementById(
"email"
).value;



let message =

document.getElementById(
"message"
).value;





let report = `

🚨 Tec Faktory Report


Name:
${name}


Email:
${email}


Details:

${message}



`;





let whatsapp =


"https://wa.me/2349050322014?text="

+

encodeURIComponent(report);





window.open(

whatsapp,

"_blank"

);



}

);



}









// =====================================
// BASIC CONTENT PROTECTION
// =====================================


// Prevent accidental copying


document.addEventListener(

"contextmenu",

function(e){


if(e.target.closest(".article-content")){


e.preventDefault();


}


}

);





document.addEventListener(

"copy",

function(e){


if(e.target.closest(".article-content")){


e.preventDefault();



}


}

);









// =====================================
// READING VIEW TRACKING
// GOOGLE ANALYTICS READY
// =====================================



function trackArticleView(title){



if(typeof gtag === "function"){



gtag(

"event",

"article_view",

{


article_title:title,

page_path:
window.location.pathname


}


);



}



}




// =====================================
// PAGE READY
// =====================================



document.addEventListener(

"DOMContentLoaded",

()=>{


console.log(
"Tec Faktory Article System Loaded"
);


}

);
