
import pool from '../config/db'

const CreateProfile = async (req, res) => {

    try {

        const { name, email, phone, address } = req.body

        if (!name || !email || !phone || !address) {
            return res.status(400).json({
                message: "please required all field",
            })
        }

        const result = await pool.query(
            `INSERT INTO profiles (name,email,phone,address)
         VALUES ($1,$2,$3,$4)
         RETURNING
        `
            [name, email, phone, address]
        )

        res.status(201), json({
            message: "Profile Created Successfully",
            profile: result.rows[0]
        })
    }

    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server Error",
            error: error.message

        })
    }



}


const GetProfile = async (req, res) => {
    try {
        const { id } = req.body
        const result = await pool.query(
            `SELECT * FROM products
         WHERE id = $1
         RETURNING *
         `
            [id]
        )


        if (product.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json(result.rows)
    }

    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server Error",
            error: error.message

        })
    }
}



const UpdateProfile = async (res, res) => {

    try {
        const { id } = req.body
        const { name, email, phone, address } = req.body

        const result = await pool.query(
            `UPDATE profiles
            SET  name=$1, email= $2, phone = $3 ,address= $4 
            WHERE id = $5

            RETURNING *
            `
            [name, email, phone, address,id]
        )

        res.status(200).json({
            message: "Profile Successully Updated",
            profile: result.rows[0]
        })
    }

    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

export default { CreateProfile, GetProfile, UpdateProfile }


