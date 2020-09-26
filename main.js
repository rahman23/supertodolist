var currentFormVisibilityStatus = false;
function SaveNotes() {  
    var todo = document.getElementById("txtToDo").value;   
    var color = document.getElementById("color_code").value;
    if (todo == "") {
        alert("Please enter text.");
        return;
    } 
    var storage = JSON.parse(localStorage.getItem('ToDoList'));
    var arrayLength = storage.length;  
    storage[arrayLength] = color;        
    storage[arrayLength + 1] = todo;
    localStorage.setItem('ToDoList', JSON.stringify(storage));       
    loadNotes();
    clearNote();
}
function clearNote() {
    var todo = document.getElementById("txtToDo");
    todo.value = '';
}
function loadNotes() {
    var storage = JSON.parse(localStorage.getItem('ToDoList'));
    if (!storage) {
        storage = [];
        localStorage.setItem('ToDoList', JSON.stringify(storage));
    }
    var displayArea = document.getElementById("displayArea");            
    var innerDiv = "";
    for (var i = 0; i < storage.length; i = i + 2) {  
            var j = i+1;             
            innerDiv += "<div id='draggable' class='displayToDo "+i+"' style='background: "+storage[i]+" ; '><input type='image' class='delete_icon' src='images/delete_icon.png' width='25px' height='32px' onclick='removeMe(" + j + ")' /> <div class='todo_text'> " + storage[i+1] + "</div></div>";
    }
    if (innerDiv != undefined) {
        displayArea.innerHTML = innerDiv;
    }
    else {
        displayArea.innerHTML = "";
    }
    make_draggable(); 
}
function removeMe(itemId) {
    var storage = JSON.parse(localStorage.getItem('ToDoList'));
    storage.splice(itemId - 1, 2);
    localStorage.setItem('ToDoList', JSON.stringify(storage));
    loadNotes();
}
onload = function () {
    loadNotes();
}        
$('#myButton').on('click', function(){
    var todo = document.getElementById("txtToDo").value;   
    if (todo == "") {
        return;
    } 
   $('#myButton').addClass('button_animate');
   console.log("yes");
   setTimeout(function(){ $('#myButton').removeClass('button_animate'); }, 1500);          
});
$("body").keypress(function(event) { 
    if (event.keyCode == 13 && !event.shiftKey) {             
        $('#myButton').click();            } 
}); 
$(".colors span").click(function(e) {
  let c = $(this).css('background');
  $("#color_code").text(c);
  console.log("color clicked " + c);
});
// START CLOCK SCRIPT  
Number.prototype.pad = function(n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};
function updateClock() {
  var now = new Date();
  var milli = now.getMilliseconds(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = now.getHours(),
    mo = now.getMonth(),
    dy = now.getDate(),
    yr = now.getFullYear();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var tags = ["mon", "d", "y", "h", "m", "s", "mi"],
    corr = [months[mo], dy, yr, hou.pad(2), min.pad(2), sec.pad(2), milli];
    for (var i = 0; i < tags.length; i++)
       document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
 }
function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1);
}        
initClock();
//END CLOCK SCRIPT
//Draggable script
function make_draggable(){
    var positions = JSON.parse(localStorage.positions || "{}");            
    var d = $("[id=draggable]").attr("id", function (i) {
        return "draggable_" + i
    });
    $.each(positions, function (id, pos) {
        $("#" + id).css(pos)
    });        
    d.draggable({
        containment: "#displayArea",
        stop: function (event, ui) {
            positions[this.id] = ui.position
            localStorage.positions = JSON.stringify(positions)
        }
    });          
}
$(window).on("load", function() {
    //Pointer changes while dragging
    $('.displayToDo').live("mousedown", function() {
        $(this).addClass("mouseDown");
     }).live("mouseup", function () {
         $(this).removeClass("mouseDown");
     });
     // If user clicks on text it will be copied to clipboard
     $(".todo_text").click(function(e) {
        var range = document.createRange();
        range.selectNode(this);
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
     });
    //  $('#morph_check').change(function() {
    //     if($(this).is(":checked")) {
    //        //'checked' event code
    //     }else{
    //         make_draggable(); 
    //     }
    //     window.location.reload(true);
    //  });
});  