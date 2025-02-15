const http = require("http");
const url = require('url');
const fs = require("fs");
const path = require("path");

const hostname = "localhost";
const port = 5000;


const mimeTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg',
}

http.createServer((req, res) => {
        var myurl = url.parse(req.url).pathname
        var filename = path.join(process.cwd(), unescape(myurl));
        console.log('file you are looking for is:' + filename)
        var loadFile;
        try {
            loadFile = fs.lstateSync(filename)
        } catch (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("404 page not found");
            res.end();
            return;
        }
        if (loadFile.isFile()) {
            var mimeType = mimeTypes[path.extname(filename).split('.').reverse()[0]];
            res.writeHead(200, { 'Content-Type': mimeType });
            var filestream = fs.createReadStream(filename);
            filestream.pipe(res);
        } else if (loadFile.isDirectory()) {
            res.writeHead(302, { 'location': 'index.html' });
            res.end();
        } else {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.write('500 internal erroe');
        }
    })
    .listen(port, hostname, () => {
        console.log(`Server is running at http://${hostname}:${port}/`);
    });