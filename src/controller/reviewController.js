const { findOneAndUpdate } = require("../models/bookmodel")
const reviewModel = require("../models/reviewmodel")
const {isValid,isValidObjectId} = require("../validator/validator")

const Createreview = async function(req,res){
try {
    let bookid = req.param.bookId
    if(!isValidObjectId(bookid)){
        return res.status(400).send({status : false , msg : "This is invalid bookId"})
    }
    let BookId = await bookModel.findOne({_id : bookid , isDeleted : false})
    if(!BookId){
        return res.status(404).send({status : false , msg : "This bookId does not exit , Its already deleted"})
    }
    let {bookId,reviewedBy,reviewedAt,rating,review} = req.body
    if(!isValid(bookId)){
        return res.status(400).send({status : false , msg : "Please provide BookId its required and must be in correct format"})
    }if(!isValid(reviewedBy)){
        return res.status(400).send({status : false , msg : "Please provide reviewedBy its required and must be in correct format"})
    }if(!isValid(reviewedAt)){
        return res.status(400).send({status : false , msg : "Please provide reviewedAt its required and must be in correct format"})
    }if(!isValid(rating)){
        return res.status(400).send({status : false , msg : "Please provide rating its required and must be in correct format"})
    }if(!isValid(review)){
        return res.status(400).send({status : false , msg : " Please provide review its required and must be in correct format"})
    }
    let Updatereview = await reviewModel.findOneAndUpdate(id,{$inc :{review : 1}})
        return res.status(200).send({status : true , message : Success , data : Updatereview})
} catch (error) {
    res.status(500).send({status : false, msg : error.message})
}
}
// ### POST /books/:bookId/review
// - Add a review for the book in reviews collection.
// - Check if the bookId exists and is not deleted before adding the review. Send an error response with appropirate status code like [this](#error-response-structure) if the book does not exist
// - Get review details like review, rating, reviewer's name in request body.
// - Update the related book document by increasing its review count
// - Return the updated book document with reviews data on successful operation. The response body should be in the form of JSON object like [this](#successful-response-structure)
// ```yaml
// // {
// //   "_id": ObjectId("88abc190ef0288abc190ef88"),
// //   bookId: ObjectId("88abc190ef0288abc190ef55"),
// //   reviewedBy: "Jane Doe",
// //   reviewedAt: "2021-09-17T04:25:07.803Z",
// //   rating: 4,
// //   review: "An exciting nerving thriller. A gripping tale. A must read book."
// // }

module.exports = {Createreview}