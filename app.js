// 노마트코더 학습예제. 바닐라 자바스크립트 연습
// 이전에 공부한 것 기록으로 남겨둠.
// 공부한 점 : 실제 캔버스해상도와 HTML해상도 신경쓸 것. 캔버스 해상도에 따라서 실제 마우스 위치가 틀어짐. 클래스로 받아와서 각각 이벤트리스너 추가하는 방법
// 정리일 : 2022.4.7 - U. PAK

const canvas = document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");

const colors=document.getElementsByClassName("controls_color");
Array.from(colors).forEach(color => color.addEventListener("click", changeColor)); //클래스로 받아와서 각각 이벤트리스너 추가(중요)

const mode=document.getElementById("jsMode");
mode.addEventListener("click", changeMode);

let range=document.getElementById("jsRange");

range.oninput=function(){ctx.lineWidth=range.value}
    
// 캔버스 해상도 맞춤
const { width, height } = canvas.getBoundingClientRect();
canvas.width = width * 2; //캔버스 해상도 두배로 높여서 예쁘게 출력하기
canvas.height = height * 2;

ctx.lineWidth=1;
ctx.strokeStyle="black"; //선기본색:검정색
ctx.fillStyle="white" //캔버스배경기본색:흰색
//캔버스 기본배경 흰색으로 설정
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fill();

let painting=false; //모드상태기억
let fillmode=false; 

//마우스 클릭 후 움직이면 선그림
function onMouseMove(event){
    const X=event.offsetX * 2; //캔버스 해상도를 두배로 하기위해 커서 위치 보정
    const Y=event.offsetY * 2;
    // console.log(X, Y);
    if (!painting){
        ctx.beginPath(); //안 넣으면 색상 변경시 전부 같은 색으로 바뀜
        ctx.moveTo(X,Y);
    } else {
    ctx.lineTo(X,Y);
    ctx.stroke();
    }
}

function startPainting(){
    painting=true;
    if(fillmode) { //Fill을 누른상태면 캔버스 전체에 선택된 색상을 입힘.
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fill();
    }
}

function stopPainting(){
    painting=false;
}

// function changeColor(){
//     ctx.strokeStyle=
// }
//마우스 처리제어
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mousedown", startPainting);
}

function changeColor(event){
    const color  = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeMode(event){
    if(!fillmode){
        fillmode=true;
        mode.innerHTML="Paint";
    }
    else{
        fillmode=false;
        mode.innerHTML="Fill";
    }   
}

//캔버스 이미지를 PNG파일로 저장
function putImage(){
    let myImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let link=document.createElement("a");
    link.href = myImage;
    link.download = "PaintJS.png";
    link.click();
}
