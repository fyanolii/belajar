// langkah 1 Tempelkan code untuk menggunakan express 
const express = require('express');
const app = express();

// Tempelkan code untuk menghubungkan MySQL
const mysql = require('mysql');

// Langkah 3 Tempelkan code untuk menspesifikasikan folder public yang menyimpan file CSS dan image 
app.use(express.static('public'));

// Pastikan untuk mendapatkan nilai dari formulir yang di kirim
app.use(express.urlencoded({extended: false}));

// Definisikan constant connection dan isikan dengan code informasi koneksi
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'list-app'
});


// langkah ke 2 Tambahkan rute untuk halaman beranda
app.get('/', (req, res) => {
  res.render('top.ejs');
});

// Langkah ke 4 Tambahkan rute untuk halaman daftar
app.get('/index', (req, res) => {
   // Ketik code untuk mengakses data dari database 
   connection.query(
    'SELECT * FROM items',
    (error, results)=> {
    // Teruskan object sebagai argument kedua res.render
    res.render('index.ejs',{items:results});
      
    }
    );
 
});

// Tambahkan rute untuk menuju ke halaman penambahan item
app.get('/new', (req, res) => {
  res.render('new.ejs');
});

// Tambahkan route method untuk menambahkan item 
app.post('/create', (req, res) => {

  // Ketik kueri untuk menambahkan data ke database
  connection.query(
    'INSERT INTO items (name) VALUES(?)',
    [req.body.itemName],
   (error, results) => {
     res.redirect('/index');
   }
  );
}
);
// Spesifikasikan route parameter
app.post('/delete/:id', (req, res) => {
  connection.query('DELETE FROM items WHERE id=?',
  [req.params.id],
  (error, results) =>{
    res.redirect('/index');
});
});

// tambahkan rute untuk halaman edit
app.get('/edit/:id', (req, res) => {
  // Ketikan code untuk mendapatkan item yang dipilih dari database 
  connection.query(
    'SELECT * FROM items WHERE id =?',
    [req.params.id],
    (error, results)=> {
      res.render('edit.ejs',{item: results[0]});
    }
    );

  });
  // Tambahkan rute untuk memperbarui item
app.post('/update/:id', (req, res) => {
  // Ketik code untuk memperbarui item yang dipilih
  connection.query(
    'UPDATE items SET name=? WHERE id=?',
    [req.body.itemName, req.params.id],
    (error, results)=> {
      res.redirect('/index');
    }
    );
  
});



// Tempelkan code untuk menjalankan server
app.listen(3000);