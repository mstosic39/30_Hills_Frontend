
//Remove duplicates from array

function removeDuplicates(num) {
  var x,
      len=num.length,
      out=[],
      obj={};
 
  for (x=0; x<len; x++) {
    obj[num[x]]=0;
  }
  for (x in obj) {
    out.push(x);
  }
  return out;
}

//Substract array2 from array 1

function arrays_substraction (array1, array2) {
  var temp = [];

  for (var i in array1) {
  if(array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
  }
  
  return temp;
}

// Loading data from JSON

function loadJson(url, cFunction) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
      cFunction(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

window.addEventListener("load", function(){loadJson("data/data.json", init)});

//Populating select element with group members from JSON

function init(xhttp){
  var odgovor = JSON.parse(xhttp.responseText);
  for(var i = 0; i <= odgovor.length - 1; i++){
      var name = odgovor[i].firstName + " " + odgovor[i].surname;
      var id = odgovor[i].id; 
      var option = document.createElement("OPTION");
      document.getElementById("group_list").appendChild(option);
      document.getElementsByTagName("OPTION")[i+1].setAttribute("value", name);
      document.getElementsByTagName("OPTION")[i+1].setAttribute("data-id", id);
      document.getElementsByTagName("OPTION")[i+1].innerHTML = name;  
  }
}

document.getElementById("group_list").addEventListener("change", function(){loadJson("data/data.json", show_selected)} );

//Printing selected member's direct, indirect and suggested friends

function show_selected(xhttp){
    var reset = document.getElementsByTagName("P");
    for(var i = 0; i <= reset.length - 1; i++){
        reset[i].innerHTML = "";  
    }
    var sel = document.getElementById("group_list");
    var atr = sel[sel.selectedIndex].getAttribute("data-id");
    var odgovor = JSON.parse(xhttp.responseText);
    var arr_direct = [];
    var arr_direct_and_indirect = [];
    var arr_indirect = [];
    var arr_direct_and_suggested = [];
    var arr_suggested = [];

//Printing direct friends of selected member  

    for(var i = 0; i <= odgovor.length - 1; i++){
        if(odgovor[i].id == atr){
            for(var j = 0; j <= odgovor[i].friends.length - 1; j++){
              for(var k = 0; k <= odgovor.length - 1; k++){
                if(odgovor[k].id == odgovor[i].friends[j]){
                  var friend = document.createElement("P");
                  document.getElementById("direct_friends").appendChild(friend);
                  friend.innerHTML = odgovor[k].firstName + " " + odgovor[k].surname;
                  arr_direct.push(odgovor[k].id);
                }else{

                }
              }
            }
            
        }else{

        }
    }
 
//Printing indirect friends of selected member 
     
    for(var i = 0; i <= arr_direct.length -1; i++){
        for(var j = 0; j <= odgovor.length - 1; j++){
            if(arr_direct[i] == odgovor[j].id){
                for(var k = 0; k <= odgovor[j].friends.length - 1; k++){
                    if(odgovor[j].friends[k] != atr){
                      arr_direct_and_indirect.push(odgovor[j].friends[k]);
                    }else{

                    }
                }
            }else{

            }
        }
    }

    arr_indirect = removeDuplicates(arrays_substraction(arr_direct_and_indirect, arr_direct));

    for(var i = 0; i <= arr_indirect.length - 1; i++){
          for(var j = 0; j <= odgovor.length - 1; j++){
              if(arr_indirect[i] == odgovor[j].id){
                  var friend_of_friend = document.createElement("P");
                  document.getElementById("friends_of_friends").appendChild(friend_of_friend);
                  friend_of_friend.innerHTML = odgovor[j].firstName + " " + odgovor[j].surname;
              }else{

              }
          }
    }

//Printing suggested friends of selected member 

    for(var i = 0; i <= odgovor.length - 1; i++){
        var counter = 0;
        for(var j = 0; j <= odgovor[i].friends.length - 1; j++){
            for(var k = 0; k <= arr_direct.length - 1; k++){
                if(odgovor[i].friends[j] == arr_direct[k] && i != atr - 1){
                    counter++;
            
                }else{

                }
            }
            
        }

        if(counter >= 2){
                arr_direct_and_suggested.push(odgovor[i].id);               
        }else{

        }

    }

    arr_suggested = removeDuplicates(arrays_substraction(arr_direct_and_suggested, arr_direct));
    
    for(var i = 0; i <= arr_suggested.length - 1; i++){
        for(var j = 0; j <= odgovor.length - 1; j++){
            if(arr_suggested[i] == odgovor[j].id){
                var suggested_friend = document.createElement("P");
                document.getElementById("suggested_friends").appendChild(suggested_friend);
                suggested_friend.innerHTML = odgovor[j].firstName + " " + odgovor[j].surname;

            }else{

            }
        }
      
    }

}

