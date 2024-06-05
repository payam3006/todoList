const q = console.log;

const list = document.getElementsByClassName("main")[0];
// q(list);
const input = document.querySelector("input");

window.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    addTodo();
  }
});

let todoArray;
let num;
try {
  if (localStorage.getItem("todo") !== "") {
    todoArray = localStorage.getItem("todo").split(",");
    num = todoArray.length;
  } else {
    todoArray = [];
    num = 0;
  }
} catch (error) {
  todoArray = [];
  num = 0;
}

if (todoArray[0] !== "") {
  todoArray.forEach((elem, index) => {
    const newDiv = document.createElement("div");
    newDiv.id = `todo${index + 1}`;
    newDiv.classList.add("todo");
    try {
      if (localStorage.getItem(`${elem}`) == "1") {
        newDiv.classList.add("do");
      }
    } catch (error) {}
    // newDiv.onclick = toggle(event);
    newDiv.addEventListener("click", function (ev) {
      toggle(ev);
    });

    newDiv.addEventListener(
      "contextmenu",
      function (ev) {
        ev.preventDefault();
        deleteItem(ev);
        // alert("success!");
        // q(ev.target);
        // return false;
      },
      false
    );
    newDiv.innerText = `${elem}`;
    // q(document.querySelector("input").value);
    list.appendChild(newDiv);
  });
}

const addTodo = () => {
  if (input.value !== "" && todoArray.indexOf(input.value) == -1) {
    todoArray.push(input.value);
    localStorage.setItem("todo", todoArray.toString());
    const newDiv = document.createElement("div");
    newDiv.id = `todo${num + 1}`;
    newDiv.classList.add("todo");
    // newDiv.onclick = toggle(event);
    newDiv.addEventListener("click", function (ev) {
      toggle(ev);
    });

    newDiv.addEventListener(
      "contextmenu",
      function (ev) {
        ev.preventDefault();
        deleteItem(ev);
        // alert("success!");
        // q(ev.target);
        // return false;
      },
      false
    );
    newDiv.innerText = `${input.value}`;
    // q(document.querySelector("input").value);
    list.appendChild(newDiv);
    input.value = "";
    num += 1;
  }
};

const toggle = (event) => {
  if (localStorage.getItem(event.target.innerText) == "") {
    localStorage.setItem(event.target.innerText, "1");
  } else if (localStorage.getItem(event.target.innerText) == "1") {
    localStorage.setItem(event.target.innerText, "");
  } else {
    localStorage.setItem(event.target.innerText, "1");
  }
  event.target.classList.toggle("do");
  q(event.target);
};
const deleteItem = (event) => {
  list.removeChild(event.target);
  // q(todoArray.indexOf(event.target.innerText));
  // q(event.target.innerText);
  todoArray.splice(todoArray.indexOf(event.target.innerText), 1);
  localStorage.setItem("todo", todoArray.toString());
};

// let testArray = ["dfdsvds", "sfsdfvs", "afdsvdf"];
// q(testArray.toString());
// localStorage.setItem("todo", testArray.toString());
// q(localStorage.getItem("todo"));
