import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user-route.js';
import './config/db.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter)

app.get('/', (req, res) => {
	res.send('API WORKING');
})

app.listen(port, () => console.log('Server Started', port));