const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const postList = require("./views/postList");
const postDetails = require("./views/postDetails");
const client = require('./db');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res, next) => {
  try {	
	const data = await client.query(`SELECT posts.*, count.upvotes 
		FROM posts 
		INNER JOIN (SELECT postId, COUNT(*) as upvotes FROM upvotes GROUP BY postId) 
		AS count
		ON posts.id = count.postId`);

	// const upvotes = await client.query(`SELECT * FROM upvotes`);
	// 	console.log(upvotes);
	console.log(data.rows);
	const posts = data.rows;
	res.send(postList(posts));
  }
  catch(error) {
  	next(error);
  }
  // const posts = postBank.list();
  // res.send(postList(posts));
});

app.get("/posts/:id", async (req, res, next) => {
  try {
	const data = await client.query(`SELECT * FROM posts WHERE id = ${req.params.id}`);
	
	const posts = data.rows;
	console.log(posts);
	res.send(postList(posts));
  }
  catch (error) {
  	next(error);
  }
  // const post = postBank.find(req.params.id);
  // res.send(postDetails(post));
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});