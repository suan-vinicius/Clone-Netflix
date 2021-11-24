// Inicializar Swiper
const swiper = new Swiper(".swiper", {
    slidesPerView: 'auto',
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    }
  });
  
  
  const consultData = async (item) => {
  
    const Resp = await fetch(`https://api.themoviedb.org/3/tv/12971/season/${item}?api_key=0f801c6df9472dfa64b11aecfbcedde6&language=pt-BR`);
    const data = await Resp.json();
    return data;
  
  };
  
  
  const containerImg = (data) => {
    
    for (let i=0; i < data.length; i++) {
      
      let section = document.getElementById(i);
      section.insertAdjacentHTML('afterbegin', `<h3 class="container__title">${(data[i].name).split(":")[1]}</h3>`)
      
      let newContent = '';
      
      for (let k=0; k < data[i].episodes.length; k++) {
        newContent += `<div class="swiper-slide">`;
        newContent += `<div class="container__size">`;
        newContent += `<img class="container__img" src="https://image.tmdb.org/t/p/w500${data[i].episodes[k].still_path}" alt="imagen do episodio"/>`;
        newContent += `</div>`;
        newContent += `</div>`;    
      }
  
      document.getElementById("container__"+i).innerHTML =  newContent;
  
    }
    
  };
  
  
  const selectEp = (data) => {
    
    setTimeout(() => {
      let allImg = document.getElementsByClassName("container__img");
      
      let details = `<h1>${data[0].episodes[0].name}</h1>`
      details += `<p>${data[0].episodes[0].overview}</p>`
  
      document.getElementById("banner__info__details").innerHTML = details;
      document.getElementById("banner__img").style.backgroundImage = `linear-gradient(to right, #141414 5%, transparent 95%),
       URL(https://image.tmdb.org/t/p/w500${data[0].episodes[0].still_path})`;
       
      Array.from(allImg).map(item => {
        item.addEventListener('click', () => {
  
          let selectImg = item.getAttribute('src').split("500")[1];
          
          for (let i=0; i < data.length; i++) {
            
            let principal = '';
            
            for (let k=0; k < data[i].episodes.length; k++) {
              
              if (data[i].episodes[k].still_path === selectImg) {
  
                let txt = data[i].episodes[k].overview.substr(0, 150);
  
                principal += `<h1>${data[i].episodes[k].name}</h1>`;
                principal += `<p>${txt}...</p>`;
                
                document.getElementById("banner__info__details").innerHTML = principal;
                document.getElementById("banner__img").style.backgroundImage = `linear-gradient(to right, #141414 5%, transparent 95%),
                URL(https://image.tmdb.org/t/p/w500${selectImg})`;
  
              }
            }
          }
        })
      })
    },0);
  };
  
  
  (async function main() {
  
    const seasons = [8,9,5,6]
    const dados = await Promise.all(seasons.map(elem => consultData(elem)));
  
    containerImg(dados);
    selectEp(dados);
  
  })();