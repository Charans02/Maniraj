const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Load guest messages from file
let guestMessages = [];
const messagesFile = path.join(__dirname, 'guestMessages.json');

if (fs.existsSync(messagesFile)) {
  const data = fs.readFileSync(messagesFile, 'utf-8');
  try {
    guestMessages = JSON.parse(data);
  } catch (err) {
    console.error('Error parsing guestMessages.json:', err);
  }
}

// Home
app.get('/', (req, res) => {
  res.render('index');
});

// Gallery
app.get('/gallery', (req, res) => {
  const photos = [
    { filename: '01.jpg', caption: '1999 - Their wedding day' },
    { filename: '02.jpg', caption: '1999 - The First Knot' },
    { filename: '03.jpg', caption: '1999 - The Couple' },
    { filename: '04.jpg', caption: 'First Photo After Marriage' },
    { filename: '05.jpg', caption: '2002 - They Welcomed the First Child' },
    { filename: '06.jpg', caption: '2005 - They Welcomed the Second Child' },
    { filename: '07.jpg', caption: 'Many Birthdays for their Children' },
    { filename: '08.jpg', caption: 'Birthdays' },
    { filename: '09.jpg', caption: 'Their Two SuperStars' },
    { filename: '10.jpg', caption: 'Outings Together' },
    { filename: '11.jpg', caption: 'Outings Together' },
    { filename: '12.jpg', caption: 'Might be First Proper Group Pic' },
    { filename: '13.jpg', caption: 'Selfies Together' },
    { filename: '14.jpg', caption: 'Love Between Them' },
    { filename: '15.jpg', caption: 'The Ring Bond' },
    { filename: '16.jpg', caption: 'Supporting Parents' },
    { filename: '17.jpg', caption: 'Supporting Parents' },
    { filename: '18.jpg', caption: 'Flowers Gift' },
    { filename: '19.jpg', caption: 'Keep Happy Forever Mom and Dad' },
  ];
  res.render('gallery', { photos });
});

// Wishes page
app.get('/wishes', (req, res) => {
  res.render('wishes', { guestMessages });
});

// Handle form submission
app.post('/wishes', (req, res) => {
  const { name, message } = req.body;
  if (name && message) {
    const newEntry = { name, message };
    guestMessages.push(newEntry);

    // Save back to the JSON file
    fs.writeFile(messagesFile, JSON.stringify(guestMessages, null, 2), (err) => {
      if (err) {
        console.error('Error saving guest messages:', err);
      }
      res.redirect('/wishes');
    });
  } else {
    res.redirect('/wishes');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Anniversary site running on http://localhost:${PORT}`);
});
