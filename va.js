let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")
function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="en-GB"
    window.speechSynthesis.speak(text_speak) 
}

function wishme(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("good morning sir")
    }
    else if(hours>=12 && hours<4){
        speak("good afternoon sir")
    }
    else{
        speak("good evening sir")
    }
}

window.addEventListener('load',()=>{
    wishme()
})

let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition=new speechRecognition();
recognition.onstart = () => {
    console.log("Speech recognition started");
};

recognition.onerror = (event) => {
    switch (event.error) {
        case "no-speech":
            speak("No speech detected. Please try again.");
            break;
        case "audio-capture":
            speak("Microphone not detected. Please check your device.");
            break;
        case "not-allowed":
            speak("Microphone access denied. Please enable it in your browser settings.");
            break;
        default:
            speak(`An unexpected error occurred: ${event.error}`);
            break;
    }
    console.error("Speech recognition error:", event.error);
    btn.style.display="flex";
    voice.style.display="none";
};

recognition.onend = () => {
    console.log("Speech recognition ended");
};

recognition.onresult=(event)=>{
    let currentindex=event.resultIndex;
    let transcript=event.results[currentindex][0].transcript;
    content.innerText=transcript;
    takeCommand(transcript.toLowerCase());
};
btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})

function takeCommand(message){
    btn.style.display="flex"
     voice.style.display="none"
    if(message.includes("hello") || message.includes("hey")){
        speak("hello sir,what can i help you")
    }
    else if(message.includes("who are you")){
        speak("i am virtual assistant,created by mani sir")
    }
    else if(message.includes("created you")){
        speak(" mani sir")
    }
    else if( message.includes("your name")){
        speak("i'm shifra")
    }
    else if(message.includes("how are you")){
        speak("i am fine,what about you?")
    }
    else if(message.includes("open youtube")){
        speak("opening youtube...")
        window.open("https://www.youtube.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("opening google...")
        window.open("https://www.google.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook...")
        window.open("https://www.facebook.com","_blank")
    }
    else if(message.includes("open calculator")){
        speak("opening calculator...")
        window.open("calculator://")
    }
    else if (message.includes("open calendar")) {
        speak("Opening google Calendar...");
        window.open("https://calendar.google.com/", "_blank");
    }
    else if(message.includes("open instagram")){
        speak("opening instagram...")
        window.open("https://www.instagram.com/","_blank")
    }
    else if(message.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
    }
    else{
       let final="this is what i found on internet regarding"+message.replace("shipra","") || message.replace("shifra","")
        speak(final)
        window.open(`https://www.google.com/search?q=${message.replace("shifra","").replace("shipra","")}`,"_blank")
    }
}