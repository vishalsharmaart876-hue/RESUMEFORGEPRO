// ═══════════════════════════════════════════
//  APP NAVIGATION
// ═══════════════════════════════════════════
function switchApp(panel) {
  document.querySelectorAll('.app-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  
  const panelEl = document.getElementById('panel-' + panel);
  const tabEl = document.getElementById('tab-' + panel);
  
  if (panelEl) panelEl.classList.add('active');
  if (tabEl) tabEl.classList.add('active');
}

// ═══════════════════════════════════════════
//  RESUME BUILDER
// ═══════════════════════════════════════════
var rState = {
  tab:'design', zoom:85, docPage:'resume',
  name:'Alex Johnson', title:'Senior Product Designer', email:'alex@example.com',
  phone:'+1 (555) 000-0000', location:'San Francisco, CA',
  linkedin:'linkedin.com/in/alexjohnson', website:'alexjohnson.design', github:'github.com/alexj',
  summary:'Passionate product designer with 7+ years crafting user-centered digital experiences. Led cross-functional teams to deliver products used by 2M+ users.',
  template:'modern-split', accent:'#7c6af7', font:'Playfair Display', density:'comfortable',
  skills:['Figma','React','UX Research','Prototyping','Design Systems','A/B Testing','SQL'],
  experiences:[
    {company:'Notion',role:'Lead Product Designer',from:'Jan 2022',to:'Present',bullets:['Led redesign of core editor increasing retention by 34%','Built and mentored team of 5 designers','Shipped 12 major features across web and mobile']},
    {company:'Airbnb',role:'Senior UX Designer',from:'Mar 2019',to:'Dec 2021',bullets:['Redesigned host onboarding reducing drop-off by 22%','Created design system adopted company-wide']}
  ],
  education:[{school:'Carnegie Mellon University',degree:'B.S. Human-Computer Interaction',year:'2019',gpa:'3.9'}],
  projects:[{name:'DesignKit Pro',desc:'Open-source Figma plugin with 50k+ users',url:'designkit.io'}],
  certifications:[{name:'Google UX Design Certificate',issuer:'Google',year:'2023'}],
  languages:[{lang:'English',level:'Native'},{lang:'Spanish',level:'Conversational'}],
  awards:[{title:'Designer of the Year',org:'Awwwards',year:'2023'}],
  volunteering:[{org:'Code.org',role:'UX Volunteer',period:'2021–Present'}],
  sections:{skills:true,experience:true,education:true,projects:true,certifications:true,languages:true,awards:true,volunteering:true},
  showPhoto:false, photoUrl:''
};

var templates=[
  {id:'modern-split',name:'Modern Split',color:'#1a1a2e',accent:'#7c6af7'},
  {id:'classic-serif',name:'Classic Serif',color:'#2c3e50',accent:'#c0392b'},
  {id:'minimal-clean',name:'Minimal',color:'#ffffff',accent:'#2d3748'},
  {id:'elegant',name:'Elegant',color:'#faf8f5',accent:'#d4a853'},
  {id:'bold-left',name:'Bold Column',color:'#0f172a',accent:'#38bdf8'},
  {id:'timeline',name:'Timeline',color:'#f8fafc',accent:'#6366f1'},
  {id:'glassmorphism',name:'Glass',color:'#0f0f1a',accent:'#a78bfa'},
  {id:'ats-safe',name:'ATS Safe',color:'#ffffff',accent:'#1e40af',badge:'ATS'},
  {id:'creative',name:'Creative',color:'#fffbf7',accent:'#f97316'},
  {id:'two-column',name:'Two Column',color:'#f1f5f9',accent:'#0891b2'}
];
var colors=['#7c6af7','#f43f5e','#06b6d4','#10b981','#f59e0b','#ec4899','#3b82f6','#8b5cf6','#ef4444','#14b8a6'];

function switchTab(t){
  rState.tab=t;
  document.querySelectorAll('.stab').forEach((el,i)=>el.classList.toggle('active',['design','content','extras','settings'][i]===t));
  renderSidebar();
}
function renderSidebar(){
  var el=document.getElementById('sidebar-content');
  if(rState.tab==='design') el.innerHTML=renderDesignTab();
  else if(rState.tab==='content') el.innerHTML=renderContentTab();
  else if(rState.tab==='extras') el.innerHTML=renderExtrasTab();
  else el.innerHTML=renderSettingsTab();
}
function renderDesignTab(){
  var tplHtml=templates.map(t=>`<div class="tpl-card ${rState.template===t.id?'active':''}" onclick="setTemplate('${t.id}')">
    ${t.badge?`<div class="tpl-badge">${t.badge}</div>`:''}
    <div class="tpl-preview" style="background:${t.color};position:relative">
      <div style="position:absolute;inset:0;padding:5px">
        <div style="height:6px;width:60%;background:${t.accent};border-radius:2px;margin-bottom:3px;opacity:0.9"></div>
        <div style="height:3px;width:40%;background:${t.accent};border-radius:1px;margin-bottom:4px;opacity:0.5"></div>
        <div style="height:2px;width:80%;background:rgba(128,128,128,0.3);border-radius:1px;margin-bottom:2px"></div>
        <div style="height:2px;width:70%;background:rgba(128,128,128,0.3);border-radius:1px;margin-bottom:2px"></div>
        <div style="height:2px;width:55%;background:rgba(128,128,128,0.3);border-radius:1px"></div>
      </div>
    </div>
    <div class="tpl-name">${t.name}</div>
  </div>`).join('');
  var colorsHtml=colors.map(c=>`<div class="color-dot ${rState.accent===c?'active':''}" style="background:${c}" onclick="setAccent('${c}')"></div>`).join('');
  colorsHtml+=`<input type="color" value="${rState.accent}" onchange="setAccent(this.value)" style="width:24px;height:24px;border:none;border-radius:50%;cursor:pointer;padding:0;background:none">`;
  return `
    <div class="sec-label">Template</div>
    <div class="tpl-grid">${tplHtml}</div>
    <div class="sec-label">Accent Color</div>
    <div class="color-row">${colorsHtml}</div>
    <div class="sec-label">Heading Font</div>
    <div class="field-group"><select class="field-input" onchange="rState.font=this.value;renderResume()">
      <option value="Playfair Display">Playfair Display</option>
      <option value="Georgia">Georgia</option>
      <option value="Merriweather">Merriweather</option>
      <option value="DM Sans">DM Sans</option>
      <option value="Arial">Arial (ATS)</option>
    </select></div>
    <div class="sec-label">Spacing</div>
    <div class="field-group"><select class="field-input" onchange="rState.density=this.value;renderResume()">
      <option value="compact">Compact</option>
      <option value="comfortable" selected>Comfortable</option>
      <option value="spacious">Spacious</option>
    </select></div>
    <div class="sec-label">Visible Sections</div>
    ${Object.keys(rState.sections).map(k=>`<div class="toggle"><div class="toggle-label">${k.charAt(0).toUpperCase()+k.slice(1)}</div><div class="toggle-switch ${rState.sections[k]?'on':''}" onclick="rState.sections['${k}']=!rState.sections['${k}'];this.classList.toggle('on');renderResume()"></div></div>`).join('')}
  `;
}
function renderContentTab(){
  var expHtml=rState.experiences.map((e,i)=>`<div class="exp-card">
    <div class="exp-card-header"><div class="exp-card-title">${e.role} @ ${e.company}</div><button onclick="rState.experiences.splice(${i},1);renderSidebar();renderResume()">×</button></div>
    <div class="field-group"><div class="field-label">Company</div><input class="field-input" value="${e.company}" onchange="rState.experiences[${i}].company=this.value;renderResume()"></div>
    <div class="field-group"><div class="field-label">Role</div><input class="field-input" value="${e.role}" onchange="rState.experiences[${i}].role=this.value;renderResume()"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px" class="field-group">
      <div><div class="field-label">From</div><input class="field-input" value="${e.from}" onchange="rState.experiences[${i}].from=this.value;renderResume()"></div>
      <div><div class="field-label">To</div><input class="field-input" value="${e.to}" onchange="rState.experiences[${i}].to=this.value;renderResume()"></div>
    </div>
    <div class="field-group"><div class="field-label">Bullets (one per line)</div>
      <textarea class="field-input" onchange="rState.experiences[${i}].bullets=this.value.split('\\n').filter(Boolean);renderResume()">${e.bullets.join('\n')}</textarea>
    </div>
  </div>`).join('');
  var skillHtml=`<div class="skill-tags">${rState.skills.map((s,i)=>`<div class="skill-tag">${s}<button onclick="rState.skills.splice(${i},1);renderSidebar();renderResume()">×</button></div>`).join('')}</div>
    <div class="skill-input-row"><input class="field-input" id="skill-inp" placeholder="Add skill..." onkeydown="if(event.key==='Enter')addRSkill()"><button class="btn btn-sm btn-secondary" onclick="addRSkill()">Add</button></div>`;
  return `
    <div class="sec-label">Personal Info</div>
    <div class="field-group"><div class="field-label">Full Name</div><input class="field-input" value="${rState.name}" onchange="rState.name=this.value;renderResume()"></div>
    <div class="field-group"><div class="field-label">Job Title</div><input class="field-input" value="${rState.title}" onchange="rState.title=this.value;renderResume()"></div>
    <div class="field-group"><div class="field-label">Email</div><input class="field-input" value="${rState.email}" onchange="rState.email=this.value;renderResume()"></div>
    <div class="field-group"><div class="field-label">Phone</div><input class="field-input" value="${rState.phone}" onchange="rState.phone=this.value;renderResume()"></div>
    <div class="field-group"><div class="field-label">Location</div><input class="field-input" value="${rState.location}" onchange="rState.location=this.value;renderResume()"></div>
    <div class="field-group"><div class="field-label">LinkedIn</div><input class="field-input" value="${rState.linkedin}" onchange="rState.linkedin=this.value;renderResume()"></div>
    <div class="field-group"><div class="field-label">Website</div><input class="field-input" value="${rState.website}" onchange="rState.website=this.value;renderResume()"></div>
    <div class="field-group"><div class="field-label">GitHub</div><input class="field-input" value="${rState.github}" onchange="rState.github=this.value;renderResume()"></div>
    <div class="sec-label">Summary</div>
    <div class="field-group"><textarea class="field-input" style="min-height:80px" onchange="rState.summary=this.value;renderResume()">${rState.summary}</textarea></div>
    <div class="sec-label">Skills</div>${skillHtml}
    <div class="sec-label">Experience</div>${expHtml}
    <button class="btn btn-ghost btn-sm" onclick="rState.experiences.push({company:'New Company',role:'Role',from:'Jan 2024',to:'Present',bullets:['Achievement here']});renderSidebar();renderResume()" style="width:100%;margin-top:4px">+ Add Experience</button>
    <div class="sec-label">Education</div>
    ${rState.education.map((e,i)=>`<div class="exp-card">
      <div class="exp-card-header"><div class="exp-card-title">${e.school}</div><button onclick="rState.education.splice(${i},1);renderSidebar();renderResume()">×</button></div>
      <input class="field-input" style="margin-bottom:6px" value="${e.school}" onchange="rState.education[${i}].school=this.value;renderResume()">
      <input class="field-input" style="margin-bottom:6px" value="${e.degree}" onchange="rState.education[${i}].degree=this.value;renderResume()">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        <input class="field-input" value="${e.year}" onchange="rState.education[${i}].year=this.value;renderResume()">
        <input class="field-input" placeholder="GPA" value="${e.gpa||''}" onchange="rState.education[${i}].gpa=this.value;renderResume()">
      </div>
    </div>`).join('')}
    <button class="btn btn-ghost btn-sm" onclick="rState.education.push({school:'University',degree:'Degree',year:'2024',gpa:''});renderSidebar();renderResume()" style="width:100%;margin-top:4px">+ Add Education</button>
  `;
}
function renderExtrasTab(){
  return `
    <div class="sec-label">Cover Letter Generator</div>
    <div class="cover-section">
      <div class="field-label">Job Description</div>
      <textarea class="field-input" style="min-height:70px" placeholder="Paste job description..."></textarea>
      <button class="btn btn-primary btn-sm" style="width:100%;margin-top:8px" onclick="raiAction('Generate a cover letter for me')">Generate Cover Letter</button>
    </div>
    <div class="sec-label">Certifications</div>
    ${rState.certifications.map((c,i)=>`<div class="cert-card"><div style="display:flex;justify-content:space-between"><span style="font-size:11px;font-weight:600">${c.name}</span><button onclick="rState.certifications.splice(${i},1);renderSidebar();renderResume()" style="background:none;border:none;color:var(--text3);cursor:pointer">×</button></div><div style="font-size:10px;color:var(--text3)">${c.issuer} · ${c.year}</div></div>`).join('')}
    <button class="btn btn-ghost btn-sm" onclick="rState.certifications.push({name:'New Cert',issuer:'',year:2024});renderSidebar();renderResume()" style="width:100%;margin-bottom:10px">+ Add Certification</button>
    <div class="sec-label">Languages</div>
    ${rState.languages.map((l,i)=>`<div class="lang-row">
      <input class="field-input lang-name" value="${l.lang}" onchange="rState.languages[${i}].lang=this.value;renderResume()">
      <select class="field-input lang-level" onchange="rState.languages[${i}].level=this.value;renderResume()">
        ${['Native','Fluent','Advanced','Conversational','Basic'].map(lv=>`<option ${l.level===lv?'selected':''}>${lv}</option>`).join('')}
      </select>
      <button onclick="rState.languages.splice(${i},1);renderSidebar();renderResume()" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:14px">×</button>
    </div>`).join('')}
    <button class="btn btn-ghost btn-sm" onclick="rState.languages.push({lang:'',level:'Conversational'});renderSidebar();renderResume()" style="width:100%;margin-bottom:10px">+ Add Language</button>
    <div class="sec-label">Awards</div>
    ${rState.awards.map((a,i)=>`<div class="award-card"><div style="display:flex;justify-content:space-between"><span style="font-size:11px;font-weight:600">${a.title}</span><button onclick="rState.awards.splice(${i},1);renderSidebar();renderResume()" style="background:none;border:none;color:var(--text3);cursor:pointer">×</button></div><div style="font-size:10px;color:var(--text3)">${a.org} · ${a.year}</div></div>`).join('')}
    <button class="btn btn-ghost btn-sm" onclick="rState.awards.push({title:'Award',org:'',year:2024});renderSidebar();renderResume()" style="width:100%;margin-bottom:10px">+ Add Award</button>
    <div class="sec-label">Interview Prep</div>
    <div class="cover-section">
      <p style="font-size:11px;color:var(--text2);margin-bottom:8px">Head over to Practice Arena to prepare for your interviews!</p>
      <button class="btn btn-sm" style="width:100%;background:rgba(110,231,247,0.1);border:1px solid rgba(110,231,247,0.25);color:var(--teal)" onclick="switchApp('practice')">🎯 Open Practice Arena →</button>
    </div>
  `;
}
function renderSettingsTab(){
  return `
    <div class="sec-label">AI Intelligence</div>
    <div class="field-group">
      <div class="field-label">Groq API Key <a href="https://console.groq.com/keys" target="_blank" style="font-size:9px;color:var(--accent);margin-left:5px">Get Free Key →</a></div>
      <div style="display:flex;gap:5px">
        <input type="password" id="groq-key" class="field-input" placeholder="Paste your Groq API key (optional if server has one)" value="${localStorage.getItem('rf_api_key') || ''}">
        <button class="btn btn-secondary btn-sm" onclick="saveApiKey()">Save</button>
      </div>
      <div id="api-status" style="font-size:9px;margin-top:4px;color:${(localStorage.getItem('rf_api_key') || isServerOnline) ? 'var(--green)' : 'var(--text3)'}">
        ${localStorage.getItem('rf_api_key') ? '● AI Active (User API Key)' : (isServerOnline ? '● AI Active (Server-Side Key)' : '○ AI Active (Offline Heuristics)')}
      </div>
    </div>
    <div class="sec-label">Profile Photo</div>
    <div class="field-group">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <div style="width:52px;height:52px;border-radius:50%;background:var(--surface2);border:2px solid var(--border2);display:flex;align-items:center;justify-content:center;overflow:hidden">
          ${rState.photoUrl?`<img src="${rState.photoUrl}" style="width:100%;height:100%;object-fit:cover">`:'<span style="font-size:18px">👤</span>'}
        </div>
        <div>
          <input type="file" id="photo-inp" accept="image/*" style="display:none" onchange="handleRPhoto(this)">
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('photo-inp').click()">Upload Photo</button>
        </div>
      </div>
      <div class="toggle"><div class="toggle-label">Show photo on resume</div><div class="toggle-switch ${rState.showPhoto?'on':''}" onclick="rState.showPhoto=!rState.showPhoto;this.classList.toggle('on');renderResume()"></div></div>
    </div>
    <div class="sec-label">Auto-Save</div>
    <div class="toggle"><div class="toggle-label">Auto-save to browser</div><div class="toggle-switch on" onclick="this.classList.toggle('on')"></div></div>
    <div class="sec-label">Data</div>
    <div class="btn-row">
      <button class="btn btn-secondary btn-sm" style="flex:1" onclick="exportResume('json')">Backup JSON</button>
      <button class="btn btn-secondary btn-sm" style="flex:1">Restore</button>
    </div>
    <button class="btn btn-danger btn-sm" style="width:100%;margin-top:8px" onclick="if(confirm('Reset all resume data?'))location.reload()">Reset All Data</button>
    <div class="sec-label">Keyboard Shortcuts</div>
    <div style="font-size:10px;color:var(--text2);line-height:2.2">
      <div><kbd style="background:var(--surface2);padding:1px 5px;border-radius:3px;border:1px solid var(--border);color:var(--text)">Ctrl+S</kbd> Save</div>
      <div><kbd style="background:var(--surface2);padding:1px 5px;border-radius:3px;border:1px solid var(--border);color:var(--text)">Ctrl+P</kbd> Export PDF</div>
    </div>
  `;
}
function addRSkill(){var inp=document.getElementById('skill-inp');if(inp&&inp.value.trim()){rState.skills.push(inp.value.trim());inp.value='';renderSidebar();renderResume();}}
function setTemplate(id){rState.template=id;var t=templates.find(x=>x.id===id);if(t)rState.accent=t.accent;renderSidebar();renderResume();}
function setAccent(c){rState.accent=c;renderResume();renderSidebar();}
function changeZoom(d){rState.zoom=Math.max(40,Math.min(150,rState.zoom+d));document.getElementById('zoom-val').textContent=rState.zoom+'%';document.getElementById('resume-paper').style.transform=`scale(${rState.zoom/100})`;}
function switchDocPage(p){rState.docPage=p;document.querySelectorAll('.topbar-left .btn').forEach((b,i)=>{var pages=['resume','cover','linkedin'];b.className='btn btn-sm '+(pages[i]===p?'btn-secondary':'btn-ghost');});renderResume();}
function handleRPhoto(inp){var file=inp.files[0];if(!file)return;var reader=new FileReader();reader.onload=e=>{rState.photoUrl=e.target.result;rState.showPhoto=true;renderSidebar();renderResume();};reader.readAsDataURL(file);}
function getResumeScore() {
  const stats = {
    skills: rState.skills.length,
    exp: rState.experiences.length,
    bullets: rState.experiences.reduce((sum, e) => sum + e.bullets.length, 0),
    edu: rState.education.length,
    summaryLen: rState.summary.split(' ').length,
    hasContact: !!(rState.email && rState.phone),
    hasPhoto: rState.showPhoto && rState.photoUrl
  };
  
  let score = 0;
  if (stats.skills >= 5) score += 15;
  if (stats.exp >= 2) score += 20;
  if (stats.bullets >= 6) score += 20;
  if (stats.summaryLen >= 20) score += 15;
  if (stats.edu >= 1) score += 15;
  if (stats.hasContact) score += 15;
  
  return { score, stats };
}

function getAIReply(msg) {
  const m = m => msg.toLowerCase().includes(m);
  const name = rState.name.split(' ')[0] || 'there';
  const { score, stats } = getResumeScore();
  const role = rState.title || 'Professional';
  
  const tips = [
    "Recruiters scan resumes in F-patterns. Keep your most important data on the top-left.",
    "Using a sans-serif font like DM Sans is 12% more readable for digital ATS systems.",
    "Always save your final version as a PDF to preserve your premium layout.",
    "LinkedIn profiles with a professional photo get 14x more views than those without."
  ];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  // 1. Scoring & General Feedback
  if (m('score') || m('feedback') || m('how is') || m('review')) {
    let specificFix = "";
    if (rState.projects.length === 0) specificFix = "I see you haven't added any **Projects**. Even side projects show initiative!";
    else if (rState.certifications.length === 0) specificFix = "Adding a **Certification** could boost your credibility by 20%.";
    else if (stats.bullets < 5) specificFix = "Your experience bullets are a bit sparse. Try to have at least **3 bullets per role**.";
    else specificFix = "Your structure is solid. Try mirror-matching keywords from a specific Job Description now.";

    return `✦ **Advanced Analysis for ${name}:**<br><br>
    Current Score: **${score}%**<br>
    Target: **95%+ for Tier-1 companies**<br><br>
    ${specificFix}<br><br>
    💡 **Pro Tip:** ${randomTip}`;
  }

  // 2. Experience & Impact (Power Words)
  if (m('experience') || m('bullet') || m('work') || m('achievement')) {
    const powerWords = ['spearheaded', 'orchestrated', 'engineered', 'navigated', 'transformed'];
    const hasPower = rState.experiences.some(e => e.bullets.some(b => powerWords.some(pw => b.toLowerCase().includes(pw))));
    
    if (!hasPower) return `🚀 **Impact Analysis:**<br><br>Your bullets are functional, but lack "Power Verbs". <br><br>Instead of "Lead a team," try "**Orchestrated** a cross-functional squad of 5." It sounds 10x more senior. Try using verbs like *Spearheaded*, *Optimized*, or *Engineered*.`;
    return `🚀 **Impact Analysis:**<br><br>I noticed you're already using great power verbs! To improve further, ensure every bullet follows the **Action → Context → Result** logic. (e.g., "Engineered [A] a new API [C] which cut latency by 40% [R]").`;
  }

  // 3. Projects & Portfolio
  if (m('project') || m('portfolio') || m('side work')) {
    if (rState.projects.length === 0) return `📂 **Project Strategy:**<br><br>You haven't listed any projects yet! If you're a **${role}**, projects are the best way to show "Hands-on" proof. Add a personal project or a major case study to your resume now.`;
    return `📂 **Project Strategy:**<br><br>You have **${rState.projects.length} project(s)**. Make sure you include a URL (GitHub or Live Demo) for each. Highlighting your tech stack in the project description helps ATS bots find you faster!`;
  }

  // 4. Skills & Buzzwords
  if (m('skill') || m('tool') || m('tech')) {
    if (stats.skills < 6) return `🛠 **Skill Audit:**<br><br>You only have **${stats.skills} skills**. Most successful **${role}** resumes list 10-15. Consider adding tools like Slack, Jira, or specific languages you're learning.`;
    return `🛠 **Skill Audit:**<br><br>You have a solid list of **${stats.skills} skills**. <br><br>**Expert Strategy:** Move your most relevant skills to the very top of the list. ATS systems prioritize the first 5 keywords they find in your Skills section.`;
  }

  // 5. Greetings & Help
  if (m('hi') || m('hello') || m('hey') || m('help') || m('who are you')) {
    const greetings = [
      `Hey ${name}! Ready to build a world-class resume?`,
      `Hello! I've been analyzing your ${role} data. How can I help?`,
      `Hi ${name}! Let's get you that dream job. What should we fix first?`
    ];
    return `✦ ${greetings[Math.floor(Math.random() * greetings.length)]}<br><br>
    I can help you with:<br>
    • **"Review my resume"** (Full Score)<br>
    • **"Improve experience"** (Power words)<br>
    • **"Skill strategy"** (Keyword optimization)<br>
    • **"Project tips"** (Portfolio impact)`;
  }

  // 6. Generic intelligent fallback
  return `🤖 **Did you know?**<br><br>Your current **${role}** resume has a completeness score of **${score}%**. <br><br>Try asking me: *"How can I improve my experience?"* or *"What skills am I missing?"* to get more specific coaching!`;
}

function saveApiKey() {
  const key = document.getElementById('groq-key').value.trim();
  if (!key) { 
    localStorage.removeItem('rf_api_key'); 
    alert('Key cleared. AI will now use Local Mode.'); 
  } else { 
    localStorage.setItem('rf_api_key', key); 
    alert('Key saved! AI is now in Groq API Mode.'); 
  }
  renderSidebar();
}

function getSystemPrompt() {
  return `You are "Antigravity", a world-class AI Career Coach and Resume Expert. 
  The user is currently building their resume. Here is their data:
  - Name: ${rState.name}
  - Title: ${rState.title}
  - Summary: ${rState.summary}
  - Skills: ${rState.skills.join(', ')}
  - Experience Bullets: ${rState.experiences.reduce((sum, e) => sum + e.bullets.length, 0)}
  - Current Company: ${rState.experiences[0]?.company || 'N/A'}
  - Current Role: ${rState.experiences[0]?.role || 'N/A'}

  GUIDELINES:
  - Be conversational, professional, and highly encouraging.
  - Give extremely specific advice based on their data.
  - If they ask for "feedback" or "score", use their actual skills and experience to point out gaps.
  - If they ask to "Change font to [name]" or "Set color to [hex]", reply politely that they can do this in the Design tab, OR I (the AI) will simulate it.
  - Keep responses markdown-formatted. Use bolding and lists for readability.
  - You are better than a generic LLM because you have direct access to their current resume state.`;
}

async function callGroqAPI(msg, typingId) {
  const key = localStorage.getItem('rf_api_key');
  const el = document.getElementById(typingId);
  
  // 1. Try Backend Server First (Secure)
  if (isServerOnline) {
    try {
      const response = await fetch(serverUrl + '/api/ai/chat', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: msg, 
          resumeContext: rState,
          apiKey: key 
        })
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        if (el) {
          el.innerHTML = data.reply.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          el.style.animation = 'mslide 0.4s ease-out';
        }
        return;
      } else {
        console.warn("Server AI Error:", data);
      }
    } catch (err) {
      console.error("Server connection failed during chat:", err);
    }
  }

  // 2. Fallback to Direct Browser Call (If key provided)
  if (key) {
    try {
      const url = "https://api.groq.com/openai/v1/chat/completions";
      const response = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: getSystemPrompt() },
            { role: "user", content: msg }
          ],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      const data = await response.json();
      if (response.ok && data.choices?.[0]?.message?.content) {
        const reply = data.choices[0].message.content;
        if (el) {
          el.innerHTML = reply.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          el.style.animation = 'mslide 0.4s ease-out';
        }
        return;
      }
    } catch (err) {
      console.error("Direct browser AI call failed:", err);
    }
  }

  // 3. Last Resort: Local Heuristic Brain
  if (el) {
    el.innerHTML = (key || isServerOnline ? "⚠️ **Connection Error.** Using offline brain...<br><br>" : "") + getAIReply(msg);
    el.style.animation = 'mslide 0.4s ease-out';
  }
}

function sendResumeChat() {
  const inp = document.getElementById('chat-input');
  const msg = inp.value.trim();
  if (!msg) return;

  const chat = document.getElementById('chat-messages');
  
  // User Message
  chat.innerHTML += `<div class="rmsg rmsg-user">${msg}</div>`;
  inp.value = '';
  chat.scrollTop = chat.scrollHeight;

  // Thinking State
  const typingId = 'typing-' + Date.now();
  chat.innerHTML += `
    <div class="rmsg rmsg-ai" id="${typingId}">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>`;
  chat.scrollTop = chat.scrollHeight;

  const key = localStorage.getItem('rf_api_key');
  if (key) {
    callGroqAPI(msg, typingId);
  } else {
    // Local AI Fallback
    setTimeout(() => {
      const reply = getAIReply(msg);
      const el = document.getElementById(typingId);
      if (el) {
        el.innerHTML = reply;
        el.style.animation = 'mslide 0.4s ease-out';
      }
      chat.scrollTop = chat.scrollHeight;
    }, 800 + Math.random() * 700);
  }
}

function raiAction(msg) {
  document.getElementById('chat-input').value = msg;
  sendResumeChat();
}

// Resume rendering
function renderResume(){
  var el=document.getElementById('resume-render');
  if(rState.docPage==='cover') el.innerHTML=renderCoverLetter();
  else if(rState.docPage==='linkedin') el.innerHTML=renderLinkedIn();
  else el.innerHTML=buildResume();
}

// ═══════════════════════════════════════════
//  EXPORT FUNCTIONS
// ═══════════════════════════════════════════
function downloadFile(filename, text, type) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:' + type + ';charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function exportResume(format) {
  var name = rState.name.replace(/\s+/g, '_') || 'Resume';
  var date = new Date().toISOString().split('T')[0];
  var filename = `${name}_${date}`;

  if (format === 'pdf') {
    window.print();
  } else if (format === 'json') {
    downloadFile(`${filename}.json`, JSON.stringify(rState, null, 2), 'application/json');
  } else if (format === 'html') {
    var resumeHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${rState.name} - Resume</title>
  <link rel="stylesheet" href="style.css">
  <style>
    body { background: white !important; margin: 0; padding: 20px; display: flex; justify-content: center; }
    .resume-paper { transform: none !important; box-shadow: none !important; }
  </style>
</head>
<body>
  <div class="resume-paper">
    ${document.getElementById('resume-render').innerHTML}
  </div>
</body>
</html>`;
    downloadFile(`${filename}.html`, resumeHtml, 'text/html');
  } else if (format === 'text') {
    var txt = `RESUME: ${rState.name}\n${rState.title}\n\n`;
    txt += `CONTACT\n${rState.email} | ${rState.phone} | ${rState.location}\n`;
    txt += `LinkedIn: ${rState.linkedin}\nWebsite: ${rState.website}\nGitHub: ${rState.github}\n\n`;
    txt += `SUMMARY\n${rState.summary}\n\n`;
    txt += `SKILLS\n${rState.skills.join(', ')}\n\n`;
    txt += `EXPERIENCE\n`;
    rState.experiences.forEach(e => {
      txt += `${e.role} @ ${e.company} (${e.from} - ${e.to})\n`;
      e.bullets.forEach(b => txt += `- ${b}\n`);
      txt += `\n`;
    });
    txt += `EDUCATION\n`;
    rState.education.forEach(e => {
      txt += `${e.school} - ${e.degree} (${e.year})${e.gpa ? ' GPA: ' + e.gpa : ''}\n`;
    });
    downloadFile(`${filename}.txt`, txt, 'text/plain');
  } else {
    alert(`Export to ${format.toUpperCase()} is not fully implemented in this demo. Please use PDF or JSON.`);
  }
  
  // Close modal if open
  var modal = document.getElementById('export-modal');
  if (modal) modal.classList.remove('open');
}
function buildResume(){
  var t=rState.template;
  if(t==='modern-split'||t==='bold-left') return rModernSplit();
  if(t==='two-column') return rTwoColumn();
  if(t==='timeline') return rTimeline();
  if(t==='classic-serif') return rClassic();
  if(t==='elegant') return rElegant();
  if(t==='glassmorphism') return rGlass();
  if(t==='creative') return rCreative();
  return rATS();
}
var rs=`font-family: DM Sans, sans-serif; font-size: 12px; line-height: 1.5; color: #1a1a2e;`;
function rSH(title,accent){return `<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#fff;background:${accent};padding:4px 10px;border-radius:3px;margin-bottom:10px;display:inline-block">${title}</div>`;}
function rSL(title,accent){return `<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${accent};border-bottom:2px solid ${accent};padding-bottom:4px;margin-bottom:10px">${title}</div>`;}
function rModernSplit(){var dark=rState.template==='bold-left'?'#0f172a':'#1a1a2e';var lw=rState.template==='bold-left'?'38%':'35%';return `<div style="display:flex;min-height:1120px;${rs}"><div style="width:${lw};background:${dark};color:#e8e8f0;padding:28px 20px;box-sizing:border-box">${rState.showPhoto&&rState.photoUrl?`<div style="text-align:center;margin-bottom:16px"><img src="${rState.photoUrl}" style="width:76px;height:76px;border-radius:50%;object-fit:cover;border:3px solid ${rState.accent}"></div>`:''}<div style="font-family:${rState.font},serif;font-size:21px;font-weight:700;color:#fff;line-height:1.2;margin-bottom:3px">${rState.name}</div><div style="font-size:11px;color:${rState.accent};font-weight:600;margin-bottom:18px">${rState.title}</div>${[rState.email,rState.phone,rState.location,rState.linkedin,rState.website,rState.github].filter(Boolean).map(v=>`<div style="font-size:10px;color:#9898b8;margin-bottom:5px">${v}</div>`).join('')}${rState.sections.skills&&rState.skills.length?`<div style="margin-top:14px">${rSH('Skills',rState.accent)}<div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:5px">${rState.skills.map(s=>`<span style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:2px 7px;font-size:10px;color:#c8c8e0">${s}</span>`).join('')}</div></div>`:''}${rState.sections.languages&&rState.languages.length?`<div style="margin-top:14px">${rSH('Languages',rState.accent)}${rState.languages.map(l=>`<div style="display:flex;justify-content:space-between;font-size:10px;color:#c8c8e0;padding:2px 0"><span>${l.lang}</span><span style="color:${rState.accent}">${l.level}</span></div>`).join('')}</div>`:''}${rState.sections.certifications&&rState.certifications.length?`<div style="margin-top:14px">${rSH('Certifications',rState.accent)}${rState.certifications.map(c=>`<div style="font-size:10px;color:#c8c8e0;margin-bottom:4px"><div style="font-weight:600">${c.name}</div><div style="color:#6868a0">${c.issuer} · ${c.year}</div></div>`).join('')}</div>`:''}</div><div style="flex:1;padding:28px;box-sizing:border-box;background:#fff"><div style="font-size:11px;color:#666;line-height:1.6;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid #e5e7eb">${rState.summary}</div>${rState.sections.experience&&rState.experiences.length?`<div style="margin-bottom:16px">${rSL('Experience',rState.accent)}${rState.experiences.map(e=>`<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between"><div style="font-weight:700;font-size:13px">${e.role}</div><div style="font-size:10px;color:#888">${e.from}–${e.to}</div></div><div style="font-size:11px;color:${rState.accent};font-weight:600;margin-bottom:4px">${e.company}</div><ul style="margin:0;padding-left:14px">${e.bullets.map(b=>`<li style="font-size:11px;color:#444;margin-bottom:2px">${b}</li>`).join('')}</ul></div>`).join('')}</div>`:''} ${rState.sections.education&&rState.education.length?`<div style="margin-bottom:16px">${rSL('Education',rState.accent)}${rState.education.map(e=>`<div style="margin-bottom:6px"><div style="font-weight:700;font-size:12px">${e.school}</div><div style="font-size:11px;color:#666">${e.degree} · ${e.year}${e.gpa?' · GPA: '+e.gpa:''}</div></div>`).join('')}</div>`:''} ${rState.sections.projects&&rState.projects.length?`<div style="margin-bottom:16px">${rSL('Projects',rState.accent)}${rState.projects.map(p=>`<div style="margin-bottom:6px"><div style="font-weight:700;font-size:12px">${p.name}${p.url?` <span style="font-size:10px;color:${rState.accent}">↗ ${p.url}</span>`:''}</div><div style="font-size:11px;color:#444">${p.desc}</div></div>`).join('')}</div>`:''}</div></div>`;}
function rATS(){return `<div style="${rs}padding:34px 44px;background:#fff"><div style="text-align:center;margin-bottom:18px;border-bottom:2px solid ${rState.accent};padding-bottom:14px"><div style="font-family:Arial,sans-serif;font-size:27px;font-weight:700;color:#1a1a2e">${rState.name}</div><div style="font-size:13px;color:${rState.accent};margin:4px 0">${rState.title}</div><div style="font-size:11px;color:#555">${rState.email} | ${rState.phone} | ${rState.location}</div></div>${rState.sections.experience&&rState.experiences.length?`<div style="margin-bottom:14px"><div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #ccc;padding-bottom:3px;margin-bottom:8px">Professional Experience</div>${rState.experiences.map(e=>`<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between"><span style="font-weight:700">${e.role}, ${e.company}</span><span style="font-size:10px;color:#666">${e.from}–${e.to}</span></div><ul style="margin:3px 0 0;padding-left:16px">${e.bullets.map(b=>`<li style="font-size:11px;margin-bottom:1px">${b}</li>`).join('')}</ul></div>`).join('')}</div>`:''} ${rState.sections.skills&&rState.skills.length?`<div style="margin-bottom:14px"><div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #ccc;padding-bottom:3px;margin-bottom:6px">Skills</div><div style="font-size:11px">${rState.skills.join(' · ')}</div></div>`:''} ${rState.sections.education&&rState.education.length?`<div><div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #ccc;padding-bottom:3px;margin-bottom:6px">Education</div>${rState.education.map(e=>`<div style="font-size:11px"><span style="font-weight:700">${e.school}</span> — ${e.degree} · ${e.year}</div>`).join('')}</div>`:''}</div>`;}
function rElegant(){return `<div style="${rs}background:#faf8f5;min-height:1120px"><div style="background:${rState.accent};padding:36px 44px;color:#fff"><div style="font-family:${rState.font},serif;font-size:30px;font-weight:700">${rState.name}</div><div style="font-size:13px;opacity:0.85;margin-top:3px">${rState.title}</div><div style="display:flex;gap:18px;margin-top:10px;flex-wrap:wrap">${[rState.email,rState.phone,rState.location].map(v=>`<span style="font-size:11px;opacity:0.75">${v}</span>`).join('')}</div></div><div style="padding:28px 44px"><div style="font-size:12px;color:#444;line-height:1.7;margin-bottom:20px;font-style:italic">"${rState.summary}"</div>${rState.sections.experience&&rState.experiences.length?`<div style="margin-bottom:18px"><div style="font-family:${rState.font},serif;font-size:15px;color:${rState.accent};margin-bottom:10px;font-weight:700">Experience</div>${rState.experiences.map(e=>`<div style="margin-bottom:12px;padding-left:14px;border-left:3px solid ${rState.accent}25"><div style="font-weight:700;font-size:12px">${e.role} · <span style="color:${rState.accent}">${e.company}</span></div><div style="font-size:10px;color:#999;margin-bottom:4px">${e.from}–${e.to}</div>${e.bullets.map(b=>`<div style="font-size:11px;color:#555;margin-bottom:2px">• ${b}</div>`).join('')}</div>`).join('')}</div>`:''}</div></div>`;}
function rGlass(){return `<div style="${rs}background:linear-gradient(135deg,#1e1b4b,#312e81,#1e1b4b);min-height:1120px;padding:32px 36px;color:#e0e0ff"><div style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:14px;padding:24px;margin-bottom:18px"><div style="font-family:${rState.font},serif;font-size:26px;font-weight:700;color:#fff">${rState.name}</div><div style="font-size:12px;color:${rState.accent};margin:3px 0 8px">${rState.title}</div><div style="display:flex;gap:12px;flex-wrap:wrap">${[rState.email,rState.phone,rState.location].map(v=>`<span style="font-size:10px;color:rgba(255,255,255,0.6);background:rgba(255,255,255,0.05);padding:2px 8px;border-radius:20px;border:1px solid rgba(255,255,255,0.1)">${v}</span>`).join('')}</div></div><div style="font-size:11px;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:18px">${rState.summary}</div>${rState.sections.experience&&rState.experiences.length?`<div style="margin-bottom:18px"><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${rState.accent};margin-bottom:10px">Experience</div>${rState.experiences.map(e=>`<div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px;margin-bottom:7px"><div style="font-weight:700;font-size:12px;color:#fff">${e.role} · ${e.company}</div><div style="font-size:10px;color:rgba(255,255,255,0.4);margin-bottom:5px">${e.from}–${e.to}</div>${e.bullets.map(b=>`<div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:2px">• ${b}</div>`).join('')}</div>`).join('')}</div>`:''} ${rState.sections.skills&&rState.skills.length?`<div><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${rState.accent};margin-bottom:7px">Skills</div><div style="display:flex;flex-wrap:wrap;gap:5px">${rState.skills.map(s=>`<span style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:20px;padding:3px 9px;font-size:10px;color:rgba(255,255,255,0.7)">${s}</span>`).join('')}</div></div>`:''}</div>`;}
function rCreative(){return `<div style="${rs}background:#fffbf7;min-height:1120px"><div style="display:flex"><div style="width:8px;background:${rState.accent}"></div><div style="flex:1;padding:32px 36px"><div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px"><div><div style="font-family:${rState.font},serif;font-size:30px;font-weight:700;color:#1a1a2e;letter-spacing:-0.5px">${rState.name}</div><div style="font-size:13px;color:${rState.accent};font-weight:600;margin-top:3px">${rState.title}</div></div>${rState.showPhoto&&rState.photoUrl?`<img src="${rState.photoUrl}" style="width:68px;height:68px;border-radius:10px;object-fit:cover;border:3px solid ${rState.accent}">`:''}</div><div style="display:flex;gap:12px;flex-wrap:wrap;font-size:10px;color:#888;margin-bottom:18px">${[rState.email,rState.phone,rState.location].map(v=>`<span style="background:#f3f0ea;padding:2px 8px;border-radius:20px">${v}</span>`).join('')}</div><div style="font-size:12px;color:#555;line-height:1.7;margin-bottom:20px">${rState.summary}</div>${rState.sections.experience&&rState.experiences.length?`<div style="margin-bottom:18px"><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${rState.accent};margin-bottom:10px">Experience</div>${rState.experiences.map(e=>`<div style="margin-bottom:12px;display:flex;gap:12px"><div style="width:6px;height:6px;background:${rState.accent};border-radius:50%;margin-top:5px;flex-shrink:0"></div><div style="flex:1"><div style="font-weight:700;font-size:12px">${e.role}</div><div style="font-size:11px;color:${rState.accent};margin-bottom:3px">${e.company} · ${e.from}–${e.to}</div>${e.bullets.map(b=>`<div style="font-size:11px;color:#555;margin-bottom:2px">→ ${b}</div>`).join('')}</div></div>`).join('')}</div>`:''}</div></div></div>`;}
function rClassic(){return `<div style="${rs}background:#fff;padding:36px 48px;min-height:1120px"><div style="text-align:center;border-bottom:2px solid #1a1a2e;padding-bottom:18px;margin-bottom:16px"><div style="font-family:${rState.font},Georgia,serif;font-size:28px;font-weight:700;color:#1a1a2e">${rState.name}</div><div style="font-size:12px;color:#555;margin:4px 0;font-style:italic">${rState.title}</div><div style="font-size:10px;color:#777">${rState.email} &bull; ${rState.phone} &bull; ${rState.location}</div></div><div style="font-size:11px;color:#444;line-height:1.7;margin-bottom:16px;text-align:center;font-style:italic">${rState.summary}</div>${rState.sections.experience&&rState.experiences.length?`<div style="margin-bottom:16px"><div style="font-family:${rState.font},Georgia,serif;font-size:13px;font-weight:700;color:#1a1a2e;border-bottom:1px solid #aaa;padding-bottom:3px;margin-bottom:8px">PROFESSIONAL EXPERIENCE</div>${rState.experiences.map(e=>`<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between"><div><span style="font-weight:700">${e.role}</span>, <span style="font-style:italic">${e.company}</span></div><div style="font-size:10px;color:#666">${e.from}–${e.to}</div></div><ul style="margin:3px 0 0;padding-left:16px">${e.bullets.map(b=>`<li style="font-size:11px;margin-bottom:2px">${b}</li>`).join('')}</ul></div>`).join('')}</div>`:''} ${rState.sections.skills&&rState.skills.length?`<div><div style="font-family:${rState.font},Georgia,serif;font-size:13px;font-weight:700;color:#1a1a2e;border-bottom:1px solid #aaa;padding-bottom:3px;margin-bottom:6px">SKILLS</div><div style="font-size:11px">${rState.skills.join(' · ')}</div></div>`:''}</div>`;}
function rTwoColumn(){return `<div style="${rs}background:#f1f5f9;display:flex;min-height:1120px"><div style="width:30%;background:#fff;border-right:1px solid #e2e8f0;padding:24px 18px"><div style="width:62px;height:62px;border-radius:50%;background:${rState.accent};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:#fff;margin-bottom:12px">${rState.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div><div style="font-size:11px;color:#333;margin-bottom:2px">${rState.email}</div><div style="font-size:11px;color:#333;margin-bottom:2px">${rState.phone}</div><div style="font-size:11px;color:#333;margin-bottom:14px">${rState.location}</div>${rState.sections.skills&&rState.skills.length?`<div style="margin-bottom:14px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:7px">Skills</div>${rState.skills.map(s=>`<div style="font-size:11px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:4px;padding:3px 7px;margin-bottom:3px">${s}</div>`).join('')}</div>`:''}</div><div style="flex:1;padding:24px;background:#f8fafc"><div style="font-family:${rState.font},serif;font-size:24px;font-weight:700;color:#0f172a">${rState.name}</div><div style="font-size:12px;color:${rState.accent};font-weight:600;margin:3px 0 10px">${rState.title}</div><div style="font-size:11px;color:#555;line-height:1.6;margin-bottom:16px;border-bottom:1px solid #e2e8f0;padding-bottom:14px">${rState.summary}</div>${rState.sections.experience&&rState.experiences.length?`<div style="margin-bottom:16px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${rState.accent};margin-bottom:8px">Experience</div>${rState.experiences.map(e=>`<div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-bottom:7px"><div style="display:flex;justify-content:space-between"><div style="font-weight:700;font-size:12px">${e.role}</div><div style="font-size:10px;color:#94a3b8">${e.from}–${e.to}</div></div><div style="font-size:11px;color:${rState.accent};margin-bottom:5px">${e.company}</div>${e.bullets.map(b=>`<div style="font-size:11px;color:#555;margin-bottom:2px">• ${b}</div>`).join('')}</div>`).join('')}</div>`:''}</div></div>`;}
function rTimeline(){return `<div style="${rs}background:#f8fafc;min-height:1120px;padding:32px 40px"><div style="text-align:center;margin-bottom:24px"><div style="font-family:${rState.font},serif;font-size:28px;font-weight:700;color:#0f172a">${rState.name}</div><div style="font-size:12px;color:${rState.accent};font-weight:600;margin:5px 0">${rState.title}</div><div style="font-size:10px;color:#94a3b8">${rState.email} · ${rState.phone} · ${rState.location}</div><div style="width:50px;height:3px;background:${rState.accent};margin:10px auto 0;border-radius:2px"></div></div>${rState.sections.experience&&rState.experiences.length?`<div style="margin-bottom:20px"><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${rState.accent};margin-bottom:12px">Career Timeline</div><div style="padding-left:18px;border-left:2px solid ${rState.accent}35">${rState.experiences.map(e=>`<div style="position:relative;margin-bottom:14px;padding-left:14px"><div style="position:absolute;left:-23px;top:3px;width:9px;height:9px;border-radius:50%;background:${rState.accent}"></div><div style="font-size:10px;color:#94a3b8;font-weight:600">${e.from}–${e.to}</div><div style="font-weight:700;font-size:12px;color:#0f172a">${e.role} · ${e.company}</div>${e.bullets.map(b=>`<div style="font-size:11px;color:#555;margin-top:2px">• ${b}</div>`).join('')}</div>`).join('')}</div></div>`:''} <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">${rState.sections.skills&&rState.skills.length?`<div><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${rState.accent};margin-bottom:8px">Skills</div><div style="display:flex;flex-wrap:wrap;gap:4px">${rState.skills.map(s=>`<span style="background:#fff;border:1px solid #e2e8f0;border-radius:4px;padding:2px 7px;font-size:10px">${s}</span>`).join('')}</div></div>`:''} ${rState.sections.education&&rState.education.length?`<div><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${rState.accent};margin-bottom:8px">Education</div>${rState.education.map(e=>`<div style="font-size:11px;margin-bottom:5px"><div style="font-weight:700">${e.school}</div><div style="color:#666">${e.degree} · ${e.year}</div></div>`).join('')}</div>`:''}</div></div>`;}
function renderCoverLetter(){return `<div style="font-family:${rState.font},Georgia,serif;background:#fff;padding:48px 56px;min-height:1120px;color:#1a1a2e"><div style="margin-bottom:36px"><div style="font-size:20px;font-weight:700;color:${rState.accent}">${rState.name}</div><div style="font-size:12px;color:#666;margin-top:3px">${rState.email} · ${rState.phone} · ${rState.location}</div></div><div style="font-size:12px;color:#444;line-height:2"><p style="margin-bottom:18px">${new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</p><p style="margin-bottom:16px">Dear Hiring Manager,</p><p style="margin-bottom:14px">I am writing to express my strong interest in a position at your organization. As a ${rState.title}, I bring expertise in ${rState.skills.slice(0,3).join(', ')}.</p><p style="margin-bottom:14px">${rState.summary}</p><p style="margin-bottom:36px">Thank you for your time. I look forward to discussing how I can contribute to your team.</p><p>Sincerely,<br><br><strong>${rState.name}</strong></p></div></div>`;}
function renderLinkedIn(){return `<div style="font-family:DM Sans,sans-serif;background:#fff;padding:36px 44px;min-height:500px;color:#1a1a2e"><div style="max-width:600px;margin:0 auto"><div style="font-size:13px;font-weight:700;color:#0a66c2;margin-bottom:5px">LinkedIn About Section</div><div style="height:2px;background:#0a66c2;margin-bottom:20px;width:50px"></div><div style="font-size:13px;color:#333;line-height:1.8"><p style="margin-bottom:12px">${rState.summary}</p><p style="margin-bottom:12px">🔧 ${rState.title} — specializing in ${rState.skills.slice(0,3).join(', ')}</p><p style="margin-bottom:12px">📍 ${rState.location}</p><p style="margin-bottom:12px">💼 ${rState.experiences[0]?.role||'Open to opportunities'} ${rState.experiences[0]?'at '+rState.experiences[0].company:''}</p><p style="margin-bottom:12px">✅ ${rState.skills.join(' · ')}</p><p>📫 ${rState.email}</p></div></div></div>`;}

// ═══════════════════════════════════════════
//  PRACTICE ARENA
// ═══════════════════════════════════════════
var QDB={technical:[{q:"What is the difference between a process and a thread?",hint:"Think about memory space and communication",ideal:"A process is an independent program in execution with its own memory. A thread is a lightweight unit within a process sharing the same memory. Processes are isolated; threads share resources but can cause race conditions.",type:"tech"},{q:"Explain Big O notation and the time complexity of binary search.",hint:"Think about worst-case growth rate",ideal:"Big O describes upper bound of growth rate. Binary search is O(log n) — it halves the search space each step.",type:"tech"},{q:"What is a REST API? How does it differ from GraphQL?",hint:"Endpoints vs query flexibility",ideal:"REST uses fixed endpoints per resource. GraphQL uses a single endpoint where clients specify exactly what data they need — reducing over/under-fetching.",type:"tech"},{q:"Explain database indexing. When would you NOT use an index?",hint:"Indexes speed up reads but slow down writes",ideal:"Indexes speed up lookups. Avoid on small tables, frequently updated columns, or low-cardinality columns.",type:"tech"},{q:"What is a deadlock? How can it be prevented?",hint:"Circular dependency of resources",ideal:"Deadlock: two threads wait for each other's resources. Prevention: lock ordering, timeout, deadlock detection, avoiding circular waits.",type:"tech"},{q:"Explain TCP vs UDP with use cases.",hint:"Reliability vs speed tradeoff",ideal:"TCP: connection-oriented, reliable, ordered — use for HTTP. UDP: connectionless, fast — use for video streaming, gaming, DNS.",type:"tech"},{q:"What is the CAP theorem?",hint:"Distributed systems — pick any two",ideal:"Consistency, Availability, Partition Tolerance — a distributed system can guarantee at most two simultaneously.",type:"tech"},{q:"What is Docker and why is it used?",hint:"Think about consistency across environments",ideal:"Docker packages apps with dependencies into containers. Solves environment inconsistencies, enables microservices, easy scaling.",type:"tech"},{q:"Explain SOLID principles.",hint:"5 design principles for maintainable OOP code",ideal:"S: One class one job. O: Open for extension, closed for modification. L: Substitutable subclasses. I: Don't force interfaces. D: Depend on abstractions.",type:"tech"},{q:"How does garbage collection work in Java/Python?",hint:"Mark-and-sweep, reference counting",ideal:"Java uses generational GC with mark-and-sweep. Python uses reference counting + cyclic GC. Both auto-free unreferenced memory.",type:"tech"},{q:"Write a function to check if a string is a palindrome.",hint:"Compare characters from both ends",code:"function isPalindrome(s) {\n  // Your solution here\n}",ideal:"Reverse approach: s === s.split('').reverse().join('') or two-pointer: compare s[i] and s[n-1-i]. Handle edge cases.",type:"tech"},{q:"What is the difference between `let`, `var`, and `const` in JavaScript?",hint:"Scope and hoisting differences",ideal:"`var`: function-scoped, hoisted. `let`: block-scoped, reassignable. `const`: block-scoped, not reassignable. Both `let`/`const` fix hoisting issues.",type:"tech"}],hr:[{q:"Tell me about yourself.",hint:"Present → Past → Future. Keep under 2 minutes.",ideal:"Start with current role/study, key achievements, briefly cover background, then explain why you're excited about this opportunity.",type:"hr"},{q:"Why do you want to work at our company?",hint:"Research the company — mission, products, culture",ideal:"Combine genuine interest in the company's mission + specific role fit + your long-term career direction. Avoid generic answers.",type:"hr"},{q:"Describe a conflict with a team member and how you handled it.",hint:"Use STAR: Situation, Task, Action, Result",ideal:"Acknowledge the conflict clearly, describe proactive resolution, show empathy, explain positive outcome and lesson learned.",type:"hr"},{q:"What is your greatest weakness?",hint:"Be authentic — not 'I work too hard'",ideal:"Pick a real weakness not core to the job, explain how you've been actively working on it, give a concrete example of improvement.",type:"hr"},{q:"Where do you see yourself in 5 years?",hint:"Show ambition but also commitment to the role",ideal:"Show growth within the domain, align with the company's trajectory, be specific but flexible.",type:"hr"},{q:"Tell me about a time you failed. What did you learn?",hint:"Show real self-awareness and growth",ideal:"Pick a meaningful failure, own it completely, describe concrete lessons, explain how you applied those lessons afterward.",type:"hr"},{q:"How do you prioritize tasks with multiple deadlines?",hint:"Tools, frameworks, communication",ideal:"Mention frameworks (Eisenhower matrix, MoSCoW), stakeholder communication, task breakdown, and tools you use.",type:"hr"},{q:"Why should we hire you?",hint:"Connect your unique value to their specific needs",ideal:"Summarize 3 strongest differentiators, connect them directly to job requirements, add enthusiasm for the specific opportunity.",type:"hr"}],aptitude:[{q:"A train travels 300 km in 4 hours. What is its average speed?",options:["60 km/h","70 km/h","75 km/h","80 km/h"],answer:2,hint:"Speed = Distance / Time",ideal:"75 km/h. 300 ÷ 4 = 75.",type:"apt"},{q:"5 workers complete a job in 8 days. How many days will 10 workers take?",options:["2 days","4 days","6 days","8 days"],answer:1,hint:"Inverse proportion",ideal:"4 days. 5×8=40 man-days. 40÷10=4.",type:"apt"},{q:"What comes next: 2, 6, 12, 20, 30, ?",options:["40","42","44","48"],answer:1,hint:"Look at differences between terms",ideal:"42. Differences: 4,6,8,10,12. So 30+12=42.",type:"apt"},{q:"Shopkeeper marks 30% above cost, gives 10% discount. Profit %?",options:["15%","17%","17.5%","20%"],answer:1,hint:"CP=100, find SP after discount",ideal:"17%. CP=100, MP=130, SP=117. Profit=17%.",type:"apt"},{q:"All roses are flowers. Some flowers fade. Which is valid?",options:["All roses fade","Some roses may fade","No roses fade","Cannot determine"],answer:1,hint:"Venn diagram — partial overlap",ideal:"'Some roses may fade' — partial overlap is possible but not guaranteed.",type:"apt"},{q:"Boat: 10km upstream in 2h, 10km downstream in 1h. Stream speed?",options:["1.5 km/h","2 km/h","2.5 km/h","3 km/h"],answer:2,hint:"(Downstream speed - Upstream speed) / 2",ideal:"2.5 km/h. Downstream=10, Upstream=5. Stream=(10-5)/2=2.5.",type:"apt"},{q:"SI on Rs.1000 at 5% per annum for 3 years?",options:["Rs.100","Rs.150","Rs.200","Rs.250"],answer:1,hint:"SI = P×R×T/100",ideal:"Rs.150. 1000×5×3/100=150.",type:"apt"},{q:"Find the odd one: 2, 3, 5, 7, 11, 13, 14, 17",options:["11","13","14","17"],answer:2,hint:"Prime number series",ideal:"14. All others are prime; 14=2×7 is composite.",type:"apt"}],coding:[{q:"Find two numbers in an array that add up to a target. Return their indices.",hint:"Hash map approach: O(n) time",code:"Input: nums=[2,7,11,15], target=9\nOutput: [0,1]  // 2+7=9",ideal:"Use hash map: for each num, check if (target-num) exists. Store num with index. Time O(n), Space O(n).",type:"cs"},{q:"Reverse a linked list in-place.",hint:"Three pointers: prev, current, next",code:"1→2→3→4→5→null\nExpected: 5→4→3→2→1→null",ideal:"prev=null, curr=head. While curr: next=curr.next, curr.next=prev, prev=curr, curr=next. Return prev. O(n) time, O(1) space.",type:"cs"},{q:"Find the longest substring without repeating characters.",hint:"Sliding window technique",code:"Input: 'abcabcbb'\nOutput: 3  // 'abc'",ideal:"Sliding window with a set. Expand right, shrink left on duplicate. Track max length. Time O(n).",type:"cs"},{q:"Implement binary search on a sorted array.",hint:"Middle comparison, halve the range",code:"arr=[1,3,5,7,9,11], target=7\nExpected: index 3",ideal:"left=0,right=n-1. While left<=right: mid=(l+r)//2. Compare arr[mid] with target. Return -1 if not found.",type:"cs"},{q:"Check if a binary tree is height-balanced.",hint:"Height difference at every node ≤ 1",code:"    1\n   / \\\n  2   3\n / \\\n4   5",ideal:"Recursive: return height or -1 if unbalanced. At each node |left_h - right_h| <= 1. Time O(n).",type:"cs"}],group:[{q:"'AI will replace more jobs than it creates.' Take a stance and make your opening argument.",hint:"Clear stance + 2-3 data points + anticipate counterarguments",ideal:"State position first sentence. Support with WEF/McKinsey data. Acknowledge nuance. Speak clearly, don't interrupt.",type:"hr"},{q:"'WFH is better than office work.' You are AGAINST this position.",hint:"Argue the assigned side strongly, even if you disagree",ideal:"Collaboration suffers → creativity needs proximity → work-life blur → mentoring harder → culture erodes.",type:"hr"},{q:"'Social media should be regulated by governments.' Make a 90-second statement.",hint:"Free speech vs harm, economic impacts, international precedents",ideal:"Open with compelling case study. Define 'regulation' narrowly. Argue with evidence. Memorable closing line.",type:"hr"}]};

var pSession={mode:'',difficulty:'medium',qcount:10,timer:60,questions:[],current:0,scores:[],timerInterval:null,timeLeft:60,hintUsed:false,totalXP:0,streak:0,totalSessions:0};
var pMockState={qIndex:0,mode:'',scores:{comm:0,depth:0,conf:0,struct:0},answered:0};
var pSelectedMCQ=-1;
var topicsByMode={technical:['All Topics','Data Structures','Algorithms','DBMS','OS','Networking','OOP','System Design'],hr:['All Topics','Intro / Tell Me About Yourself','Strengths & Weaknesses','Situational','Leadership','Teamwork'],aptitude:['All Topics','Quantitative','Logical Reasoning','Verbal Ability','Data Interpretation'],coding:['All Topics','Arrays / Strings','Linked Lists','Trees / Graphs','Dynamic Programming','Recursion'],mock:['Software Engineer','Data Scientist','Product Manager','Backend Developer'],group:['Technology','Politics & Economy','Business Ethics','Environment']};
var mockQDB={technical:["Let's begin. Walk me through how you'd design a URL shortener like bit.ly.","Interesting! How would you handle 1 billion URLs at scale?","What data structure for the mapping, and why?","Good. Experience with caching layers like Redis?"],hr:["Let's start. Tell me about yourself and why you're here.","Describe a challenging project and how you overcame obstacles.","How do you handle negative feedback?","Where do you see yourself in 3 years?"],coding:["Given an array, find pairs summing to zero. Walk me through your approach.","What's the time complexity? Can we optimize?","If the array is sorted, does your approach change?","Final: find triplets summing to zero. Think out loud."]};
var mockInterviewers=[{name:'Priya Sharma',role:'Engineering Manager · Amazon'},{name:'Alex Chen',role:'Senior SWE · Google'},{name:'Rahul Verma',role:'Tech Lead · Flipkart'},{name:'Sarah Kim',role:'HRBP · Microsoft'}];

function showPPage(id){document.querySelectorAll('.ppage').forEach(p=>p.classList.remove('active'));document.getElementById('ppage-'+id).classList.add('active');}
function openPSetup(mode){pSession.mode=mode;var titles={technical:'Technical Round',hr:'HR Round',aptitude:'Aptitude Test',coding:'Coding Challenge',mock:'Mock Interview',group:'Group Discussion'};document.getElementById('psetup-title').textContent=titles[mode]+' Setup';document.getElementById('psetup-sub').textContent='Configure your '+mode+' practice session';var pills=document.getElementById('ptopic-pills');pills.innerHTML=(topicsByMode[mode]||[]).map((t,i)=>`<div class="ppill${i===0?' sel':''}" onclick="togglePPill(this,'ptopic')">${t}</div>`).join('');document.getElementById('ptime-section').style.display=mode==='mock'?'none':'';document.getElementById('pcompany-section').style.display=(mode==='technical'||mode==='hr'||mode==='coding')?'':'none';showPPage('setup');}
function togglePPill(el,group){document.querySelectorAll(`[onclick*="'${group}'"]`).forEach(p=>p.classList.remove('sel'));el.classList.add('sel');if(group==='pqcount')pSession.qcount=parseInt(el.textContent)||10;if(group==='ptimer'){var v=el.textContent;pSession.timer=v==='No timer'?0:parseInt(v)||60;}}
function selectPDiff(el,d){document.querySelectorAll('.diff-card').forEach(c=>c.classList.remove('sel'));el.classList.add('sel');pSession.difficulty=d;}
function startPSession(){if(pSession.mode==='mock'){startPMock();return;}var pool=QDB[pSession.mode]||QDB.technical;pSession.questions=pool.sort(()=>Math.random()-0.5).slice(0,pSession.qcount);pSession.current=0;pSession.scores=[];pSession.hintUsed=false;showPPage('session');loadPQuestion();}
function loadPQuestion(){var q=pSession.questions[pSession.current];if(!q){showPResults();return;}clearInterval(pSession.timerInterval);pSession.hintUsed=false;document.getElementById('pprogress-fill').style.width=((pSession.current/pSession.questions.length)*100)+'%';document.getElementById('pq-num').textContent=`Question ${pSession.current+1} of ${pSession.questions.length}`;var badges={tech:'badge-tech',hr:'badge-hr',apt:'badge-apt',cs:'badge-cs'};var labels={tech:'Technical',hr:'HR / Behavioral',apt:'Aptitude',cs:'Coding'};var b=document.getElementById('pq-type-badge');b.className='q-type-badge '+(badges[q.type]||'badge-tech');b.textContent=labels[q.type]||'Technical';document.getElementById('pq-text').textContent=q.q;document.getElementById('pq-hint').textContent=q.hint?'💡 '+q.hint:'';var codeEl=document.getElementById('pq-code');if(q.code){codeEl.textContent=q.code;codeEl.style.display='';}else codeEl.style.display='none';document.getElementById('phint-box').classList.remove('show');document.getElementById('pfeedback-card').classList.remove('show');var mcq=document.getElementById('pmcq-options');var aa=document.getElementById('panswer-area');if(q.options){mcq.style.display='flex';aa.style.display='none';mcq.innerHTML=q.options.map((o,i)=>`<div class="mcq-opt" onclick="selectPMCQ(this,${i})"><div class="opt-letter">${'ABCD'[i]}</div><div>${o}</div></div>`).join('');}else{mcq.style.display='none';aa.style.display='';aa.value='';}document.getElementById('pbtn-submit').style.display='';if(pSession.timer>0){document.getElementById('ptimer-row').style.display='flex';pSession.timeLeft=pSession.timer;updatePTimer();pSession.timerInterval=setInterval(()=>{pSession.timeLeft--;updatePTimer();if(pSession.timeLeft<=0){clearInterval(pSession.timerInterval);submitPAnswer();}},1000);}else document.getElementById('ptimer-row').style.display='none';}
function updatePTimer(){var el=document.getElementById('ptimer-display');var fill=document.getElementById('ptimer-fill');var pct=(pSession.timeLeft/pSession.timer)*100;el.textContent=pSession.timeLeft;fill.style.width=pct+'%';el.className='timer-display'+(pSession.timeLeft<=10?' danger':pSession.timeLeft<=20?' warn':'');fill.style.background=pSession.timeLeft<=10?'var(--rose)':pSession.timeLeft<=20?'var(--amber)':'var(--p)';}
function selectPMCQ(el,idx){document.querySelectorAll('.mcq-opt').forEach(o=>o.classList.remove('sel'));el.classList.add('sel');pSelectedMCQ=idx;}
function showPHint(){var q=pSession.questions[pSession.current];if(q&&q.hint){var hb=document.getElementById('phint-box');hb.textContent='💡 '+q.hint;hb.classList.add('show');pSession.hintUsed=true;}}
function submitPAnswer(){clearInterval(pSession.timerInterval);var q=pSession.questions[pSession.current];var answered=q.options?pSelectedMCQ>=0:document.getElementById('panswer-area').value.trim().length>0;if(!answered&&!q.options){document.getElementById('panswer-area').style.borderColor='var(--rose)';setTimeout(()=>document.getElementById('panswer-area').style.borderColor='',1000);return;}var score,fb,label,stars;if(q.options){var correct=pSelectedMCQ===q.answer;score=correct?(pSession.hintUsed?7:10):0;fb=correct?'✅ Correct!':'❌ Incorrect. Answer: '+q.options[q.answer];label=correct?'Correct':'Incorrect';stars=correct?'⭐⭐⭐⭐⭐':'—';document.querySelectorAll('.mcq-opt').forEach((o,i)=>{if(i===q.answer)o.classList.add('correct');else if(i===pSelectedMCQ&&!correct)o.classList.add('wrong');});pSelectedMCQ=-1;}else{var ans=document.getElementById('panswer-area').value.trim();var len=ans.split(' ').length;if(len<5){score=2;label='Too brief';stars='⭐';fb='Add more detail.';}else if(len<20){score=5;label='Good start';stars='⭐⭐⭐';fb='Decent! Add specifics and examples.';}else{score=pSession.hintUsed?7:9;label='Strong answer';stars='⭐⭐⭐⭐⭐';fb='Great response! Clear and well-structured.';}}pSession.scores.push({q:q.q,score,skipped:false});document.getElementById('pfb-score').textContent=score+'/10';document.getElementById('pfb-score').style.color=score>=7?'var(--g)':score>=4?'var(--amber)':'var(--rose)';document.getElementById('pfb-stars').textContent=stars;document.getElementById('pfb-label').textContent=label;document.getElementById('pfb-body').textContent=fb;document.getElementById('pfb-ideal').innerHTML='<strong>Model Answer:</strong> '+q.ideal;document.getElementById('pfeedback-card').classList.add('show');document.getElementById('pbtn-submit').style.display='none';}
function nextPQuestion(){pSession.current++;if(pSession.current>=pSession.questions.length)showPResults();else loadPQuestion();}
function skipPQuestion(){clearInterval(pSession.timerInterval);var q=pSession.questions[pSession.current];pSession.scores.push({q:q.q,score:0,skipped:true});pSession.current++;document.getElementById('pbtn-submit').style.display='';if(pSession.current>=pSession.questions.length)showPResults();else loadPQuestion();}
function showPResults(){clearInterval(pSession.timerInterval);var total=pSession.scores.reduce((a,s)=>a+s.score,0);var max=pSession.scores.length*10;var pct=Math.round((total/max)*100);var correct=pSession.scores.filter(s=>s.score>=7).length;var wrong=pSession.scores.filter(s=>s.score<7&&!s.skipped).length;var xp=total*(pSession.difficulty==='hard'?3:pSession.difficulty==='medium'?2:1);pSession.totalXP+=xp;pSession.totalSessions++;pSession.streak++;updateNavStats();saveProgress({mode:pSession.mode,pct,xp,correct,wrong});var grade,msg;if(pct>=90){grade='🏆 Excellent!';msg='Outstanding! You are ready to ace placement interviews!';}else if(pct>=75){grade='🎯 Great Job';msg='Solid performance. Polish weak areas and you\'ll be unstoppable.';}else if(pct>=55){grade='📈 Good Effort';msg='On the right track. Review model answers and keep going.';}else{grade='💪 Keep Grinding';msg='Review model answers carefully and practice again.';}document.getElementById('presult-pct').textContent=pct+'%';document.getElementById('presult-grade').textContent=grade;document.getElementById('presult-msg').textContent=msg;document.getElementById('prs-correct').textContent=correct;document.getElementById('prs-wrong').textContent=wrong;document.getElementById('prs-xp').textContent='+'+xp;setTimeout(()=>document.getElementById('presult-circle').setAttribute('stroke-dasharray',Math.round(pct*0.942)+' 100'),200);document.getElementById('pbreakdown-list').innerHTML=pSession.scores.map(s=>`<div class="breakdown-item"><div class="bk-icon">${s.skipped?'⏭️':s.score>=7?'✅':'❌'}</div><div class="bk-q">${s.q.substring(0,75)}${s.q.length>75?'...':''}</div><div class="bk-score" style="color:${s.skipped?'var(--txt3)':s.score>=7?'var(--g)':'var(--rose)'}">${s.skipped?'Skip':s.score+'/10'}</div></div>`).join('');showPPage('results');}
function retryPSession(){pSession.scores=[];pSession.current=0;var pool=QDB[pSession.mode]||QDB.technical;pSession.questions=pool.sort(()=>Math.random()-0.5).slice(0,pSession.qcount);showPPage('session');loadPQuestion();}
function startPMock(){var iv=mockInterviewers[Math.floor(Math.random()*mockInterviewers.length)];document.getElementById('pinterviewer-name').textContent=iv.name;document.getElementById('pinterviewer-role').textContent=iv.role;pMockState.qIndex=0;pMockState.mode=pSession.mode==='mock'?'technical':pSession.mode;pMockState.scores={comm:0,depth:0,conf:0,struct:0};pMockState.answered=0;var cw=document.getElementById('pmock-chat-window');cw.innerHTML='';['peval-comm','peval-depth','peval-conf','peval-struct'].forEach(id=>{document.getElementById(id).style.width='0%';document.getElementById(id+'-v').textContent='—';});showPPage('mock');setTimeout(()=>addPAIMsg(`Hi! I'm ${iv.name}. Thanks for joining. Let's dive in!\n\n${(mockQDB[pMockState.mode]||mockQDB.technical)[0]}`),600);}
function addPAIMsg(text){var cw=document.getElementById('pmock-chat-window');var d=document.createElement('div');d.className='chat-msg';d.innerHTML=`<div class="chat-avatar ai">🤖</div><div class="chat-bubble">${text.replace(/\n/g,'<br>')}</div>`;cw.appendChild(d);cw.scrollTop=cw.scrollHeight;}
function addPUserMsg(text){var cw=document.getElementById('pmock-chat-window');var d=document.createElement('div');d.className='chat-msg user';d.innerHTML=`<div class="chat-avatar usr">👤</div><div class="chat-bubble">${text}</div>`;cw.appendChild(d);cw.scrollTop=cw.scrollHeight;}
function addPTyping(){var cw=document.getElementById('pmock-chat-window');var d=document.createElement('div');d.className='chat-msg';d.id='ptyping';d.innerHTML=`<div class="chat-avatar ai">🤖</div><div class="chat-bubble"><div class="typing"><span></span><span></span><span></span></div></div>`;cw.appendChild(d);cw.scrollTop=cw.scrollHeight;}
function removePTyping(){var t=document.getElementById('ptyping');if(t)t.remove();}
function sendPMockMessage(){var inp=document.getElementById('pmock-input');var text=inp.value.trim();if(!text)return;inp.value='';addPUserMsg(text);pMockState.answered++;var words=text.split(' ').length;var comm=Math.min(100,40+words*2+(text.includes('.')?10:0));var depth=Math.min(100,30+words*3+(text.includes('example')||text.includes('because')?15:0));var conf=Math.min(100,50+(words>20?20:words)+(text.includes('I')?10:0));var struct=Math.min(100,35+(text.includes(',')?15:0)+(text.includes('first')||text.includes('then')||text.includes('finally')?20:0)+words);pMockState.scores.comm=Math.round((pMockState.scores.comm*(pMockState.answered-1)+comm)/pMockState.answered);pMockState.scores.depth=Math.round((pMockState.scores.depth*(pMockState.answered-1)+depth)/pMockState.answered);pMockState.scores.conf=Math.round((pMockState.scores.conf*(pMockState.answered-1)+conf)/pMockState.answered);pMockState.scores.struct=Math.round((pMockState.scores.struct*(pMockState.answered-1)+struct)/pMockState.answered);['comm','depth','conf','struct'].forEach(k=>{document.getElementById('peval-'+k).style.width=pMockState.scores[k]+'%';document.getElementById('peval-'+k+'-v').textContent=pMockState.scores[k];});addPTyping();pMockState.qIndex++;var qs=mockQDB[pMockState.mode]||mockQDB.technical;setTimeout(()=>{removePTyping();if(pMockState.qIndex<qs.length){var fb=["Good answer. ","Interesting. ","Thanks for sharing. ","Nice detail. "][Math.floor(Math.random()*4)];addPAIMsg(fb+qs[pMockState.qIndex]);}else{var avg=Math.round((pMockState.scores.comm+pMockState.scores.depth+pMockState.scores.conf+pMockState.scores.struct)/4);pSession.totalXP+=avg*2;pSession.totalSessions++;pSession.streak++;updateNavStats();addPAIMsg(`Interview complete! 🎉\n\nOverall Score: ${avg}/100\n\n${avg>60?'Strong communication and structured thinking!':'Keep practicing — use STAR method and quantify your impact.'}\n\nGood luck with your placement! 🚀`);}},1400);}
function updateNavStats(){document.getElementById('nav-streak').textContent=pSession.streak+'🔥';document.getElementById('nav-xp').textContent=pSession.totalXP;document.getElementById('nav-sessions').textContent=pSession.totalSessions;}


// ══ AUTH ══
var currentUser=null;var selectedAvatar='🧑‍💻';
function getUsers(){try{return JSON.parse(localStorage.getItem('rf_users')||'{}');}catch(e){return{};}}
function saveUsers(u){try{localStorage.setItem('rf_users',JSON.stringify(u));}catch(e){}}
function getUserData(e){try{return JSON.parse(localStorage.getItem('rf_ud_'+btoa(e))||'null');}catch(e2){return null;}}
function saveUserData(e,d){try{localStorage.setItem('rf_ud_'+btoa(e),JSON.stringify(d));}catch(e2){}}
function defData(n,av,role){return{name:n,avatar:av,role,xp:0,streak:0,sessions:0,bestScore:0,activity:[],catScores:{technical:0,hr:0,aptitude:0,coding:0,mock:0,group:0},catSessions:{technical:0,hr:0,aptitude:0,coding:0,mock:0,group:0},badges:[],heatmap:Array(84).fill(0),joinDate:new Date().toISOString()};}
function switchAuthTab(t){document.querySelectorAll('.auth-tab').forEach(x=>x.classList.remove('active'));document.getElementById('atab-'+t).classList.add('active');document.getElementById('signin-form').style.display=t==='signin'?'':'none';document.getElementById('signup-form').style.display=t==='signup'?'':'none';}
function togglePW(id,btn){var i=document.getElementById(id);i.type=i.type==='password'?'text':'password';btn.textContent=i.type==='password'?'👁':'🙈';}
function selectAvatar(el,av){document.querySelectorAll('.avatar-opt').forEach(a=>a.classList.remove('sel'));el.classList.add('sel');selectedAvatar=av;}
function checkPWStrength(pw){var s=document.getElementById('pw-strength'),l=document.getElementById('pw-strength-label');if(!pw){s.style.background='var(--border)';l.textContent='';return;}var sc=0;if(pw.length>=6)sc++;if(pw.length>=10)sc++;if(/[A-Z]/.test(pw))sc++;if(/[0-9]/.test(pw))sc++;if(/[^A-Za-z0-9]/.test(pw))sc++;var cols=['var(--rose)','var(--rose)','var(--amber)','var(--green)','var(--p)'];var labs=['Too short','Weak','Fair','Strong','Very strong'];s.style.background=cols[Math.min(sc,4)];l.textContent=labs[Math.min(sc,4)];l.style.color=cols[Math.min(sc,4)];}
function handleSignIn(){var em=document.getElementById('si-email').value.trim(),pw=document.getElementById('si-password').value,ok=true;if(!em||!/\S+@\S+\.\S+/.test(em)){document.getElementById('si-email').classList.add('error');document.getElementById('si-email-err').classList.add('show');ok=false;}else{document.getElementById('si-email').classList.remove('error');document.getElementById('si-email-err').classList.remove('show');}if(!pw){document.getElementById('si-password').classList.add('error');document.getElementById('si-pw-err').classList.add('show');ok=false;}else{document.getElementById('si-password').classList.remove('error');document.getElementById('si-pw-err').classList.remove('show');}if(!ok)return;var users=getUsers();if(!users[em]||users[em].pw!==btoa(pw)){document.getElementById('si-password').classList.add('error');document.getElementById('si-pw-err').textContent='Incorrect email or password';document.getElementById('si-pw-err').classList.add('show');return;}loginUser(em);}
function handleSignUp(){var nm=document.getElementById('su-name').value.trim(),em=document.getElementById('su-email').value.trim(),pw=document.getElementById('su-password').value,role=document.getElementById('su-role').value,ok=true;if(!nm){document.getElementById('su-name').classList.add('error');document.getElementById('su-name-err').classList.add('show');ok=false;}else{document.getElementById('su-name').classList.remove('error');document.getElementById('su-name-err').classList.remove('show');}if(!em||!/\S+@\S+\.\S+/.test(em)){document.getElementById('su-email').classList.add('error');document.getElementById('su-email-err').classList.add('show');ok=false;}else{document.getElementById('su-email').classList.remove('error');document.getElementById('su-email-err').classList.remove('show');}if(!pw||pw.length<6){document.getElementById('su-password').classList.add('error');document.getElementById('su-pw-err').classList.add('show');ok=false;}else{document.getElementById('su-password').classList.remove('error');document.getElementById('su-pw-err').classList.remove('show');}if(!ok)return;var users=getUsers();if(users[em]){document.getElementById('su-email').classList.add('error');document.getElementById('su-email-err').textContent='Email already registered';document.getElementById('su-email-err').classList.add('show');return;}users[em]={pw:btoa(pw),name:nm,avatar:selectedAvatar,role};saveUsers(users);saveUserData(em,defData(nm,selectedAvatar,role));loginUser(em);}
function demoLogin(){var em='demo@resumeforge.io';var users=getUsers();if(!users[em]){users[em]={pw:btoa('demo123'),name:'Demo User',avatar:'🎭',role:'student'};saveUsers(users);}var ex=getUserData(em);if(!ex){var d=defData('Demo User','🎭','student');d.xp=480;d.streak=3;d.sessions=4;d.catScores={technical:72,hr:85,aptitude:60,coding:78,mock:0,group:0};d.catSessions={technical:2,hr:1,aptitude:1,coding:0,mock:0,group:0};d.bestScore=85;d.heatmap=Array(84).fill(0).map((_,i)=>[10,15,25,40,60,75,80].includes(i)?Math.floor(Math.random()*4)+1:0);d.activity=[{type:'hr',label:'HR Round',score:85,xp:42,time:'2h ago'},{type:'tech',label:'Technical Round',score:72,xp:36,time:'Yesterday'},{type:'apt',label:'Aptitude Test',score:60,xp:30,time:'2 days ago'}];saveUserData(em,d);}loginUser(em);}
function loginUser(em){var users=getUsers();var info=users[em];var data=getUserData(em)||defData(info.name,info.avatar||'🧑‍💻','student');currentUser={email:em,name:info.name,avatar:info.avatar||'🧑‍💻',data};document.getElementById('auth-screen').classList.add('hidden');document.getElementById('nav-avatar').textContent=currentUser.avatar;document.getElementById('nav-username').textContent=currentUser.name.split(' ')[0];pSession.totalXP=data.xp;pSession.streak=data.streak;pSession.totalSessions=data.sessions;updateNavStats();renderSidebar();renderResume();renderDashboard();document.getElementById('dash-date').textContent=new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});}
function logout(){currentUser=null;document.getElementById('auth-screen').classList.remove('hidden');switchApp('builder');}
// ══ SAVE PROGRESS ══
function saveProgress(s){if(!currentUser)return;var d=currentUser.data;d.xp=(d.xp||0)+s.xp;d.sessions=(d.sessions||0)+1;d.streak=(d.streak||0)+1;if(s.pct>d.bestScore)d.bestScore=s.pct;var m=s.mode,ns=(d.catSessions[m]||0)+1;d.catSessions[m]=ns;d.catScores[m]=Math.round(((d.catScores[m]||0)*(ns-1)+s.pct)/ns);var tmap={technical:'tech',hr:'hr',aptitude:'apt',coding:'cs',mock:'mock',group:'hr'};var mlab={technical:'Technical Round',hr:'HR Round',aptitude:'Aptitude Test',coding:'Coding Challenge',mock:'Mock Interview',group:'Group Discussion'};d.activity=d.activity||[];d.activity.unshift({type:tmap[m]||'tech',label:mlab[m]||m,score:s.pct,xp:s.xp,time:'Just now'});if(d.activity.length>20)d.activity=d.activity.slice(0,20);d.heatmap=d.heatmap||Array(84).fill(0);d.heatmap[83]=Math.min((d.heatmap[83]||0)+1,4);currentUser.data=d;saveUserData(currentUser.email,d);updateNavStats();}
// ══ DASHBOARD RENDER ══
function renderDashboard(){if(!currentUser)return;var d=currentUser.data;document.getElementById('dash-name').textContent=currentUser.name.split(' ')[0];document.getElementById('ds-xp').textContent=d.xp.toLocaleString();document.getElementById('ds-streak').textContent=d.streak+'🔥';document.getElementById('ds-sessions').textContent=d.sessions;var scores=Object.values(d.catScores).filter(s=>s>0);var avg=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):null;document.getElementById('ds-avg').textContent=avg?avg+'%':'—';document.getElementById('ds-avg-delta').textContent=avg?(avg>=70?'↑ Above average':'↓ Keep practicing'):'No sessions yet';document.getElementById('ds-avg-delta').className='dash-stat-delta '+(avg&&avg>=70?'up':'down');var cats=[['technical','Technical','var(--violet)'],['hr','HR / Behavioral','var(--p)'],['aptitude','Aptitude','var(--amber)'],['coding','Coding','var(--g)'],['mock','Mock Interview','var(--rose)'],['group','Group Discussion','var(--teal)']];var hasCat=cats.some(c=>d.catSessions[c[0]]>0);document.getElementById('perf-by-cat').innerHTML=hasCat?cats.map(c=>`<div class="perf-bar-row"><div class="perf-bar-label">${c[1]}</div><div class="perf-bar-track"><div class="perf-bar-fill" style="width:${d.catScores[c[0]]||0}%;background:${c[2]}"></div></div><div class="perf-bar-val" style="color:${c[2]}">${d.catSessions[c[0]]>0?(d.catScores[c[0]]||0)+'%':'—'}</div></div>`).join(''):'<div style="text-align:center;padding:16px;color:var(--text3);font-size:11px">Complete sessions to see breakdown.</div>';var icons={tech:'💻',hr:'🤝',apt:'🧠',cs:'⌨️',mock:'🎙️'};document.getElementById('activity-feed').innerHTML=d.activity&&d.activity.length?d.activity.slice(0,5).map(a=>`<div class="activity-item"><div class="activity-icon ${a.type}">${icons[a.type]||'🎯'}</div><div class="activity-text"><strong>${a.label}</strong> completed</div><div style="text-align:right"><div class="activity-score" style="color:${a.score>=70?'var(--g)':'var(--amber)'}">${a.score}%</div><div class="activity-time">${a.time}</div></div></div>`).join(''):'<div style="text-align:center;padding:16px;color:var(--text3);font-size:11px">No activity yet. Start your first session!</div>';var sp=Math.min(d.sessions,5);document.getElementById('goal-sessions-fill').style.width=(sp/5*100)+'%';document.getElementById('goal-sessions-meta').textContent=sp+' / 5 sessions';var xp=Math.min(d.xp,500);document.getElementById('goal-xp-fill').style.width=(xp/500*100)+'%';document.getElementById('goal-xp-meta').textContent=d.xp+' / 500 XP';var bs=d.bestScore||0;document.getElementById('goal-score-fill').style.width=Math.min(bs,100)+'%';document.getElementById('goal-score-meta').textContent='Best score: '+(bs?bs+'%':'—');var streak=Math.min(d.streak,3);document.getElementById('goal-streak-fill').style.width=(streak/3*100)+'%';document.getElementById('goal-streak-meta').textContent=streak+' / 3 days';var earned=[];if(d.sessions>=1)earned.push(0);if(d.streak>=3)earned.push(1);if(d.bestScore>=100)earned.push(2);if(d.catSessions.aptitude>=1)earned.push(3);if(d.catSessions.mock>=1)earned.push(4);if(d.sessions>=10)earned.push(5);if(d.xp>=1000)earned.push(6);document.querySelectorAll('.badge-card').forEach((b,i)=>{b.className='badge-card '+(earned.includes(i)?'earned':'locked');if(earned.includes(i)&&!b.querySelector('.badge-earned-tag')){var et=document.createElement('div');et.className='badge-earned-tag';et.textContent='✓ Earned';b.appendChild(et);}});var hm=document.getElementById('heatmap');hm.innerHTML=d.heatmap.map(v=>`<div class="heatmap-cell ${v>0?'l'+Math.min(v,4):''}"></div>`).join('');}


// ════ BADGE STYLE ════
(function(){
  var s=document.createElement('style');
  s.textContent='.app-panel{display:none;flex:1;overflow:hidden}.app-panel.active{display:flex}.bdg{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:9px;text-align:center;transition:all .2s}.bdg.earned{border-color:var(--gold)}.bdg.locked{opacity:.4}.nav-tab.dashboard-tab.active{color:var(--gold)!important;border-bottom-color:var(--gold)!important}.nav-user-section{display:flex;align-items:center;gap:7px;padding-left:10px;border-left:1px solid var(--border)}.nav-av{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-size:13px}.nav-unm{font-size:12px;font-weight:500;color:var(--text)}.nav-logout{background:none;border:1px solid var(--border);border-radius:6px;color:var(--text3);padding:3px 7px;font-size:10px;cursor:pointer;font-family:"DM Sans",sans-serif;transition:all .2s}.nav-logout:hover{border-color:var(--rose);color:var(--rose)}';
  document.head.appendChild(s);
  // Inject user section into nav-right
  var nr=document.querySelector('.nav-right');
  if(nr){var ud=document.createElement('div');ud.className='nav-user-section';ud.innerHTML='<div class="nav-av" id="nav-avatar">🧑‍💻</div><div class="nav-unm" id="nav-username">User</div><button class="nav-logout" onclick="logout()">Log Out</button>';nr.appendChild(ud);}
})();

// ════ AUTH STATE ════
var CU=null; var selAv='🧑‍💻';
function gU(){try{return JSON.parse(localStorage.getItem('rf_u')||'{}')}catch(e){return{}}}
function sU(d){try{localStorage.setItem('rf_u',JSON.stringify(d))}catch(e){}}
function gUD(em){try{return JSON.parse(localStorage.getItem('rf_d_'+btoa(em))||'null')}catch(e){return null}}
function sUD(em,d){try{localStorage.setItem('rf_d_'+btoa(em),JSON.stringify(d))}catch(e){}}
function mkD(nm,av){return{name:nm,av:av,xp:0,streak:0,ses:0,best:0,act:[],catSc:{technical:0,hr:0,aptitude:0,coding:0,mock:0,group:0},catN:{technical:0,hr:0,aptitude:0,coding:0,mock:0,group:0},hm:Array(84).fill(0)}}
function mkD(nm,av){return{name:nm,av:av,xp:0,streak:0,ses:0,best:0,act:[],catSc:{technical:0,hr:0,aptitude:0,coding:0,mock:0,group:0},catN:{technical:0,hr:0,aptitude:0,coding:0,mock:0,group:0},hm:Array(84).fill(0)}}
function authTab(t){
  ['si','su'].forEach(x=>{
    var tab=document.getElementById('atab-'+x);
    var form=document.getElementById('af-'+x);
    if(tab)tab.style.cssText=x===t?'flex:1;padding:8px;border:none;background:var(--accent);color:#fff;font-family:"DM Sans",sans-serif;font-size:13px;font-weight:500;cursor:pointer;border-radius:7px':'flex:1;padding:8px;border:none;background:none;color:var(--text2);font-family:"DM Sans",sans-serif;font-size:13px;font-weight:500;cursor:pointer;border-radius:7px';
    if(form)form.style.display=x===t?'':'none';
  });
}
function tPW(id,btn){var i=document.getElementById(id);i.type=i.type==='password'?'text':'password';btn.textContent=i.type==='password'?'👁':'🙈';}
function pickAv(el,av){document.querySelectorAll('#av-row > div').forEach(a=>{a.style.borderColor='transparent';a.style.background='var(--surface2)'});el.style.borderColor='var(--accent)';el.style.background='rgba(124,106,247,.15)';selAv=av;}
function pwStrength(pw){var b=document.getElementById('pw-bar'),l=document.getElementById('pw-lbl');if(!pw){if(b)b.style.background='var(--border)';if(l)l.textContent='';return;}var sc=0;if(pw.length>=6)sc++;if(pw.length>=10)sc++;if(/[A-Z]/.test(pw))sc++;if(/[0-9]/.test(pw))sc++;if(/[^A-Za-z0-9]/.test(pw))sc++;var cols=['var(--rose)','var(--rose)','var(--amber)','var(--green)','var(--p)'],lbs=['Too short','Weak','Fair','Strong','Very strong'];if(b){b.style.background=cols[Math.min(sc,4)];}if(l){l.textContent=lbs[Math.min(sc,4)];l.style.color=cols[Math.min(sc,4)];}}
function showE(id,msg){var e=document.getElementById(id);if(e){if(msg)e.textContent=msg;e.style.display='block';}}
function hideE(id){var e=document.getElementById(id);if(e)e.style.display='none';}
function doSignIn(){
  var em=(document.getElementById('si-em')||{}).value,pw=(document.getElementById('si-pw')||{}).value;
  em=(em||'').trim();pw=pw||'';
  hideE('si-em-err');hideE('si-pw-err');
  if(!em||!/\S+@\S+\.\S+/.test(em)){showE('si-em-err');return;}
  if(!pw){showE('si-pw-err','Enter your password');return;}
  var users=gU();
  if(!users[em]||users[em].pw!==btoa(pw)){showE('si-pw-err','Incorrect email or password');return;}
  loginU(em);
}
function doSignUp(){
  var nm=(document.getElementById('su-nm')||{}).value,em=(document.getElementById('su-em')||{}).value,pw=(document.getElementById('su-pw')||{}).value;
  nm=(nm||'').trim();em=(em||'').trim();pw=pw||'';
  hideE('su-nm-err');hideE('su-em-err');hideE('su-pw-err');
  if(!nm){showE('su-nm-err');return;}
  if(!em||!/\S+@\S+\.\S+/.test(em)){showE('su-em-err');return;}
  if(!pw||pw.length<6){showE('su-pw-err');return;}
  var users=gU();
  if(users[em]){showE('su-em-err','Email already registered');return;}
  users[em]={pw:btoa(pw),nm:nm,av:selAv};sU(users);
  sUD(em,mkD(nm,selAv));
  loginU(em);
}
function doDemo(){
  var em='demo@rfpro.app';var users=gU();
  if(!users[em]){users[em]={pw:btoa('demo'),nm:'Demo User',av:'🎭'};sU(users);}
  if(!gUD(em)){var d=mkD('Demo User','🎭');d.xp=480;d.streak=3;d.ses=4;d.best=85;d.catSc={technical:72,hr:85,aptitude:60,coding:0,mock:0,group:0};d.catN={technical:2,hr:1,aptitude:1,coding:0,mock:0,group:0};d.hm=Array(84).fill(0).map((_,i)=>[10,15,25,40,60,75,80].includes(i)?Math.floor(Math.random()*4)+1:0);d.act=[{tp:'tech',lb:'Technical Round',sc:72,xp:36,tm:'Yesterday'},{tp:'hr',lb:'HR Round',sc:85,xp:42,tm:'2 days ago'},{tp:'apt',lb:'Aptitude Test',sc:60,xp:30,tm:'3 days ago'}];sUD(em,d);}
  loginU(em);
}
function loginU(em){
  var u=gU()[em],d=gUD(em)||mkD(u.nm,u.av||'🧑‍💻');
  CU={email:em,nm:u.nm,av:u.av||'🧑‍💻',d:d};
  var auth=document.getElementById('auth-screen');if(auth)auth.style.display='none';
  var av=document.getElementById('nav-avatar');if(av)av.textContent=CU.av;
  var un=document.getElementById('nav-username');if(un)un.textContent=CU.nm.split(' ')[0];
  pSession.totalXP=d.xp;pSession.streak=d.streak;pSession.totalSessions=d.ses;
  updateNavStats();renderSidebar();renderResume();renderDashboard();
  var dd=document.getElementById('dash-date');if(dd)dd.textContent=new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}
function logout(){CU=null;var auth=document.getElementById('auth-screen');if(auth)auth.style.display='flex';switchApp('builder');}

// ════ SAVE PROGRESS ════
function saveProgress(s){
  if(!CU)return;var d=CU.d;
  d.xp=(d.xp||0)+s.xp;d.ses=(d.ses||0)+1;d.streak=(d.streak||0)+1;
  if(s.pct>d.best)d.best=s.pct;
  var m=s.mode,ns=(d.catN[m]||0)+1;d.catN[m]=ns;
  d.catSc[m]=Math.round(((d.catSc[m]||0)*(ns-1)+s.pct)/ns);
  var tmap={technical:'tech',hr:'hr',aptitude:'apt',coding:'cs',mock:'mock',group:'hr'};
  var lmap={technical:'Technical Round',hr:'HR Round',aptitude:'Aptitude Test',coding:'Coding Challenge',mock:'Mock Interview',group:'Group Discussion'};
  d.act=d.act||[];d.act.unshift({tp:tmap[m]||'tech',lb:lmap[m]||m,sc:s.pct,xp:s.xp,tm:'Just now'});
  if(d.act.length>20)d.act=d.act.slice(0,20);
  d.hm=d.hm||Array(84).fill(0);d.hm[83]=Math.min((d.hm[83]||0)+1,4);
  CU.d=d;sUD(CU.email,d);updateNavStats();
}

// ════ DASHBOARD RENDER ════
function renderDashboard(){
  if(!CU)return;var d=CU.d;
  var dn=document.getElementById('dash-name');if(dn)dn.textContent=CU.nm.split(' ')[0];
  var dx=document.getElementById('ds-xp');if(dx)dx.textContent=d.xp.toLocaleString();
  var dstr=document.getElementById('ds-streak');if(dstr)dstr.textContent=d.streak+'🔥';
  var dses=document.getElementById('ds-sessions');if(dses)dses.textContent=d.ses;
  var scs=Object.values(d.catSc).filter(x=>x>0);
  var avg=scs.length?Math.round(scs.reduce((a,b)=>a+b,0)/scs.length):null;
  var davg=document.getElementById('ds-avg');if(davg)davg.textContent=avg?avg+'%':'—';
  // Category bars
  var cats=[['technical','Technical','var(--vi)'],['hr','HR / Behavioral','var(--p)'],['aptitude','Aptitude','var(--amber)'],['coding','Coding','var(--g)'],['mock','Mock Interview','var(--rose)'],['group','Group Discussion','var(--teal)']];
  var pbc=document.getElementById('perf-by-cat');
  if(pbc){var hasD=cats.some(c=>d.catN[c[0]]>0);pbc.innerHTML=hasD?cats.map(c=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px"><div style="font-size:10px;color:var(--text2);width:85px;flex-shrink:0">${c[1]}</div><div style="flex:1;height:6px;background:var(--surface3);border-radius:3px;overflow:hidden"><div style="height:100%;width:${d.catSc[c[0]]||0}%;background:${c[2]};border-radius:3px;transition:width .8s"></div></div><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${c[2]};width:30px;text-align:right">${d.catN[c[0]]>0?(d.catSc[c[0]]||0)+'%':'—'}</div></div>`).join(''):'<div style="text-align:center;padding:18px;color:var(--text3);font-size:11px">Complete sessions to see breakdown.</div>';}
  // Activity
  var icons={tech:'💻',hr:'🤝',apt:'🧠',cs:'⌨️',mock:'🎙️'};
  var af=document.getElementById('activity-feed');
  if(af)af.innerHTML=d.act&&d.act.length?d.act.slice(0,5).map(a=>`<div style="display:flex;align-items:center;gap:8px;padding:8px;background:var(--surface2);border-radius:8px;border:1px solid var(--border);margin-bottom:6px"><div style="width:28px;height:28px;border-radius:7px;background:rgba(110,231,247,.12);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">${icons[a.tp]||'🎯'}</div><div style="flex:1;font-size:10px;color:var(--text2)"><strong style="color:var(--text)">${a.lb}</strong> completed</div><div style="text-align:right"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;color:${a.sc>=70?'var(--green)':'var(--amber)'}">${a.sc}%</div><div style="font-size:8px;color:var(--text3)">${a.tm}</div></div></div>`).join(''):'<div style="text-align:center;padding:18px;color:var(--text3);font-size:11px">No activity yet. Start your first session!</div>';
  // Goals
  var sp=Math.min(d.ses,5);var gses=document.getElementById('g-ses');if(gses)gses.style.width=(sp/5*100)+'%';var gmses=document.getElementById('gm-ses');if(gmses)gmses.textContent=sp+' / 5 sessions';
  var xp=Math.min(d.xp,500);var gxp=document.getElementById('g-xp');if(gxp)gxp.style.width=(xp/500*100)+'%';var gmxp=document.getElementById('gm-xp');if(gmxp)gmxp.textContent=d.xp+' / 500 XP';
  var bs=d.best||0;var gsc=document.getElementById('g-score');if(gsc)gsc.style.width=Math.min(bs,100)+'%';var gmsc=document.getElementById('gm-score');if(gmsc)gmsc.textContent='Best: '+(bs?bs+'%':'—');
  var st=Math.min(d.streak,3);var gstr=document.getElementById('g-str');if(gstr)gstr.style.width=(st/3*100)+'%';var gmstr=document.getElementById('gm-str');if(gmstr)gmstr.textContent=st+' / 3 days';
  // Badges
  var earned=[];if(d.ses>=1)earned.push(0);if(d.streak>=3)earned.push(1);if(d.best>=100)earned.push(2);if(d.catN.aptitude>=1)earned.push(3);if(d.catN.mock>=1)earned.push(4);if(d.ses>=10)earned.push(5);if(d.xp>=1000)earned.push(6);
  document.querySelectorAll('.bdg').forEach((b,i)=>{b.className='bdg '+(earned.includes(i)?'earned':'locked');if(earned.includes(i)&&!b.querySelector('.et')){var e=document.createElement('div');e.className='et';e.style.cssText='font-size:7px;color:var(--gold);font-weight:700;margin-top:2px';e.textContent='✓ Earned';b.appendChild(e);}});
  // Heatmap
  var hm=document.getElementById('heatmap');
  if(hm)hm.innerHTML=d.hm.map(v=>`<div style="width:12px;height:12px;border-radius:2px;background:${v===0?'var(--surface3)':v===1?'rgba(124,106,247,.25)':v===2?'rgba(124,106,247,.5)':v===3?'rgba(124,106,247,.8)':'var(--accent)'};display:inline-block"></div>`).join('');
}

// Init
renderSidebar();
renderResume();

// ═══════════════════════════════════════════
//  SERVER CONNECTION & ATS AI
// ═══════════════════════════════════════════
let isServerOnline = false;
let serverUrl = window.location.hostname.includes('vercel.app') 
  ? window.location.origin 
  : 'http://localhost:5000';

async function checkServerStatus() {
  const badge = document.getElementById('server-status-badge');
  if (!badge) return;
  
  const tryFetch = async (url) => {
    try {
      const res = await fetch(url + '/api/health', { method: 'GET' });
      return res.ok;
    } catch (e) { return false; }
  };

  // Try localhost then 127.0.0.1
  let ok = await tryFetch('http://localhost:5000');
  if (ok) { serverUrl = 'http://localhost:5000'; }
  else {
    ok = await tryFetch('http://127.0.0.1:5000');
    if (ok) serverUrl = 'http://127.0.0.1:5000';
  }

  if (ok) {
    isServerOnline = true;
    badge.className = 'server-status-badge online';
    badge.querySelector('.status-text').textContent = 'Server: Connected (Real AI Active)';
  } else {
    isServerOnline = false;
    badge.className = 'server-status-badge offline';
    badge.querySelector('.status-text').textContent = 'Server: Offline (Click to fix)';
  }
}

// Initial status check
setInterval(checkServerStatus, 5000);
setTimeout(checkServerStatus, 1000);

function showServerSetup() {
  if (isServerOnline) {
    alert('✅ **Your AI Server is actually Online!** You can start scanning resumes with Real AI right now.');
    return;
  }
  
  const cmd = `cd server; npm install; node index.js`;
  const msg = `🚀 **To activate Real AI, please start your backend server:**\n\n` +
              `1. Open your terminal (Ctrl + \`) \n` +
              `2. Run this command: \n   ${cmd}\n\n` +
              `This scanner will automatically detect the server once it's on!`;
  
  alert(msg);
  console.log('Copy this command:', cmd);
}

// ═══════════════════════════════════════════
//  RESUME ATS LOGIC
// ═══════════════════════════════════════════
let atsFile = null;

function handleAtsFileUpload(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.type !== 'application/pdf') { alert('Please upload a PDF file.'); return; }
  atsFile = file;
  document.getElementById('ats-filename').textContent = file.name;
  document.getElementById('ats-dropzone').style.borderColor = 'var(--green)';
}

async function analyzeResumeATS() {
  if (!atsFile) { alert('Please upload a resume first.'); return; }

  const btn = document.getElementById('ats-analyze-btn');
  const loader = document.getElementById('ats-loader');
  const jd = document.getElementById('ats-jd-input').value.trim();
  const userApiKey = localStorage.getItem('rf_api_key');

  btn.disabled = true;
  loader.style.display = 'block';
  document.getElementById('ats-results').style.display = 'none';

  try {
    if (isServerOnline) {
      // 1. EXTRACT
      const formData = new FormData();
      formData.append('resume', atsFile);
      const exRes = await fetch(serverUrl + '/api/ats/extract', { method: 'POST', body: formData });
      if (!exRes.ok) throw new Error('Could not extract text.');
      const { text } = await exRes.json();

      // 2. ANALYZE
      const anRes = await fetch(serverUrl + '/api/ats/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, jobDescription: jd, apiKey: userApiKey })
      });
      
      const result = await anRes.json();
      if (!anRes.ok) throw new Error(result.error || 'AI Analysis failed.');
      
      displayAtsResults({
        ...result,
        overallFeedback: result.overallFeedback || "Analysis complete."
      });

    } else {
      // FALLBACK TO OFFLINE MODE
      await new Promise(r => setTimeout(r, 1200));
      displayAtsResults({
        score: 82,
        matchedKeywords: ["JavaScript", "React", "Frontend Development", "UI/UX", "Responsive Design"],
        missingKeywords: ["TypeScript", "Next.js", "Redux", "Jest"],
        strengths: ["Excellent use of action verbs", "Clear contact information", "Modern skills stack"],
        improvementTips: ["Add more quantifiable results (e.g., 'Improved performance by 30%')", "Include your GitHub profile link", "Add the missing keywords listed below to rank higher"],
        overallFeedback: "Your resume demonstrates strong fundamentals with a modern skill set. To further improve your score, include quantifiable achievements, relevant keywords, and a GitHub profile link to enhance ATS performance."
      });
    }
  } catch (err) {
    console.error('ATS Error:', err);
    alert('❌ Analysis Failed: ' + err.message);
  } finally {
    btn.disabled = false;
    loader.style.display = 'none';
  }
}

function displayAtsResults(data) {
  const results = document.getElementById('ats-results');
  results.style.display = 'block';
  results.scrollIntoView({ behavior: 'smooth' });

  // Update Score
  const scoreVal = document.getElementById('ats-score-val');
  const scoreCircle = document.getElementById('ats-score-circle');
  const feedbackText = document.getElementById('ats-feedback-text');
  
  scoreVal.textContent = data.score + '%';
  scoreCircle.style.strokeDasharray = `${data.score} 100`;
  
  // Update feedback color based on score
  if (data.score >= 80) scoreCircle.style.stroke = 'var(--green)';
  else if (data.score >= 60) scoreCircle.style.stroke = 'var(--amber)';
  else scoreCircle.style.stroke = 'var(--rose)';
  
  feedbackText.textContent = data.overallFeedback;

  // Update Lists
  renderAtsList('ats-strengths', data.strengths);
  renderAtsList('ats-tips', data.improvementTips);
  
  // Update Tags
  renderAtsTags('ats-matched-keywords', data.matchedKeywords);
  renderAtsTags('ats-missing-keywords', data.missingKeywords);
}

function renderAtsList(id, items) {
  const el = document.getElementById(id);
  el.innerHTML = items.map(item => `<li>${item}</li>`).join('');
}

function renderAtsTags(id, items) {
  const el = document.getElementById(id);
  el.innerHTML = items && items.length 
    ? items.map(item => `<span>${item}</span>`).join('')
    : '<div style="font-size:11px;color:var(--text3)">None identified</div>';
}

