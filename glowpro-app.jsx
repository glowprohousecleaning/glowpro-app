import { useState, useEffect } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  en: {
    boss:"Boss! 👑", goodMorning:"Good morning,", goodAfternoon:"Good afternoon,", goodEvening:"Good evening,",
    housesInSchedule:(n)=>`You have ${n} houses in your schedule`,
    newInspiration:"↻ New inspiration", weekly:"Weekly", monthlyNet:"Monthly Net",
    afterHelper:(p)=>`After ${p}% helper`, houses:"Houses", activeClients:"Active clients",
    helperCost:"Helper Cost", ofRevenue:(p)=>`${p}% of revenue`,
    taxTitle:"💰 Tax Reserve Reminder", taxText:(rev,amt)=>`Projected revenue $${rev} — set aside <strong>$${amt}</strong> for taxes.`,
    todayJobs:"Today's Jobs", home:"Home", schedule:"Schedule", finance:"Finance",
    messages:"Messages", payments:"Payments", team:"Team",
    tapJob:"Tap a job to see details", noJobs:(d)=>`No jobs scheduled for ${d}`,
    notes:"Notes", photos:"Photos", addInstruction:"Add instruction",
    notePlaceholder:"e.g. Key is under the mat...", noNotes:"No notes yet.",
    noPhotos:"No photos yet.", addPhotos:"📷 Add Photos",
    markDone:"✓ Mark as Done", markUpcoming:"↩ Mark as Upcoming",
    done:"✓ Done", upcoming:"⏳ Upcoming", openMaps:"🗺️ Open in Maps",
    start:"▶ START", finish:"■ FINISH", running:"Running...", elapsed:"Elapsed",
    avgTime:"Avg time", lastTime:"Last time", timerHistory:"Time History",
    financialTitle:"Financial", planRevenue:"Plan your revenue",
    weeklyGross:"Weekly Gross", monthlyProjection:"Monthly Projection",
    helperCostLabel:(p)=>`Helper Cost (${p}%)`, monthlyNetLabel:"Monthly Net",
    projectionTip:(net,more)=>`With your schedule you'll net <strong>$${net}</strong>. Add 2 more houses → <strong>$${more}</strong> 💪`,
    helperPct:"Helper Percentage", addClient:"+ Add Client", clientName:"Client name",
    valueLabel:"Value ($)", addHouse:"+ Add House", yourHouses:(n)=>`Your Houses (${n})`,
    magicMessenger:"Magic Messenger", autoTranslate:"Auto-translate for your clients",
    quickMessages:"⚡ Quick Messages", translateCopy:"↗ Translate & Copy",
    translatedTo:"✓ Translated to English", copiedHint:"✓ Copied — paste in iMessage or WhatsApp",
    recentLabel:"Recent", progress:"Progress", monthlyGoal:"Monthly Goal",
    notifTitle:"Notifications", paid:"Paid", pending:"Pending", overdue:"Overdue",
    paymentTitle:"Payments", markPaid:"Mark Paid",
    loginSubt:"Your business. Your rules. ✨", bossLogin:"👑 I am the Boss", helperLogin:"🧹 I am a Helper",
    password:"Password", enter:"Enter", back:"← Back", wrongPass:"Wrong password. Try again.",
    logout:"Log out", helperWelcome:"Good morning!", helperSubt:(n)=>`You have ${n} houses today`,
    helperNoJobs:"No houses today! Rest well 🌟",
    readOnly:"🔒 View only — contact your Boss for changes",
    assignedTo:"Assigned team", noTeam:"No helpers assigned",
    teamTitle:"My Team", addHelper:"+ Add Helper", helperName:"Helper name",
    helperPass:"Password", addHelperBtn:"Add Helper", removeHelper:"Remove",
    assignHelpers:"Assign to this house", saveAssign:"Save",
    helperTag:"👥 Team assigned",
  },
  pt: {
    boss:"Boss! 👑", goodMorning:"Bom dia,", goodAfternoon:"Boa tarde,", goodEvening:"Boa noite,",
    housesInSchedule:(n)=>`Você tem ${n} casas no schedule`,
    newInspiration:"↻ Nova inspiração", weekly:"Semanal", monthlyNet:"Líquido Mensal",
    afterHelper:(p)=>`Após ${p}% helper`, houses:"Casas", activeClients:"Clientes ativos",
    helperCost:"Custo Helper", ofRevenue:(p)=>`${p}% do faturamento`,
    taxTitle:"💰 Lembrete de Imposto", taxText:(rev,amt)=>`Receita $${rev} — separe <strong>$${amt}</strong> para impostos.`,
    todayJobs:"Casas de Hoje", home:"Início", schedule:"Agenda", finance:"Finanças",
    messages:"Mensagens", payments:"Pagamentos", team:"Equipe",
    tapJob:"Toque para ver detalhes", noJobs:(d)=>`Nenhuma casa para ${d}`,
    notes:"Notas", photos:"Fotos", addInstruction:"Adicionar instrução",
    notePlaceholder:"Ex: Chave embaixo do tapete...", noNotes:"Sem notas ainda.",
    noPhotos:"Sem fotos ainda.", addPhotos:"📷 Adicionar Fotos",
    markDone:"✓ Marcar como Concluído", markUpcoming:"↩ Marcar como Pendente",
    done:"✓ Concluído", upcoming:"⏳ Pendente", openMaps:"🗺️ Abrir no Maps",
    start:"▶ INICIAR", finish:"■ FINALIZAR", running:"Em andamento...", elapsed:"Tempo",
    avgTime:"Tempo médio", lastTime:"Último", timerHistory:"Histórico",
    financialTitle:"Finanças", planRevenue:"Planeje sua receita",
    weeklyGross:"Bruto Semanal", monthlyProjection:"Projeção Mensal",
    helperCostLabel:(p)=>`Custo Helper (${p}%)`, monthlyNetLabel:"Líquido Mensal",
    projectionTip:(net,more)=>`Você vai terminar o mês com <strong>$${net}</strong>. Mais 2 casas → <strong>$${more}</strong> 💪`,
    helperPct:"% do Helper", addClient:"+ Adicionar Cliente", clientName:"Nome do cliente",
    valueLabel:"Valor ($)", addHouse:"+ Adicionar Casa", yourHouses:(n)=>`Suas Casas (${n})`,
    magicMessenger:"Magic Messenger", autoTranslate:"Tradução automática",
    quickMessages:"⚡ Mensagens Rápidas", translateCopy:"↗ Traduzir e Copiar",
    translatedTo:"✓ Traduzido para Inglês", copiedHint:"✓ Copiado — cole no WhatsApp",
    recentLabel:"Recentes", progress:"Progresso", monthlyGoal:"Meta Mensal",
    notifTitle:"Notificações", paid:"Pago", pending:"Pendente", overdue:"Atrasado",
    paymentTitle:"Pagamentos", markPaid:"Marcar como Pago",
    loginSubt:"Seu negócio. Suas regras. ✨", bossLogin:"👑 Sou a Boss", helperLogin:"🧹 Sou Helper",
    password:"Senha", enter:"Entrar", back:"← Voltar", wrongPass:"Senha errada. Tente novamente.",
    logout:"Sair", helperWelcome:"Bom dia!", helperSubt:(n)=>`Você tem ${n} casas hoje`,
    helperNoJobs:"Sem casas hoje! Descanse bem 🌟",
    readOnly:"🔒 Somente leitura — fale com sua Boss para alterações",
    assignedTo:"Equipe da casa", noTeam:"Sem helpers atribuídas",
    teamTitle:"Minha Equipe", addHelper:"+ Adicionar Helper", helperName:"Nome da helper",
    helperPass:"Senha", addHelperBtn:"Adicionar", removeHelper:"Remover",
    assignHelpers:"Atribuir a esta casa", saveAssign:"Salvar",
    helperTag:"👥 Equipe atribuída",
  },
  es: {
    boss:"¡Boss! 👑", goodMorning:"Buenos días,", goodAfternoon:"Buenas tardes,", goodEvening:"Buenas noches,",
    housesInSchedule:(n)=>`Tienes ${n} casas en tu agenda`,
    newInspiration:"↻ Nueva inspiración", weekly:"Semanal", monthlyNet:"Neto Mensual",
    afterHelper:(p)=>`Después del ${p}% helper`, houses:"Casas", activeClients:"Clientes activos",
    helperCost:"Costo Helper", ofRevenue:(p)=>`${p}% del ingreso`,
    taxTitle:"💰 Recordatorio de Impuestos", taxText:(rev,amt)=>`Ingresos $${rev} — separa <strong>$${amt}</strong> para impuestos.`,
    todayJobs:"Casas de Hoy", home:"Inicio", schedule:"Agenda", finance:"Finanzas",
    messages:"Mensajes", payments:"Pagos", team:"Equipo",
    tapJob:"Toca para ver detalles", noJobs:(d)=>`Sin casas para ${d}`,
    notes:"Notas", photos:"Fotos", addInstruction:"Agregar instrucción",
    notePlaceholder:"Ej: Llave debajo del tapete...", noNotes:"Sin notas aún.",
    noPhotos:"Sin fotos aún.", addPhotos:"📷 Agregar Fotos",
    markDone:"✓ Marcar como Listo", markUpcoming:"↩ Marcar como Pendiente",
    done:"✓ Listo", upcoming:"⏳ Pendiente", openMaps:"🗺️ Abrir en Maps",
    start:"▶ INICIAR", finish:"■ FINALIZAR", running:"En progreso...", elapsed:"Tiempo",
    avgTime:"Tiempo promedio", lastTime:"Último", timerHistory:"Historial",
    financialTitle:"Finanzas", planRevenue:"Planifica tus ingresos",
    weeklyGross:"Bruto Semanal", monthlyProjection:"Proyección Mensual",
    helperCostLabel:(p)=>`Costo Helper (${p}%)`, monthlyNetLabel:"Neto Mensual",
    projectionTip:(net,more)=>`Terminarás el mes con <strong>$${net}</strong>. 2 casas más → <strong>$${more}</strong> 💪`,
    helperPct:"% del Helper", addClient:"+ Agregar Cliente", clientName:"Nombre del cliente",
    valueLabel:"Valor ($)", addHouse:"+ Agregar Casa", yourHouses:(n)=>`Tus Casas (${n})`,
    magicMessenger:"Magic Messenger", autoTranslate:"Traducción automática",
    quickMessages:"⚡ Mensajes Rápidos", translateCopy:"↗ Traducir y Copiar",
    translatedTo:"✓ Traducido al Inglés", copiedHint:"✓ Copiado — pega en WhatsApp",
    recentLabel:"Recientes", progress:"Progreso", monthlyGoal:"Meta Mensual",
    notifTitle:"Notificaciones", paid:"Pagado", pending:"Pendiente", overdue:"Vencido",
    paymentTitle:"Pagos", markPaid:"Marcar como Pagado",
    loginSubt:"Tu negocio. Tus reglas. ✨", bossLogin:"👑 Soy la Boss", helperLogin:"🧹 Soy Helper",
    password:"Contraseña", enter:"Entrar", back:"← Volver", wrongPass:"Contraseña incorrecta.",
    logout:"Salir", helperWelcome:"¡Buenos días!", helperSubt:(n)=>`Tienes ${n} casas hoy`,
    helperNoJobs:"¡Sin casas hoy! Descansa bien 🌟",
    readOnly:"🔒 Solo lectura — contacta a tu Boss para cambios",
    assignedTo:"Equipo de la casa", noTeam:"Sin helpers asignadas",
    teamTitle:"Mi Equipo", addHelper:"+ Agregar Helper", helperName:"Nombre de la helper",
    helperPass:"Contraseña", addHelperBtn:"Agregar", removeHelper:"Eliminar",
    assignHelpers:"Asignar a esta casa", saveAssign:"Guardar",
    helperTag:"👥 Equipo asignado",
  },
};

const QUOTES = {
  en:["You didn't come this far to only come this far.","Your schedule is your empire. Protect it.","Every house you clean is a brick in your legacy.","You are not just a cleaner. You are a CEO.","From nothing to everything — one house at a time."],
  pt:["Você não chegou até aqui para parar agora.","Sua agenda é seu império. Proteja.","Cada casa limpa é um tijolo no seu legado.","Você não é só uma cleaner. Você é uma CEO.","Do zero ao topo — uma casa de cada vez."],
  es:["No llegaste hasta aquí para detenerte.","Tu agenda es tu imperio. Protégelo.","Cada casa es un ladrillo en tu legado.","No eres solo limpiadora. Eres una CEO.","De cero al todo — una casa a la vez."],
};
const DAYS_EN = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const DAYS = { en:DAYS_EN, pt:["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"], es:["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"] };
const MONTHS = { en:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], pt:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"], es:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"] };
const NOTE_ICONS = ["🚪","🗝️","🛏️","🐕","🍽️","🧴","🔐","⚠️","🌿","🚿","📦","🪟"];

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const ROLES = ["helper","driver","manager"];
const PAY_RATES = {
  driver:  {4:170, 3:140, 2:110, 1:80, 0:0},
  helper:  {4:125, 3:100, 2:80,  1:60, 0:0},
  manager: {4:150, 3:125, 2:95,  1:70, 0:0},
};

const initialHelpers = [
  { id:1, name:"Marisa",  password:"marisa123",  role:"driver",  active:true },
  { id:2, name:"Camila",  password:"camila123",  role:"helper",  active:true },
  { id:3, name:"Júlia",   password:"julia123",   role:"helper",  active:true },
  { id:4, name:"Isabela", password:"isabela123", role:"manager", active:true },
];

const initialTeams = [
  { id:1, name:"Team A 🌟", helperIds:[1,2], color:"#7c3aed" },
  { id:2, name:"Team B ✨", helperIds:[3,4], color:"#06b6d4" },
];

const initialSchedule = [
  { id:1, clientName:"Johnson Family", address:"123 Oak St, Tampa FL", time:"08:30", day:"Monday", value:160, status:"done",
    teamId:1, helperIds:[1,2], instructions:[{id:101,text:"Door will be unlocked",icon:"🚪"},{id:102,text:"Key under the front mat",icon:"🗝️"},{id:103,text:"Change master bedroom sheets",icon:"🛏️"},{id:104,text:"Dog in backyard — do NOT open gate",icon:"🐕"}],
    photos:[], timer:{running:false,startTime:null,elapsed:0,history:[{duration:6240,date:"Mon 03/03"}]} },
  { id:2, clientName:"Smith Residence", address:"456 Maple Ave, Tampa FL", time:"11:00", day:"Monday", value:180, status:"done",
    teamId:2, helperIds:[3,4], instructions:[{id:201,text:"Focus extra on kitchen",icon:"🍽️"},{id:202,text:"Use fragrance-free products only",icon:"🧴"}],
    photos:[], timer:{running:false,startTime:null,elapsed:0,history:[{duration:5400,date:"Mon 03/03"}]} },
  { id:3, clientName:"Garcia Home", address:"789 Pine Rd, Brandon FL", time:"09:00", day:"Wednesday", value:220, status:"upcoming",
    teamId:1, helperIds:[1,2], instructions:[{id:301,text:"Alarm code: 1234",icon:"🔐"},{id:302,text:"Change all bed linens",icon:"🛏️"}],
    photos:[], timer:{running:false,startTime:null,elapsed:0,history:[]} },
  { id:4, clientName:"Williams House", address:"321 Elm St, Brandon FL", time:"12:30", day:"Wednesday", value:160, status:"upcoming",
    teamId:null, helperIds:[], instructions:[], photos:[], timer:{running:false,startTime:null,elapsed:0,history:[]} },
];

const initialHouses  = [{id:1,name:"Johnson Family",value:200,day:"Monday"},{id:2,name:"Smith Residence",value:180,day:"Monday"},{id:3,name:"Garcia Home",value:220,day:"Wednesday"},{id:4,name:"Williams House",value:160,day:"Wednesday"},{id:5,name:"Brown Family",value:200,day:"Friday"},{id:6,name:"Davis Residence",value:190,day:"Friday"},{id:7,name:"Miller Home",value:175,day:"Saturday"},{id:8,name:"Wilson House",value:230,day:"Saturday"}];
const initialPayments = [{id:1,client:"Johnson Family",value:200,status:"paid",date:"03/03"},{id:2,client:"Smith Residence",value:180,status:"paid",date:"03/03"},{id:3,client:"Garcia Home",value:220,status:"pending",date:"03/05"},{id:4,client:"Williams House",value:160,status:"pending",date:"03/05"},{id:5,client:"Brown Family",value:200,status:"overdue",date:"02/28"}];
const initialNotifs  = [{id:1,msg:"Johnson Family at 08:30",read:false},{id:2,msg:"Brown Family payment overdue",read:false},{id:3,msg:"Set aside tax reserve this week",read:true}];

function fmt(s){const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sc=s%60;return h>0?`${h}h ${m}m`:`${m}m ${String(sc).padStart(2,"0")}s`;}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const BASE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  :root{--bg:#f5f3ff;--surf:#ffffff;--surf2:#ede9fe;--bdr:#ddd6fe;--gold:#7c3aed;--gold2:#6d28d9;--rose:#f97316;--txt:#1e1040;--muted:#7c6b9e;--green:#22c55e;--blue:#06b6d4;--lime:#84cc16;--purple:#7c3aed;--dpurple:#4c1d95;}
  body{background:var(--bg);}
  .wrap{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);min-height:100vh;max-width:430px;margin:0 auto;color:var(--txt);padding-bottom:84px;}
  .lang-bar{display:flex;justify-content:space-between;align-items:center;padding:12px 20px 0;}
  .lang-pills{display:flex;gap:6px;}
  .lpill{padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;cursor:pointer;border:1px solid var(--bdr);background:var(--surf);color:var(--muted);letter-spacing:.5px;}
  .lpill.active{background:var(--purple);color:#fff;border-color:var(--purple);}
  .lpill.blue.active{background:var(--blue);color:#fff;border-color:var(--blue);}
  .logout-btn{background:none;border:1px solid var(--bdr);color:var(--muted);font-size:11px;padding:4px 12px;border-radius:20px;cursor:pointer;}
  .logo{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;color:var(--lime);letter-spacing:2px;font-weight:900;}
  .logo span{color:var(--blue);}
  .header{padding:8px 20px 0;}
  .pg-header{padding:16px 20px 12px;}
  .pg-title{font-family:'Playfair Display',serif;font-size:24px;font-weight:900;}
  .pg-sub{font-size:12px;color:var(--muted);margin-top:3px;}
  .sect{font-size:11px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;padding:0 20px 10px;}
  .card{background:var(--surf);border:1px solid var(--bdr);border-radius:16px;}
  .mx{margin:0 20px;}
  .mb12{margin-bottom:12px;}
  .mb14{margin-bottom:14px;}
  .inp{width:100%;background:var(--surf2);border:1px solid var(--bdr);border-radius:10px;padding:10px 14px;color:var(--txt);font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;margin-bottom:8px;outline:none;}
  .inp:focus{border-color:var(--gold);}
  .btn-gold{width:100%;padding:12px;background:var(--purple);color:#fff;border:none;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:1px;}
  .btn-rose{width:100%;padding:12px;background:var(--rose);color:#fff;border:none;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;}
  .row2{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
  select.inp{appearance:none;}

  /* JOB CARDS */
  .job-card{margin:0 20px 12px;background:var(--surf);border:1px solid var(--bdr);border-radius:16px;overflow:hidden;}
  .job-head{padding:14px;display:flex;justify-content:space-between;align-items:flex-start;cursor:pointer;}
  .time-badge{background:var(--surf2);border-radius:8px;padding:4px 10px;font-size:12px;color:var(--purple);font-weight:600;display:inline-block;}
  .job-name{font-size:15px;font-weight:600;margin-top:6px;}
  .job-addr{font-size:12px;color:var(--muted);margin-top:3px;}
  .map-link{font-size:12px;color:var(--blue);margin-top:5px;display:inline-flex;align-items:center;gap:4px;text-decoration:none;border:1px solid #bae6fd;background:#e0f2fe;padding:3px 10px;border-radius:20px;}
  .job-val{font-family:'Playfair Display',serif;font-size:20px;color:var(--purple);}
  .done-badge{background:#dcfce7;border:1px solid #86efac;color:#16a34a;font-size:11px;padding:3px 10px;border-radius:20px;display:inline-block;}
  .pend-badge{background:#e0f2fe;border:1px solid #7dd3fc;color:#0284c7;font-size:11px;padding:3px 10px;border-radius:20px;display:inline-block;}
  .job-exp{border-top:1px solid var(--bdr);}
  .job-tabs{display:flex;border-bottom:1px solid var(--bdr);}
  .jtab{flex:1;padding:10px 0;font-size:11px;font-weight:600;text-align:center;cursor:pointer;color:var(--muted);border:none;background:var(--surf);letter-spacing:.5px;}
  .jtab.active{color:var(--purple);border-bottom:2px solid var(--purple);}

  /* TEAM CHIPS */
  .team-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;}
  .helper-chip{display:inline-flex;align-items:center;gap:4px;background:#f3e8ff;border:1px solid #d8b4fe;color:#7c3aed;font-size:11px;padding:3px 10px;border-radius:20px;}

  /* TIMER */
  .timer-sec{padding:14px 16px;}
  .timer-box{background:var(--surf2);border:1px solid var(--bdr);border-radius:14px;padding:16px;text-align:center;margin-bottom:12px;}
  .timer-lbl{font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;}
  .timer-val{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:var(--purple);letter-spacing:2px;}
  .timer-val.live{color:#16a34a;}
  .timer-live{font-size:11px;color:#16a34a;margin-top:4px;letter-spacing:1px;}
  .tbtn{width:100%;padding:14px;border-radius:14px;border:none;font-size:14px;font-weight:800;cursor:pointer;letter-spacing:2px;margin-bottom:8px;}
  .tbtn.start{background:linear-gradient(135deg,var(--green),#2d8a52);color:#000;}
  .tbtn.finish{background:linear-gradient(135deg,var(--rose),#b03050);color:#fff;}
  .timer-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;}
  .tstat{background:var(--surf2);border:1px solid var(--bdr);border-radius:10px;padding:10px;text-align:center;}
  .tstat-lbl{font-size:10px;color:var(--muted);letter-spacing:1px;text-transform:uppercase;}
  .tstat-val{font-size:14px;font-weight:600;color:var(--purple);margin-top:3px;}
  .thist{display:flex;justify-content:space-between;background:var(--surf2);border-radius:8px;padding:8px 12px;margin-bottom:6px;}

  /* NOTES */
  .notes-sec{padding:14px 16px;}
  .note-item{display:flex;align-items:flex-start;gap:10px;background:var(--surf2);border-radius:10px;padding:10px 12px;margin-bottom:8px;border:1px solid var(--bdr);}
  .note-icon{font-size:16px;flex-shrink:0;margin-top:1px;}
  .note-text{font-size:13px;color:var(--txt);flex:1;line-height:1.4;}
  .note-del{background:none;border:none;color:#444;cursor:pointer;font-size:14px;}
  .note-del:hover{color:var(--rose);}
  .empty-note{text-align:center;color:var(--muted);font-size:13px;padding:14px 0;}
  .add-note{background:var(--surf2);border:1px solid var(--bdr);border-radius:12px;padding:12px;margin-top:4px;}
  .icon-pick{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;}
  .ico{font-size:18px;cursor:pointer;padding:4px;border-radius:8px;border:2px solid transparent;}
  .ico.sel{border-color:var(--purple);background:#f3e8ff;}
  .note-row{display:flex;gap:8px;}
  .note-inp{flex:1;background:var(--surf);border:1px solid var(--bdr);border-radius:10px;padding:9px 12px;color:var(--txt);font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;outline:none;}
  .note-inp:focus{border-color:var(--gold);}
  .note-add{background:var(--purple);border:none;border-radius:10px;color:#fff;font-size:18px;font-weight:700;padding:0 14px;cursor:pointer;}

  /* PHOTOS */
  .photos-sec{padding:14px 16px;}
  .photos-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;}
  .photo-item{position:relative;border-radius:10px;overflow:hidden;aspect-ratio:1;background:var(--surf2);}
  .photo-item img{width:100%;height:100%;object-fit:cover;}
  .photo-del{position:absolute;top:4px;right:4px;background:rgba(0,0,0,.7);border:none;border-radius:50%;color:#fff;width:22px;height:22px;font-size:11px;cursor:pointer;}
  .upload-lbl{display:block;width:100%;padding:12px;background:var(--surf2);border:2px dashed var(--bdr);border-radius:12px;color:var(--muted);font-size:13px;cursor:pointer;text-align:center;}
  .upload-lbl:hover{border-color:var(--gold);color:var(--gold);}

  /* ASSIGN MODAL */
  .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:200;display:flex;align-items:flex-end;justify-content:center;}
  .modal{background:var(--surf);border-radius:20px 20px 0 0;width:100%;max-width:430px;padding:24px 20px 36px;}
  .modal-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:900;margin-bottom:16px;}
  .helper-pick{display:flex;align-items:center;justify-content:space-between;background:var(--surf2);border:1px solid var(--bdr);border-radius:12px;padding:12px 14px;margin-bottom:8px;cursor:pointer;}
  .helper-pick.sel{border-color:var(--purple);background:#f3e8ff;}
  .helper-pick-name{font-size:14px;font-weight:500;}
  .check-dot{width:20px;height:20px;border-radius:50%;border:2px solid var(--bdr);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .check-dot.on{background:var(--purple);border-color:var(--purple);}

  /* ASSIGN SECTION INSIDE JOB */
  .assign-sec{padding:14px 16px;}
  .assign-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
  .assign-title{font-size:11px;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;}
  .assign-edit-btn{background:none;border:1px solid var(--bdr);color:var(--muted);font-size:11px;padding:3px 12px;border-radius:20px;cursor:pointer;}
  .assign-edit-btn:hover{border-color:var(--purple);color:var(--purple);}

  /* STATUS BTN */
  .status-sec{padding:0 16px 14px;}
  .status-btn{width:100%;padding:12px;border-radius:12px;border:none;font-size:13px;font-weight:700;letter-spacing:1px;cursor:pointer;}
  .status-btn.done-st{background:#16a34a;color:#fff;}
  .status-btn.undo-st{background:var(--surf2);color:var(--muted);border:1px solid var(--bdr);}

  /* BOTTOM NAV */
  .bnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:#fff;border-top:1px solid var(--bdr);display:flex;padding:8px 0 18px;z-index:100;box-shadow:0 -4px 20px rgba(124,58,237,.08);}
  .nitem{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:5px 0;}
  .nitem .ni{font-size:19px;}
  .nitem .nl{font-size:10px;color:var(--muted);}
  .nitem.active .nl{color:var(--purple);}

  /* DASHBOARD */
  .greet-sec{padding:20px 20px 14px;}
  .greet-sub{font-size:12px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;}
  .greet-main{font-family:'Playfair Display',serif;font-size:26px;font-weight:900;line-height:1.2;}
  .boss-gold{color:var(--purple);}
  .houses-ct{font-size:13px;color:var(--muted);margin-top:6px;}
  .quote-card{margin:0 20px 18px;background:linear-gradient(135deg,#ede9fe,#ddd6fe);border:1px solid #c4b5fd;border-radius:16px;padding:16px 20px;position:relative;overflow:hidden;}
  .quote-card::before{content:'"';font-family:'Playfair Display',serif;font-size:80px;color:var(--purple);opacity:.15;position:absolute;top:-10px;left:10px;line-height:1;}
  .quote-txt{font-size:13px;line-height:1.6;color:#5b21b6;position:relative;z-index:1;font-style:italic;}
  .quote-btn{background:none;border:none;color:var(--purple);font-size:11px;cursor:pointer;margin-top:8px;display:block;letter-spacing:1px;opacity:.8;}
  .stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 20px 14px;}
  .stat-card{background:var(--surf);border:1px solid var(--bdr);border-radius:16px;padding:14px;}
  .stat-card.hi{background:linear-gradient(135deg,#ede9fe,#ddd6fe);border-color:#c4b5fd;}
  .stat-lbl{font-size:10px;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:5px;}
  .stat-val{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--purple);}
  .stat-val.grn{color:#16a34a;}
  .stat-sub{font-size:11px;color:var(--muted);margin-top:3px;}
  .tax-alert{margin:0 20px 14px;background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:12px 14px;display:flex;align-items:flex-start;gap:10px;}
  .tax-title{font-size:12px;font-weight:600;color:#ea580c;}
  .tax-txt{font-size:12px;color:#9a3412;margin-top:3px;line-height:1.5;}
  .today-job{margin:0 20px 8px;background:var(--surf);border:1px solid var(--bdr);border-radius:14px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;}
  .goal-bg{background:var(--surf2);border-radius:99px;height:6px;overflow:hidden;margin:4px 0;}
  .goal-fill{background:linear-gradient(90deg,var(--purple),var(--blue));height:100%;border-radius:99px;transition:width .3s;}

  /* CALENDAR */
  .cal-hdr{display:flex;align-items:center;justify-content:space-between;padding:0 20px 10px;}
  .cal-nav{background:var(--surf);border:1px solid var(--bdr);color:var(--purple);font-size:18px;padding:4px 14px;border-radius:10px;cursor:pointer;font-weight:700;}
  .cal-month{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:var(--purple);}
  .cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;padding:0 20px 14px;}
  .cal-lbl{text-align:center;font-size:10px;color:var(--muted);padding:4px 0;letter-spacing:.5px;}
  .cal-day{aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:8px;font-size:12px;position:relative;}
  .cal-day.today{background:var(--purple);color:#fff;font-weight:700;}
  .cal-day.empty{background:none;}
  .cal-dot{width:4px;height:4px;border-radius:50%;background:var(--rose);position:absolute;bottom:3px;}
  .cal-dot.multi{background:var(--green);}

  /* DAY SCROLL */
  .day-scroll{display:flex;gap:8px;padding:0 20px 14px;overflow-x:auto;scrollbar-width:none;}
  .day-scroll::-webkit-scrollbar{display:none;}
  .day-chip{flex-shrink:0;padding:7px 14px;border-radius:20px;font-size:12px;cursor:pointer;border:1px solid var(--bdr);background:var(--surf);color:var(--muted);}
  .day-chip.active{background:var(--purple);color:#fff;font-weight:700;border-color:var(--purple);}

  /* CALC */
  .calc-sum{margin:0 20px 14px;background:linear-gradient(135deg,#ede9fe,#ddd6fe);border:1px solid #c4b5fd;border-radius:16px;padding:18px;}
  .calc-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
  .calc-row.last{border-top:1px solid #c4b5fd;padding-top:12px;margin-top:4px;margin-bottom:0;}
  .calc-lbl{font-size:12px;color:var(--muted);}
  .calc-val{font-family:'Playfair Display',serif;font-size:19px;color:var(--purple);font-weight:700;}
  .calc-val.net{color:var(--green);}
  .proj-box{margin:0 20px 14px;background:#f0fdf4;border:1px solid #86efac;border-radius:14px;padding:12px 14px;font-size:13px;color:#16a34a;line-height:1.6;}
  .hlp-sec{margin:0 20px 14px;}
  .hlp-title{font-size:12px;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;display:flex;justify-content:space-between;}
  .hlp-title span{color:var(--gold);font-weight:700;}
  .pct-grid{display:flex;gap:8px;}
  .pct-btn{flex:1;padding:10px 0;border-radius:10px;border:1px solid var(--bdr);background:var(--surf);color:var(--muted);font-size:13px;cursor:pointer;}
  .pct-btn.active{background:var(--purple);color:#fff;border-color:var(--purple);font-weight:700;}
  .house-item{display:flex;justify-content:space-between;align-items:center;background:var(--surf);border:1px solid var(--bdr);border-radius:12px;padding:12px 14px;margin-bottom:8px;}



  /* PAYMENTS */
  .pay-item{display:flex;justify-content:space-between;align-items:center;background:var(--surf);border:1px solid var(--bdr);border-radius:12px;padding:12px 14px;margin-bottom:8px;}
  .pay-badge.paid{background:#dcfce7;border:1px solid #86efac;color:#16a34a;font-size:11px;padding:3px 10px;border-radius:20px;}
  .pay-badge.pending{background:#e0f2fe;border:1px solid #7dd3fc;color:#0284c7;font-size:11px;padding:3px 10px;border-radius:20px;}
  .pay-badge.overdue{background:#fff7ed;border:1px solid #fed7aa;color:#ea580c;font-size:11px;padding:3px 10px;border-radius:20px;}
  .pay-btn{background:none;border:1px solid #86efac;color:#16a34a;font-size:11px;padding:3px 12px;border-radius:20px;cursor:pointer;}

  /* TEAM */
  .helper-row{display:flex;align-items:center;justify-content:space-between;background:var(--surf);border:1px solid var(--bdr);border-radius:12px;padding:12px 14px;margin-bottom:8px;}
  .rm-btn{background:none;border:1px solid #fed7aa;color:#ea580c;font-size:11px;padding:3px 12px;border-radius:20px;cursor:pointer;}

  /* HELPER VIEW */
  .helper-badge{display:inline-flex;align-items:center;gap:5px;background:#0a1a2a;border:1px solid #1a3a5a;color:var(--blue);font-size:11px;padding:3px 10px;border-radius:20px;margin-left:10px;font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:.5px;}
  .ro-bar{margin:0 20px 14px;background:#f0fdf4;border:1px solid #86efac;border-radius:10px;padding:9px 14px;font-size:11px;color:#16a34a;text-align:center;}
`;

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({lang,setLang,onLogin,helpers}){
  const t=T[lang];
  const [step,setStep]=useState("choose");
  const [pass,setPass]=useState("");
  const [helperName,setHelperName]=useState("");
  const [error,setError]=useState("");
  const BOSS="boss123";

  const tryBoss=()=>{
    if(pass===BOSS){onLogin("boss",null);}
    else setError(t.wrongPass);
  };
  const tryHelper=()=>{
    const h=helpers.find(h=>h.name.toLowerCase()===helperName.toLowerCase()&&h.password===pass);
    if(h){onLogin(h.role==="manager"?"manager":"helper",h.id);}
    else setError(t.wrongPass);
  };

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#3b0764 0%,#4c1d95 40%,#1e3a5f 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 24px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <style>{BASE_CSS}</style>
      <div style={{display:"flex",gap:8,marginBottom:32}}>
        {["en","pt","es"].map(l=><button key={l} onClick={()=>setLang(l)} style={{padding:"4px 14px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",border:"1px solid",background:lang===l?"#c9a84c":"#161616",color:lang===l?"#000":"#888",borderColor:lang===l?"#c9a84c":"#2a2a2a"}}>{l==="en"?"🇺🇸 EN":l==="pt"?"🇧🇷 PT":"🇪🇸 ES"}</button>)}
      </div>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:900,color:"#c9a84c",letterSpacing:4,marginBottom:4}}>Glow<span style={{color:"#06b6d4"}}>Pro</span></div>
      <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",letterSpacing:4,textTransform:"uppercase",marginBottom:6,marginTop:-2}}>HOUSE CLEANING</div><div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:40,letterSpacing:1}}>{t.loginSubt}</div>

      {step==="choose"&&(
        <div style={{width:"100%",maxWidth:340,display:"flex",flexDirection:"column",gap:14}}>
          <button onClick={()=>setStep("boss")} style={{padding:18,borderRadius:16,border:"2px solid #84cc16",background:"linear-gradient(135deg,rgba(132,204,22,0.15),rgba(132,204,22,0.25))",color:"#d9f99d",fontSize:16,fontWeight:700,cursor:"pointer",letterSpacing:1}}>👑 {t.bossLogin}</button>
          <button onClick={()=>setStep("helper")} style={{padding:18,borderRadius:16,border:"2px solid #06b6d4",background:"linear-gradient(135deg,rgba(6,182,212,0.15),rgba(6,182,212,0.25))",color:"#a5f3fc",fontSize:16,fontWeight:700,cursor:"pointer",letterSpacing:1}}>🧹 {t.helperLogin}</button>
        </div>
      )}

      {step==="boss"&&(
        <div style={{width:"100%",maxWidth:340}}>
          <div style={{fontSize:14,color:"rgba(255,255,255,0.7)",marginBottom:14,textAlign:"center"}}>👑 Boss — {t.password}</div>
          <input type="password" placeholder={t.password} value={pass} onChange={e=>{setPass(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&tryBoss()} style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:12,padding:"14px 16px",color:"#fff",fontSize:15,outline:"none",marginBottom:10,fontFamily:"'Plus Jakarta Sans',sans-serif",textAlign:"center",letterSpacing:4}}/>
          {error&&<div style={{color:"#e8637a",fontSize:12,textAlign:"center",marginBottom:10}}>{error}</div>}
          <button onClick={tryBoss} style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"linear-gradient(135deg,#84cc16,#65a30d)",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:10,letterSpacing:1}}>{t.enter}</button>
          <button onClick={()=>{setStep("choose");setPass("");setError("");}} style={{width:"100%",padding:10,borderRadius:12,border:"1px solid rgba(255,255,255,0.2)",background:"none",color:"rgba(255,255,255,0.6)",fontSize:13,cursor:"pointer"}}>{t.back}</button>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",textAlign:"center",marginTop:12}}>Demo: boss123</div>
        </div>
      )}

      {step==="helper"&&(
        <div style={{width:"100%",maxWidth:340}}>
          <div style={{fontSize:14,color:"rgba(255,255,255,0.7)",marginBottom:14,textAlign:"center"}}>🧹 Helper — {t.password}</div>
          <input placeholder={t.helperName} value={helperName} onChange={e=>{setHelperName(e.target.value);setError("");}} style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:12,padding:"12px 16px",color:"#fff",fontSize:14,outline:"none",marginBottom:8,fontFamily:"'Plus Jakarta Sans',sans-serif",textAlign:"center"}}/>
          <input type="password" placeholder={t.password} value={pass} onChange={e=>{setPass(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&tryHelper()} style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:12,padding:"12px 16px",color:"#fff",fontSize:14,outline:"none",marginBottom:10,fontFamily:"'Plus Jakarta Sans',sans-serif",textAlign:"center",letterSpacing:4}}/>
          {error&&<div style={{color:"#e8637a",fontSize:12,textAlign:"center",marginBottom:10}}>{error}</div>}
          <button onClick={tryHelper} style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"linear-gradient(135deg,#06b6d4,#0891b2)",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:10,letterSpacing:1}}>{t.enter}</button>
          <button onClick={()=>{setStep("choose");setPass("");setHelperName("");setError("");}} style={{width:"100%",padding:10,borderRadius:12,border:"1px solid rgba(255,255,255,0.2)",background:"none",color:"rgba(255,255,255,0.6)",fontSize:13,cursor:"pointer"}}>{t.back}</button>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",textAlign:"center",marginTop:12}}>Ex: Marisa / marisa123</div>
        </div>
      )}
    </div>
  );
}

// ─── HELPER VIEW ──────────────────────────────────────────────────────────────
function HelperView({lang,setLang,schedule,setSchedule,helperId,helpers,onLogout}){
  const t=T[lang];
  const helper=helpers.find(h=>h.id===helperId);
  const now=new Date();
  const todayKey=DAYS_EN[now.getDay()===0?6:now.getDay()-1];
  const myJobs=schedule.filter(j=>j.day===todayKey&&j.helperIds.includes(helperId));
  const [expanded,setExpanded]=useState(null);
  const [jTab,setJTab]=useState({});
  const [tick,setTick]=useState(0);

  useEffect(()=>{const iv=setInterval(()=>{if(schedule.some(j=>j.timer.running))setTick(x=>x+1);},1000);return()=>clearInterval(iv);},[schedule]);

  const getLive=(j)=>j.timer.running?Math.floor((Date.now()-j.timer.startTime)/1000):j.timer.elapsed;
  const startTimer=(id)=>setSchedule(p=>p.map(j=>j.id===id?{...j,timer:{...j.timer,running:true,startTime:Date.now()}}:j));
  const stopTimer=(id)=>setSchedule(p=>p.map(j=>{if(j.id!==id)return j;const el=Math.floor((Date.now()-j.timer.startTime)/1000);const date=now.toLocaleDateString("en-US",{weekday:"short",month:"2-digit",day:"2-digit"});return{...j,status:"done",timer:{running:false,startTime:null,elapsed:0,history:[{duration:el,date},...j.timer.history.slice(0,4)]}};}));
  const getJTab=(id)=>jTab[id]||"timer";

  return(
    <>
      <style>{BASE_CSS}</style>
      <div className="wrap">
        <div className="lang-bar">
          <div className="lang-pills">{["en","pt","es"].map(l=><button key={l} className={`lpill blue ${lang===l?"active":""}`} onClick={()=>setLang(l)}>{l==="en"?"🇺🇸 EN":l==="pt"?"🇧🇷 PT":"🇪🇸 ES"}</button>)}</div>
          <button className="logout-btn" onClick={onLogout}>{t.logout}</button>
        </div>
        <div className="header" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 20px 0"}}><div><div className="logo">Glow<span style={{color:"#06b6d4"}}>Pro</span></div><div style={{fontSize:10,color:"var(--muted)",letterSpacing:3,textTransform:"uppercase",marginTop:2}}>House Cleaning</div></div><span className="helper-badge">🧹 {helper?.name}</span></div>
        <div className="greet-sec">
          <div className="greet-main">{t.helperWelcome} {helper?.name}! 🌟</div>
          <div style={{fontSize:13,color:"var(--muted)",marginTop:5}}>{myJobs.length>0?t.helperSubt(myJobs.length):t.helperNoJobs}</div>
        </div>
        <div className="ro-bar">{t.readOnly}</div>

        {myJobs.length===0&&<div style={{textAlign:"center",padding:"60px 20px"}}><div style={{fontSize:48,marginBottom:16}}>🌟</div><div style={{fontSize:16,color:"var(--muted)"}}>{t.helperNoJobs}</div></div>}

        {myJobs.map(j=>{
          const isOpen=expanded===j.id;
          const jt=getJTab(j.id);
          const live=getLive(j);
          return(
            <div key={j.id} className="job-card">
              <div className="job-head" onClick={()=>setExpanded(isOpen?null:j.id)}>
                <div>
                  <div className="time-badge">{j.time}</div>
                  <div className="job-name">{j.clientName}</div>
                  <div className="job-addr">📍 {j.address}</div>
                  <a className="map-link" href={`https://maps.google.com/?q=${encodeURIComponent(j.address)}`} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}>{t.openMaps}</a>
                </div>
                <div style={{textAlign:"right"}}>
                  <span className={j.status==="done"?"done-badge":"pend-badge"}>{j.status==="done"?t.done:t.upcoming}</span>
                  {j.timer.running&&<div style={{fontSize:12,color:"var(--green)",marginTop:4}}>⏱ {fmt(live)}</div>}
                  <div style={{color:"var(--muted)",fontSize:16,marginTop:6}}>{isOpen?"▲":"▼"}</div>
                </div>
              </div>
              {isOpen&&(
                <div className="job-exp">
                  <div className="job-tabs">
                    <button className={`jtab ${jt==="timer"?"active":""}`} onClick={()=>setJTab(p=>({...p,[j.id]:"timer"}))}>⏱ Timer</button>
                    <button className={`jtab ${jt==="notes"?"active":""}`} onClick={()=>setJTab(p=>({...p,[j.id]:"notes"}))}>📋 {t.notes} ({j.instructions.length})</button>
                    <button className={`jtab ${jt==="photos"?"active":""}`} onClick={()=>setJTab(p=>({...p,[j.id]:"photos"}))}>📷 {t.photos} ({j.photos.length})</button>
                  </div>
                  {jt==="timer"&&(
                    <div className="timer-sec">
                      <div className="timer-box">
                        <div className="timer-lbl">{j.timer.running?t.running:t.elapsed}</div>
                        <div className={`timer-val ${j.timer.running?"live":""}`}>{fmt(live)}</div>
                        {j.timer.running&&<div className="timer-live">● LIVE</div>}
                      </div>
                      {!j.timer.running?<button className="tbtn start" onClick={()=>startTimer(j.id)}>{t.start}</button>:<button className="tbtn finish" onClick={()=>stopTimer(j.id)}>{t.finish}</button>}
                    </div>
                  )}
                  {jt==="notes"&&(
                    <div className="notes-sec">
                      {j.instructions.length===0&&<div className="empty-note">{t.noNotes}</div>}
                      {j.instructions.map(n=><div key={n.id} className="note-item"><div className="note-icon">{n.icon}</div><div className="note-text">{n.text}</div></div>)}
                    </div>
                  )}
                  {jt==="photos"&&(
                    <div className="photos-sec">
                      {j.photos.length===0&&<div style={{textAlign:"center",color:"var(--muted)",fontSize:13,padding:14}}>{t.noPhotos}</div>}
                      {j.photos.length>0&&<div className="photos-grid">{j.photos.map(p=><div key={p.id} className="photo-item"><img src={p.url} alt={p.name}/></div>)}</div>}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"#111",borderTop:"1px solid var(--bdr)",padding:"12px 20px 22px",textAlign:"center",zIndex:100}}>
          <div style={{fontSize:11,color:"var(--muted)",letterSpacing:1}}>🧹 HELPER · GlowPro</div>
        </div>
      </div>
    </>
  );
}


// ─── MANAGER VIEW ─────────────────────────────────────────────────────────────
function ManagerView({lang,setLang,schedule,setSchedule,helperId,helpers,teams,onLogout}){
  const t=T[lang];
  const manager=helpers.find(h=>h.id===helperId);
  const now=new Date();
  const [selectedDay,setSelectedDay]=useState(DAYS_EN[now.getDay()===0?6:now.getDay()-1]);
  const [mgrTab,setMgrTab]=useState("tracking"); // tracking | schedule
  const [expandedTeam,setExpandedTeam]=useState(null);
  const [expanded,setExpanded]=useState(null);
  const [assignModal,setAssignModal]=useState(null);
  const [assignSel,setAssignSel]=useState([]);
  const [tick,setTick]=useState(0);

  useEffect(()=>{const iv=setInterval(()=>{if(schedule.some(j=>j.timer.running))setTick(x=>x+1);},1000);return()=>clearInterval(iv);},[schedule]);

  const dayJobs=schedule.filter(j=>j.day===selectedDay);
  const openAssign=(jobId)=>{const job=schedule.find(j=>j.id===jobId);setAssignSel(job.helperIds||[]);setAssignModal(jobId);};
  const toggleAssign=(hid)=>setAssignSel(p=>p.includes(hid)?p.filter(x=>x!==hid):[...p,hid]);
  const saveAssign=()=>{setSchedule(p=>p.map(j=>j.id===assignModal?{...j,helperIds:assignSel}:j));setAssignModal(null);};
  const getLive=(j)=>j.timer.running?Math.floor((Date.now()-j.timer.startTime)/1000):j.timer.elapsed;

  const ROLE_COLORS={driver:"#7c3aed",helper:"#06b6d4",manager:"#f97316"};
  const ROLE_ICONS={driver:"🚗",helper:"🧹",manager:"👩‍💼"};

  // For each team, find their current active job
  const getTeamStatus=(team)=>{
    const teamDayJobs=dayJobs.filter(j=>j.teamId===team.id);
    const running=teamDayJobs.find(j=>j.timer.running);
    const done=teamDayJobs.filter(j=>j.status==="done");
    const pending=teamDayJobs.filter(j=>j.status!=="done"&&!j.timer.running);
    return{running,done,pending,total:teamDayJobs.length,jobs:teamDayJobs};
  };

  return(
    <>
      <style>{BASE_CSS}</style>
      <div className="wrap">
        <div className="lang-bar">
          <div className="lang-pills">{["en","pt","es"].map(l=><button key={l} className={`lpill ${lang===l?"active":""}`} onClick={()=>setLang(l)}>{l==="en"?"🇺🇸 EN":l==="pt"?"🇧🇷 PT":"🇪🇸 ES"}</button>)}</div>
          <button className="logout-btn" onClick={onLogout}>{t.logout}</button>
        </div>

        {/* HEADER */}
        <div className="header" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 20px 0"}}>
          <div><div className="logo">Glow<span style={{color:"#06b6d4"}}>Pro</span></div><div style={{fontSize:10,color:"var(--muted)",letterSpacing:3,textTransform:"uppercase",marginTop:2}}>House Cleaning</div></div>
          <span style={{background:"#fff7ed",border:"1px solid #fed7aa",color:"#ea580c",fontSize:11,padding:"3px 10px",borderRadius:20,fontWeight:600}}>👩‍💼 {manager?.name}</span>
        </div>

        <div className="greet-sec" style={{paddingBottom:10}}>
          <div className="greet-main" style={{fontSize:20}}>Manager Dashboard 👩‍💼</div>
          <div style={{fontSize:12,color:"var(--muted)",marginTop:4}}>{dayJobs.filter(j=>j.timer.running).length} active · {dayJobs.filter(j=>j.status==="done").length}/{dayJobs.length} done today</div>
        </div>

        {/* TABS */}
        <div style={{display:"flex",margin:"0 20px 14px",background:"var(--surf2)",borderRadius:12,padding:4,border:"1px solid var(--bdr)"}}>
          {[["tracking","📍 Live Tracking"],["schedule","📅 Schedule"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>setMgrTab(id)} style={{flex:1,padding:"9px 0",borderRadius:10,border:"none",background:mgrTab===id?"#ea580c":"none",color:mgrTab===id?"#fff":"var(--muted)",fontSize:12,fontWeight:700,cursor:"pointer"}}>{lbl}</button>
          ))}
        </div>

        {/* DAY SELECTOR */}
        <div className="day-scroll">{DAYS[lang].map((d,i)=><div key={d} className={`day-chip ${selectedDay===DAYS_EN[i]?"active":""}`} onClick={()=>setSelectedDay(DAYS_EN[i])}>{d}</div>)}</div>

        {/* ── LIVE TRACKING TAB ── */}
        {mgrTab==="tracking"&&(<>

          {/* LIVE STATUS BAR */}
          {dayJobs.some(j=>j.timer.running)&&(
            <div style={{margin:"0 20px 14px",background:"linear-gradient(135deg,#dcfce7,#bbf7d0)",border:"2px solid #86efac",borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:"#16a34a",animation:"pulse 1.5s infinite"}}/>
              <span style={{fontSize:13,fontWeight:700,color:"#166534"}}>
                {dayJobs.filter(j=>j.timer.running).length} team{dayJobs.filter(j=>j.timer.running).length>1?"s":""} working right now
              </span>
            </div>
          )}

          {/* TEAM TRACKING CARDS */}
          {teams.map(team=>{
            const st=getTeamStatus(team);
            if(st.total===0)return null;
            const isExpanded=expandedTeam===team.id;
            const teamMembers=helpers.filter(h=>team.helperIds.includes(h.id));

            // Status color and label
            let statusBg,statusColor,statusLabel,statusIcon;
            if(st.running){statusBg="#dcfce7";statusColor="#16a34a";statusIcon="🟢";statusLabel="Working now";}
            else if(st.done.length===st.total){statusBg="#ede9fe";statusColor="#7c3aed";statusIcon="✅";statusLabel="All done!";}
            else if(st.done.length>0){statusBg="#e0f2fe";statusColor="#0284c7";statusIcon="🔄";statusLabel=`${st.done.length}/${st.total} done`;}
            else{statusBg="#f5f3ff";statusColor="#7c6b9e";statusIcon="⏳";statusLabel="Not started";}

            return(
              <div key={team.id} style={{margin:"0 20px 12px",background:"var(--surf)",border:`2px solid ${isExpanded?team.color:"var(--bdr)"}`,borderRadius:16,overflow:"hidden",transition:"border .2s"}}>

                {/* TEAM HEADER — always visible */}
                <div onClick={()=>setExpandedTeam(isExpanded?null:team.id)} style={{padding:14,cursor:"pointer"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{flex:1}}>
                      {/* Team name + status pill */}
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                        <div style={{width:12,height:12,borderRadius:"50%",background:team.color,flexShrink:0}}/>
                        <span style={{fontSize:15,fontWeight:800,color:team.color}}>{team.name}</span>
                        <span style={{background:statusBg,color:statusColor,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20}}>{statusIcon} {statusLabel}</span>
                      </div>

                      {/* Members chips */}
                      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                        {teamMembers.map(h=>(
                          <span key={h.id} style={{background:ROLE_COLORS[h.role]+"22",border:`1px solid ${ROLE_COLORS[h.role]}`,color:ROLE_COLORS[h.role],fontSize:11,padding:"3px 9px",borderRadius:20,fontWeight:600}}>
                            {ROLE_ICONS[h.role]} {h.name}
                          </span>
                        ))}
                      </div>

                      {/* Current house if running */}
                      {st.running&&(
                        <div style={{background:"#dcfce7",border:"1px solid #86efac",borderRadius:10,padding:"8px 12px"}}>
                          <div style={{fontSize:10,color:"#16a34a",letterSpacing:1,textTransform:"uppercase",marginBottom:3}}>🟢 Currently at</div>
                          <div style={{fontSize:13,fontWeight:700,color:"#166534"}}>{st.running.clientName}</div>
                          <div style={{fontSize:11,color:"#15803d",marginTop:2}}>📍 {st.running.address}</div>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
                            <span style={{fontSize:13,fontWeight:800,color:"#16a34a"}}>⏱ {fmt(getLive(st.running))}</span>
                            <a href={`https://maps.google.com/?q=${encodeURIComponent(st.running.address)}`} target="_blank" rel="noopener noreferrer"
                              onClick={e=>e.stopPropagation()}
                              style={{background:"#16a34a",color:"#fff",fontSize:11,fontWeight:700,padding:"5px 12px",borderRadius:20,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:4}}>
                              🗺️ Open Maps
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Progress bar */}
                      <div style={{marginTop:8}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                          <span style={{fontSize:10,color:"var(--muted)"}}>Progress</span>
                          <span style={{fontSize:10,color:"var(--muted)"}}>{st.done.length}/{st.total} houses</span>
                        </div>
                        <div style={{background:"var(--bdr)",borderRadius:99,height:6,overflow:"hidden"}}>
                          <div style={{width:`${st.total>0?(st.done.length/st.total)*100:0}%`,background:team.color,height:"100%",borderRadius:99,transition:"width .4s"}}/>
                        </div>
                      </div>
                    </div>
                    <div style={{color:"var(--muted)",fontSize:18,paddingLeft:10,paddingTop:2}}>{isExpanded?"▲":"▼"}</div>
                  </div>
                </div>

                {/* EXPANDED — all houses for this team today */}
                {isExpanded&&(
                  <div style={{borderTop:"1px solid var(--bdr)",padding:"0 14px 14px"}}>
                    <div style={{fontSize:10,color:"var(--muted)",letterSpacing:1.5,textTransform:"uppercase",padding:"10px 0 8px"}}>All Houses Today</div>
                    {st.jobs.map((j,idx)=>{
                      const live=getLive(j);
                      return(
                        <div key={j.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:idx<st.jobs.length-1?"1px solid var(--bdr)":"none"}}>
                          {/* Status dot */}
                          <div style={{width:32,height:32,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,
                            background:j.timer.running?"#dcfce7":j.status==="done"?"#ede9fe":"var(--surf2)",
                            border:`2px solid ${j.timer.running?"#86efac":j.status==="done"?team.color:"var(--bdr)"}`}}>
                            {j.timer.running?"⏱":j.status==="done"?"✓":"⏳"}
                          </div>
                          <div style={{flex:1}}>
                            <div style={{fontSize:13,fontWeight:600,color:"var(--txt)"}}>{j.clientName}</div>
                            <div style={{fontSize:11,color:"var(--muted)",marginTop:1}}>🕐 {j.time} · {j.address.split(",")[0]}</div>
                            {j.timer.running&&<div style={{fontSize:12,fontWeight:700,color:"#16a34a",marginTop:2}}>🟢 {fmt(live)} elapsed</div>}
                            {j.status==="done"&&j.timer.history[0]&&<div style={{fontSize:11,color:"#7c3aed",marginTop:2}}>✅ Completed in {fmt(j.timer.history[0].duration)}</div>}
                          </div>
                          <a href={`https://maps.google.com/?q=${encodeURIComponent(j.address)}`} target="_blank" rel="noopener noreferrer"
                            style={{background:"#e0f2fe",border:"1px solid #7dd3fc",color:"#0284c7",fontSize:11,padding:"5px 10px",borderRadius:20,textDecoration:"none",flexShrink:0}}>
                            🗺️
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* No teams today */}
          {teams.every(team=>getTeamStatus(team).total===0)&&(
            <div style={{textAlign:"center",padding:"40px 20px"}}>
              <div style={{fontSize:40,marginBottom:12}}>📍</div>
              <div style={{fontSize:14,color:"var(--muted)"}}>No teams assigned for {selectedDay}</div>
            </div>
          )}
        </>)}

        {/* ── SCHEDULE TAB ── */}
        {mgrTab==="schedule"&&(<>
          {dayJobs.length===0&&<div style={{textAlign:"center",color:"var(--muted)",padding:"30px 20px",fontSize:14}}>No jobs for {selectedDay}</div>}
          {dayJobs.map(j=>{
            const isOpen=expanded===j.id;
            const assignedHelpers=helpers.filter(h=>j.helperIds?.includes(h.id));
            const team=teams.find(tm=>tm.id===j.teamId);
            return(
              <div key={j.id} className="job-card">
                <div className="job-head" onClick={()=>setExpanded(isOpen?null:j.id)}>
                  <div>
                    <div className="time-badge">{j.time}</div>
                    <div className="job-name">{j.clientName}</div>
                    <div className="job-addr">📍 {j.address}</div>
                    <a className="map-link" href={`https://maps.google.com/?q=${encodeURIComponent(j.address)}`} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}>{t.openMaps}</a>
                    {team&&<div style={{marginTop:6}}><span style={{background:team.color+"22",border:`1px solid ${team.color}`,color:team.color,fontSize:11,padding:"3px 10px",borderRadius:20,fontWeight:600}}>{team.name}</span></div>}
                    {assignedHelpers.length>0&&<div className="team-chips">{assignedHelpers.map(h=><span key={h.id} className="helper-chip">{ROLE_ICONS[h.role]} {h.name}</span>)}</div>}
                  </div>
                  <div style={{textAlign:"right"}}>
                    <span className={j.status==="done"?"done-badge":"pend-badge"}>{j.status==="done"?t.done:t.upcoming}</span>
                    <div style={{color:"var(--muted)",fontSize:16,marginTop:8}}>{isOpen?"▲":"▼"}</div>
                  </div>
                </div>
                {isOpen&&(
                  <div className="job-exp" style={{padding:14}}>
                    <button onClick={()=>openAssign(j.id)} style={{width:"100%",padding:10,background:"var(--purple)",color:"#fff",border:"none",borderRadius:12,fontSize:13,fontWeight:700,cursor:"pointer",marginBottom:8}}>✏️ Edit Team Assignment</button>
                    <button style={{width:"100%",padding:10,background:j.status==="done"?"var(--surf2)":"#16a34a",color:j.status==="done"?"var(--muted)":"#fff",border:"none",borderRadius:12,fontSize:13,fontWeight:700,cursor:"pointer"}}
                      onClick={()=>setSchedule(p=>p.map(jj=>jj.id===j.id?{...jj,status:jj.status==="done"?"upcoming":"done"}:jj))}>
                      {j.status==="done"?t.markUpcoming:t.markDone}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </>)}

        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"#fff7ed",borderTop:"1px solid #fed7aa",padding:"12px 20px 22px",textAlign:"center",zIndex:100}}>
          <div style={{fontSize:11,color:"#ea580c",letterSpacing:1}}>👩‍💼 MANAGER · GlowPro House Cleaning</div>
        </div>

        {/* ASSIGN MODAL */}
        {assignModal&&(
          <div className="modal-bg" onClick={()=>setAssignModal(null)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-title">👥 Assign Team</div>
              {helpers.filter(h=>h.role!=="manager").map(h=>(
                <div key={h.id} className={`helper-pick ${assignSel.includes(h.id)?"sel":""}`} onClick={()=>toggleAssign(h.id)}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:16}}>{ROLE_ICONS[h.role]}</span>
                    <div>
                      <div className="helper-pick-name">{h.name}</div>
                      <div style={{fontSize:10,color:"var(--muted)",textTransform:"uppercase",letterSpacing:.5}}>{h.role}</div>
                    </div>
                  </div>
                  <div className={`check-dot ${assignSel.includes(h.id)?"on":""}`}>{assignSel.includes(h.id)&&<span style={{color:"#fff",fontSize:11,fontWeight:700}}>✓</span>}</div>
                </div>
              ))}
              <button className="btn-gold" style={{marginTop:16}} onClick={saveAssign}>Save</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── BOSS VIEW ────────────────────────────────────────────────────────────────
export default function HouseFlowApp(){
  const [lang,setLang]=useState("en");
  const [role,setRole]=useState(null);
  const [helperId,setHelperId]=useState(null);
  const [helpers,setHelpers]=useState(initialHelpers);
  const [teams,setTeams]=useState(initialTeams);
  const [schedule,setSchedule]=useState(initialSchedule);
  const [houses,setHouses]=useState(initialHouses);
  const [payments,setPayments]=useState(initialPayments);
  const [notifs]=useState(initialNotifs);
  const [tab,setTab]=useState("dashboard");
  const [helperPct,setHelperPct]=useState(30);
  const [quoteIdx,setQuoteIdx]=useState(0);
  const [newHouse,setNewHouse]=useState({name:"",value:"",day:"Monday"});
  const [selectedDay,setSelectedDay]=useState("Monday");
  const [expanded,setExpanded]=useState(null);
  const [jTab,setJTab]=useState({});
  const [newNote,setNewNote]=useState({});
  const [selIcon,setSelIcon]=useState({});
  const [calMonth,setCalMonth]=useState(new Date().getMonth());
  const [calYear,setCalYear]=useState(new Date().getFullYear());
  const [tick,setTick]=useState(0);
  const [assignModal,setAssignModal]=useState(null);
  const [taxModal,setTaxModal]=useState(false);

  const [payrollEdits,setPayrollEdits]=useState({});
  const [newTeamName,setNewTeamName]=useState("");
  const [newTeamColor,setNewTeamColor]=useState("#7c3aed");
  const [teamTab,setTeamTab]=useState("members");
  const [payrollDay,setPayrollDay]=useState(DAYS_EN[new Date().getDay()===0?6:new Date().getDay()-1]);
  const [repPeriod,setRepPeriod]=useState("week");
  const [assignSel,setAssignSel]=useState([]);
  const [newHelperName,setNewHelperName]=useState("");
  const [newHelperPass,setNewHelperPass]=useState("");

  useEffect(()=>{const iv=setInterval(()=>{if(schedule.some(j=>j.timer.running))setTick(x=>x+1);},1000);return()=>clearInterval(iv);},[schedule]);

  const t=T[lang];
  const now=new Date();
  const hour=now.getHours();
  const greeting=hour<12?t.goodMorning:hour<18?t.goodAfternoon:t.goodEvening;
  const weeklyTotal=houses.reduce((s,h)=>s+Number(h.value),0);
  const monthlyProjection=weeklyTotal*4.33;
  const helperCost=monthlyProjection*(helperPct/100);
  const netMonthly=monthlyProjection-helperCost;
  const taxReserve=Math.round(monthlyProjection*0.04);
  const todayJobs=schedule.filter(j=>j.day===DAYS_EN[now.getDay()===0?6:now.getDay()-1]);
  const dayJobs=schedule.filter(j=>j.day===selectedDay);

  const getLive=(j)=>j.timer.running?Math.floor((Date.now()-j.timer.startTime)/1000):j.timer.elapsed;
  const getAvg=(j)=>j.timer.history.length?Math.round(j.timer.history.reduce((s,h)=>s+h.duration,0)/j.timer.history.length):null;
  const startTimer=(id)=>setSchedule(p=>p.map(j=>j.id===id?{...j,timer:{...j.timer,running:true,startTime:Date.now()}}:j));
  const stopTimer=(id)=>setSchedule(p=>p.map(j=>{if(j.id!==id)return j;const el=Math.floor((Date.now()-j.timer.startTime)/1000);const date=now.toLocaleDateString("en-US",{weekday:"short",month:"2-digit",day:"2-digit"});return{...j,status:"done",timer:{running:false,startTime:null,elapsed:0,history:[{duration:el,date},...j.timer.history.slice(0,4)]}};}));
  const addNote=(jobId)=>{const text=newNote[jobId];if(!text?.trim())return;const icon=selIcon[jobId]||"📝";setSchedule(p=>p.map(j=>j.id===jobId?{...j,instructions:[...j.instructions,{id:Date.now(),text,icon}]}:j));setNewNote(n=>({...n,[jobId]:""}));};
  const removeNote=(jobId,noteId)=>setSchedule(p=>p.map(j=>j.id===jobId?{...j,instructions:j.instructions.filter(i=>i.id!==noteId)}:j));
  const handlePhoto=(jobId,e)=>{Array.from(e.target.files).forEach(file=>{const r=new FileReader();r.onload=(ev)=>setSchedule(p=>p.map(j=>j.id===jobId?{...j,photos:[...j.photos,{id:Date.now(),url:ev.target.result,name:file.name}]}:j));r.readAsDataURL(file);});};
  const removePhoto=(jobId,photoId)=>setSchedule(p=>p.map(j=>j.id===jobId?{...j,photos:j.photos.filter(p=>p.id!==photoId)}:j));
  const addHouse=()=>{if(!newHouse.name||!newHouse.value)return;setHouses(p=>[...p,{id:Date.now(),...newHouse,value:Number(newHouse.value)}]);setNewHouse({name:"",value:"",day:"Monday"});};


  const getDaysInMonth=(m,y)=>new Date(y,m+1,0).getDate();
  const getFirstDay=(m,y)=>new Date(y,m,1).getDay();
  const getJobsForDay=(d)=>{const dn=DAYS_EN[new Date(calYear,calMonth,d).getDay()===0?6:new Date(calYear,calMonth,d).getDay()-1];return schedule.filter(j=>j.day===dn);};
  const getJTab=(id)=>jTab[id]||"timer";
  const addHelper=()=>{if(!newHelperName.trim()||!newHelperPass.trim())return;setHelpers(p=>[...p,{id:Date.now(),name:newHelperName.trim(),password:newHelperPass.trim()}]);setNewHelperName("");setNewHelperPass("");};
  const removeHelper=(id)=>setHelpers(p=>p.filter(h=>h.id!==id));
  const openAssign=(jobId)=>{const job=schedule.find(j=>j.id===jobId);setAssignSel(job.helperIds||[]);setAssignModal(jobId);};
  const toggleAssign=(hid)=>setAssignSel(p=>p.includes(hid)?p.filter(x=>x!==hid):[...p,hid]);
  const saveAssign=()=>{setSchedule(p=>p.map(j=>j.id===assignModal?{...j,helperIds:assignSel}:j));setAssignModal(null);};
  const addTeam=()=>{if(!newTeamName.trim())return;setTeams(p=>[...p,{id:Date.now(),name:newTeamName.trim(),helperIds:[],color:newTeamColor}]);setNewTeamName("");};
  const removeTeam=(id)=>setTeams(p=>p.filter(t=>t.id!==id));
  const toggleTeamMember=(teamId,hid)=>setTeams(p=>p.map(t=>t.id===teamId?{...t,helperIds:t.helperIds.includes(hid)?t.helperIds.filter(x=>x!==hid):[...t.helperIds,hid]}:t));
  const assignTeamToJob=(jobId,teamId)=>{const team=teams.find(t=>t.id===teamId);setSchedule(p=>p.map(j=>j.id===jobId?{...j,teamId,helperIds:team?team.helperIds:[]}:j));setAssignModal(null);};
  const getHelperDaySummary=(hid,day)=>{const jobs=schedule.filter(j=>j.day===day&&j.helperIds.includes(hid)&&j.status==="done");return jobs.length;};
  const getSuggestedPay=(hid,day)=>{const h=helpers.find(x=>x.id===hid);if(!h)return 0;const count=getHelperDaySummary(hid,day);return PAY_RATES[h.role]?.[count]||0;};
  const getFinalPay=(hid,day)=>payrollEdits[`${hid}_${day}`]!==undefined?payrollEdits[`${hid}_${day}`]:getSuggestedPay(hid,day);



  if(!role) return <LoginScreen lang={lang} setLang={setLang} onLogin={(r,hid)=>{setRole(r);setHelperId(hid);}} helpers={helpers}/>;
  if(role==="helper") return <HelperView lang={lang} setLang={setLang} schedule={schedule} setSchedule={setSchedule} helperId={helperId} helpers={helpers} onLogout={()=>{setRole(null);setHelperId(null);}}/>;
  if(role==="manager") return <ManagerView lang={lang} setLang={setLang} schedule={schedule} setSchedule={setSchedule} helperId={helperId} helpers={helpers} teams={teams} onLogout={()=>{setRole(null);setHelperId(null);}}/>;;

  const navTabs=[{id:"dashboard",icon:"🏠",label:t.home},{id:"schedule",icon:"📅",label:t.schedule},{id:"finance",icon:"💰",label:t.finance},{id:"reports",icon:"📊",label:"Reports"},{id:"payments",icon:"💳",label:t.payments},{id:"team",icon:"👥",label:t.team},{id:"payroll",icon:"💵",label:"Payroll"}];

  return(
    <>
      <style>{BASE_CSS}</style>
      <div className="wrap">
        {/* LANG + LOGOUT */}
        <div className="lang-bar">
          <div className="lang-pills">{["en","pt","es"].map(l=><button key={l} className={`lpill ${lang===l?"active":""}`} onClick={()=>setLang(l)}>{l==="en"?"🇺🇸 EN":l==="pt"?"🇧🇷 PT":"🇪🇸 ES"}</button>)}</div>
          <button className="logout-btn" onClick={()=>setRole(null)}>👑 {t.logout}</button>
        </div>

        {/* ── DASHBOARD ── */}
        {tab==="dashboard"&&(<>
          <div className="header"><div className="logo">Glow<span style={{color:"#06b6d4"}}>Pro</span></div><div style={{fontSize:10,color:"var(--muted)",letterSpacing:3,textTransform:"uppercase",paddingLeft:1,marginTop:2}}>House Cleaning</div></div>
          <div className="greet-sec">
            <div className="greet-sub">{greeting}</div>
            <div className="greet-main">Good morning, <span className="boss-gold">{t.boss}</span></div>
            <div className="houses-ct">{t.housesInSchedule(houses.length)}</div>
          </div>
          <div className="quote-card">
            <div className="quote-txt">{QUOTES[lang][quoteIdx]}</div>
            <button className="quote-btn" onClick={()=>setQuoteIdx(i=>(i+1)%QUOTES[lang].length)}>{t.newInspiration}</button>
          </div>
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-lbl">{t.weekly}</div><div className="stat-val">${weeklyTotal.toLocaleString()}</div><div className="stat-sub">Gross</div></div>
            <div className="stat-card hi"><div className="stat-lbl">{t.monthlyNet}</div><div className="stat-val grn">${Math.round(netMonthly).toLocaleString()}</div><div className="stat-sub">{t.afterHelper(helperPct)}</div></div>
            <div className="stat-card"><div className="stat-lbl">{t.houses}</div><div className="stat-val">{houses.length}</div><div className="stat-sub">{t.activeClients}</div></div>
            <div className="stat-card"><div className="stat-lbl">{t.helperCost}</div><div className="stat-val">${Math.round(helperCost).toLocaleString()}</div><div className="stat-sub">{t.ofRevenue(helperPct)}</div></div>
          </div>
          <div className="tax-alert" onClick={()=>setTaxModal(true)} style={{cursor:"pointer"}}><div style={{fontSize:18}}>⚠️</div><div style={{flex:1}}><div className="tax-title">{t.taxTitle}</div><div className="tax-txt" dangerouslySetInnerHTML={{__html:t.taxText(Math.round(monthlyProjection).toLocaleString(),taxReserve)}}/></div><div style={{fontSize:11,color:"#ea580c",fontWeight:700,flexShrink:0,alignSelf:"center"}}>Ver mais →</div></div>
          {todayJobs.length>0&&(<><div className="sect">{t.todayJobs}</div>{todayJobs.map(j=><div key={j.id} className="today-job"><div><div style={{fontSize:14,fontWeight:500}}>{j.clientName}</div><div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{j.time} · {j.address.split(",")[0]}</div>{j.helperIds?.length>0&&<div className="team-chips" style={{marginTop:4}}>{j.helperIds.map(hid=>{const h=helpers.find(x=>x.id===hid);return h?<span key={hid} className="helper-chip">🧹 {h.name}</span>:null;})}</div>}</div><div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:17,fontWeight:800,color:"var(--purple)"}}>${j.value}</div></div>)}</>)}
        </>)}

        {/* ── SCHEDULE ── */}
        {tab==="schedule"&&(<>
          <div className="pg-header"><div className="pg-title">{t.schedule}</div><div className="pg-sub">{t.tapJob}</div></div>

          {/* LIVE TRACKING STRIP — Boss sees this too */}
          {schedule.some(j=>j.timer.running)&&(
            <div style={{margin:"0 20px 14px",background:"linear-gradient(135deg,#dcfce7,#bbf7d0)",border:"2px solid #86efac",borderRadius:14,padding:"10px 14px"}}>
              <div style={{fontSize:11,color:"#16a34a",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>🟢 Live Now</div>
              {teams.map(team=>{
                const running=schedule.find(j=>j.teamId===team.id&&j.timer.running);
                if(!running)return null;
                const live=getLive(running);
                return(
                  <div key={team.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <div>
                      <span style={{fontSize:12,fontWeight:700,color:team.color}}>{team.name}</span>
                      <span style={{fontSize:11,color:"#166534"}}> → {running.clientName}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:12,fontWeight:700,color:"#16a34a"}}>⏱ {fmt(live)}</span>
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(running.address)}`} target="_blank" rel="noopener noreferrer"
                        style={{background:"#16a34a",color:"#fff",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20,textDecoration:"none"}}>Maps</a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="cal-hdr">
            <button className="cal-nav" onClick={()=>{if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1);}}>‹</button>
            <div className="cal-month">{MONTHS[lang][calMonth]} {calYear}</div>
            <button className="cal-nav" onClick={()=>{if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1);}}>›</button>
          </div>
          <div className="cal-grid">
            {["S","M","T","W","T","F","S"].map((d,i)=><div key={i} className="cal-lbl">{d}</div>)}
            {Array.from({length:getFirstDay(calMonth,calYear)}).map((_,i)=><div key={`e${i}`} className="cal-day empty"/>)}
            {Array.from({length:getDaysInMonth(calMonth,calYear)}).map((_,i)=>{const d=i+1;const jobs=getJobsForDay(d);const isToday=d===now.getDate()&&calMonth===now.getMonth()&&calYear===now.getFullYear();return(<div key={d} className={`cal-day ${isToday?"today":""}`}><div className="cal-day-num" style={{fontSize:12}}>{d}</div>{jobs.length>0&&<div className={`cal-dot ${jobs.length>1?"multi":""}`}/>}</div>);})}
          </div>
          <div className="day-scroll">{DAYS[lang].map((d,i)=><div key={d} className={`day-chip ${selectedDay===DAYS_EN[i]?"active":""}`} onClick={()=>setSelectedDay(DAYS_EN[i])}>{d}</div>)}</div>
          {dayJobs.length===0&&<div style={{textAlign:"center",color:"var(--muted)",padding:"30px 20px",fontSize:14}}>{t.noJobs(DAYS[lang][DAYS_EN.indexOf(selectedDay)])}</div>}
          {dayJobs.map(j=>{
            const isOpen=expanded===j.id;const jt=getJTab(j.id);const live=getLive(j);const avgT=getAvg(j);
            const assignedHelpers=helpers.filter(h=>j.helperIds?.includes(h.id));
            return(
              <div key={j.id} className="job-card">
                <div className="job-head" onClick={()=>setExpanded(isOpen?null:j.id)}>
                  <div>
                    <div className="time-badge">{j.time}</div>
                    <div className="job-name">{j.clientName}</div>
                    <div className="job-addr">📍 {j.address}</div>
                    <a className="map-link" href={`https://maps.google.com/?q=${encodeURIComponent(j.address)}`} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}>{t.openMaps}</a>
                    {assignedHelpers.length>0&&<div className="team-chips">{assignedHelpers.map(h=><span key={h.id} className="helper-chip">🧹 {h.name}</span>)}</div>}
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div className="job-val">${j.value}</div>
                    <div style={{marginTop:6}}><span className={j.status==="done"?"done-badge":"pend-badge"}>{j.status==="done"?t.done:t.upcoming}</span></div>
                    {j.timer.running&&<div style={{fontSize:12,color:"var(--green)",marginTop:4}}>⏱ {fmt(live)}</div>}
                    <div style={{color:"var(--muted)",fontSize:16,marginTop:6}}>{isOpen?"▲":"▼"}</div>
                  </div>
                </div>
                {isOpen&&(
                  <div className="job-exp">
                    <div className="job-tabs">
                      <button className={`jtab ${jt==="assign"?"active":""}`} onClick={()=>setJTab(p=>({...p,[j.id]:"assign"}))}>👥 Team</button>
                      <button className={`jtab ${jt==="timer"?"active":""}`} onClick={()=>setJTab(p=>({...p,[j.id]:"timer"}))}>⏱ Timer</button>
                      <button className={`jtab ${jt==="notes"?"active":""}`} onClick={()=>setJTab(p=>({...p,[j.id]:"notes"}))}>📋 {t.notes}</button>
                      <button className={`jtab ${jt==="photos"?"active":""}`} onClick={()=>setJTab(p=>({...p,[j.id]:"photos"}))}>📷</button>
                    </div>

                    {/* ASSIGN TAB */}
                    {jt==="assign"&&(
                      <div className="assign-sec">
                        <div className="assign-row"><div className="assign-title">{t.assignedTo}</div><button className="assign-edit-btn" onClick={()=>openAssign(j.id)}>✏️ Edit</button></div>
                        {assignedHelpers.length===0&&<div style={{fontSize:13,color:"var(--muted)",padding:"8px 0"}}>{t.noTeam}</div>}
                        <div className="team-chips" style={{marginBottom:12}}>{assignedHelpers.map(h=><span key={h.id} className="helper-chip">🧹 {h.name}</span>)}</div>
                        <div className="status-sec" style={{padding:0}}>
                          <button className={`status-btn ${j.status==="done"?"undo-st":"done-st"}`} onClick={()=>setSchedule(p=>p.map(jj=>jj.id===j.id?{...jj,status:jj.status==="done"?"upcoming":"done"}:jj))}>{j.status==="done"?t.markUpcoming:t.markDone}</button>
                        </div>
                      </div>
                    )}

                    {/* TIMER TAB */}
                    {jt==="timer"&&(
                      <div className="timer-sec">
                        <div className="timer-box"><div className="timer-lbl">{j.timer.running?t.running:t.elapsed}</div><div className={`timer-val ${j.timer.running?"live":""}`}>{fmt(live)}</div>{j.timer.running&&<div className="timer-live">● LIVE</div>}</div>
                        {!j.timer.running?<button className="tbtn start" onClick={()=>startTimer(j.id)}>{t.start}</button>:<button className="tbtn finish" onClick={()=>stopTimer(j.id)}>{t.finish}</button>}
                        {(avgT||j.timer.history.length>0)&&<div className="timer-stats">{avgT&&<div className="tstat"><div className="tstat-lbl">{t.avgTime}</div><div className="tstat-val">{fmt(avgT)}</div></div>}{j.timer.history[0]&&<div className="tstat"><div className="tstat-lbl">{t.lastTime}</div><div className="tstat-val">{fmt(j.timer.history[0].duration)}</div></div>}</div>}
                        {j.timer.history.map((h,i)=><div key={i} className="thist"><span style={{fontSize:12,color:"var(--muted)"}}>{h.date}</span><span style={{fontSize:13,color:"var(--gold)",fontWeight:600}}>{fmt(h.duration)}</span></div>)}
                      </div>
                    )}

                    {/* NOTES TAB */}
                    {jt==="notes"&&(
                      <div className="notes-sec">
                        {j.instructions.length===0&&<div className="empty-note">{t.noNotes}</div>}
                        {j.instructions.map(n=><div key={n.id} className="note-item"><div className="note-icon">{n.icon}</div><div className="note-text">{n.text}</div><button className="note-del" onClick={()=>removeNote(j.id,n.id)}>✕</button></div>)}
                        <div className="add-note">
                          <div style={{fontSize:11,color:"var(--muted)",letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>{t.addInstruction}</div>
                          <div className="icon-pick">{NOTE_ICONS.map(ic=><span key={ic} className={`ico ${(selIcon[j.id]||"📝")===ic?"sel":""}`} onClick={()=>setSelIcon(s=>({...s,[j.id]:ic}))}>{ic}</span>)}</div>
                          <div className="note-row"><input className="note-inp" placeholder={t.notePlaceholder} value={newNote[j.id]||""} onChange={e=>setNewNote(n=>({...n,[j.id]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addNote(j.id)}/><button className="note-add" onClick={()=>addNote(j.id)}>+</button></div>
                        </div>
                      </div>
                    )}

                    {/* PHOTOS TAB */}
                    {jt==="photos"&&(
                      <div className="photos-sec">
                        {j.photos.length===0&&<div style={{textAlign:"center",color:"var(--muted)",fontSize:13,padding:14}}>{t.noPhotos}</div>}
                        {j.photos.length>0&&<div className="photos-grid">{j.photos.map(p=><div key={p.id} className="photo-item"><img src={p.url} alt={p.name}/><button className="photo-del" onClick={()=>removePhoto(j.id,p.id)}>✕</button></div>)}</div>}
                        <label className="upload-lbl">{t.addPhotos}<input type="file" accept="image/*" multiple style={{display:"none"}} onChange={e=>handlePhoto(j.id,e)}/></label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </>)}

        {/* ── FINANCE ── */}
        {tab==="finance"&&(<>
          <div className="pg-header"><div className="pg-title">{t.financialTitle}</div><div className="pg-sub">{t.planRevenue}</div></div>
          <div className="calc-sum">
            <div className="calc-row"><div className="calc-lbl">{t.weeklyGross}</div><div className="calc-val">${weeklyTotal.toLocaleString()}</div></div>
            <div className="calc-row"><div className="calc-lbl">{t.monthlyProjection}</div><div className="calc-val">${Math.round(monthlyProjection).toLocaleString()}</div></div>
            <div className="calc-row"><div className="calc-lbl">{t.helperCostLabel(helperPct)}</div><div className="calc-val" style={{fontSize:16,color:"var(--rose)"}}>-${Math.round(helperCost).toLocaleString()}</div></div>
            <div className="calc-row last"><div className="calc-lbl">{t.monthlyNetLabel}</div><div className="calc-val net">${Math.round(netMonthly).toLocaleString()}</div></div>
          </div>
          <div className="proj-box" dangerouslySetInnerHTML={{__html:t.projectionTip(Math.round(netMonthly).toLocaleString(),Math.round(netMonthly+(weeklyTotal/(houses.length||1))*2*4.33*(1-helperPct/100)).toLocaleString())}}/>
          <div className="hlp-sec"><div className="hlp-title">{t.helperPct} <span>{helperPct}%</span></div><div className="pct-grid">{[20,25,30,35,40].map(p=><button key={p} className={`pct-btn ${helperPct===p?"active":""}`} onClick={()=>setHelperPct(p)}>{p}%</button>)}</div></div>
          <div className="add-house-form mx mb14 card" style={{padding:14}}>
            <div style={{fontSize:13,fontWeight:600,color:"var(--gold)",marginBottom:10}}>{t.addClient}</div>
            <input className="inp" placeholder={t.clientName} value={newHouse.name} onChange={e=>setNewHouse(h=>({...h,name:e.target.value}))}/>
            <div className="row2"><input className="inp" placeholder={t.valueLabel} type="number" value={newHouse.value} onChange={e=>setNewHouse(h=>({...h,value:e.target.value}))}/><select className="inp" value={newHouse.day} onChange={e=>setNewHouse(h=>({...h,day:e.target.value}))}>{DAYS_EN.map(d=><option key={d}>{d}</option>)}</select></div>
            <button className="btn-gold" onClick={addHouse}>{t.addHouse}</button>
          </div>
          <div className="sect">{t.yourHouses(houses.length)}</div>
          <div style={{padding:"0 20px"}}>{DAYS_EN.map(day=>{const dh=houses.filter(h=>h.day===day);if(!dh.length)return null;return(<div key={day}><div style={{fontSize:11,color:"var(--muted)",letterSpacing:2,textTransform:"uppercase",padding:"8px 0 6px",display:"flex",justifyContent:"space-between"}}><span>{day}</span><span style={{color:"var(--gold)"}}>Net ${Math.round(dh.reduce((s,h)=>s+h.value,0)*(1-helperPct/100))}</span></div>{dh.map(h=><div key={h.id} className="house-item"><div><div style={{fontSize:14,fontWeight:500}}>{h.name}</div><div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>{h.day}</div></div><div style={{textAlign:"right"}}><div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:17,fontWeight:800,color:"var(--purple)"}}>${h.value}</div><div style={{fontSize:11,color:"var(--muted)"}}>Net ${Math.round(h.value*(1-helperPct/100))}</div></div><button style={{background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:16,paddingLeft:10}} onClick={()=>setHouses(p=>p.filter(x=>x.id!==h.id))}>🗑</button></div>)}</div>);})}</div>
        </>)}

        {/* ── REPORTS ── */}
        {tab==="reports"&&(()=>{
          // Calculate stats from real data
          const doneJobs=schedule.filter(j=>j.status==="done");
          const totalRevenue=doneJobs.reduce((s,j)=>s+j.value,0);
          const totalHours=doneJobs.reduce((s,j)=>s+(j.timer.history[0]?.duration||0),0);
          const avgTimePerHouse=doneJobs.length?Math.round(totalHours/doneJobs.length):0;
          const weekRevenue=houses.reduce((s,h)=>s+Number(h.value),0);
          const monthRevenue=Math.round(weekRevenue*4.33);
          const monthNet=Math.round(monthRevenue*(1-helperPct/100));
          const totalPayroll=helpers.filter(h=>h.role!=="manager").reduce((s,h)=>{
            const pay=getSuggestedPay(h.id,DAYS_EN[now.getDay()===0?6:now.getDay()-1]);
            return s+pay;
          },0);
          // Helper performance
          const helperStats=helpers.filter(h=>h.role!=="manager").map(h=>{
            const myJobs=doneJobs.filter(j=>j.helperIds?.includes(h.id));
            const myHours=myJobs.reduce((s,j)=>s+(j.timer.history[0]?.duration||0),0);
            return{...h, jobsDone:myJobs.length, hoursWorked:Math.round(myHours/3600*10)/10};
          }).sort((a,b)=>b.jobsDone-a.jobsDone);
          const ROLE_COLORS={"driver":"#7c3aed","helper":"#06b6d4","manager":"#f97316"};
          const ROLE_ICONS={"driver":"🚗","helper":"🧹","manager":"👩‍💼"};
          // Revenue by day
          const revenueByDay=DAYS_EN.map(day=>{
            const dayJobs=doneJobs.filter(j=>j.day===day);
            return{day:day.slice(0,3), val:dayJobs.reduce((s,j)=>s+j.value,0), count:dayJobs.length};
          });
          const maxDayRev=Math.max(...revenueByDay.map(d=>d.val),1);
          return(<>
          <div className="pg-header"><div className="pg-title">📊 Reports</div><div className="pg-sub">Your business at a glance</div></div>

          {/* Period toggle */}
          <div style={{display:"flex",margin:"0 20px 16px",background:"var(--surf2)",borderRadius:12,padding:4,border:"1px solid var(--bdr)"}}>
            {[["week","This Week"],["month","This Month"],["all","All Time"]].map(([id,lbl])=>(
              <button key={id} onClick={()=>setRepPeriod(id)} style={{flex:1,padding:"9px 0",borderRadius:10,border:"none",background:repPeriod===id?"var(--purple)":"none",color:repPeriod===id?"#fff":"var(--muted)",fontSize:12,fontWeight:600,cursor:"pointer"}}>{lbl}</button>
            ))}
          </div>

          {/* KPI cards */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"0 20px 14px"}}>
            {[
              {label:"Revenue",val:`$${repPeriod==="week"?weekRevenue.toLocaleString():repPeriod==="month"?monthRevenue.toLocaleString():totalRevenue.toLocaleString()}`,sub:repPeriod==="week"?"gross this week":repPeriod==="month"?"projected gross":"total completed",color:"#7c3aed",icon:"💰"},
              {label:"Net Income",val:`$${repPeriod==="week"?Math.round(weekRevenue*(1-helperPct/100)).toLocaleString():repPeriod==="month"?monthNet.toLocaleString():Math.round(totalRevenue*(1-helperPct/100)).toLocaleString()}`,sub:`after ${helperPct}% helpers`,color:"#16a34a",icon:"✅"},
              {label:"Houses Done",val:repPeriod==="all"?doneJobs.length:repPeriod==="month"?doneJobs.length*4:doneJobs.length,sub:repPeriod==="week"?"this week":repPeriod==="month"?"est. this month":"total",color:"#06b6d4",icon:"🏠"},
              {label:"Avg per House",val:`$${houses.length?Math.round(weekRevenue/houses.length):0}`,sub:"gross value",color:"#f97316",icon:"📈"},
            ].map(c=>(
              <div key={c.label} style={{background:"var(--surf)",border:"1px solid var(--bdr)",borderRadius:16,padding:14}}>
                <div style={{fontSize:18,marginBottom:4}}>{c.icon}</div>
                <div style={{fontSize:10,color:"var(--muted)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>{c.label}</div>
                <div style={{fontSize:22,fontWeight:900,color:c.color}}>{c.val}</div>
                <div style={{fontSize:10,color:"var(--muted)",marginTop:3}}>{c.sub}</div>
              </div>
            ))}
          </div>

          {/* Revenue by day chart */}
          <div style={{margin:"0 20px 14px",background:"var(--surf)",border:"1px solid var(--bdr)",borderRadius:16,padding:16}}>
            <div style={{fontSize:12,fontWeight:700,color:"var(--purple)",marginBottom:14}}>💰 Revenue by Day of Week</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:6,height:80}}>
              {revenueByDay.map(d=>(
                <div key={d.day} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{fontSize:9,fontWeight:700,color:"var(--purple)"}}>{d.val>0?`$${d.val}`:""}</div>
                  <div style={{width:"100%",background:d.val>0?"var(--purple)":"var(--surf2)",borderRadius:"4px 4px 0 0",height:`${d.val>0?Math.max(12,Math.round((d.val/maxDayRev)*60)):8}px`,transition:"height .3s",border:"1px solid var(--bdr)"}}/>
                  <div style={{fontSize:9,color:"var(--muted)",fontWeight:600}}>{d.day}</div>
                  {d.count>0&&<div style={{fontSize:8,color:"var(--blue)"}}>{d.count}🏠</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Hours worked */}
          <div style={{margin:"0 20px 14px",background:"var(--surf)",border:"1px solid var(--bdr)",borderRadius:16,padding:14}}>
            <div style={{fontSize:12,fontWeight:700,color:"var(--purple)",marginBottom:12}}>⏱ Time Tracking</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {[
                {label:"Total Hours",val:(totalHours/3600).toFixed(1)+"h",color:"#7c3aed"},
                {label:"Avg per House",val:fmt(avgTimePerHouse),color:"#06b6d4"},
                {label:"Houses Timed",val:doneJobs.filter(j=>j.timer.history.length>0).length,color:"#16a34a"},
              ].map(s=>(
                <div key={s.label} style={{background:"var(--surf2)",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
                  <div style={{fontSize:16,fontWeight:900,color:s.color}}>{s.val}</div>
                  <div style={{fontSize:9,color:"var(--muted)",marginTop:3,lineHeight:1.3}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Team performance */}
          <div style={{margin:"0 20px 14px",background:"var(--surf)",border:"1px solid var(--bdr)",borderRadius:16,padding:14}}>
            <div style={{fontSize:12,fontWeight:700,color:"var(--purple)",marginBottom:12}}>👥 Team Performance</div>
            {helperStats.length===0&&<div style={{fontSize:13,color:"var(--muted)",textAlign:"center",padding:"10px 0"}}>No completed jobs yet</div>}
            {helperStats.map((h,i)=>(
              <div key={h.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,paddingBottom:10,borderBottom:i<helperStats.length-1?"1px solid var(--bdr)":"none"}}>
                <div style={{width:34,height:34,borderRadius:"50%",background:ROLE_COLORS[h.role]+"22",border:`2px solid ${ROLE_COLORS[h.role]}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{ROLE_ICONS[h.role]}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600}}>{h.name}</div>
                  <div style={{fontSize:10,color:"var(--muted)",marginTop:1}}>{h.hoursWorked}h worked · {h.jobsDone} houses</div>
                  {/* mini bar */}
                  <div style={{background:"var(--bdr)",borderRadius:99,height:4,marginTop:5,overflow:"hidden"}}>
                    <div style={{width:`${Math.min(100,h.jobsDone*25)}%`,background:ROLE_COLORS[h.role],height:"100%",borderRadius:99}}/>
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:15,fontWeight:800,color:ROLE_COLORS[h.role]}}>{h.jobsDone}</div>
                  <div style={{fontSize:9,color:"var(--muted)"}}>houses</div>
                </div>
              </div>
            ))}
          </div>

          {/* Payroll summary */}
          <div style={{margin:"0 20px 20px",background:"linear-gradient(135deg,#ede9fe,#ddd6fe)",border:"1px solid #c4b5fd",borderRadius:16,padding:14}}>
            <div style={{fontSize:12,fontWeight:700,color:"var(--purple)",marginBottom:10}}>💵 Payroll Summary · Today</div>
            {helpers.filter(h=>h.role!=="manager").map(h=>{
              const pay=getFinalPay(h.id,DAYS_EN[now.getDay()===0?6:now.getDay()-1]);
              return pay>0?(
                <div key={h.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <span style={{fontSize:12,color:"var(--txt)"}}>{ROLE_ICONS[h.role]} {h.name}</span>
                  <span style={{fontSize:13,fontWeight:700,color:"var(--purple)"}}>${pay}</span>
                </div>
              ):null;
            })}
            <div style={{borderTop:"1px solid #c4b5fd",paddingTop:10,marginTop:6,display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:12,fontWeight:700,color:"var(--dpurple)"}}>Total Today</span>
              <span style={{fontSize:16,fontWeight:900,color:"var(--dpurple)"}}>${totalPayroll}</span>
            </div>
          </div>
        </>);})()}

        {/* ── PAYMENTS ── */}
        {tab==="payments"&&(<>
          <div className="pg-header"><div className="pg-title">{t.paymentTitle}</div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,padding:"0 20px 14px"}}>
            <div style={{background:"#0d2a1a",border:"1px solid #1a4a2a",borderRadius:12,padding:12,textAlign:"center"}}><div style={{fontSize:10,color:"var(--green)",letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{t.paid}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"var(--green)"}}>${payments.filter(p=>p.status==="paid").reduce((s,p)=>s+p.value,0)}</div></div>
            <div style={{background:"#0a1a2a",border:"1px solid #1a3a5a",borderRadius:12,padding:12,textAlign:"center"}}><div style={{fontSize:10,color:"var(--blue)",letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{t.pending}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"var(--blue)"}}>${payments.filter(p=>p.status==="pending").reduce((s,p)=>s+p.value,0)}</div></div>
            <div style={{background:"#2a0a0a",border:"1px solid #5a1a1a",borderRadius:12,padding:12,textAlign:"center"}}><div style={{fontSize:10,color:"var(--rose)",letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{t.overdue}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"var(--rose)"}}>${payments.filter(p=>p.status==="overdue").reduce((s,p)=>s+p.value,0)}</div></div>
          </div>
          <div style={{padding:"0 20px"}}>{payments.map(p=><div key={p.id} className="pay-item"><div><div style={{fontSize:14,fontWeight:500}}>{p.client}</div><div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>{p.date}</div></div><div style={{display:"flex",alignItems:"center",gap:10}}><span className={`pay-badge ${p.status}`}>{p.status==="paid"?t.paid:p.status==="pending"?t.pending:t.overdue}</span><div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:17,fontWeight:800,color:"var(--purple)"}}>${p.value}</div>{p.status!=="paid"&&<button className="pay-btn" onClick={()=>setPayments(prev=>prev.map(x=>x.id===p.id?{...x,status:"paid"}:x))}>{t.markPaid}</button>}</div></div>)}</div>
        </>)}

        {/* ── TEAM ── */}
        {tab==="team"&&(()=>{
          const ROLE_COLORS={"driver":"#7c3aed","helper":"#06b6d4","manager":"#f97316"};
          const ROLE_ICONS={"driver":"🚗","helper":"🧹","manager":"👩‍💼"};
          return(<>
          <div className="pg-header"><div className="pg-title">👥 {t.teamTitle}</div><div className="pg-sub">{helpers.length} members · {teams.length} teams</div></div>

          {/* Sub tabs */}
          <div style={{display:"flex",margin:"0 20px 14px",background:"var(--surf2)",borderRadius:12,padding:4,border:"1px solid var(--bdr)"}}>
            {[["members","👤 Members"],["teams","🏷️ Teams"]].map(([id,lbl])=>(
              <button key={id} onClick={()=>setTeamTab(id)} style={{flex:1,padding:"9px 0",borderRadius:10,border:"none",background:teamTab===id?"var(--purple)":"none",color:teamTab===id?"#fff":"var(--muted)",fontSize:12,fontWeight:600,cursor:"pointer"}}>{lbl}</button>
            ))}
          </div>

          {teamTab==="members"&&(<>
            {/* Add member */}
            <div className="mx mb14 card" style={{padding:14}}>
              <div style={{fontSize:13,fontWeight:700,color:"var(--purple)",marginBottom:10}}>+ Add Team Member</div>
              <input className="inp" placeholder="Name" value={newHelperName} onChange={e=>setNewHelperName(e.target.value)}/>
              <input className="inp" placeholder="Password" type="text" value={newHelperPass} onChange={e=>setNewHelperPass(e.target.value)}/>
              <select className="inp" value={newTeamName||"helper"} onChange={e=>setNewTeamName(e.target.value)} style={{marginBottom:8}}>
                <option value="helper">🧹 Helper</option>
                <option value="driver">🚗 Driver</option>
                <option value="manager">👩‍💼 Manager</option>
              </select>
              <button className="btn-gold" onClick={()=>{if(!newHelperName.trim()||!newHelperPass.trim())return;setHelpers(p=>[...p,{id:Date.now(),name:newHelperName.trim(),password:newHelperPass.trim(),role:newTeamName||"helper",active:true}]);setNewHelperName("");setNewHelperPass("");setNewTeamName("");}}>Add Member</button>
            </div>
            {/* Members list */}
            <div style={{padding:"0 20px"}}>
              {["driver","helper","manager"].map(role=>{
                const group=helpers.filter(h=>h.role===role);
                if(!group.length)return null;
                return(<div key={role}>
                  <div style={{fontSize:10,color:"var(--muted)",letterSpacing:2,textTransform:"uppercase",padding:"8px 0 6px",display:"flex",alignItems:"center",gap:6}}>
                    <span>{ROLE_ICONS[role]}</span><span>{role}s ({group.length})</span>
                    <span style={{marginLeft:"auto",fontSize:10,color:ROLE_COLORS[role]}}>
                      {role==="driver"?"$140–$170/day":role==="helper"?"$100–$125/day":"$125–$150/day"}
                    </span>
                  </div>
                  {group.map(h=>(
                    <div key={h.id} style={{display:"flex",alignItems:"center",gap:10,background:"var(--surf)",border:`2px solid ${ROLE_COLORS[role]}33`,borderRadius:14,padding:"12px 14px",marginBottom:8}}>
                      <div style={{width:36,height:36,borderRadius:"50%",background:ROLE_COLORS[role]+"22",border:`2px solid ${ROLE_COLORS[role]}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{ROLE_ICONS[role]}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:700,color:"var(--txt)"}}>{h.name}</div>
                        <div style={{fontSize:10,color:"var(--muted)",marginTop:1}}>pw: {h.password} · <span style={{color:ROLE_COLORS[role],fontWeight:600,textTransform:"uppercase"}}>{h.role}</span></div>
                      </div>
                      <select value={h.role} onChange={e=>setHelpers(p=>p.map(x=>x.id===h.id?{...x,role:e.target.value}:x))} style={{fontSize:11,background:"var(--surf2)",border:"1px solid var(--bdr)",borderRadius:8,padding:"4px 6px",color:"var(--txt)",marginRight:6}}>
                        <option value="helper">Helper</option>
                        <option value="driver">Driver</option>
                        <option value="manager">Manager</option>
                      </select>
                      <button className="rm-btn" onClick={()=>removeHelper(h.id)}>✕</button>
                    </div>
                  ))}
                </div>);
              })}
            </div>
          </>)}

          {teamTab==="teams"&&(<>
            {/* Create team */}
            <div className="mx mb14 card" style={{padding:14}}>
              <div style={{fontSize:13,fontWeight:700,color:"var(--purple)",marginBottom:10}}>+ Create Team</div>
              <input className="inp" placeholder="Team name (ex: Team A 🌟)" value={newTeamName} onChange={e=>setNewTeamName(e.target.value)}/>
              <div style={{display:"flex",gap:8,marginBottom:10}}>
                {["#7c3aed","#06b6d4","#22c55e","#f97316","#e8637a"].map(c=>(
                  <div key={c} onClick={()=>setNewTeamColor(c)} style={{width:28,height:28,borderRadius:"50%",background:c,cursor:"pointer",border:newTeamColor===c?"3px solid #000":"3px solid transparent"}}/>
                ))}
              </div>
              <button className="btn-gold" onClick={addTeam}>Create Team</button>
            </div>
            {/* Teams list */}
            <div style={{padding:"0 20px"}}>
              {teams.map(team=>(
                <div key={team.id} style={{background:"var(--surf)",border:`2px solid ${team.color}`,borderRadius:16,padding:14,marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <div style={{fontSize:15,fontWeight:800,color:team.color}}>{team.name}</div>
                    <button onClick={()=>removeTeam(team.id)} style={{background:"none",border:"1px solid #fed7aa",color:"#ea580c",fontSize:11,padding:"3px 10px",borderRadius:20,cursor:"pointer"}}>Remove</button>
                  </div>
                  <div style={{fontSize:11,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Members</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {helpers.filter(h=>h.role!=="manager").map(h=>(
                      <div key={h.id} onClick={()=>toggleTeamMember(team.id,h.id)} style={{padding:"6px 12px",borderRadius:20,border:`2px solid ${team.helperIds.includes(h.id)?team.color:"var(--bdr)"}`,background:team.helperIds.includes(h.id)?team.color+"22":"var(--surf2)",cursor:"pointer",fontSize:12,fontWeight:600,color:team.helperIds.includes(h.id)?team.color:"var(--muted)"}}>
                        {ROLE_ICONS[h.role]} {h.name}
                      </div>
                    ))}
                  </div>
                  {/* Houses today for this team */}
                  {schedule.filter(j=>j.teamId===team.id).length>0&&(
                    <div style={{marginTop:10,borderTop:"1px solid var(--bdr)",paddingTop:10}}>
                      <div style={{fontSize:10,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Assigned Houses</div>
                      {schedule.filter(j=>j.teamId===team.id).map(j=>(
                        <div key={j.id} style={{fontSize:12,color:"var(--txt)",padding:"4px 0",display:"flex",justifyContent:"space-between"}}>
                          <span>🏠 {j.clientName} · {j.day}</span>
                          <span style={{color:j.status==="done"?"#16a34a":"#0284c7",fontWeight:600}}>{j.status==="done"?"✓ Done":"⏳ Pending"}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>)}
        </>);})()}

        {/* ── PAYROLL ── */}
        {tab==="payroll"&&(()=>{
          const ROLE_COLORS={"driver":"#7c3aed","helper":"#06b6d4","manager":"#f97316"};
          const ROLE_ICONS={"driver":"🚗","helper":"🧹","manager":"👩‍💼"};
          const selDay=payrollDay;
          const setSelDay=setPayrollDay;
          const activeHelpers=helpers.filter(h=>h.role!=="manager");
          return(<>
          <div className="pg-header"><div className="pg-title">💵 Payroll</div><div className="pg-sub">Daily pay · auto-calculated</div></div>

          {/* Day selector */}
          <div className="day-scroll">{DAYS[lang].map((d,i)=><div key={d} className={`day-chip ${selDay===DAYS_EN[i]?"active":""}`} onClick={()=>setSelDay(DAYS_EN[i])}>{d}</div>)}</div>

          {/* How it works */}
          <div style={{margin:"0 20px 14px",background:"#f0fdf4",border:"1px solid #86efac",borderRadius:12,padding:"10px 14px",fontSize:11,color:"#166534",lineHeight:1.6}}>
            💡 Pay is calculated by <b>houses completed</b> that day. Tap any amount to adjust manually.
          </div>

          {/* Pay rate reference */}
          <div style={{margin:"0 20px 14px",background:"var(--surf2)",border:"1px solid var(--bdr)",borderRadius:14,padding:12}}>
            <div style={{fontSize:11,color:"var(--muted)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:10}}>Florida Market Rates</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {[["🚗 Driver","$80–$170",Object.values(PAY_RATES.driver).filter(v=>v>0).join("/")],
                ["🧹 Helper","$60–$125",Object.values(PAY_RATES.helper).filter(v=>v>0).join("/")],
                ["👩‍💼 Manager","$70–$150",Object.values(PAY_RATES.manager).filter(v=>v>0).join("/")]
              ].map(([role,range,vals])=>(
                <div key={role} style={{background:"#fff",border:"1px solid var(--bdr)",borderRadius:10,padding:"8px 10px",textAlign:"center"}}>
                  <div style={{fontSize:11,fontWeight:600,color:"var(--txt)",marginBottom:2}}>{role}</div>
                  <div style={{fontSize:13,fontWeight:800,color:"var(--purple)"}}>{range}</div>
                  <div style={{fontSize:9,color:"var(--muted)",marginTop:2}}>1/2/3/4 houses</div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual payroll cards */}
          <div style={{padding:"0 20px"}}>
            {activeHelpers.map(h=>{
              const housesCount=getHelperDaySummary(h.id,selDay);
              const suggested=getSuggestedPay(h.id,selDay);
              const final=getFinalPay(h.id,selDay);
              const key=`${h.id}_${selDay}`;
              const isEdited=payrollEdits[key]!==undefined;
              const dayJobs=schedule.filter(j=>j.day===selDay&&j.helperIds.includes(h.id));
              return(
                <div key={h.id} style={{background:"var(--surf)",border:`2px solid ${ROLE_COLORS[h.role]}44`,borderRadius:16,padding:14,marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                    <div style={{width:40,height:40,borderRadius:"50%",background:ROLE_COLORS[h.role]+"22",border:`2px solid ${ROLE_COLORS[h.role]}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{ROLE_ICONS[h.role]}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:700}}>{h.name}</div>
                      <div style={{fontSize:10,color:ROLE_COLORS[h.role],textTransform:"uppercase",letterSpacing:.5,fontWeight:600}}>{h.role}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:22,fontWeight:900,color:ROLE_COLORS[h.role]}}>${final}</div>
                      {isEdited&&<div style={{fontSize:9,color:"#ea580c"}}>✏️ edited</div>}
                      {!isEdited&&<div style={{fontSize:9,color:"var(--muted)"}}>suggested</div>}
                    </div>
                  </div>

                  {/* Houses today */}
                  <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
                    {dayJobs.length===0
                      ?<span style={{fontSize:11,color:"var(--muted)"}}>No houses assigned</span>
                      :dayJobs.map(j=>(
                        <span key={j.id} style={{fontSize:11,padding:"4px 10px",borderRadius:20,background:j.status==="done"?"#dcfce7":"#e0f2fe",border:`1px solid ${j.status==="done"?"#86efac":"#7dd3fc"}`,color:j.status==="done"?"#16a34a":"#0284c7",fontWeight:600}}>
                          {j.status==="done"?"✓":"⏳"} {j.clientName.split(" ")[0]}
                        </span>
                      ))
                    }
                  </div>

                  {/* Houses count + pay scale */}
                  <div style={{display:"flex",gap:6,marginBottom:10}}>
                    {[1,2,3,4].map(n=>(
                      <div key={n} style={{flex:1,background:housesCount>=n?"var(--purple)":"var(--surf2)",border:`1px solid ${housesCount>=n?"var(--purple)":"var(--bdr)"}`,borderRadius:8,padding:"5px 0",textAlign:"center"}}>
                        <div style={{fontSize:13,fontWeight:700,color:housesCount>=n?"#fff":"var(--muted)"}}>{n}</div>
                        <div style={{fontSize:9,color:housesCount>=n?"#ddd6fe":"var(--muted)"}}>${PAY_RATES[h.role]?.[n]||0}</div>
                      </div>
                    ))}
                  </div>

                  {/* Manual adjust */}
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <input type="number" value={final} onChange={e=>setPayrollEdits(p=>({...p,[key]:Number(e.target.value)}))}
                      style={{flex:1,background:"var(--surf2)",border:"1px solid var(--bdr)",borderRadius:10,padding:"8px 12px",fontSize:14,fontWeight:700,color:"var(--txt)",outline:"none",textAlign:"center"}}/>
                    {isEdited&&<button onClick={()=>setPayrollEdits(p=>{const n={...p};delete n[key];return n;})} style={{padding:"8px 12px",background:"none",border:"1px solid #fed7aa",borderRadius:10,color:"#ea580c",fontSize:11,cursor:"pointer"}}>Reset</button>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Daily total */}
          <div style={{margin:"0 20px 14px",background:"linear-gradient(135deg,#ede9fe,#ddd6fe)",border:"1px solid #c4b5fd",borderRadius:16,padding:16,textAlign:"center"}}>
            <div style={{fontSize:11,color:"var(--muted)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6}}>Total Payroll · {selDay}</div>
            <div style={{fontSize:32,fontWeight:900,color:"var(--purple)"}}>
              ${activeHelpers.reduce((sum,h)=>sum+getFinalPay(h.id,selDay),0)}
            </div>
            <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>for {activeHelpers.filter(h=>getFinalPay(h.id,selDay)>0).length} team members working</div>
          </div>
        </>);})()}

        {/* BOTTOM NAV */}
        <div className="bnav">{navTabs.map(nt=><div key={nt.id} className={`nitem ${tab===nt.id?"active":""}`} onClick={()=>setTab(nt.id)}><span className="ni">{nt.icon}</span><span className="nl">{nt.label}</span></div>)}</div>

        {/* TAX MODAL */}
        {taxModal&&(()=>{
          const gross=Math.round(monthlyProjection);
          const helperC=Math.round(helperCost);
          const barW=(v,max)=>`${Math.min(100,Math.round((v/max)*100))}%`;
          // 3 scenarios on GROSS (before deductions)
          const sc=[
            {pct:15,label:"Conservative",sub:"Income under $20k/yr",color:"#06b6d4",weekly:Math.round(weeklyTotal*0.15),monthly:Math.round(gross*0.15),quarterly:Math.round(gross*3*0.15)},
            {pct:25,label:"Recommended",sub:"Income $20k–$60k/yr",color:"#7c3aed",weekly:Math.round(weeklyTotal*0.25),monthly:Math.round(gross*0.25),quarterly:Math.round(gross*3*0.25)},
            {pct:30,label:"Safe Bet",sub:"Income above $60k/yr",color:"#ea580c",weekly:Math.round(weeklyTotal*0.30),monthly:Math.round(gross*0.30),quarterly:Math.round(gross*3*0.30)},
          ];
          // estimated deductions for a cleaner
          const estDeductions=Math.round(gross*0.20); // ~20% of gross realistically
          const netAfterDeductions=gross-helperC-estDeductions;
          const taxAfterDeductions=Math.round(netAfterDeductions*0.25);
          return(
          <div className="modal-bg" onClick={()=>setTaxModal(false)}>
            <div className="modal" onClick={e=>e.stopPropagation()} style={{maxHeight:"88vh",overflowY:"auto",borderRadius:"20px 20px 0 0",padding:"20px 18px 32px"}}>

              {/* Header */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div>
                  <div style={{fontSize:20,fontWeight:900,color:"var(--purple)"}}>💰 Tax Overview</div>
                  <div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>Self-employed · Florida · Estimates only</div>
                </div>
                <button onClick={()=>setTaxModal(false)} style={{background:"var(--surf2)",border:"none",borderRadius:"50%",width:32,height:32,fontSize:16,cursor:"pointer",color:"var(--muted)"}}>✕</button>
              </div>

              {/* ⚠️ DISCLAIMER */}
              <div style={{background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:12,padding:"10px 14px",marginBottom:14,display:"flex",gap:8,alignItems:"flex-start"}}>
                <span style={{fontSize:16,flexShrink:0}}>⚠️</span>
                <span style={{fontSize:11,color:"#9a3412",lineHeight:1.5}}>These are <b>estimates only</b>. Your actual tax may be lower after deductions. Always consult a CPA for your exact amount.</span>
              </div>

              {/* CHART */}
              <div style={{background:"var(--surf2)",border:"1px solid var(--bdr)",borderRadius:14,padding:14,marginBottom:14}}>
                <div style={{fontSize:11,color:"var(--muted)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}>Monthly Breakdown (Before Deductions)</div>
                {[
                  {label:"Gross Revenue",val:gross,color:"#7c3aed",pct:"100%"},
                  {label:"Helper Cost",val:helperC,color:"#f97316",pct:barW(helperC,gross)},
                  {label:"Tax Reserve (25% rec.)",val:Math.round(gross*0.25),color:"#ef4444",pct:barW(Math.round(gross*0.25),gross)},
                  {label:"Your Est. Net",val:Math.round(gross-helperC-gross*0.25),color:"#22c55e",pct:barW(Math.round(gross-helperC-gross*0.25),gross)},
                ].map(item=>(
                  <div key={item.label} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                      <span style={{fontSize:12,color:"var(--txt)"}}>{item.label}</span>
                      <span style={{fontSize:12,fontWeight:700,color:item.color}}>${item.val.toLocaleString()}</span>
                    </div>
                    <div style={{background:"var(--bdr)",borderRadius:99,height:7,overflow:"hidden"}}>
                      <div style={{width:item.pct,background:item.color,height:"100%",borderRadius:99}}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3 SCENARIOS */}
              <div style={{fontSize:12,fontWeight:700,color:"var(--purple)",marginBottom:8}}>💵 How much to set aside — 3 scenarios</div>
              {sc.map(s=>(
                <div key={s.pct} style={{background:"#fff",border:`2px solid ${s.color}`,borderRadius:14,padding:12,marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div>
                      <span style={{fontSize:13,fontWeight:800,color:s.color}}>{s.pct}% — {s.label}</span>
                      <div style={{fontSize:10,color:"var(--muted)",marginTop:1}}>{s.sub}</div>
                    </div>
                    <div style={{background:s.color,color:"#fff",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700}}>Per week: ${s.weekly}</div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <div style={{background:"var(--surf2)",borderRadius:10,padding:"8px 10px",textAlign:"center"}}>
                      <div style={{fontSize:10,color:"var(--muted)"}}>Per month</div>
                      <div style={{fontSize:18,fontWeight:900,color:s.color}}>${s.monthly.toLocaleString()}</div>
                    </div>
                    <div style={{background:"var(--surf2)",borderRadius:10,padding:"8px 10px",textAlign:"center"}}>
                      <div style={{fontSize:10,color:"var(--muted)"}}>Per quarter (IRS)</div>
                      <div style={{fontSize:18,fontWeight:900,color:s.color}}>${s.quarterly.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* DEDUCTIONS — the good news! */}
              <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:14,padding:14,marginBottom:14}}>
                <div style={{fontSize:12,fontWeight:700,color:"#16a34a",marginBottom:4}}>🎉 Good news — Deductions reduce your tax!</div>
                <div style={{fontSize:11,color:"#166534",marginBottom:12,lineHeight:1.5}}>As a self-employed cleaner, you can deduct these expenses <b>before</b> calculating tax. A CPA can save you hundreds!</div>
                {[
                  {icon:"⛽",label:"Gas & Mileage",detail:"$0.67/mile driven for work (2024 IRS rate)"},
                  {icon:"🧴",label:"Cleaning Supplies",detail:"All products, mops, vacuums, gloves"},
                  {icon:"📱",label:"Phone Bill",detail:"% used for business is deductible"},
                  {icon:"👕",label:"Uniforms & Equipment",detail:"Work clothes, aprons, bags"},
                  {icon:"📚",label:"App Subscriptions",detail:"GlowPro, Google Maps, any work tool"},
                  {icon:"🧑‍💼",label:"CPA Fee",detail:"Yes! The CPA fee itself is deductible"},
                ].map((d,i)=>(
                  <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8,padding:"8px 10px",background:"#fff",borderRadius:10,border:"1px solid #bbf7d0"}}>
                    <span style={{fontSize:18,flexShrink:0}}>{d.icon}</span>
                    <div>
                      <div style={{fontSize:12,fontWeight:600,color:"#166534"}}>{d.label}</div>
                      <div style={{fontSize:11,color:"#4ade80",marginTop:1}}>{d.detail}</div>
                    </div>
                  </div>
                ))}
                <div style={{background:"#dcfce7",border:"1px solid #86efac",borderRadius:10,padding:"10px 12px",marginTop:6,textAlign:"center"}}>
                  <div style={{fontSize:11,color:"#166534"}}>Est. deductions for a cleaner: <b>~$100–$400/month</b></div>
                  <div style={{fontSize:11,color:"#16a34a",marginTop:2}}>That could save you <b>$25–$100/month</b> in taxes 💚</div>
                </div>
              </div>

              {/* QUARTERLY CALENDAR */}
              <div style={{background:"var(--surf2)",border:"1px solid var(--bdr)",borderRadius:14,padding:14,marginBottom:14}}>
                <div style={{fontSize:12,fontWeight:700,color:"var(--purple)",marginBottom:10}}>📅 IRS Quarterly Due Dates</div>
                {[
                  {q:"Q1",period:"Jan – Mar",due:"April 15",color:"#7c3aed"},
                  {q:"Q2",period:"Apr – May",due:"June 17",color:"#06b6d4"},
                  {q:"Q3",period:"Jun – Aug",due:"Sept 16",color:"#22c55e"},
                  {q:"Q4",period:"Sep – Dec",due:"Jan 15 (next yr)",color:"#f97316"},
                ].map(item=>(
                  <div key={item.q} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,padding:"8px 10px",background:"#fff",borderRadius:10,border:"1px solid var(--bdr)"}}>
                    <div style={{background:item.color,color:"#fff",borderRadius:8,padding:"4px 10px",fontSize:12,fontWeight:800,flexShrink:0,minWidth:36,textAlign:"center"}}>{item.q}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:500,color:"var(--txt)"}}>{item.period}</div>
                      <div style={{fontSize:11,color:"var(--muted)"}}>Due: <b>{item.due}</b></div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:11,color:"var(--muted)"}}>~save</div>
                      <div style={{fontSize:13,fontWeight:700,color:item.color}}>${Math.round(gross*3*0.25).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
                <div style={{fontSize:10,color:"var(--muted)",marginTop:4,textAlign:"center"}}>Pay at IRS.gov using Form 1040-ES · Florida has NO state income tax 🎉</div>
              </div>

              {/* FINAL CPA TIP */}
              <div style={{background:"linear-gradient(135deg,#ede9fe,#ddd6fe)",border:"1px solid #c4b5fd",borderRadius:14,padding:14,textAlign:"center"}}>
                <div style={{fontSize:22,marginBottom:6}}>🧑‍💼</div>
                <div style={{fontSize:13,fontWeight:700,color:"#4c1d95",marginBottom:4}}>Hire a CPA — it pays for itself</div>
                <div style={{fontSize:11,color:"#5b21b6",lineHeight:1.6}}>A good CPA finds deductions that save you 2–3× their fee. Look for one that works with self-employed Latinos — many offer free first consultation.</div>
              </div>

            </div>
          </div>
          );
        })()}

        {/* ASSIGN MODAL */}
        {assignModal&&(
          <div className="modal-bg" onClick={()=>setAssignModal(null)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-title">👥 {t.assignHelpers}</div>
              {helpers.map(h=>(
                <div key={h.id} className={`helper-pick ${assignSel.includes(h.id)?"sel":""}`} onClick={()=>toggleAssign(h.id)}>
                  <div className="helper-pick-name">🧹 {h.name}</div>
                  <div className={`check-dot ${assignSel.includes(h.id)?"on":""}`}>{assignSel.includes(h.id)&&<span style={{color:"#fff",fontSize:11,fontWeight:700}}>✓</span>}</div>
                </div>
              ))}
              <button className="btn-gold" style={{marginTop:16}} onClick={saveAssign}>{t.saveAssign}</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
