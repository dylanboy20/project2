const express= require ('express')
const router =express.Router()
const auth=require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const User=require('../models/User')
const Contact=require('../models/Contact')




//@route           GET api/contacts
//@desc            Get all  user contacts
//@access          Private

router.get('/',auth,async (req,res) => {
    try {
             const contacts=await Contact.find({user: req.user.id}).sort({date:-1})
             res.json(contacts)

    } catch (error) {
        
            console.error(err.message)
            res.status(500).send('Server error')
    }
})


//@route           POST api/contacts
//@desc            Add a new contact
//@access          Private


router.post('/',[auth,[
    check('name','Name is reuired')
    .not()
    .isEmpty()


]], async (req,res) => {
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name,email,phone,type}=req.body

    try {
        const newContact=new Contact({
            name,
            email,
            phone,
            type,
            user:req.user.id
        })

        const contact= await newContact.save()
        res.json(contact)
    } catch (error) {

        console.error(err.message)
        res.status(500).send('Server error')
        
    }
    
})



//@route           PUT api/contacts/:id
//@desc            Updat Contact
//@access          Private

router.put('/:id', auth, async (req,res) => {
    const {name,email,phone,type}=req.body;

    // Build contact object
    const contactFields={};
    if(name) contactFields.name=name;
    if(email) contactFields.email=email;
    if(phone) contactFields.phone=phone;
    if(type) contactFields.type=type;

    try {
        let contact=await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({ msg: 'Contact not found'});

        // Make sure the user owns the contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:'Not Authorised'});
        }

        contact = await Contact.findByIdAndUpdate(
            req.params.id, 
            {$set: contactFields},
            {new: true}
        );

        res.json(contact);  
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


//@route           Delete api/contacts/:id
//@desc            Delete Contact
//@access          Private

router.delete('/:id',auth,async (req,res) => {
    try {
        let contact=await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({ msg: 'Contact not found'});

        // Make sure the user owns the contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:'Not Authorised'});
        }

        
        await Contact.findOneAndDelete({_id:req.params.id})
        res.json({msg:"Contact deleted "})

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

module.exports=router