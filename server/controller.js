const fs = require('fs')
var fortunes = ''
fortunes = fs.readFileSync("./server/fortunes.txt")
fortunes = fortunes.toString().split('\n')
var db = []
for (i=0;i<fortunes.length;i++){
    db.push({'fortuneId':i,'fortuneText':fortunes[i]})
}
console.log(fortunes.length)
let fortuneId = fortunes.length 
  
module.exports = {

    getRandomFortune: (req, res) => {
        // choose random fortunes
        let randomIndex = Math.floor(Math.random() * db.length);
        let randomFortune = db[randomIndex].fortuneText;
      
        res.status(200).send(randomFortune);
    },
    showFortune: (req, res) => {
        // show all fortunes
        res.status(200).send(db);
    },
    addFortune: (req, res) => {
        const { fortuneText } = req.body;
        console.log(fortuneText)
        const newObj = {
          fortuneId,
          fortuneText,
        };
        db.push(newObj);
        res.status(200).send(db);
        fortuneId++;
      },
    deleteFortune: (req, res) => {
        const { id } = req.params;
    
        //use the id to locate the resource/object
        const indexofFortune = db.findIndex((fortune) => fortune.fortuneId === +id);
        if (indexofFortune === -1) {
          res.status(400).send("Fortune not found");
          return;
        }
        //delete the object
        db.splice(indexofFortune,1);
        res.status(200).send(db);
      },
    updateFortune: (req, res) => {
        const { id } = req.params;
        const { newFortuneText } = req.query;
        console.log(newFortuneText)
        //use the id to locate the resource/object
        const indexofFortune = db.findIndex((fortune) => fortune.fortuneId === +id);
        console.log(indexofFortune)
        if (indexofFortune === -1) {
          res.status(400).send("Fortune not found");
          return;
        }
        //reassign the object/key-value pairs
        db[indexofFortune].fortuneText = newFortuneText;
        res.status(200).send(db);
    },
    

}