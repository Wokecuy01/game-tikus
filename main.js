const tikus = document.querySelectorAll('.tikus');
const diksyen = document.querySelectorAll('.diksyen');
const form = document.querySelector('.form');
const area = document.querySelector('.area');
const scoreElement = document.querySelector('.score');
const waktu = document.querySelector ('.waktu');
const scoreZoom = document.querySelector('.score-zoom');
const scoreZoomValue = document.querySelector('.score-zoom-value');
const highScoreElement = document.querySelector('.high-score');
let score = 0;
let highScore;
let durasiWaktu = 0;
let gameSettings = {};
let timer;
let spawn;

highScore = localStorage.getItem('high-score')? localStorage.getItem('high-score'):0;
highScoreElement.innerHTML = highScore


    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        if(durasiWaktu <= 0){
        const target = document.getElementById('target').value;
        const level = document.getElementById('level').value;
        score = 0;
        gameSettings = {target,level}
        console.log(gameSettings)
        startGame()
        }
    })

area.addEventListener('click',(e)=>{
    const rect = area.getBoundingClientRect()
    const x = e.clientX - rect.left - 10;
    const y = e.clientY - rect.top - 10;

    const circle = document.createElement('div')
    circle.classList.add('circle')
    circle.style.top = y + 'px'
    circle.style.left = x + 'px'
    area.appendChild(circle)

    setTimeout(()=>{
        circle.remove()
    },400)
})

function startGame(){
   if(gameSettings.level === 'easy'){
    durasiWaktu = 30
   }else if(gameSettings.level === 'medium'){
    durasiWaktu = 20
   }else if(gameSettings.level === 'hard'){
    durasiWaktu = 15
   }else {durasiWaktu =30 }
   if(gameSettings.target === 'diksyen'){
    tikus.forEach(item=>{
        item.style.display = 'none'
    })
    diksyen.forEach(item =>{
        item.style.display = 'block'
    })
   }else if(gameSettings.target === 'tikus'){
       diksyen.forEach(item =>{
           item.style.display = 'none'
        })
        tikus.forEach(item =>{
            item.style.display = 'block'
        })
   }
   timer = setInterval(()=>{
     if(durasiWaktu > 0){
        durasiWaktu--
        waktu.innerHTML = 'Waktu :'+durasiWaktu
     }
     if(durasiWaktu === 0){
        clearInterval(timer)
        clearInterval(spawn)
        if(highScore < score){
            localStorage.setItem('high-score',score);
            highScoreElement.innerHTML = score;
        }
        scoreZoom.style.display = 'flex'
        scoreZoomValue.innerHTML = score
        setTimeout(()=>{
            scoreZoom.style.display = 'none'
        },2000)
     }
   },1000)

     spawn = setInterval(()=>{
        if(durasiWaktu <= 0) return
        const id = Math.floor(Math.random() * 6) + 1;
        
        const hitBox = document.getElementById('hit-'+id);
        hitBox.style.height = '100px'
    
        setTimeout(()=>{
            hitBox.style.height = '0px'
        },2000)
       },500)
   

   
 }
 const hitBoxes = document.querySelectorAll('.hit-box');

hitBoxes.forEach(hitBox => {
    hitBox.addEventListener('click', () => {
        if (durasiWaktu <= 0) return;

        if (hitBox.style.height === '100px') {
            score++;
            scoreElement.innerHTML = 'Score : ' + score;
            hitBox.style.height = '0px';
        }
    });
});

