let express = require("express");
let app = express();
module.exports = app;

let { open } = require("sqlite");
let sqlite3 = require("sqlite3");

let path = require("path");
let dbpath = path.join(__dirname, "moviesData.db");

let db = null;

let intializeDBAndServer = async () => {
  db = await open({
    filename: dbpath,
    driver: sqlite3.Database,
  });
  app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
  });
};
intializeDBAndServer();
//============================GET==================================
app.get("/movies/", async (request, response) => {
  let getMoviesQuery = `
    SELECT 
    *
    FROM 
    movie
    ORDER BY 
    movie_id;
    `;
  let moviesList = await db.all(getMoviesQuery);
  response.send(moviesList);
});

//=============================POST======================================

app.post("/movies/", async (request, response) => {
  let { directorId, movieName, leadActor } = request.body;
  let addMovieQuery = `
    INSERT INTO 
    movie (director_id, movie_name, lead_actor)
    VALUES
    (
        ${directorId},
        ${movieName},
        ${leadActor},

    );

    `;
  await db.run(addMovieQuery);
  response.send("Movie Successfully Added");
});
