const express = require('express');
const limiter = require("./middleware/limiter")
const app = express();

app.use(express.json(), limiter);


app.get("/hit",(req,res)=>{
     
    res.json(req.body)

});
app.get("/hit2", (req, res) => {
     res.json(req.body);
});
app.listen(8080,()=>{
    console.log("server running on port 8080")
})

