const API_URL = "http://localhost:3000/students";

let currentEditId = null;

async function getStudents() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Помилка отримання студентів");

    const students = await res.json();
    students.sort((a, b) => a.id - b.id);
    renderStudents(students);
  } catch (error) {
    console.error("Помилка:", error);
  }
}

async function addStudent(student) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });

    if (!res.ok) throw new Error("Не вдалося додати студента");

    await getStudents();
  } catch (error) {
    console.error("Помилка:", error);
  }
}

async function updateStudent(id, updatedData) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) throw new Error("Не вдалося оновити студента");

    await getStudents();
  } catch (error) {
    console.error("Помилка:", error);
  }
}

async function deleteStudent(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!res.ok) throw new Error("Не вдалося видалити студента");

    await getStudents();
  } catch (error) {
    console.error("Помилка:", error);
  }
}

function renderStudents(students) {
  const tbody = document.querySelector("#students-table tbody");
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
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

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = () => deleteStudent(btn.dataset.id);
  });

  document.querySelectorAll(".update-btn").forEach(btn => {
    btn.onclick = () => openModal(btn.dataset.id);
  });
}

const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");

async function openModal(id) {
  try {
    currentEditId = id;

    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Не вдалося отримати дані студента");

    const student = await res.json();

    document.getElementById("upd-name").value = student.name;
    document.getElementById("upd-age").value = student.age;
    document.getElementById("upd-course").value = student.course;
    document.getElementById("upd-skills").value = student.skills.join(", ");
    document.getElementById("upd-email").value = student.email;
    document.getElementById("upd-isEnrolled").checked = student.isEnrolled;

    modal.style.display = "block";
  } catch (error) {
    console.error("Помилка:", error);
  }
}

closeModalBtn.onclick = () => (modal.style.display = "none");

window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

document.getElementById("update-student-form").addEventListener("submit", async e => {
  e.preventDefault();

  const updatedStudent = {
    name: document.getElementById("upd-name").value,
    age: Number(document.getElementById("upd-age").value),
    course: document.getElementById("upd-course").value,
    skills: document.getElementById("upd-skills").value.split(",").map(s => s.trim()),
    email: document.getElementById("upd-email").value,
    isEnrolled: document.getElementById("upd-isEnrolled").checked,
  };

  await updateStudent(currentEditId, updatedStudent);
  modal.style.display = "none";
});

document.getElementById("add-student-form").addEventListener("submit", async e => {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    course: document.getElementById("course").value,
    skills: document.getElementById("skills").value.split(",").map(s => s.trim()),
    email: document.getElementById("email").value,
    isEnrolled: document.getElementById("isEnrolled").checked,
  };

  await addStudent(student);
  e.target.reset();
});

document.getElementById("get-students-btn").addEventListener("click", getStudents);
