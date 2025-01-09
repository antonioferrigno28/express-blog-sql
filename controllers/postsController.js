const connection = require("../db/conn.js");

//index
function index(req, res) {
  let sql = "SELECT * FROM `posts`";

  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "La query non è andata a buon fine" });
    }
    res.json(results);
  });
  // const { tags, titolo } = req.query;

  // let filteredPosts = [...postsData];

  // if (tags) {
  //   filteredPosts = filteredPosts.filter((post) => post.tags.includes(tags));
  // }

  // if (titolo) {
  //   filteredPosts = filteredPosts.filter(
  //     (post) => post.titolo.toLowerCase() === titolo.toLowerCase()
  //   );
  // }

  // res.json(filteredPosts);
}

//show
function show(req, res) {
  const id = parseInt(req.params.id);

  const post = postsData.find((post) => post.id === id);

  if (post) {
    res.json(post);
  } else {
    res.status(418).json({ error: "Post non trovato, sono solo una teiera" });
  }
}

//store (create)
function store(req, res) {
  const { titolo, contenuto, immagine, tags } = req.body;
  const id = postsData.at(-1).id + 1;

  if (!titolo || !contenuto || !immagine || !tags) {
    return res.status(400).json({ error: "Parametri errati" });
  }

  const newPost = { id, titolo, contenuto, immagine, tags };
  postsData.push(newPost);

  console.log(newPost);

  res.json(newPost);
}

//update
function update(req, res) {
  const id = parseInt(req.params.id);

  let post = postsData.find((post) => post.id === id);

  if (!post) {
    return res.status(418).json({
      error: "Post non trovato",
    });
  }

  const { titolo, contenuto, immagine, tags } = req.body;

  if (!titolo || !contenuto || !immagine || !tags) {
    return res.status(418).json({
      error: "Parametri sbagliati",
    });
  }

  post.titolo = titolo;
  post.contenuto = contenuto;
  post.immagine = immagine;
  post.tags = tags;
  res.json(post);
}

//destroy
function destroy(req, res) {
  const id = parseInt(req.params.id);
  const sql = "DELETE FROM `posts` WHERE `id`=?";
  connection.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "La query non è andata a buon fine" });
    }
    res.sendStatus(204);
  });

  // const id = parseInt(req.params.id);

  // const post = postsData.find((post) => post.id === id);

  // if (!post) {
  //   res.status(418).json({ error: "Post non trovato, sono solo una teiera" });
  // }
  // const postIndex = postsData.indexOf(post);

  // postsData.splice(postIndex, 1);

  // console.log(postsData);
  // res.sendStatus(204);
}

module.exports = { index, show, store, update, destroy };
