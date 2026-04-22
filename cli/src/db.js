const Database = require('better-sqlite3');
const db = new Database('./favorites.db');

const createTable =`
CREATE TABLE IF NOT EXISTS favorites (
id INTEGER PRIMARY KEY,
name TEXT NOT NULL,
url TEXT NOT NULL
)
`;

//db.exec('DROP TABLE IF EXIST favorites');
db.exec(createTable);
//const queryTables="SELECT name FROM sqlite_master WHERE type='table'";
//const table=db.prepare(queryTables).all();
//console.log(table);

//const insertData = 'INSERT INTO favorites (name, url) VALUES (?,?)';
//db.prepare(insertData).run('Google','https://www.google.com');
//console.log(db.prepare('SELECT * FROM favorites').all());

const insertDataQuery=db.prepare(
    'INSERT INTO favorites (name, url) VALUES (?,?)'
);


const data =[
    {name: 'social', url: 'https://www.facebook.com'},
    {name: 'search', url: 'https://www.google.com'},
    {name: 'video', url: 'https://www.youtube.com'},
    {name: 'news', url: 'https://www.nytimes.com'},
    {name: 'shopping', url: 'https://www.amazon.com'},
];

data.forEach((favorite) => {
    insertDataQuery.run(favorite.name, favorite.url);
    
});

console.log(db.prepare('SELECT url FROM favorites WHERE name =?').get('social').url);