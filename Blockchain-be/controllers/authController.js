import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ message: "Email đã tồn tại" });

        const newUser = await User.create({ name, email, password });
        res.status(201).json({ message: "Đăng ký thành công", user: newUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Sai mật khẩu" });

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
