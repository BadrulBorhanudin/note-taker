const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content, callback) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
    if (err) {
      console.error(err);
    } else {
      if (callback) {
        callback(); // Call the callback function only if provided
      }
    }
  });
};

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData, () => {
        console.info(`\nNote written to ${file}`);
      });
    }
  });
};

const remove = (id, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const newData = parsedData.filter((note) => note.id != id);
      writeToFile(file, newData, () => {
        console.info(`\nNote deleted from ${file}`);
      });
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, remove };
