/**
 * JIK.IM
 */

//播放MP3,随机
  function play(url){
  	  var num = Math.random();         
  	  	  num = num*url.length;       
  	  	  num = Math.ceil(num);
  	   var mp3 = url[num-1];
  	   var child=document.getElementById("sound");
  	   if(child){
  		   	 child.pause();
    		 document.body.removeChild(child.parentNode);
  	   }
  	   var div=document.createElement("span");
       div.style.padding = "0px";
       div.style.margin = "0px";
  	   //div.innerHTML = '<object id="sound" src="'+mp3+'" type="audio/x-wav" autostart="true" loop="false" style="width:0px;height:0px;margin:0px;padding:0px;position:absolute;"></object>';
  	   div.innerHTML = '<audio id="sound" src="'+mp3+'" preload style="width:0px;height:0px;display:none;"></audio>';
       document.body.appendChild(div);
       var myAuto = document.getElementById('sound');
       myAuto.play();
  }