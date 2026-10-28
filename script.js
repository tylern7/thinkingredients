(function(){
  var btn=document.querySelector('.menu-btn'), menu=document.getElementById('menu');
  function set(o){btn.setAttribute('aria-expanded',String(o));btn.setAttribute('aria-label',o?'Close menu':'Open menu');menu.classList.toggle('open',o);}
  btn.addEventListener('click',function(){set(btn.getAttribute('aria-expanded')!=='true');});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false);});});
  var yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();

  // Ingredient links (#p-...) open the matching ingredient panel.
  function openHash(){var h=location.hash; if(h.indexOf('#p-')===0){var d=document.querySelector(h); if(d){d.open=true;}}}
  window.addEventListener('hashchange',openHash); openHash();

  // "Request a Sample" pre-fills the message.
  var form=document.getElementById('contact-form');
  document.querySelectorAll('[data-sample]').forEach(function(a){
    a.addEventListener('click',function(){var m=form.message; if(!m.value) m.value='I would like to request a sample of '+a.getAttribute('data-sample')+'.';});
  });

  // Contact form: the old Wix form posted to Wix. Until a form service is connected,
  // open the visitor's email app with the same fields addressed to info@thinkingredients.com.
  form.addEventListener('submit',function(ev){
    ev.preventDefault();
    if(!form.reportValidity())return;
    var f=form.elements;
    var body='First Name: '+f['first-name'].value+'\nLast Name: '+f['last-name'].value+'\nPhone: '+f.phone.value+'\nEmail: '+f.email.value+'\nCompany: '+f.company.value+'\nHow did you hear about us?: '+f.heard.value+'\n\n'+f.message.value;
    window.location.href='mailto:info@thinkingredients.com?subject='+encodeURIComponent('Website enquiry from '+f.company.value)+'&body='+encodeURIComponent(body);
    form.querySelector('.form-note').textContent='Opening your email app to send this message to info@thinkingredients.com.';
  });

  // Gentle fade-in on scroll; skipped for reduced motion.
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
    var els=document.querySelectorAll('.hero-head, .hero-media, .sec-head, .sol-card, .prod, .band-copy, .band-card, .seg, .split-media, .split-copy, .about-grid, .story, .posts, .event, .list-card, .form, .info-card');
    document.documentElement.classList.add('js-reveal');
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    },{rootMargin:'0px 0px -8% 0px',threshold:0.05});
    els.forEach(function(el,i){ el.classList.add('reveal'); el.style.transitionDelay=((i%3)*80)+'ms'; io.observe(el); });
  }
})();
