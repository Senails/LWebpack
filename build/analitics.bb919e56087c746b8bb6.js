window.analytics=function(){let e=0,t=!1,n=()=>{e++,console.log(e)};return document.addEventListener("click",n),{destoy(){document.removeEventListener("click",n),t=!0},getclicks:()=>t?"Analitycs is destroyd !!!!!!!!!!!":e}}();