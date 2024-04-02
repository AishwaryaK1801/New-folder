const cl=console.log;
const showModel = document.getElementById("showModel");
const backDrop = document.getElementById("backDrop");
const movieModel = document.getElementById("movieModel");

const closeModelBtns = [...document.querySelectorAll(".closeModel")];

const movieForm = document.getElementById("movieForm");

const titleControl = document.getElementById("title");
const imgUrControll = document.getElementById("imgUrl");
const overviewControl = document.getElementById("overview")
const ratingControl = document.getElementById("rating");

const movieContainer = document.getElementById("movieContainer");

const addMovie = document.getElementById("addMovie");
const updateMovie = document.getElementById("updateMovie");


let movieArr =[];
 
const addMovieCard =(obj) =>
{
    let card = document.createElement("div");
    card.className ="col-md-4";
    card.innerHTML =`
    <div class="card mb-4">
    <figure class="movieCard mb-0" id=${obj.movieId}>
         <img
            src="${obj.imgUrl}"
            alt="${obj.title}"
            title="${obj.title}"
          />
         <figcaption>
             <div class="ratingSection">
                <div class="row">
                     <div class="col-10">
                       <h3>${obj.title}</h3>
                     </div>
                     <div class="col-2">
                        <div class="rating text-center">
                        ${obj.rating > 4 ? `<p class=bg-success>${obj.rating}</p>`:
                        obj.rating < 4 && obj.rating >= 3 ? `<p class="bg-warning">${obj.rating}</p>`:
                        obj.rating <3 ? `<p class="bg-danger">${obj.rating}</p>`:`<p class="bg-warning">${obj.rating}</p>`
                        }
                        </div>  
                     
                     </div>
                </div>
             </div>
             <div class="overviewSection">
                <h4>${obj.title}</h4>
                <em>overview</em>
                <p>
                ${obj.overview}
                </p>
    
                <div class="action">
                     <button class="btn btn-success" onClick="onMovieEdit(this)">Edit</button>
                     <button class="btn btn-danger" onClick="onMovieDelete(this)">Delete</button>
                </div>
             </div>
         </figcaption>
  </figure>
 
</div> `;

movieContainer.prepend(card);

}
const onMovieEdit = (ele) =>{
    let editId=ele.closest(".movieCard").id;
    cl(editId);
    localStorage.setItem("editId",editId);
    modelBackDropShowHide();
    updateMovie.classList.remove("d-none");
    addMovie.classList.add("d-none");

    let findObj = movieArr.find(obj=>obj.movieId===editId);
    titleControl.value=findObj.title;
    imgUrControll.value=findObj.imgUrl;
    overviewControl.value=findObj.overview;
    ratingControl.value=findObj.rating;
}


const onMovieDelete =(ele) =>{
 let deleteId = ele.closest(".movieCard").id;
 let deleteObj = movieArr.find((obj)=>obj.movieId===deleteId);
let deleteMovieName = deleteObj.title;
 cl(deleteId);
 Swal.fire({
    title: `Are you sure you want to Delete ${deleteMovieName} movie?`,
    
    showCancelButton: true,
    confirmButtonText: "Yes",
    
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
     let deleteIndex = movieArr.findIndex(obj=>obj.movieId===deleteId);
     movieArr.splice(deleteIndex,1);
     cl(movieArr);
     localStorage.setItem("movieArr", JSON.stringify(movieArr));
     ele.closest(".col-md-4").remove();
     Swal.fire({
           title:   `Movie ${deleteMovieName} is removed successfully !!! `,
           icon:"success",
           timer:3000
     })

    }
  });



}

const templatingOfMovies = (arr) =>{
    let result=``;
    arr.forEach((obj)=>{
        result+=`
        <div class="col-md-4">
         <div class="card mb-4">
            <figure class="movieCard mb-0" id=${obj.movieId}>
                 <img
                    src="${obj.imgUrl}"
                    alt="${obj.title}"
                    title="${obj.title}"
                  />
                 <figcaption>
                     <div class="ratingSection">
                        <div class="row">
                             <div class="col-10">
                               <h3>${obj.title}</h3>
                             </div>
                             <div class="col-2">
                                <div class="rating text-center">
                                ${obj.rating > 4 ? `<p class=bg-success>${obj.rating}</p>`:
                                obj.rating < 4 && obj.rating >= 3 ? `<p class="bg-warning">${obj.rating}</p>`:
                                obj.rating <3 ? `<p class="bg-danger">${obj.rating}</p>`:`<p class="bg-warning">${obj.rating}</p>`
                                }
                                </div>  
                             
                             </div>
                        </div>
                     </div>
                     <div class="overviewSection">
                        <h4>${obj.title}</h4>
                        <em>overview</em>
                        <p>
                        ${obj.overview}
                        </p>
            
                        <div class="action">
                             <button class="btn btn-success" onClick="onMovieEdit(this)">Edit</button>
                             <button class="btn btn-danger" onClick="onMovieDelete(this)">Delete</button>
                        </div>
                     </div>
                 </figcaption>
          </figure>
         
        </div>
      </div>
        
        
        `


    })

    movieContainer.innerHTML=result;
}
if(localStorage.getItem("movieArr")){
    movieArr = JSON.parse(localStorage.getItem("movieArr"));
    templatingOfMovies(movieArr);
}

const uuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};




const modelBackDropShowHide = () => {
   
    backDrop.classList.toggle("active");
    movieModel.classList.toggle("active");

}
showModel.addEventListener("click",modelBackDropShowHide);

closeModelBtns.forEach((btn)=>{
    btn.addEventListener("click",modelBackDropShowHide)
});


const onMovieAdd = (eve) =>{
eve.preventDefault();
let movieObj = {
    title : titleControl.value,
    imgUrl : imgUrControll.value,
    overview : overviewControl.value,
    rating : ratingControl.value,
    movieId : uuid()
};
cl(movieObj);
movieArr.unshift(movieObj);

localStorage.setItem("movieArr",JSON.stringify(movieArr));
//templatingOfMovies(movieArr);
addMovieCard(movieObj);

eve.target.reset();
modelBackDropShowHide();

Swal.fire({
    title : `Movie ${movieObj.title} is added succesfully !!!`,
    icon : "success",
    timer : 3000
})

}

const onMovieUpdate =()=>{
    let updateId= localStorage.getItem("editId");
    cl(updateId);
    let updateObj = {
        title : titleControl.value,
        imgUrl : imgUrControll.value,
        overview : overviewControl.value,
        rating : ratingControl.value,
        movieId : updateId
    };

    let objIndex = movieArr.findIndex(obj =>obj.movieId ===updateId);
    movieArr[objIndex]=updateObj;
    localStorage.setItem("movieArr",JSON.stringify(movieArr));


    let getCard = document.getElementById(updateId);
    getCard.innerHTML=`
    <img
    src="${updateObj.imgUrl}"
    alt="${updateObj.title}"
    title="${updateObj.title}"
  />
 <figcaption>
     <div class="ratingSection">
        <div class="row">
             <div class="col-10">
               <h3>${updateObj.title}</h3>
             </div>
             <div class="col-2">
                <div class="rating text-center">
                ${updateObj.rating > 4 ? `<p class=bg-success>${updateObj.rating}</p>`:
                updateObj.rating < 4 && updateObj.rating >= 3 ? `<p class="bg-warning">${updateObj.rating}</p>`:
                updateObj.rating <3 ? `<p class="bg-danger">${updateObj.rating}</p>`:`<p class="bg-warning">${updateObj.rating}</p>`
                }
                </div>  
             
             </div>
        </div>
     </div>
     <div class="overviewSection">
        <h4>${updateObj.title}</h4>
        <em>overview</em>
        <p>
        ${updateObj.overview}
        </p>

        <div class="action">
             <button class="btn btn-success" onClick="onMovieEdit(this)">Edit</button>
             <button class="btn btn-danger" onClick="onMovieDelete(this)">Delete</button>
        </div>
     </div>
 </figcaption>
    `;


    updateMovie.classList.add("d-none");
    addMovie.classList.remove("d-none");
    movieForm.reset();
    modelBackDropShowHide();
    Swal.fire({
        title : `Movie Data is updated successfully !!!`,
        icon : `success`,
        timer : 3000
    })

}




movieForm.addEventListener("submit", onMovieAdd);
updateMovie.addEventListener("click",onMovieUpdate)