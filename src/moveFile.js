'use strict';
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const { fsErrorsProcessor } = require('./fsErrorsProcessor');
const { getFileName } = require('./getFileName');
const { PATH_SLASH } = require('./constants');

function moveFile(curPath, desiredPath) {
  const currentRelativePath = path.join(__dirname, curPath);
  let desiredRelativePath = path.join(__dirname, desiredPath);
  const fileName = getFileName(curPath);
  const isDirectoryPath = fs.existsSync(desiredRelativePath);

  if (desiredRelativePath === currentRelativePath) {
    console.error('Your cannot move file to the same directory');

    return;
  }

  if (desiredRelativePath[desiredRelativePath.length - 1] === PATH_SLASH) {
    desiredRelativePath += fileName;
  }

  if (isDirectoryPath) {
    desiredRelativePath += PATH_SLASH + fileName;
  }

  try {
    const fileData = fs.readFileSync(currentRelativePath, 'utf-8');

    fs.writeFileSync(desiredRelativePath, fileData);

    fs.unlinkSync(currentRelativePath);

    console.log('Your file has been moved successfuly');
  } catch (error) {
    const errorMessage = fsErrorsProcessor(error);

    // eslint-disable-next-line
    console.error(errorMessage);
  };
}

module.exports = {
  moveFile,
};