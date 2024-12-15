const express = require('express');
const pool = require('../db/pool');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.books1');
        res.json({ status: "success", data: result.rows });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});


router.post('/', async (req, res) => {
    const { booksname, author, category, publishedDate, image_url, summary } = req.body;

    
    if (!booksname || !author || !category || !publishedDate) {
        return res.status(400).json({ status: "fail", message: "Missing required fields" });
    }

    const sql = `INSERT INTO public.books1 (booksname, author, category, publisheddate, image_url, summary)
                 VALUES ($1, $2, $3, $4, $5, $6)`;

    try {
        const response = await pool.query(sql, [booksname, author, category, publishedDate, image_url, summary]);
        res.status(201).json({ status: "success", data: "Insert data success" });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ status: "error", message: error.message }); 
    }
});


router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    let { booksname, author, category, publishedDate, image_url, summary } = req.body;

    
    const isoDate = publishedDate ? new Date(publishedDate).toISOString().split('T')[0] : null;
    console.log('Formatted Date:', isoDate);  

    let sql = `
        UPDATE public.books1 SET booksname = $1, author = $2, category = $3, 
        publisheddate = $4, image_url = $5, summary = $6 WHERE booksid = $7
    `;

    try {
        let response = await pool.query(sql, [booksname, author, category, isoDate, image_url, summary, id]);

        if (response.rowCount > 0) {
            res.status(200).json({ status: "success", message: "Book updated successfully." });
        } else {
            res.status(404).json({ status: "fail", message: "Book not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal server error." });
    }
});





module.exports = router;
