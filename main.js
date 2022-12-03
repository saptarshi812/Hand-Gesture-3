prediction1="";
prediction2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capturedImage"src="'+data_uri+'">';
    });
}
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/0472mBKYU/model.json',modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}
function check(){
    img=document.getElementById("capturedImage");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }else{
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if (results[0].label=="Amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if (results[0].label=="Victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if (results[0].label=="Best"){
                document.getElementById("update_emoji").innerHTML="&#128077;";
        }

    }
}
function speak(){
    var synth=window.speechSynthesis;
    speakData1="The first prediction is "+prediction1;
    speakData2="The seccond prediction is "+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(utterThis);

}