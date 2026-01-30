/* ===============================
   TASK ACTIONS (AJAX)
================================ */

/* Store original HTML for cancel */
const originalTaskHTML = {};
let currentlyEditingId = null;

/* -------------------------------
   Toggle task completion
-------------------------------- */
async function toggleTask(id) {
  await fetch(`/tasks/${id}/toggle`, {
    method: "POST"
  });

  location.reload();
}

/* -------------------------------
   Delete task
-------------------------------- */
async function deleteTask(id) {
  if (!confirm("Delete this task?")) return;

  await fetch(`/tasks/${id}/delete`, {
    method: "POST"
  });

  location.reload();
}

/* ===============================
   INLINE EDIT
================================ */

/* Enter edit mode */
function editTask(id) {
  // Prevent editing multiple tasks at once
  if (currentlyEditingId && currentlyEditingId !== id) {
    cancelEdit(currentlyEditingId);
  }

  const taskEl = document.getElementById(`task-${id}`);
  if (!taskEl) return;

  // Save original HTML once
  if (!originalTaskHTML[id]) {
    originalTaskHTML[id] = taskEl.innerHTML;
  }

  currentlyEditingId = id;

  const title = taskEl.dataset.title || "";
  const due = taskEl.dataset.due || "";
  const priority = taskEl.dataset.priority || "medium";

  taskEl.innerHTML = `
    <form class="inline-edit" onsubmit="saveEdit(event, ${id})">
      <input
        type="text"
        name="title"
        value="${title}"
        required
      >

      <input
        type="date"
        name="due_date"
        value="${due}"
      >

      <select name="priority">
        <option value="low" ${priority === "low" ? "selected" : ""}>low</option>
        <option value="medium" ${priority === "medium" ? "selected" : ""}>medium</option>
        <option value="high" ${priority === "high" ? "selected" : ""}>high</option>
      </select>

      <button type="submit" class="save" title="Save">SAVE CHANGE</button>
      <button
        type="button"
        class="delete"
        onclick="cancelEdit(${id})"
        title="Cancel"
      >CANCEL CHANGE</button>
    </form>
  `;
}

/* Save edited task */
async function saveEdit(e, id) {
  e.preventDefault();

  const form = e.target;

  const params = new URLSearchParams();
  params.append("title", form.title.value.trim());
  params.append("due_date", form.due_date.value);
  params.append("priority", form.priority.value);

  await fetch(`/tasks/${id}/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });

  // Reload to reflect updated data & charts
  location.reload();
}

/* Cancel edit */
function cancelEdit(id) {
  const taskEl = document.getElementById(`task-${id}`);

  if (originalTaskHTML[id] && taskEl) {
    taskEl.innerHTML = originalTaskHTML[id];
    delete originalTaskHTML[id];
  }

  currentlyEditingId = null;
}

/* ===============================
   CHARTS
================================ */

let charts = [];

/* Load productivity charts */
async function loadCharts() {
  const monthlyCanvas = document.getElementById("monthlyChart");
  const yearlyCanvas = document.getElementById("yearlyChart");

  // If charts not on page, stop
  if (!monthlyCanvas || !yearlyCanvas) return;

  const res = await fetch("/api/stats");
  const data = await res.json();

  // Destroy existing charts
  charts.forEach(c => c.destroy());
  charts = [];

  /* -------- MONTHLY -------- */
  charts.push(
    new Chart(monthlyCanvas, {
      type: "bar",
      data: {
        labels: data.monthly.map(m => `${m.month}/${m.year}`),
        datasets: [{
          label: "Tasks Completed",
          data: data.monthly.map(m => m.count),
          backgroundColor: "#4f46e5"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              precision: 0
            }
          }
        }
      }
    })
  );

  /* -------- YEARLY -------- */
  charts.push(
    new Chart(yearlyCanvas, {
      type: "bar",
      data: {
        labels: data.yearly.map(y => y.year),
        datasets: [{
          label: "Tasks per Year",
          data: data.yearly.map(y => y.count),
          backgroundColor: "#16a34a"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              precision: 0
            }
          }
        }
      }
    })
  );
}

/* Load charts on page load */
document.addEventListener("DOMContentLoaded", loadCharts);
