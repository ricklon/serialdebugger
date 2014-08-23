var conn;

var ports;

var selectList;
var selectBtn;

//window.onload = function() {

var baudrate = 57600;
var buffersize = 1;
var sp;

  chrome.serial.getDevices(function (queriedPorts) {
    console.log(queriedPorts);
    ports = queriedPorts;
    var serialselectSpan = document.getElementById('serialselect');
    var inputText = document.getElementById('inputText');
    var sendBtn = document.getElementById('sendBtn');

    selectList = document.createElement("select");

    //Create and append the options
    for (var i = 0; i < ports.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = ports[i].path;
        selectList.appendChild(option);
        console.log(option);
        console.log(selectList);
    }

    serialselectSpan.appendChild(selectList);

    selectBtn = document.createElement("button");
    selectBtn.innerHTML= "connect";
    selectBtn.addEventListener('click', function() {
      console.log('clicked',selectList.selectedIndex);
      connect(selectList.selectedIndex);
    }, false);
    serialselectSpan.appendChild(selectBtn);

    sendBtn.addEventListener('click', function() {
      if(sp){
        try{
          var data = new Uint8Array(JSON.parse(inputText.value));
          console.log('writing', data);
          sp.write(data);
        }
        catch(exp){
          console.log('error writing serial data', exp);
        }
      }
    }, false);


  });

//}



  function connect(port){
    try{
      sp = new serialport.SerialPort(ports[port].path, {
                baudrate: baudrate,
                buffersize: buffersize
            });
      console.log('sp', sp);
      sp.on('data', function(data){
        console.log('serialport data received', data);
      });
      document.getElementById('connectoutput').innerHTML = 'ok';
    }catch(exp){
      document.getElementById('connectoutput').innerHTML = 'error: ' + exp;
    }

  }

