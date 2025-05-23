const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req,res) => {
    res.send(posts);
}
);

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    }
    if (type === 'CommentCreated') {
        const {id, content, status, postId} = data;
        const post = posts[postId];
        post.comments.push({id, content, status});
    }
    if (type === 'CommentUpdated') {
        const {id, content, status, postId} = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        }
        );
        comment.status = status;
        comment.content = content;
    }
}
;

app.post('/events', (req,res) => {
    
    const {type, data} = req.body;
    console.log(posts);
    handleEvent(type, data);
    res.status(201).send({});
}
);

app.listen(4002,async ()=> {
    console.log('Query Service listening on 4002');
    try {
        const res = await axios.get("http://event-bus-srv:4005/events");
     
        for (let event of res.data) {
          console.log("Processing event:", event.type);
     
          handleEvent(event.type, event.data);
        }
      } catch (error) {
        console.log(error.message);
      }
}
);