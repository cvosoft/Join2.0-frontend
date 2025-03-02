let currentDraggedElement;

/*
 * function to check which element is being moved
 */
function startDragging(id) {
  currentDraggedElement = id;
  // add class with rotation
  document.getElementById(`boardTask${id}`).classList.add("rotate");
}

/**
 * function for placing the selected container into the container below
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * function to highlight the todo-column when dragging over
 */
function addHighlightTodo() {
  document.getElementById("todo").classList.add("highlightBorder");
}

/**
 * function to remove the highlight of the todo-column
 */
function removeHighlightTodo() {
  document.getElementById("todo").classList.remove("highlightBorder");
}

/**
 * function to highlight the progress-column when dragging over
 */
function addHighlightProgress() {
  document.getElementById("progress").classList.add("highlightBorder");
}

/**
 * function to remove the highlight of the progress-column
 */
function removeHighlightProgress() {
  document.getElementById("progress").classList.remove("highlightBorder");
}

/**
 * function to highlight the feedback-column when dragging over
 */
function addHighlightFeedback() {
  document.getElementById("feedback").classList.add("highlightBorder");
}

/**
 * function to remove the highlight of the feedback-column
 */
function removeHighlightFeedback() {
  document.getElementById("feedback").classList.remove("highlightBorder");
}

/**
 * function to highlight the done-column when dragging over
 */
function addHighlightDone() {
  document.getElementById("done").classList.add("highlightBorder");
}

/**
 * function to remove the highlight of the done-column
 */
function removeHighlightDone() {
  document.getElementById("done").classList.remove("highlightBorder");
}

/**
 * function to remove all the highlights from the column
 */
function removeAllHighlights() {
  document.getElementById("todo").classList.remove("highlightBorder");
  document.getElementById("progress").classList.remove("highlightBorder");
  document.getElementById("feedback").classList.remove("highlightBorder");
  document.getElementById("done").classList.remove("highlightBorder");
}

/**
 * function to change the category so that the container is loaded correctly when reloaded
 */
async function moveTo(category) {
  let id = boardTasks[currentDraggedElement].id;
  removeAllHighlights();
  boardTasks[currentDraggedElement]["category"] = category;
  renderAllBoardTasks();
  document.getElementById("findInput").value = "";

  let data = {
    "category": category
  };

  await patchData(`tasks/${id}/`, data);
}


// async function moveTo(category) {
//   removeAllHighlights();
//   boardTasks[currentDraggedElement]["category"] = category;
//   renderAllBoardTasks();
//   document.getElementById("findInput").value = "";
//   await putData("boardtasks", boardTasks);
// }


/**
 * function to move task on category up (mobile view)
 * @param {} id
 */
async function moveTaskCategoryUp(index) {
  let id = boardTasks[index].id;
  let category = boardTasks[index].category;
  if (category == "progress") {
    await patchData(`tasks/${id}/`, { "category": "todo" });
  } else if (category == "feedback") {
    await patchData(`tasks/${id}/`, { "category": "progress" });
  } else if (category == "done") {
    await patchData(`tasks/${id}/`, { "category": "feedback" });
  }
  boardTasks = await loadData("tasks");
  renderAllBoardTasks();
}

/**
 * function to move task on category down (mobile view)
 * @param {} id
 */
async function moveTaskCategoryDown(index) {
  let id = boardTasks[index].id;
  let category = boardTasks[index].category;

  if (category == "todo") {
    await patchData(`tasks/${id}/`, { "category": "progress" });
  } else if (category == "progress") {
    await patchData(`tasks/${id}/`, { "category": "feedback" });
  } else if (category == "feedback") {
    await patchData(`tasks/${id}/`, { "category": "done" });
  }
  boardTasks = await loadData("tasks");
  renderAllBoardTasks();
}
