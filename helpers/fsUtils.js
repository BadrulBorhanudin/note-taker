// Importing the 'fs' (File System) module for file operations
const fs = require('fs');

// Importing the 'util' module for utility functions, including promisify
const util = require('util');

// Promisifying the 'readFile' function from 'fs' to use promises
const readFromFile = util.promisify(fs.readFile);

/**
 * Writes content to a file in JSON format with proper formatting.
 * @param {string} destination - The file path to write the content to.
 * @param {object} content - The content to be written to the file.
 * @param {function} callback - A callback function to execute after writing the file.
 */
const writeToFile = (destination, content, callback) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
    if (err) {
      // If an error occurs during file write, log the error
      console.error(err);
    } else {
      // If the write is successful, and a callback is provided, execute the callback
      if (callback) {
        callback();
      }
    }
  });
};

/**
 * Reads data from a file, appends content, and writes it back to the file.
 * @param {object} content - The content to append to the file.
 * @param {string} file - The file path to read, append, and write the content.
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      // If an error occurs during file read, log the error
      console.error(err);
    } else {
      // Parse existing data, append new content, and write back to the file
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData, () => {
        // Execute the callback to log that the note was written to the file
        console.info(`\nNote written to ${file}`);
      });
    }
  });
};

/**
 * Reads data from a file, removes a note by ID, and writes the updated data back to the file.
 * @param {string} id - The ID of the note to be removed.
 * @param {string} file - The file path to read, remove, and write the updated content.
 */
const remove = (id, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      // If an error occurs during file read, log the error
      console.error(err);
    } else {
      // Parse existing data, filter out the note by ID, and write back to the file
      const parsedData = JSON.parse(data);
      const newData = parsedData.filter((note) => note.id != id);
      writeToFile(file, newData, () => {
        // Execute the callback to log that the note was deleted from the file
        console.info(`\nNote deleted from ${file}`);
      });
    }
  });
};

// Exporting the functions for use in other modules
module.exports = { readFromFile, writeToFile, readAndAppend, remove };
