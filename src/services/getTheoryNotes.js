const fs = require('fs');
const util = require('util');
const pdf = require('pdf-parse');

// Promisify fs.readFile to use async/await
const readFileAsync = util.promisify(fs.readFile);

const AVAILABLE_CATEGORIES = {
  general: 'classificacao-geral-teorica.pdf',
  quotas: 'autodeclarados-negros-teorica.pdf',
};

const getTheoryNotes = async (category) => {
  // Read the PDF file
  if (!category || !Object.keys(AVAILABLE_CATEGORIES).includes(category)) {
    throw new Error(`Invalid category. Available categories are: ${Object.keys(AVAILABLE_CATEGORIES).join(', ')}.`);
  }

  const pdfFilePath = `./src/files/input/${AVAILABLE_CATEGORIES[category]}`;

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
      p1: splittedCandidate[12].trim(),
      p2: splittedCandidate[14].trim(),
      theoryNote: Number(splittedCandidate[12].trim()) + (2 * Number(splittedCandidate[14].trim()))
    }
  });

  const sorted = splittedCandidates.sort((a, b) => a.theoryNote - b.theoryNote);

  const csvHeader = 'Name,P1,P2,TheoryNote\n';

  // Create a CSV content by mapping the data array
  const csvContent = sorted
    .map(item => `${item.name},${item.p1},${item.p2},${item.theoryNote}`)
    .join('\n');

  // Combine the header and content to form the complete CSV data
  const completeCsvData = csvHeader + csvContent;

  // Write the CSV data to a file
  fs.writeFileSync(`src/files/output/${category}-theory-notes.csv`, completeCsvData, 'utf8');

  return sorted;
};

module.exports = { getTheoryNotes };
