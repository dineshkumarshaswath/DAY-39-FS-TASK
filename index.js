const express =require("express");
const fs=require('fs');
const path=require("path");

const dirName=path.join(__dirname,"timestamps")

const datenow=new Date();
const date=datenow.toDateString()
const time=datenow.toLocaleTimeString()
const timestamp= (date+" "+time)
const currenttimestamp=timestamp.split(" ").join(" ")
const datetoday=datenow.getDate()
const month=datenow.getMonth()+1
const year=datenow.getFullYear()
const temp=(`${datetoday}-${month}-${year}`)
console.log(temp)
console.log(currenttimestamp)
  
const app= express();

app.get("/",(req,res)=>{
    res.send("server successfully started");
})



app.get("/datetime",(req,res)=>{
  
   
    let content =`The current timestamp is :  ${currenttimestamp}`
    console.log(dirName);

   fs.writeFile(`${dirName}/${temp}.txt`,content, (err)=>{

    if (err){
      
        res.send("error in this file")
        console.log(err)
        return
    }
    
    res.sendFile(path.join(`${dirName}/${temp}.txt`))

   
     })

    })

app.get("/delete" ,(req,res)=>{

    fs.unlink(`${dirName}/${temp}.txt` ,(err)=>{
        if(err){
           console.log(err)
           res.send('can not delete')
            return  
              }
        console,log('file was deleted')
        res.send('successfully deleted')
    })
})    




app.listen( 8802,()=>console.log("server started inn localhost:8802"))