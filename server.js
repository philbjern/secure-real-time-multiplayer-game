require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');
const cors = require('cors');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const helmet = require("helmet")

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({origin: '*'})); 

app.use(helmet({
  // Prevent the client from guessing/sniffing the MIME type
  noSniff: true,

  // Prevent XSS attacks
  xssFilter: true,

  // Do not cache anything from the website in the client
  noCache: true,
  pragma: 'no-cache',

  hidePoweredBy: {
    setTo: 'PHP 7.4.3'
  },

  // Further security headers (with their configurations for helmet@^3.21.3)
  frameguard: {
    action: 'deny' // Prevent clickjacking by denying embedding in iframes
  },
  hsts: {
    maxAge: 0, // Set to 0 for no caching (be cautious with this in production if you desire HTTPS caching)
    includeSubDomains: false,
    preload: false
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Only allow resources from the same origin by default
      scriptSrc: ["'self'"], // Allow scripts from the same origin
      styleSrc: ["'self'", "fonts.googleapis.com", "fonts.gstatic.com"], // Allow styles from the same origin
      imgSrc: ["'self'"],   // Allow images from the same origin
      connectSrc: ["'self'"], // Allow connections (AJAX, WebSockets) to the same origin
      fontSrc: ["'self'"],    // Allow fonts from the same origin
      objectSrc: ["'none'"],  // Prevent embedding plugins like Flash
      mediaSrc: ["'self'"],   // Allow audio and video from the same origin
      frameSrc: ["'none'"],   // Prevent embedding other sites in iframes
      upgradeInsecureRequests: true, // Upgrade insecure requests (HTTP to HTTPS)
    },
  },
}));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

module.exports = app; // For testing
