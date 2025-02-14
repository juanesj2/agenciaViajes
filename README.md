Travel Agency Website 🌎✈️
A modern travel agency website built with Node.js and Express, offering a seamless booking experience for travelers.

Features
📱 Responsive design for all devices
🔒 Secure user authentication
🏨 Hotel and destination browsing
✈️ Flight booking integration
💳 Secure payment processing
📅 Trip scheduling and management
📍 Interactive destination maps
📸 Photo galleries for destinations
Tech Stack
Node.js
Express
MySQL
Sequelize ORM
EJS Templates
Bootstrap
JavaScript
Installation
Clone the repository:
git clone https://github.com/juanesj2/agenciaViajes.git
cd agenciaViajes
Install dependencies:
npm install
Configure environment variables: Create a .env file in the root directory and add:
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
DB_HOST=your_database_host
Start the development server:
npm run dev
Project Structure
agenciaViajes/
├── config/
│   └── database.js
├── controllers/
│   ├── paginasController.js
│   └── testimonialController.js
├── models/
│   ├── Viaje.js
│   └── Testimonial.js
├── public/
│   ├── css/
│   ├── js/
│   └── img/
├── views/
│   ├── layout/
│   └── pages/
├── routes/
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
Database Setup
Create a MySQL database
Run the migrations:
npm run db:migrate
(Optional) Seed the database with sample data:
npm run db:seed
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
Juan Esteban - @juanesj2

Project Link: https://github.com/juanesj2/agenciaViajes

Acknowledgments
Node.js community
Express.js team
Bootstrap contributors
All our contributors and users
