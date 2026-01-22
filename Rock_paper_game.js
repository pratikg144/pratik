let userScore=0;
let compScore=0;

const border=document.querySelector(".main");
const userScorepara=document.querySelector("#user-score")
const compScorepara=document.querySelector("#comp-score")

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");

const gencomChoice=()=>{
    const options=["rock","paper","scissors"];

  const randIdx= Math.floor(Math.random()*3);                
return options[randIdx];
  //rock //paper //scissors
};

const drawgame=()=>{
    console.log("game was Draw!");
       msg.innerText="Match Draw! Play Again!";
     msg.style.backgroundColor="#160831";
      msg.style.color="#ec962d";
      border.style.borderColor="#160831"
}
const showWinner=(userWin,userchoice,compChoice)=>{
    if(userWin){
        console.log("You Win");
        userScore++;
        userScorepara.innerText=userScore;
       msg.innerText=`User Win!(Yours ${userchoice} beats ${compChoice})`;
       msg.style.backgroundColor="green";
       msg.style.color="yellow";
       border.style.borderColor="#48f821"
    }
    else{
        console.log("You lose");
        compScore++;
         compScorepara.innerText=compScore;
       msg.innerText=`User Lose !(${compChoice} beats Yours ${userchoice})`;
       msg.style.backgroundColor="#cc402b";
        msg.style.color="white";
        border.style.borderColor="#f82521"
    }


}


const palygame=(userchoice)=>{
    console.log("User choice =",userchoice);
  
  const compChoice=gencomChoice();
    console.log("Computer choice =",compChoice);


    
    if(userchoice===compChoice){
        
        drawgame();
    }
    else{
        let userWin=true;
        if(userchoice==="rock"){
            //scissors , paper
            userWin=compChoice==="paper"?false:true;
        }
        
       else if(userchoice==="paper"){
            //scissors , rock
            userWin=compChoice==="scissors"?false:true;
        }
        else{
            //rock,paper
            userWin=compChoice==="rock"?false:true;
        }
        
     showWinner(userWin,userchoice,compChoice);
    }

};

choices.forEach((choice)=>{
    console.log(choice);
    choice.addEventListener("click",()=>{
        const userchoice=choice.getAttribute("id")
       
     palygame(userchoice);
    });
});
