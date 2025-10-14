

## 🧱 Backend Setup Roadmap
- ✅Initialize the project
- ✅Install dependencies
- ✅Create folder structure
- ✅Set up Express server
- ✅Connect to MongoDB
- Create models (Design, Order, Contact)
- Build routes (CRUD for each model)
- Test with Postman or frontend
- Enable CORS and middleware
- Deploy to Render

## Commands :
- $npm init -y
- npm install express mongoose cors dotenv
- npm install --save-dev nodemon

## 🧪 Hybrid Strategy for storing my own henna images
- Use local folder for dev (/public/images)
- Switch to Cloudinary or S3 for production
- Your HennaImage model stays the same — just swap out      imageUrl values

 ## (trim: true) is a schema option that automatically removes whitespace from the beginning and end of a string when it's saved to the database.

🧪 Testing
GET     /api/faqs             → Fetch all FAQs
POST    /api/faqs             → Create a new FAQ
PUT     /api/faqs/:id         → Update an existing FAQ
DELETE  /api/faqs/:id         → Delete a FAQ


