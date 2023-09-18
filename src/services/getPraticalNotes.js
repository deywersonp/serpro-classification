const fs = require('fs');
const util = require('util');
const pdf = require('pdf-parse');

// Promisify fs.readFile to use async/await
const readFileAsync = util.promisify(fs.readFile);

const getPraticalNotes = async (type) => {
  // Read the PDF file
  const pdfFilePath = `./src/files/input/${type === 'cotas' ? 'autodeclarados-negros-pratica' : 'classificacao-geral-pratica'}.pdf`;

  const data = await readFileAsync(pdfFilePath);
  const pdfBuffer = Buffer.from(data);

  // Parse the PDF content
  const pdfData = await pdf(pdfBuffer);

  // Convert to text array and remove pdf page count
  const textArray = pdfData.text.split('\n').filter(text => text.trim().length > 3);

  // Concatenate the text from all pages into one string
  const candidates = textArray.join('').split('/');

  const splittedCandidates = candidates.map(candidate => {
    const splittedCandidate = candidate.split(',');

    return {
      name: splittedCandidate[1].split(' ').map(s => s.trim()).filter(s => s.length > 0).join(' '),
      praticalNote: Number(splittedCandidate[2].trim()),
    }
  });

  const sorted = splittedCandidates.sort((a, b) => a.praticalNote - b.praticalNote);

  const csvHeader = 'Name,PraticalNotes\n';

  // Create a CSV content by mapping the data array
  const csvContent = sorted
    .map(item => `${item.name},${item.praticalNote}`)
    .join('\n');

  // Combine the header and content to form the complete CSV data
  const completeCsvData = csvHeader + csvContent;

  // Write the CSV data to a file
  fs.writeFileSync('src/files/output/praticalNotes.csv', completeCsvData, 'utf8');

  return sorted;
};

module.exports = { getPraticalNotes };
