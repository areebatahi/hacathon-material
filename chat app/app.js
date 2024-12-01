let profliePic = document.getElementById('proflie-pic');
let inputFile = document.getElementById('input-file');
inputFile.onchange = ()=>{
    profliePic.src = URL.createObjectURL(inputFile.files[0])
}