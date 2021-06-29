var vavs = document.querySelector(".lines");
var links = document.querySelector(".hidden");
var switcher = false;
vavs.addEventListener("click", ()=>{
    console.log('hi dear');
    switcher = !switcher ;
   console.log(switcher);
   if(switcher){
       links.className = "mobile";
   }else{
       links.className ="hidden"
   }
    console.log(links.className)
})

/* registration functionality*/
