const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

let users = [];
let isSecureMode = true;

// Helper function to hash password insecurely (SHA1)
function insecureHash(password) {
    return crypto.createHash('sha1').update(password).digest('hex');
}

// Helper function to hash password securely (bcrypt)
async function secureHash(password) {
    const saltRounds = 12; // Strong work factor
    return await bcrypt.hash(password, saltRounds);
}

// Signup route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    let hashedPassword;
    if (isSecureMode) {
        hashedPassword = await secureHash(password);
    } else {
        hashedPassword = insecureHash(password);
    }

    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'User created successfully', mode: isSecureMode ? 'secure' : 'insecure' });
});

// List users route
app.get('/users', (req, res) => {
    res.json({ users, mode: isSecureMode ? 'secure' : 'insecure' });
});

// Toggle security mode route
app.post('/toggle-mode', (req, res) => {
    isSecureMode = !isSecureMode;
    res.json({ message: `Switched to ${isSecureMode ? 'secure' : 'insecure'} mode` });
});

const PORT = 8880;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Current mode: ${isSecureMode ? 'secure' : 'insecure'}`);
});