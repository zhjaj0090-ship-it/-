const $=id=>document.getElementById(id);
let group="programming",running=false,timer=null,current=0,total=0;
document.querySelectorAll(".choice").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".choice").forEach(x=>x.classList.remove("selected"));
  btn.classList.add("selected");group=btn.dataset.group;
  $("course").innerHTML=group==="programming"
    ? '<option value="javascript">JavaScript</option><option value="python">Python</option>'
    : '<option value="finance">مبادئ الثقافة المالية</option><option value="saving">الادخار والتخطيط</option>';
}));
function log(message,type=""){
  const box=$("log"),empty=box.querySelector(".empty");if(empty)empty.remove();
  const row=document.createElement("div");row.className="entry "+type;row.append(document.createTextNode(message));
  const time=document.createElement("time");time.textContent=new Date().toLocaleTimeString("ar-EG");row.append(time);box.append(row);box.scrollTop=box.scrollHeight;
}
function update(){let p=total?Math.round(current/total*100):0;$("percent").textContent=p+"%";$("fill").style.width=p+"%";$("progress-label").textContent=`تمت مراجعة ${current} من ${total} مستوى`;}
function finish(){running=false;clearInterval(timer);$("status").textContent="اكتمل";$("status").className="status done";$("begin").disabled=false;$("stop").disabled=true;log("انتهت الجلسة التجريبية بنجاح.","success");}
$("begin").addEventListener("click",()=>{
  if(running)return;let from=+$("from").value,to=+$("to").value;
  if(!Number.isInteger(from)||!Number.isInteger(to)||from<1||to<from){log("تأكد من أرقام المستويات.","warning");return;}
  running=true;current=0;total=Math.min(to-from+1,100);$("status").textContent="جاري التدريب";$("status").className="status running";$("begin").disabled=true;$("stop").disabled=false;update();
  log(`بدأت جلسة ${$("course").selectedOptions[0].text} من المستوى ${from} إلى ${to}.`);
  log("دي واجهة تجريبية؛ لم يتم الاتصال بمنصة Qureo أو إرسال إجابات إليها.");
  timer=setInterval(()=>{if(!running)return;current++;update();log(`تمت مراجعة المستوى التدريبي ${from+current-1}.`);if(current>=total)finish();},900);
});
$("stop").addEventListener("click",()=>{if(!running)return;running=false;clearInterval(timer);$("status").textContent="متوقف";$("status").className="status";$("begin").disabled=false;$("stop").disabled=true;log("تم إيقاف الجلسة.","warning");});
$("clear").addEventListener("click",()=>$("log").innerHTML='<div class="empty">هنا هتظهر أنشطة جلسة التدريب.</div>');
$("theme").addEventListener("click",()=>document.body.classList.toggle("light"));
