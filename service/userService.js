


// exports.getBooks = (req, res) => {

//     res.status(200).json({status: "success", data: dataBooks})
// }

// exports.createBooks =  (req, res) => {
//     let body = req.body
//     console.log(body);
//     let repoonse = dataBooks.filter((e) => e.Name == body.name)
//     res.status(200).json(repoonse) 
    
// }

// exports.updataBooks = (req, res) => {
//     if(!req.params.id) {
//         res.status(400).setDefaultEncoding({ status: "fail", message: "bad request"})
//     }
//     res.status(200).json({status : "sucess", data : "update successfully"})
// }

// exports.deleteBooks = (req, res) => {
//     let id = req.params.id
//     res.status(200).json({data: "Delete wll"})
// }