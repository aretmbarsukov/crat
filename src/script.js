// const API_URL = "https://697f29d2d1548030ab654d3a.mockapi.io/students";


// // -------------------------
// // 1. GET — отримати всіх студентів
// // -------------------------
// async function getStudents() {
//   const res = await fetch(API_URL);
//   const students = await res.json();
//   renderStudents(students);
// }

// // -------------------------
// // 2. POST — додати нового студента
// // -------------------------
// async function addStudent(student) {
//   await fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(student),
//   });

//   getStudents(); // оновити таблицю
// }

// // -------------------------
// // 3. PATCH — часткове оновлення студента
// // -------------------------
// async function updateStudent(id, updatedData) {
//   await fetch(`${API_URL}/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(updatedData),
//   });

//   getStudents(); // оновити таблицю
// }

// // -------------------------
// // 4. DELETE — видалити студента
// // -------------------------
// async function deleteStudent(id) {
//   await fetch(`${API_URL}/${id}`, {
//     method: "DELETE",
//   });

//   getStudents(); // оновити таблицю
// }

// // -------------------------
// // Рендер таблиці студентів
// // -------------------------
// function renderStudents(students) {
//   const tbody = document.querySelector("#students-table tbody");
//   tbody.innerHTML = "";

//   students.forEach((student) => {
//     const tr = document.createElement("tr");

//     tr.innerHTML = `
//       <td>${student.id}</td>
//       <td>${student.name}</td>
//       <td>${student.age}</td>
//       <td>${student.course}</td>
//       <td>${student.skills.join(", ")}</td>
//       <td>${student.email}</td>
//       <td>${student.isEnrolled ? "Так" : "Ні"}</td>
//       <td>
//         <button class="update-btn" data-id="${student.id}">Оновити</button>
//         <button class="delete-btn" data-id="${student.id}">Видалити</button>
//       </td>
//     `;

//     tbody.appendChild(tr);
//   });

//   // Додаємо обробники кнопок
//   document.querySelectorAll(".delete-btn").forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const id = btn.dataset.id;
//       deleteStudent(id);
//     });
//   });

//   document.querySelectorAll(".update-btn").forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const id = btn.dataset.id;

//       const newName = prompt("Нове ім'я:");
//       if (!newName) return;

//       updateStudent(id, { name: newName });
//     });
//   });
// }

// // -------------------------
// // 7. Обробка подій користувача
// // -------------------------

// // 7.2. Кнопка "Отримати студентів"
// document.getElementById("get-students-btn").addEventListener("click", getStudents);

// // 7.3. Форма додавання студента
// document.getElementById("add-student-form").addEventListener("submit", (e) => {
//   e.preventDefault();

//   const student = {
//     name: document.getElementById("name").value,
//     age: Number(document.getElementById("age").value),
//     course: document.getElementById("course").value,
//     skills: document.getElementById("skills").value.split(",").map(s => s.trim()),
//     email: document.getElementById("email").value,
//     isEnrolled: document.getElementById("isEnrolled").checked,
//   };

//   addStudent(student);

//   e.target.reset(); // очистити форму
// });




// let currentEditId = null;

// // -------------------------
// // GET — отримати всіх студентів
// // -------------------------
// async function getStudents() {
//   const res = await fetch(API_URL);
//   const students = await res.json();
//   renderStudents(students);
// }

// // -------------------------
// // POST — додати нового студента
// // -------------------------
// async function addStudent(student) {
//   await fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(student),
//   });

//   getStudents();
// }

// // -------------------------
// // PATCH — оновити студента
// // -------------------------
// async function updateStudent(id, updatedData) {
//   await fetch(`${API_URL}/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(updatedData),
//   });

//   getStudents();
// }

// // -------------------------
// // DELETE — видалити студента
// // -------------------------
// async function deleteStudent(id) {
//   await fetch(`${API_URL}/${id}`, {
//     method: "DELETE",
//   });

//   getStudents();
// }

// // -------------------------
// // Рендер таблиці
// // -------------------------
// function renderStudents(students) {
//   const tbody = document.querySelector("#students-table tbody");
//   tbody.innerHTML = "";

//   students.forEach((student) => {
//     const tr = document.createElement("tr");

//     tr.innerHTML = `
//       <td>${student.id}</td>
//       <td>${student.name}</td>
//       <td>${student.age}</td>
//       <td>${student.course}</td>
//       <td>${student.skills.join(", ")}</td>
//       <td>${student.email}</td>
//       <td>${student.isEnrolled ? "Так" : "Ні"}</td>
//       <td>
//         <button class="update-btn" data-id="${student.id}">Оновити</button>
//         <button class="delete-btn" data-id="${student.id}">Видалити</button>
//       </td>
//     `;

//     tbody.appendChild(tr);
//   });

//   // Кнопки видалення
//   document.querySelectorAll(".delete-btn").forEach((btn) => {
//     btn.addEventListener("click", () => {
//       deleteStudent(btn.dataset.id);
//     });
//   });

//   // Кнопки оновлення
//   document.querySelectorAll(".update-btn").forEach((btn) => {
//     btn.addEventListener("click", () => {
//       openModal(btn.dataset.id);
//     });
//   });
// }

// // -------------------------
// // Модальне вікно
// // -------------------------
// const modal = document.getElementById("modal");
// const closeModalBtn = document.getElementById("close-modal");

// function openModal(id) {
//   currentEditId = id;

//   fetch(`${API_URL}/${id}`)
//     .then(res => res.json())
//     .then(student => {
//       document.getElementById("upd-name").value = student.name;
//       document.getElementById("upd-age").value = student.age;
//       document.getElementById("upd-course").value = student.course;
//       document.getElementById("upd-skills").value = student.skills.join(", ");
//       document.getElementById("upd-email").value = student.email;
//       document.getElementById("upd-isEnrolled").checked = student.isEnrolled;

//       modal.style.display = "block";
//     });
// }

// closeModalBtn.onclick = () => modal.style.display = "none";

// window.onclick = (e) => {
//   if (e.target === modal) modal.style.display = "none";
// };

// // -------------------------
// // Збереження змін у модальному вікні
// // -------------------------
// document.getElementById("update-student-form").addEventListener("submit", (e) => {
//   e.preventDefault();

//   const updatedStudent = {
//     name: document.getElementById("upd-name").value,
//     age: Number(document.getElementById("upd-age").value),
//     course: document.getElementById("upd-course").value,
//     skills: document.getElementById("upd-skills").value.split(",").map(s => s.trim()),
//     email: document.getElementById("upd-email").value,
//     isEnrolled: document.getElementById("upd-isEnrolled").checked,
//   };

//   updateStudent(currentEditId, updatedStudent);
//   modal.style.display = "none";
// });

// // -------------------------
// // Додавання нового студента
// // -------------------------
// document.getElementById("add-student-form").addEventListener("submit", (e) => {
//   e.preventDefault();

//   const student = {
//     name: document.getElementById("name").value,
//     age: Number(document.getElementById("age").value),
//     course: document.getElementById("course").value,
//     skills: document.getElementById("skills").value.split(",").map(s => s.trim()),
//     email: document.getElementById("email").value,
//     isEnrolled: document.getElementById("isEnrolled").checked,
//   };

//   addStudent(student);
//   e.target.reset();
// });

// // -------------------------
// // Кнопка "Отримати студентів"
// // -------------------------
// document.getElementById("get-students-btn").addEventListener("click", getStudents);




const API_URL = "https://697f29d2d1548030ab654d3a.mockapi.io/students";

let currentEditId = null;

async function getStudents() {
  let students = await fetch(API_URL).then(r => r.json());
  students = students.map(s => ({
    ...s,
    isEnrolled: s.isEnrolled === true || s.isEnrolled === "true"
  }));
  renderStudents(students);
}

async function addStudent(student) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  getStudents();
}

async function updateStudent(id, updatedData) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  getStudents();
}

async function deleteStudent(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  getStudents();
}

function renderStudents(students) {
  const tbody = document.querySelector("#students-table tbody");
  tbody.innerHTML = "";

  students.forEach((student) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(", ")}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? "Так" : "Ні"}</td>
      <td>
        <button class="update-btn" data-id="${student.id}">Оновити</button>
        <button class="delete-btn" data-id="${student.id}">Видалити</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => deleteStudent(btn.dataset.id));
  });

  document.querySelectorAll(".update-btn").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.id));
  });
}

const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");

function openModal(id) {
  currentEditId = id;

  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(student => {
      document.getElementById("upd-name").value = student.name;
      document.getElementById("upd-age").value = student.age;
      document.getElementById("upd-course").value = student.course;
      document.getElementById("upd-skills").value = student.skills.join(", ");
      document.getElementById("upd-email").value = student.email;
      document.getElementById("upd-isEnrolled").checked =
        student.isEnrolled === true || student.isEnrolled === "true";

      modal.style.display = "block";
    });
}

closeModalBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

document.getElementById("update-student-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const updatedStudent = {
    name: document.getElementById("upd-name").value,
    age: Number(document.getElementById("upd-age").value),
    course: document.getElementById("upd-course").value,
    skills: document.getElementById("upd-skills").value.split(",").map(s => s.trim()),
    email: document.getElementById("upd-email").value,
    isEnrolled: document.getElementById("upd-isEnrolled").checked,
  };

  updateStudent(currentEditId, updatedStudent);
  modal.style.display = "none";
});

document.getElementById("add-student-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    course: document.getElementById("course").value,
    skills: document.getElementById("skills").value.split(",").map(s => s.trim()),
    email: document.getElementById("email").value,
    isEnrolled: document.getElementById("isEnrolled").checked,
  };

  addStudent(student);
  e.target.reset();
});


document.getElementById("get-students-btn").addEventListener("click", getStudents);
