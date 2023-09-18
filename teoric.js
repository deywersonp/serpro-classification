const fs = require('fs');
const util = require('util');
const pdf = require('pdf-parse');

// Promisify fs.readFile to use async/await
const readFileAsync = util.promisify(fs.readFile);

// Replace 'your-document.pdf' with the path to your PDF file
const pdfFilePath = './files/classificacao-geral-teorica.pdf';

const readAndConcatenatePDF = async () => {
  try {
    // Read the PDF file
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
        name: splittedCandidate[1].trim(),
        p1: splittedCandidate[12].trim(),
        p2: splittedCandidate[14].trim(),
        note: Number(splittedCandidate[12].trim()) + (2 * Number(splittedCandidate[14].trim()))
      }
    });

    const sorted = splittedCandidates.sort((a, b) => a.note - b.note);
    console.log(sorted);

    const csvHeader = 'Name,P1,P2,TotalPoints,Note\n';

    // Create a CSV content by mapping the data array
    const csvContent = sorted
      .map(item => `${item.name},${item.p1},${item.p2},${item.note}`)
      .join('\n');

    // Combine the header and content to form the complete CSV data
    const completeCsvData = csvHeader + csvContent;

    // Write the CSV data to a file
    fs.writeFileSync('output2.csv', completeCsvData, 'utf8');
  } catch (error) {
    console.error('Error reading or parsing the PDF:', error);
  }
};

// Call the async function to read and concatenate the PDF
readAndConcatenatePDF();
