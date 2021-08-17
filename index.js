const express = require('express')
const app = express()
require('./mongoose')
const User = require('./data/users')
const Report = require('./data/accident')
const Penalty = require('./data/penality')
const Penality = require('./data/penality')
const port = 3000
app.use(express.json())
/*   Creates a user for later lookup */
app.post('/login', async (req, res) => {
    const user = new User(req.body)

    try {

        await user.save()
        const id = await user.id;
        
         const penalty = await new Penalty({ owner: id })
        await penalty.save()
        res.send(user)


    }
    catch (e) {
        res.status(400).send('smtn went' + e)
    }
    
})
/*    Lookin up user in db  */
app.post('/users', async (req, res) => {

    const { fullname, dlType, state, dlNum } = req.body;
    try {
        const user = await User.findOne({ fullname, dlType, state, dlNum })
        if (!user) {
            res.send('no such user')
        }
        res.send(user)
    }
    catch (e) {
        res.status(400).send('smtn went wrong' + e)
    }


})
// Takes an eye witness's discription and saves it on the report collection
app.post('/report', async (req, res) => {
    const report = new Report(req.body)
    try {
        await report.save()
        res.send(report.id)
    }
    catch (e) { res.status(400).send('smtn went wrong' + e) }

})
// Checks if the user has an un paid penalty 
app.post('/penalty', async (req, res) => {
   

    const { fullname, state, dlNum } = req.body;

    try {

        const user = await User.findOne({ fullname, state, dlNum })
        if (!user) {
            res.send('no such user')
        }
        const id = user.id;
        const penality = await Penalty.findOne({owner:id})
        if(!penality){
            res.send('smtn went wrong' )
        }
        if(penality.penalities.paid==='false'){
            res.send('has paid all his due'+'s')
        }
        res.send(penality)
    }
    catch (e) {
        res.status(400).send('smtn went wrong' + e)
    }


})
app.post('/getpenalty', (req, res) => {
    const {penalty_grade, paid}=req.body.penalities
    try{
        const penality=new Penality({penalities:{penalty_grade,paid}})
        penality.save()
        res.send(penality)
    }
    
    catch(e){
        res.send('there has been an error'+e)
    }

})
app.post('/checkpenalty',(req,res)=>{
const{owner,penalities}=req.body
try{
const pen= Penality.findOneAndUpdate({owner:owner},{penalities:{}})
res.send(pen)
}

catch(e){
    res.send('smtn went wrong'+e)
}
})
app.listen(port, () => { console.log('app is up at port 3000') })

