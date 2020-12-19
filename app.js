//API KEY
const API_KEY = 'd79bba0ec87d47bcd6c17370956704fe';
const ImageUrl  = 'https://image.tmdb.org/t/p/w500/';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=d79bba0ec87d47bcd6c17370956704fe';

const review = 'https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=d79bba0ec87d47bcd6c17370956704fe&query=';

const inputValue = document.querySelector('.input-value');
const Btn = document.querySelector('.btn');
const movieSearchable = document.querySelector('.movie-searchable');
const movieinfo = document.querySelector('.movieInfoContainer');

function searchSection(movies){
    // if(movieSearchable.firstChild.tagName.toLowerCase() === 'section'){
        movieSearchable.innerHTML = '';
    // }
    console.log(movies);
    const section = document.createElement('section');
    section.classList.add('section');
    section.innerHTML = '';
    movies.map( (movie) =>{
        if(movie.poster_path){
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('imgDiv');
            const img = document.createElement('img');
            img.src = ImageUrl+movie.poster_path;
            img.setAttribute('data-movie-id', movie.id);
            
            const pTag = document.createElement('p');
            pTag.classList.add('para');
            pTag.innerHTML = `${movie.vote_average}`;

            imgDiv.appendChild(img);
            imgDiv.appendChild(pTag);
            section.appendChild(imgDiv);



        }
    })
    movieSearchable.appendChild(section);
    return section;
}
document.addEventListener('mouseover', (e)=>{
    const target  = e.target;
    if(target.tagName.toLowerCase() === 'img'){
        console.log(target);
      
    }

})
document.addEventListener('click', (e)=>{
    const target  = e.target;
    const movieId = target.getAttribute('data-movie-id');
    const movieInfoUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

    if(target.tagName.toLowerCase() === 'img'){
        console.log(movieId);

        movieinfo.innerHTML = '';
        fetch(movieInfoUrl)
            .then( (res) =>res.json())
            .then( (data) =>showMovieInfo(data))
            .catch( (err) =>console.log('Error: ',err))
        
        
    }
})
function showMovieInfo(data){
    console.log(data);
    const movieInfoDiv = document.createElement('div');
    movieInfoDiv.classList.add('movieInfo');
    const close  = document.createElement('button');
    close.innerHTML = 'X';
    close.classList.add('closeBtn');

    movieInfoDiv.append(close);
    movieinfo.append(movieInfoDiv);

    const img =  document.createElement('img');
    img.classList.add('imageInfo');
    img.src = ImageUrl+data.poster_path;
    img.setAttribute('data-movie-id', data.id);
    movieInfoDiv.append(img);

    const infoBox  = document.createElement('div');
    infoBox.classList.add('infoBox');
    movieInfoDiv.appendChild(infoBox);
    const title = document.createElement('h3');
    title.innerText = `${data.original_title}`;
    infoBox.appendChild(title);

    const plot = document.createElement('p');
    plot.classList.add('plot');
    plot.innerText = `${data.overview}`;

    infoBox.appendChild(plot);

    const genreList = document.createElement('ul');
    genreList.innerHTML = '<h4>Genre : </h4>'
    data.genres.forEach( (genre) =>{
        const genreItem = document.createElement('li');
        genreItem.innerText = `${genre.name},  `;

        genreList.appendChild(genreItem);
    })
    infoBox.appendChild(genreList);
    
    const castUrl = `https://api.themoviedb.org/3/movie/${data.id}/credits?api_key=${API_KEY}`;
    fetch(castUrl)
        .then((res) =>res.json())
        .then( (output) => createCastSection(output))
        .catch( (err) => console.log('Error: ',err))
    
    function createCastSection(output){
        console.log(output);
        const castDiv = document.createElement('div');
        castDiv.classList.add('castDiv');

        castDiv.innerHTML = '<h3>Cast : </h3>'

        movieInfoDiv.appendChild(castDiv);

        

       output.cast.forEach( (person) =>{
           if(person.profile_path){
            const profileDiv = document.createElement('div');
            profileDiv.classList.add('profileDiv');
            castDiv.appendChild(profileDiv);
            const castImg = document.createElement('img');
            castImg.classList.add('castImg');
            castImg.src = ImageUrl+person.profile_path;
            profileDiv.appendChild(castImg);

            const castName = document.createElement('a');
            castName.innerText = `${person.original_name}`;
            profileDiv.appendChild(castName);
            
           }
            
       })

    }

}

Btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const value = inputValue.value;
    console.log(value);
    // const path = '/search/movie';
    const newUrl = url+'&query='+value;

    fetch(newUrl)
        .then( (res) =>res.json())
        .then( (data) => 
        searchSection(data.results)
        )
        .catch( (err) => console.log('Error: ',err));
    inputValue.value ='';
})