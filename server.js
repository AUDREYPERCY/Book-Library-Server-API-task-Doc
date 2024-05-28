require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { error } = require('console');
const fs = require('fs').promises;
const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());


const DATA_FILE = './data.json';

//function to read data from file
async function readData(){
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
}

//function to write data to file
async function writeData(data){
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));

}
//initialize data file if not present 
async function initData(){
    try {
        await fs.access(DATA_FILE);
    } catch (error){
        const initialData = { users: [], books: [] };
        await writeData(initialData);
    }
}

//initialize data file
initData();

app.post('/users', async (req, res) =>{
    try {
        const { username, password} = req.body;
        const data = await readData();
        const newUser = { id: Date.now(), username, password};
        data.users.push(newUser);
        await writeData(data);
        res.status(201).json(newUsers); 
    } catch (error) {
        res.status(500).json({ error: 'internal server Error'});
    }
});

app.post('/users/authenticate', async (req, res) => {
    try {
        const { username, password} = req.body;
        const data = await readData();
        const user = data.user.find(u => u.username === username && u.password === password);
        if (user) {
            res.status(200).json({ message: 'Authenticated sucessfully'});
            
        } else {
            res.status(401).json({ error: 'invaild credential'});
        }
    } catch (error) {
        res.status(500).json({ error: 'internal server error'});
    }
});

app.get('/users', async (req, res) => {
    try {
        const data = await readData();
        res.status(200),json(data.user);
    }catch (error) {
        res.status(500).json({ error: 'internal server error'});
    }
});

//BOok Routes
app.post('/books', async (req, res) => {
    try {
        const { title, author} = req.body;
        const data = await readData();
        const newBook = { id: Date.now(), title, author, loanedTo: null};
        data.books.push(newBook);
        await writeData(data);
        res.status(201),json(newBook);
    }catch (error) {
        res.status(500),json({ error: 'internal server error'});
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await readData();
        data.books = data.books.filter(book => book.id !== parseInt(id));
        await writeData(data);
        res.status(200),json({message: 'Book deleted sucessfully'});
    }catch (error) {
        res.status(500).json({error: 'internal server Error'});
    }
});

app.post('/books/:id/loan', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const data = await readData();
        const book = data.books.find(book => book.id === parseInt(id));
        if (book && !book.loanedTo) {
            book.loanedTo = userId;
            await writeData(data);
            res.status(200).json(book);
        }else {
            res.status(400).json({ error: 'Book not available for loan'});
        }
    }catch (error) {
        res.status(500).json({ error: 'internal server Error'});
    }
});

app.post('/books/:id/return', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await readData();
        const book = data.books.find(book => book.id === parseInt(id));
        if (book && book.loanedTo){
            book.loanedTo = null;
            await writeData(data);
            res.status(200).json(book);
        }else{
            res.status(400).json({error: 'Book not loaned out'});
        }
    }catch (error) {
        res.status(500).json({error: 'internal server Error'});
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const {id } = req.params;
        const { title, author} = req.body;
        const data = await readData();
        const book = data.books.find(book => book.id === parseInt(id));
        if (book) {
            book.title = title || book.title;
            book.author = author || book.author;
            await writeData(data);
            res.status(200).json(book);
        }else{
            res.status(404).json({ error: 'Book not found'});
        }

    }catch (error) {
        res.status(500).json({ error: 'internal server Error'});
    }
});

app.listen(PORT, () => {
    console.log('server is running on port ${PORT}');
})