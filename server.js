require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Models
const Project = require('./models/Project');
const Message = require('./models/Message');
const Silver = require('./models/Silver');

const app = express();
const PORT = process.env.PORT || 5000;

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configure Helmet (adjusting contentSecurityPolicy to allow Tailwind and fonts CDNs)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.tailwindcss.com", "https://cdn.jsdelivr.net", "blob:"],
        scriptSrcAttr: ["'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://lh3.googleusercontent.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'"]
      }
    }
  })
);
app.use(compression());

// Serve Static Frontend files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Database Seeding Logic
const seedDatabase = async () => {
  try {
    // Clear existing projects to reload the exact updated details from resume
    await Project.deleteMany({});
    console.log('🌱 Seeding projects database...');

    let mobigoImageUrl = '/mobigo_mockup.png';
    const localMockupPath = path.join(__dirname, 'mobigo_mockup.png');

    if (fs.existsSync(localMockupPath)) {
      try {
        console.log('📤 Uploading mobigo_mockup.png to Cloudinary...');
        const uploadResult = await cloudinary.uploader.upload(localMockupPath, {
          folder: 'portfolio_projects'
        });
        mobigoImageUrl = uploadResult.secure_url;
        console.log('✅ MobiGo Mockup uploaded to Cloudinary:', mobigoImageUrl);
      } catch (uploadErr) {
        console.error('❌ Failed to upload MobiGo image to Cloudinary, using local fallback:', uploadErr);
      }
    }

    await Project.create([
      {
        title: "MobiGo",
        description: "Production-ready food delivery app (Zomato-inspired) built with MERN + TypeScript using microservices architecture. Services communicate asynchronously via RabbitMQ message broker. Features real-time order tracking with live map (Mapbox) and Socket.IO. Fully containerized with Docker, deployed on AWS with automated CI/CD pipeline (GitHub Actions). Media handled via Cloudinary; secure auth with JWT + OAuth 2.0.",
        techStack: ["TypeScript", "React (Vite)", "Node.js", "Express.js", "MongoDB Atlas", "Socket.IO", "RabbitMQ", "Docker", "AWS EC2 (RabbitMQ)", "Vercel", "Render", "Stripe", "Razorpay", "Cloudinary", "Mapbox"],
        imageUrl: mobigoImageUrl,
        liveLink: "https://mobi-go-eight.vercel.app/",
        githubLink: "https://github.com/rajnikant"
      },
      {
        title: "Chatify",
        description: "Full-stack real-time chat app built with MERN + Socket.IO. Features JWT authentication, Google OAuth 2.0, online user status, and responsive UI.",
        techStack: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT", "OAuth 2.0", "Passport.js", "Redux Toolkit", "Tailwind CSS", "Vite", "Render", "Vercel"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuZspQGU_x1GWdOM61BC4kIX39e0zd0f8s9ZkO1Vs4rbXBF72QO_c4gxWW8dhH5j2aJGlUweCW5MEJgwKpXF6td3QamfUNR3yjs2svU8-GYO2yRq8n7gKgj3T7YgLPiUgOCL8LwTNnIJlv8GPbX0UxK2igCVXtZNxix2dgl46aNJJCaPc1dVbiBXbmAH3OOQoAm65UAuGYtsurZJtIAnqEdHXxrcoysfb-gpZBZNjNl6KEHHBnw_zkaApEhhFiJJy9dzwYZnij7ADT",
        liveLink: "https://chatify-azure-omega.vercel.app/",
        githubLink: "https://github.com/rajnikant"
      },
      {
        title: "Wanderlust",
        description: "Full-stack travel listing platform with complete CRUD, Cloudinary image uploads, Mapbox location integration, and responsive UI.",
        techStack: ["Node.js", "Express.js", "MongoDB Atlas", "EJS", "Tailwind CSS", "Bootstrap", "Passport.js", "Cloudinary", "Mapbox SDK", "Vercel"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMNtsGfo8Xd3X6bd9gfN67jgUGEnLX20zuwCBWXgeBgg8BA51X7GmANyNNIr2mFZDH_uofs_Y6xi0j1ibaw_2wSc9NiSJ7niUAEP2iY2M4FHHWwXpZnaEEqXj2REDntpwQL3Y6vJyQgBAf_zhUi1nl1qZ8LygH-OO8qXl980ZgrrZCl1T_8Js6PPh82deT58xJQBKSkqBoadOiWqg7QxloZOmSxz7eIo7rajH-vVB92JKkN1BHm5RUWF21nTfdhM2h5H1WfddOtRLE",
        liveLink: "https://wanderlust-btjg.onrender.com/",
        githubLink: "https://github.com/rajnikant"
      }
    ]);
    console.log('✅ Projects seeded successfully.');

    const silverCount = await Silver.countDocuments();
    if (silverCount === 0) {
      console.log('🌱 Seeding Silver Play Button images...');
      await Silver.create({
        images: [
          process.env.SILVER_IMAGE1_URL,
          process.env.SILVER_IMAGE2_URL,
          process.env.SILVER_IMAGE3_URL
        ]
      });
      console.log('✅ Silver Play Button seeded successfully.');
    }
  } catch (err) {
    console.error('❌ Database seeding failed:', err);
  }
};

// Database Connection
const mongoUri = (process.env.MONGO_URI || '').replace(/#/g, '%23');
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('🚀 Connected to MongoDB Database.');
    seedDatabase();
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
  });

// Rate limiting for Contact Form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { error: 'Too many contact messages sent from this IP. Please try again after an hour.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Multer storage setup for optional image uploading
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Helper validation & sanitization function
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// API Endpoints

const fallbackProjects = [
  {
    title: "MobiGo",
    description: "Production-ready food delivery app (Zomato-inspired) built with MERN + TypeScript using microservices architecture. Services communicate asynchronously via RabbitMQ message broker. Features real-time order tracking with live map (Mapbox) and Socket.IO. Fully containerized with Docker, deployed on AWS with automated CI/CD pipeline (GitHub Actions). Media handled via Cloudinary; secure auth with JWT + OAuth 2.0.",
    techStack: ["TypeScript", "React (Vite)", "Node.js", "Express.js", "MongoDB Atlas", "Socket.IO", "RabbitMQ", "Docker", "AWS EC2 (RabbitMQ)", "Vercel", "Render", "Stripe", "Razorpay", "Cloudinary", "Mapbox"],
    imageUrl: "/mobigo_mockup.png",
    liveLink: "https://mobi-go-eight.vercel.app/",
    githubLink: "https://github.com/rajnikant"
  },
  {
    title: "Chatify",
    description: "Full-stack real-time chat app built with MERN + Socket.IO. Features JWT authentication, Google OAuth 2.0, online user status, and responsive UI.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT", "OAuth 2.0", "Passport.js", "Redux Toolkit", "Tailwind CSS", "Vite", "Render", "Vercel"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuZspQGU_x1GWdOM61BC4kIX39e0zd0f8s9ZkO1Vs4rbXBF72QO_c4gxWW8dhH5j2aJGlUweCW5MEJgwKpXF6td3QamfUNR3yjs2svU8-GYO2yRq8n7gKgj3T7YgLPiUgOCL8LwTNnIJlv8GPbX0UxK2igCVXtZNxix2dgl46aNJJCaPc1dVbiBXbmAH3OOQoAm65UAuGYtsurZJtIAnqEdHXxrcoysfb-gpZBZNjNl6KEHHBnw_zkaApEhhFiJJy9dzwYZnij7ADT",
    liveLink: "https://chatify-azure-omega.vercel.app/",
    githubLink: "https://github.com/rajnikant"
  },
  {
    title: "Wanderlust",
    description: "Full-stack travel listing platform with complete CRUD, Cloudinary image uploads, Mapbox location integration, and responsive UI.",
    techStack: ["Node.js", "Express.js", "MongoDB Atlas", "EJS", "Tailwind CSS", "Bootstrap", "Passport.js", "Cloudinary", "Mapbox SDK", "Vercel"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMNtsGfo8Xd3X6bd9gfN67jgUGEnLX20zuwCBWXgeBgg8BA51X7GmANyNNIr2mFZDH_uofs_Y6xi0j1ibaw_2wSc9NiSJ7niUAEP2iY2M4FHHWwXpZnaEEqXj2REDntpwQL3Y6vJyQgBAf_zhUi1nl1qZ8LygH-OO8qXl980ZgrrZCl1T_8Js6PPh82deT58xJQBKSkqBoadOiWqg7QxloZOmSxz7eIo7rajH-vVB92JKkN1BHm5RUWF21nTfdhM2h5H1WfddOtRLE",
    liveLink: "https://wanderlust-btjg.onrender.com/",
    githubLink: "https://github.com/rajnikant"
  }
];

// 1. GET /api/projects - Fetch all projects
app.get('/api/projects', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json(fallbackProjects);
    }
    const projects = await Project.find({});
    res.status(200).json(projects.length ? projects : fallbackProjects);
  } catch (err) {
    res.status(200).json(fallbackProjects);
  }
});

// 2. GET /api/silver - Fetch Silver Play Button images
app.get('/api/silver', async (req, res) => {
  try {
    const silverFallbacks = [
      process.env.SILVER_IMAGE1_URL || "https://res.cloudinary.com/dkzzbjfb2/image/upload/v1779541245/IMG_20250905_153755.jpg_d1httd.jpg",
      process.env.SILVER_IMAGE2_URL || "https://res.cloudinary.com/dkzzbjfb2/image/upload/v1779541244/IMG_20250905_153737.jpg_hymwkp.jpg",
      process.env.SILVER_IMAGE3_URL || "https://res.cloudinary.com/dkzzbjfb2/image/upload/v1779541245/IMG_20250905_152723.jpg_zb8sjg.jpg"
    ];
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json(silverFallbacks);
    }
    const silverData = await Silver.findOne({});
    if (silverData && silverData.images && silverData.images.length) {
      res.status(200).json(silverData.images);
    } else {
      res.status(200).json(silverFallbacks);
    }
  } catch (err) {
    res.status(200).json([
      process.env.SILVER_IMAGE1_URL,
      process.env.SILVER_IMAGE2_URL,
      process.env.SILVER_IMAGE3_URL
    ]);
  }
});

// 3. POST /api/contact - Submit contact form and send email
app.post('/api/contact', contactLimiter, async (req, res) => {
  let { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  // Sanitization
  name = sanitizeInput(name.trim());
  email = email.trim();
  subject = sanitizeInput(subject.trim());
  message = sanitizeInput(message.trim());

  if (name.length < 2 || subject.length < 2 || message.length < 10) {
    return res.status(400).json({
      error: 'Validation failed: Name and Subject must be at least 2 characters, and Message must be at least 10 characters.'
    });
  }

  try {
    // Save to Database
    const newMessage = await Message.create({ name, email, subject, message });

    // Send Mail using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `💼 Portfolio Contact: "${subject}" from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #00ff66; border-bottom: 2px solid #00ff66; padding-bottom: 8px;">New Portfolio Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #00ff66; border-radius: 4px;">
            <strong>Message:</strong><br/>
            ${message.replace(/\n/g, '<br/>')}
          </p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
          <p style="font-size: 11px; color: #888;">Logged in Database at ${newMessage.timestamp}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('❌ Error handling contact form submission:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

// 4. POST /api/upload-image - Admin image upload to Cloudinary
app.post('/api/upload-image', upload.single('image'), async (req, res) => {
  // Simple check for authorization (header key for simplicity or just basic route validation)
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.CLOUDINARY_API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized. Valid API Key required in Authorization header.' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image file.' });
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio_uploads'
    });
    // Clean up local temp file
    fs.unlinkSync(req.file.path);
    res.status(200).json({ success: true, url: uploadResult.secure_url });
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error('❌ Cloudinary Upload Error:', err);
    res.status(500).json({ error: 'Image upload to Cloudinary failed.' });
  }
});

// Serve frontend fallback for SPA (Express v5 named splat syntax)
app.get('{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`📡 Server running in production mode on http://localhost:${PORT}`);
});
