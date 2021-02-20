const express = require('express');
const app = express();
const path = require('path');
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRouter);
app.use('/cards', cardRouter);


app.get('*', (req,res) => {
  res.status(404).send({message: "Requested resource not found"})
});

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));