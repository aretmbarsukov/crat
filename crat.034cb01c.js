let e="http://localhost:3000/students",t=null;function d(){fetch(e).then(e=>e.json()).then(l=>{var u;let o;l.sort((e,t)=>e.id-t.id),u=l,(o=document.querySelector("#students-table tbody")).innerHTML="",u.forEach((e,t)=>{let d=document.createElement("tr");d.innerHTML=`
      <td>${t+1}</td>
      <td>${e.name}</td>
      <td>${e.age}</td>
      <td>${e.course}</td>
      <td>${e.skills.join(", ")}</td>
      <td>${e.email}</td>
      <td>${e.isEnrolled?"Так":"Ні"}</td>
      <td>
        <button class="update-btn" data-id="${e.id}">\u{41E}\u{43D}\u{43E}\u{432}\u{438}\u{442}\u{438}</button>
        <button class="delete-btn" data-id="${e.id}">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
      </td>
    `,o.appendChild(d)}),document.querySelectorAll(".delete-btn").forEach(t=>{t.onclick=()=>{var n;return n=t.dataset.id,void fetch(`${e}/${n}`,{method:"DELETE"}).then(d)}}),document.querySelectorAll(".update-btn").forEach(d=>{d.onclick=()=>{var l;t=l=d.dataset.id,fetch(`${e}/${l}`).then(e=>e.json()).then(e=>{document.getElementById("upd-name").value=e.name,document.getElementById("upd-age").value=e.age,document.getElementById("upd-course").value=e.course,document.getElementById("upd-skills").value=e.skills.join(", "),document.getElementById("upd-email").value=e.email,document.getElementById("upd-isEnrolled").checked=e.isEnrolled,n.style.display="block"})}})})}let n=document.getElementById("modal");document.getElementById("close-modal").onclick=()=>n.style.display="none",window.onclick=e=>{e.target===n&&(n.style.display="none")},document.getElementById("update-student-form").addEventListener("submit",l=>{var u;l.preventDefault();let o={name:document.getElementById("upd-name").value,age:Number(document.getElementById("upd-age").value),course:document.getElementById("upd-course").value,skills:document.getElementById("upd-skills").value.split(",").map(e=>e.trim()),email:document.getElementById("upd-email").value,isEnrolled:document.getElementById("upd-isEnrolled").checked};u=t,fetch(`${e}/${u}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(d),n.style.display="none"}),document.getElementById("add-student-form").addEventListener("submit",t=>{t.preventDefault(),fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:document.getElementById("name").value,age:Number(document.getElementById("age").value),course:document.getElementById("course").value,skills:document.getElementById("skills").value.split(",").map(e=>e.trim()),email:document.getElementById("email").value,isEnrolled:document.getElementById("isEnrolled").checked})}).then(d),t.target.reset()}),document.getElementById("get-students-btn").addEventListener("click",d);
//# sourceMappingURL=crat.034cb01c.js.map
