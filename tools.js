var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

var f = 0;
var draw = false;

//  canvas.width = document.body.clientWidth;
// canvas.height = document.body.clientHeight;

canvas.width = document.getElementById("canvas-div").offsetWidth;
canvas.height = document.getElementById("canvas-div").offsetHeight;



var scaleX = document.body.clientWidth/canvas.width;
var scaleY = document.body.clientHeight/canvas.height;


toolcolor.addEventListener('change',function()
{
    color(this.value);
    console.log(this.value);
})


function color(colour){
    context.strokeStyle=colour;
    context.fillStyle=colour;
}



function linew(){
    context.lineWidth = document.getElementById("Width").value;
    console.log(document.getElementById("Width").value);
    }


    function fill(){
        f=1;
       
    } 
        
        
    function border(){
        f=0;
    }

    function clearscrn(){

        canvas.width=canvas.width;
    }


    function pencil(){
        canvas.onmousedown=pencildown;
        canvas.onmouseup=pencilup;
        canvas.onmousemove=pencilmove;
        var rect = canvas.getBoundingClientRect();
        
        function pencildown(e){
        x=e.x - canvas.offsetLeft;
       
       y=e.y - canvas.offsetTop;
       
        draw=true;
        }
        function pencilup(){
        draw=false;
        }
        function pencilmove(event){
        if (draw){
            console.log(context.strokeStyle);
            console.log(context.lineWidth);
            
           a =event.x - canvas.offsetLeft;
          b =event.y - canvas.offsetTop;

          

           console.log(canvas.width,canvas.height,document.body.clientWidth);
           
           context.beginPath();
           context.moveTo(x,y);
           context.lineTo(a,b);
           context.stroke();
           context.closePath();
           x=a;
           y=b;
         }}
    }



    function circle(){
        var drag3 = false;
        canvas.onmousedown=circledown;
        canvas.onmouseup=circleup;
        canvas.onmousemove=circlemove;
        function circledown(e){
         img=context.getImageData(0,0,canvas.width,canvas.height);
         startx=e.x - canvas.offsetLeft;
         starty=e.y - canvas.offsetTop;
         drag3=true;
        }
        
        function circleup(e){
        drag3=false;
    
        }
        
        
        function circlemove(e){
        if (drag3){
        context.putImageData(img,0,0);
        endx=e.x - canvas.offsetLeft;
        endy=e.y - canvas.offsetTop;
        context.beginPath();
        context.arc(Math.abs(endx+startx)/2,Math.abs(endy+starty)/2,Math.sqrt(Math.pow(endx-startx,2)+Math.pow(endy-starty,2))/2, 0, Math.PI*2, true); 
        
        
        context.closePath();
        
        
        
        context.stroke();
        if (f==1){
        context.fill();
        
        }
        }}
    }



    function rectangle(){
        canvas.onmousedown=rectdown;
        canvas.onmouseup=rectup;
        canvas.onmousemove=rectmove;
        function rectdown(e){
         img=context.getImageData(0,0,canvas.width,canvas.height);
         startx=e.x - canvas.offsetLeft;
         starty=e.y -canvas.offsetTop;
         drag2=true;
        }
        function rectup(e){
        drag2=false;
        }
        function rectmove(e){
        if (drag2){
        context.putImageData(img,0,0);
        rectw=e.x-startx-canvas.offsetLeft;
        recth=e.y-starty - canvas.offsetTop;
        context.strokeRect(startx,starty,rectw,recth);
        if (f==1){
        context.fillRect(startx,starty,rectw,recth);
        }
        }}
    }

    function erase(){
        canvas.onmousedown=erasedown;
        canvas.onmouseup=eraseup;
        canvas.onmousemove=erasemove;
        function erasedown(e){
          drag5=true;
        }
        function eraseup(e){
        drag5=false;
        }
        function erasemove(e){
        if(drag5){
        x=e.x-canvas.offsetLeft;
        y=e.y-canvas.offsetTop;
        context.clearRect(x,y,20,20);
        }}
    }


    function backcolor()
    {
       // canvas.backcolor = document.getElementById("bckclr").value;

    //    context.globalCompositeOperation = 'destination-over';

    //    var culoare = context.fillStyle;

    //    context.fillStyle = document.getElementById("bckclr").value;

    //    context.fillRect(0,0,canvas.width,canvas.height);

    //    context.fillStyle = culoare;
    //    context.globalCompositeOperation = 'source-over';



    canvas.style.background = document.getElementById("bckclr").value;
        
    }

    

    function png()
    {
        var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = "my-image.png";
        link.href = image;
        link.click();
    }
    function jpg()
    {
        var image = canvas.toDataURL("image/jpg", 1.0).replace("image/jpg", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "my-image.jpg";
    link.href = image;
    link.click();
       
    }

    function svg()
    {


        var svg = document.createElement("svg");

        importCanvas(canvas,svg);


        var image = svg[0].toDataURL("image/svg", 1.0).replace("image/svg", "image/octet-stream");
        var link = document.createElement('a');
        link.download = "my-image.svg";
        link.href = image;
        link.click();
        

    }



    function importCanvas(sourceCanvas, targetSVG) {
        
        var img_dataurl = sourceCanvas.toDataURL("image/png");
    
        var svg_img = document.createElementNS(
            "http://www.w3.org/2000/svg", "image");
    
        svg_img.setAttributeNS(
            "http://www.w3.org/1999/xlink", "xlink:href", img_dataurl);
    
        targetSVG.appendChild(svg_img);
    }