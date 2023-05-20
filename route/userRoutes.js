import { Router } from 'express';
import { User } from "../model/user.js";

const router = Router();

router.get('/add', (req, res) => {
    console.log('from add')
    const user = new User({
        name: 'Wilma',
        surname: 'Baggins'
    });

    user.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error(err);
        });
});

router.get('/', (req, res) => {
    User.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('No users are there, dude: ' + err);
        })
});

export default router;