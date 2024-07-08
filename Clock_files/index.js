"use strict";
var $ = function(id) {
  return document.getElementById(id);
};

var displayCurrentTime = function() {
  var ampm;
  var today = new Date();
  var hours = today.getHours();
  hours >= 12 ? ampm = "PM" : ampm = "AM";
  if (hours === 24) {
    hours = 0;
  } else if (hours > 12) {
    hours = hours - 12;
  }
  $("hours").firstChild.nodeValue = padSingleDigit(hours);
  $("minutes").firstChild.nodeValue = padSingleDigit(today.getMinutes());
  $("seconds").firstChild.nodeValue = padSingleDigit(today.getSeconds());
  $("ampm").firstChild.nodeValue = ampm;
};

var padSingleDigit = function(num) {
  return (num < 10) ? "0" + num : num;
};

var addToTaskList = function() {
    var taskTextbox = $("task");
    var dateTextbox = $("date");
    var newTask = new Task(taskTextbox.value, dateTextbox.value);
    if (newTask.isValid()) {
        tasklist.add(newTask).save().load().display();
        taskTextbox.value = "";
        dateTextbox.value = "";
    } else {
        alert("Please enter a task.");
    }
    taskTextbox.focus();
};

var clearTaskList = function() {
    tasklist.clear();
    $("task").focus();
};

var deleteFromTaskList = function() {
    tasklist.delete(this.title).save().display(); // 'this' = clicked link
    $("task").focus();
};
window.onload = function() {
  // set initial clock display and then set interval timer to display
  // new time every second. Don't store timer object because it
  // won't be needed - clock will just run.
  displayCurrentTime();
  setInterval(displayCurrentTime, 1000);
  $("add_task").onclick = addToTaskList;
  $("clear_tasks").onclick = clearTaskList;

  tasklist.displayDiv = $("tasks");
  tasklist.deleteClickHandler = deleteFromTaskList;

  tasklist.load().display();
  $("task").focus();
};
