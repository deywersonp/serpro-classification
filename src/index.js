const fs = require('fs');
const { getPraticalNotes } = require('./services/getPraticalNotes');
const { getTeoricNotes } = require('./services/getTeoricNotes');

const getFinalClassification = async () => {
  try {
    const praticalNotes = await getPraticalNotes('cotas');
    const teoricalNotes = await getTeoricNotes('cotas');

    const result = praticalNotes
      .map(c => {
        const candidate = teoricalNotes.find(tn => tn.name.trim() === c.name.trim());

        if (!candidate) {
          console.log('Error trying to get candidate', c.name)
        }

        return {
          ...candidate,
          ...c,
          finalNote: Number((candidate.teoricNote + c.praticalNote).toFixed(2))
        }
      }).filter(c => c.praticalNote !== 0);

    const sorted = result.sort((a, b) => b.finalNote - a.finalNote);

    const csvHeader = 'Name,P1,P2,TeoricNote,PraticalNote,FinalNote\n';

    // Create a CSV content by mapping the data array
    const csvContent = sorted
      .map(item => `${item.name},${item.p1},${item.p2},${item.teoricNote},${item.praticalNote},${item.finalNote}`)
      .join('\n');

    // Combine the header and content to form the complete CSV data
    const completeCsvData = csvHeader + csvContent;

    // Write the CSV data to a file
    fs.writeFileSync('src/files/output/classification.csv', completeCsvData, 'utf8');
  } catch (error) {
    console.error('Error reading or parsing the PDF:', error);
  }
};

// Call the async function to read and concatenate the PDF
getFinalClassification();
