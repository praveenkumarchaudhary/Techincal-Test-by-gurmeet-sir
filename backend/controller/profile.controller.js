import pool from '../config/db.js';

const CreateProfile = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        if (!name?.trim() || !email?.trim() || !phone?.trim() || !address?.trim()) {
            return res.status(400).json({
                message: "Please provide all required fields (name, email, phone, address)"
            });
        }

        const result = await pool.query(
            `INSERT INTO profiles (name, email, phone, address)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [name.trim(), email.trim(), phone.trim(), address.trim()]
        );

        res.status(201).json({
            message: "Profile Created Successfully",
            profile: result.rows[0]
        });
    } 
    catch(error) {
        console.error("CreateProfile Error:", error);

        if (error.code === "23505") {
            return res.status(409).json({
                message: "Email already exists. Please use a different email."
            });
        }

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const GetProfile = async (req, res) => {
    try {
        const { id } =req.params;

        const result = await pool.query(
            `SELECT * FROM profiles WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json(result.rows[0]);
    } 
    catch(error) {
        console.error("GetProfile Error:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const GetAllProfiles = async(req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM profiles ORDER BY id DESC`
        );

        res.status(200).json(result.rows);
    } 
    catch (error) {
        console.error("GetAllProfiles Error:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const UpdateProfile =async (req, res)=>{
    try {
        const { id } = req.params;
        const { name, email, phone, address } = req.body;

        if (!name?.trim() || !email?.trim() || !phone?.trim() || !address?.trim()) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        const result = await pool.query(
            `UPDATE profiles
             SET name = $1, email = $2,phone = $3, address = $4
             WHERE id = $5
             RETURNING *`,
            [name.trim(), email.trim(), phone.trim(), address.trim(), id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json({
            message: "Profile Successfully Updated",
            profile: result.rows[0]
        });

    } catch (error) {
        console.error("UpdateProfile Error:", error);
        if (error.code === "23505") {
            return res.status(409).json({
                message: "Email already exists. Please use a different email."
            });
        }

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

export default { CreateProfile, GetProfile, GetAllProfiles, UpdateProfile };