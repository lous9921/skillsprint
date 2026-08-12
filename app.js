const courses=[
{id:1,title:"AI for Work",category:"AI & Productivity",lessons:8,mins:60,desc:"Use modern AI tools to automate repetitive work and improve your output.",level:"Beginner"},
{id:2,title:"ChatGPT Productivity",category:"AI & Productivity",lessons:7,mins:45,desc:"Build practical workflows for writing, research, planning and analysis.",level:"Beginner"},
{id:3,title:"Excel & Data Analysis",category:"Data",lessons:10,mins:90,desc:"Turn spreadsheets into useful decisions with formulas, charts and analysis.",level:"Beginner"},
{id:4,title:"Digital Marketing",category:"Marketing",lessons:9,mins:75,desc:"Learn the fundamentals of content, social, email and conversion.",level:"Beginner"},
{id:5,title:"Python Fundamentals",category:"Coding",lessons:12,mins:120,desc:"Learn programming fundamentals through small practical exercises.",level:"Beginner"},
{id:6,title:"Project Management",category:"Business",lessons:8,mins:65,desc:"Plan projects, manage priorities and keep teams moving.",level:"Beginner"}
];
let progress=JSON.parse(localStorage.getItem("ss_progress")||"{}");
let currentCourse=null;

const app=document.querySelector("#app");
function save(){localStorage.setItem("ss_progress",JSON.stringify(progress))}
function pct(c){return Math.round(((progress[c.id]||0)/c.lessons)*100)}
function card(c){
 return `<article class="card"><span class="tag">${c.category}</span><h3>${c.title}</h3><p class="muted">${c.desc}</p><small>${c.lessons} lessons · ${c.mins} min · ${c.level}</small><div class="progress"><i style="width:${pct(c)}%"></i></div><small>${pct(c)}% complete</small><br><button class="primary" onclick="openCourse(${c.id})" style="margin-top:14px">${pct(c)?'Continue':'Start learning'}</button></article>`
}
function home(){
 app.innerHTML=`<div class="wrap">
 <section class="hero"><div><div class="eyebrow">Micro-learning for real-world skills</div><h1>Learn something useful in minutes, not months.</h1><p>Short lessons, hands-on practice and shareable certificates for skills employers actually want.</p><div class="cta"><button class="primary" onclick="view('explore')">Explore courses</button><button class="secondary" onclick="view('profile')">My progress</button></div></div>
 <div class="hero-card"><div class="tag">Your next skill</div><h2>AI for Work</h2><p>8 bite-sized lessons + practical tasks.</p><div class="big">10 min</div><div>Typical lesson length</div></div></section>
 <section class="section"><h2>Popular skills</h2><div class="grid">${courses.slice(0,3).map(card).join("")}</div></section>
 <div class="footer">SkillSprint MVP · Learn fast. Practice. Prove it.</div></div>`;
}
function explore(){
 app.innerHTML=`<div class="wrap"><div class="eyebrow">Course library</div><h1>Build skills employers value.</h1><p class="muted">Choose a course and start with the first lesson immediately.</p><div class="grid section" style="margin-top:28px">${courses.map(card).join("")}</div></div>`;
}
function openCourse(id){
 currentCourse=courses.find(x=>x.id===id);
 const done=progress[id]||0;
 app.innerHTML=`<div class="wrap"><button class="secondary" onclick="view('explore')">← Back</button><section class="section course-head"><div><span class="tag">${currentCourse.category}</span><h1>${currentCourse.title}</h1><p class="muted">${currentCourse.desc}</p></div><div class="card"><b>${pct(currentCourse)}%</b><div class="progress"><i style="width:${pct(currentCourse)}%"></i></div>${done}/${currentCourse.lessons} lessons</div></section><section class="section"><h2>Lessons</h2><div class="card lesson-list">${Array.from({length:currentCourse.lessons},(_,i)=>`<div style="padding:15px 0;border-bottom:1px solid #eee"><b>${i+1}. ${["Getting started","Core concepts","Your first workflow","Practice task","Common mistakes","Real-world example","Challenge project","Final assessment"][i%8]}</b><button class="primary" style="float:right" onclick="lesson(${i+1})">${i<done?'Review':i===done?'Start':'Locked'}</button></div>`).join("")}</div></section></div>`;
}
function lesson(n){
 const done=progress[currentCourse.id]||0;
 app.innerHTML=`<div class="wrap"><button class="secondary" onclick="openCourse(${currentCourse.id})">← Course</button><section class="lesson"><span class="tag">Lesson ${n} of ${currentCourse.lessons}</span><h1>${["Getting started","Core concepts","Your first workflow","Practice task","Common mistakes","Real-world example","Challenge project","Final assessment"][(n-1)%8]}</h1><div class="lesson-box"><p>In this micro-lesson, you'll learn one practical concept and immediately apply it.</p><h3>What you'll learn</h3><ul><li>A simple framework you can use today</li><li>One practical example</li><li>A short task to prove you understand it</li></ul><h3>Practice task</h3><p>Apply today's concept to a real situation. Write down your result or complete the small exercise before moving on.</p><button class="primary" onclick="completeLesson(${n})">${n<=done?'Completed':'Mark lesson complete'}</button></div></section></div>`;
}
function completeLesson(n){
 if(n>(progress[currentCourse.id]||0)) progress[currentCourse.id]=n;
 save(); openCourse(currentCourse.id);
}
function profile(){
 const completed=courses.filter(c=>pct(c)===100).length;
 app.innerHTML=`<div class="wrap"><div class="eyebrow">Your learning</div><h1>Progress dashboard</h1><div class="grid section"><div class="card"><small>Courses completed</small><h2>${completed}</h2></div><div class="card"><small>Lessons completed</small><h2>${Object.values(progress).reduce((a,b)=>a+b,0)}</h2></div><div class="card"><small>Certificates</small><h2>${completed}</h2></div></div><section class="section"><h2>My courses</h2><div class="grid">${courses.filter(c=>progress[c.id]).map(card).join("")||'<div class="card"><h3>No courses yet</h3><p class="muted">Start your first course from Explore.</p><button class="primary" onclick="view(\'explore\')">Browse courses</button></div>'}</div></section><section class="section card"><h2>Pro subscription</h2><p class="muted">Unlock the full library, practice projects and discounted certificates.</p><button class="primary" id="subscribe">Start Pro — $9/month</button></section></div>`;
 document.querySelector("#subscribe")?.addEventListener("click",()=>alert("Demo checkout. Connect Stripe for the live subscription."));
}
function view(v){({home,explore,profile}[v]||home)()}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>view(b.dataset.view)));
document.querySelector("#proBtn").addEventListener("click",()=>view("profile"));
home();
