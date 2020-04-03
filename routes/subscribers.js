const express =  require('express')
const router = express.Router()
const Subscribers = require('../models/subscribers')
//Getting All
router.get('/', async function(req, res){
    try {
        const subscribers = await Subscribers.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({message: err.message}); 
    }
})
//Getting One
router.get('/:id', getSubscribers, function(req, res){
    res.json(res.subscriber);
})
//Creating One
router.post('/', async function(req, res){
    const subscribers = new Subscribers({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel
    })

    try {
        const newSubscribers = await subscribers.save()
        res.status(201).json(newSubscribers)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})
//Updating One
router.patch('/:id', getSubscribers, async function(req, res){
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscriberToChannel != null) {
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel
    }
    try{
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch(err) {
        res.status(400).json({message: err.message});
    }
})
//Deleting One
router.delete('/:id', getSubscribers, async function(req, res){
    try{
        await res.subscriber.remove()
        res.json({message: 'Deleted'})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

async function getSubscribers(req, res, next){
    let subscriber
    try{
        subscriber = await Subscribers.findById(req.params.id)
        if (subscriber == null){
            return res.status(404).json({message: 'Cannot find subscriber'} )
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }

    res.subscriber = subscriber
    next()
}
module.exports = router;