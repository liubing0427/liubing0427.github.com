var canvas = document.getElementById('canvas');
if(canvas!=null)
{
  var ctx = canvas.getContext('2d');
  ctx.lineWidth = 8;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  var startAngle = -Math.PI / 2;
  function drawClock()
  {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var h;
    if(hours>=12)
    {
      h = hours - 12;
    }
    else
    {
      h = hours;
    }
    ctx.clearRect(0, 0, 200, 200);
    
    ctx.beginPath(); 
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.shadowColor = "rgba(255, 128, 128, 0.5)";
    ctx.arc(100, 100, 90, startAngle, (h / 6 + minutes / 360 + seconds / 21600 - 0.5) * Math.PI, false);  
    ctx.stroke(); 
    
    ctx.beginPath(); 
    ctx.strokeStyle = "rgb(0, 255, 0)";
    ctx.shadowColor = "rgba(128, 255, 128, 0.5)";
    ctx.arc(100, 100, 75, startAngle, (minutes / 30 + seconds / 1800 - 0.5) * Math.PI, false);  
    ctx.stroke(); 
    
    ctx.beginPath(); 
    ctx.strokeStyle = "rgb(0, 0, 255)";
    ctx.shadowColor = "rgba(128, 128, 255, 0.5)";
    ctx.arc(100, 100, 60, startAngle, (seconds / 30 - 0.5) * Math.PI, false);  
    ctx.stroke();
    
    time = [];
    if (hours < 10) {
      time.push('0');
    }
    time.push(hours);  
    time.push(':');  
    
    if (minutes < 10) {  
      time.push('0');  
    }  
    time.push(minutes);  
    time.push(':');  
    
    if (seconds < 10) {  
      time.push('0');  
    }  
    time.push(seconds);
    ctx.font="bolder 20px Arial";
    ctx.fillText(time.join(''), 57, 105);
  }
  drawClock();
  setInterval(drawClock, 1000);
}
