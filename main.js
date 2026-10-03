const nav=document.getElementById('nav'), menu=document.getElementById('menuBtn');
    menu.onclick=()=>nav.classList.toggle('mobile');
    document.querySelectorAll('.links a').forEach(a=>a.onclick=()=>nav.classList.remove('mobile'));
    const palette=document.getElementById('palette'), cmd=document.getElementById('cmdBtn');
    cmd.onclick=()=>{palette.classList.add('open');document.getElementById('commandSearch').focus()};
    palette.onclick=e=>{if(e.target===palette)palette.classList.remove('open')};
    document.querySelectorAll('.command').forEach(c=>c.onclick=()=>{palette.classList.remove('open');document.querySelector(c.dataset.go).scrollIntoView()});
    document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();palette.classList.add('open');document.getElementById('commandSearch').focus()} if(e.key==='Escape')palette.classList.remove('open')});
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    const contrib=document.getElementById('contrib'); 
    for(let i=0;i<112;i++){const s=document.createElement('i');
        s.className='sq '+(Math.random()>.72?'on':'')+(Math.random()>.94?' hot':'');
        contrib.appendChild(s)}
    const sections=[...document.querySelectorAll('main section[id]')], links=[...document.querySelectorAll('.links a')];
    window.addEventListener('scroll',()=>{let current='home';sections.forEach(s=>{if(scrollY>=s.offsetTop-180)current=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current))});