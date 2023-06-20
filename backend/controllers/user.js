const User = require('../models/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/password');


// User sign-up controller function
exports.signUp = async (req, res) => {
    try {
      // Extract the required user data from the request body
      const { name, email, phone, password, role } = req.body;
  // Hash the password

  const hashedPassword = await hashPassword(password);

      // Create a new User object
      const user = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        isEmailConfirmed: false,
        role: role || 'User' // Set user role to 'User' if not provided
      });
  
      // Check if the user is a regular user
      if (user.role === 'User') {
        user.enrollmentNo = req.body.enrollmentNo;
        user.semester = req.body.semester;
        user.branch = req.body.branch;
      }
  
      // Save the user to the database
      await user.save();
      console.log("it works user ", user);
  
      // Send email confirmation link to the user
      await sendConfirmationEmail(user);
  
      // Return a success response
      res.json({ message: 'User registered successfully. Please check your email for confirmation.' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

const sendConfirmationEmail = async (user) => {
console.log("MAIL_PASSWORD:", process.env.MAIL_PASSWORD); // Add this line

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass:  process.env.MAIL_PASSWORD,
    }
  });

  const confirmationLink = `http://localhost:3000/api/users/confirm-email?email=${user.email}`;
  const logoUrl = 'https://i.ibb.co/VV67cNb/Collegiteslogo.gif';
  const mailOptions = {
    from: 'admin@collegites.tech',
    to: user.email,
    subject: 'Email Confirmation collegites',
    html: `
       <div style="font-family: Arial, sans-serif; text-align: center;">
        <img src="${logoUrl}" alt="Collegites - Study Smart" style="max-width: 200px; border-radius: 12px;">
        <h1 style="color: #0056b3;">Please Confirm Your Email Address</h1>
        <p style="font-size: 16px;">Thank you for choosing Collegites - Study Smart! We're excited to have you join our platform and embark on a journey of knowledge and growth.</p>
        <p style="font-size: 16px;">To get started, click the button below to confirm your email address:</p>
        <div style="margin-top: 30px;">
          <a href="${confirmationLink}" style="display: inline-block; padding: 12px 24px; background-color: #0056b3; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 4px;">Confirm Email Address</a>
        </div>
        <p style="font-size: 14px; margin-top: 30px;">If you have any questions or need assistance, please contact our support team at <a href="mailto:support@collegites.tech">support@collegites.tech</a>.</p>
        <p style="font-size: 14px; margin-top: 30px;">Best regards,</p>
        <p style="font-size: 14px; margin-bottom: 0;">Collegites - Study Smart </p>
        <p style="font-size: 5px; margin-bottom: 0;">A BlackR Industries Initiative</p>
        <img src="${logoUrl}" alt="Collegites - Study Smart Logo" style="max-width: 100px; margin-top: 20px;  border-radius: 12px;">
      </div>
    `
  };
console.log("before send mail")
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error.message);
    } else {
      console.log('Email sent:', info.response);
    }
  });
console.log("after send mail")

};


// User email confirmation controller function
exports.confirmEmail = async (req, res) => {
  try {
    const { email } = req.query;

    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the email confirmation status
    user.isEmailConfirmed = true;
    await user.save();

    // Return a success response
    res.json({ message: 'Email confirmed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User login controller function
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find the user by email
        const user = await User.findOne({ email });
        console.log("userin login", user)
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      console.log("till here delete")
      // Validate user password
      
      const isPasswordValid = await comparePassword(password, user.password);


      console.log("is password valid?",isPasswordValid)
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate and return the token
      const token = generateToken(user.id);
  console.log("token in login",token)
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
// Helper function to generate JWT token
const generateToken = (userId) => {
  // Generate a JWT token with the user ID as payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// User controller function to promote a user to moderator
exports.promoteToModerator = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's role to 'Moderator'
    user.role = 'Moderator';
    await user.save();

    // Return a success response
    res.json({ message: 'User promoted to moderator successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
