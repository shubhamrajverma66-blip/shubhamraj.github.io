const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');
menu?.addEventListener('click',()=> {
  const open = nav.style.display === 'flex';
  nav.style.display = open ? '' : 'flex';
  if(!open){nav.style.position='absolute';nav.style.top='70px';nav.style.right='6vw';nav.style.flexDirection='column';nav.style.background='#10090b';nav.style.padding='20px';nav.style.gap='18px';}
});
