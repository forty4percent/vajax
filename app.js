const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));

let userList = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  
  const user = { name, email };
  userList.push(user);
  
  res.sendStatus(200);
});

// app.get('/list', (req, res) => {
//   res.send(userList);

// });

app.get('/list', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>User List</title>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            
            th, td {
              text-align: left;
              padding: 8px;
            }
            
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>User List</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              ${userList.map(user => `
                <tr>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
  });

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
