const TRANSACTION_MODEL = require('../models/transactionModel');
const jwt = require('jsonwebtoken');
const jwt_pass = process.env.JWT_PASSWORD;

const addTransaction = async (req,res) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:'Authorization header is missing'});
    }
    try{   
        const token = authHeader.split(' ')[1];         // passed from axiosinstance in FE.
        const decodedToken = jwt.verify(token,jwt_pass);
        const userId = decodedToken.userId;
        
        TRANSACTION_MODEL ({
            date:req.body.date,
            type:req.body.type,
            amount:req.body.amount,
            category:req.body.category,
            reference:req.body.reference,
            description:req.body.description,
            addedBy:userId
        }).save().then((response) => {
            res.status(200).json({message:'successfully added new transaction'});
        });
    }catch(err){
        console.log(err);
        res.status(200).json({message:'couldn\'t add new transaction'});
    }

}

const getAllTransaction = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }
    const userID = req.body.userid;
    const frequency = req.body.frequency;
    const selcategory = req.body.selCategory;
    try {
        let dateFilter;
        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);

        if (frequency === "custom") {
            const customStartDate = req.body.selectedDate[0].startDate;
            const customEndDate = req.body.selectedDate[0].endDate;
            console.log(customStartDate, "start date");
            console.log(customEndDate, "end date");
            const selectedStartDate = new Date(customStartDate);
            const selectedEndDate = new Date(customEndDate);
            selectedStartDate.setDate(selectedStartDate.getDate() + 1);
            selectedEndDate.setDate(selectedEndDate.getDate() + 1);
            dateFilter = { $gte: selectedStartDate, $lte: selectedEndDate };
        } else if (frequency && frequency !== "custom") {
            dateFilter = {
                $gte: new Date(currentDate.getTime() - ((Number(frequency) - 1) * 24 * 60 * 60 * 1000)),
                $lte: currentDate
            };
            console.log("date:", dateFilter);
            console.log("filt date:", frequency);
        }
        const query = { addedBy: userID };
        if (dateFilter) {
            query.date = {
                $gte: dateFilter.$gte.toISOString().split('T')[0], // Extract date part and convert to ISO string
                $lte: dateFilter.$lte.toISOString().split('T')[0] // Extract date part and convert to ISO string
            };
        }
        if (selcategory !== '') {
            // Correcting the category query
            query.category = selcategory;
        }
        const result = await TRANSACTION_MODEL.find(query);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }

}



const updateTransaction = async (req,res) => {    
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:'Authorization header is missing'});
    }
    try{       
        if (!req.body._id) {
            return res.status(400).json({ message: '_id is required in request body' });
        }

        const updatedTransaction = await TRANSACTION_MODEL.findByIdAndUpdate(req.body._id, {
            date:req.body.date,
            type:req.body.type,
            amount:req.body.amount,
            category:req.body.category,
            reference:req.body.reference,
            description:req.body.description,
            addedBy:req.body.addedBy
        });
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        else{
            res.status(200).json({ message: 'Successfully updated transaction' });
        }        
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteTransaction = async (req,res) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:'Authorization header is missing'});
    }
    
    try{
        if (!req.body._id) {
            return res.status(400).json({ message: '_id is required in request body' });
        }
        const deleteEntry = await TRANSACTION_MODEL.findByIdAndDelete(req.body._id);
        if(deleteEntry) {
            res.status(200).json({message: 'Deleted Entry Successfully'});
        }
        if(!deleteEntry) {
            res.status(200).json({message: 'Transaction not found'});
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }    
}


module.exports = {addTransaction,getAllTransaction,updateTransaction,deleteTransaction}