const fs = require('fs');
const { getPracticalNotes } = require('./services/getPracticalNotes');
const { getTheoryNotes } = require('./services/getTheoryNotes');

const getFinalClassification = async () => {
  try {
    // Available Options: general, quotas, pcd
    const category = 'general';

    const practicalNotes = await getPracticalNotes(category);
    const theoryNotes = await getTheoryNotes(category);

    const result = practicalNotes
      .map(c => {
        const candidate = theoryNotes.find(tn => tn.name.trim() === c.name.trim());

        if (!candidate) {
          console.log('Error trying to get candidate', c.name)
        }

        return {
          ...candidate,
          ...c,
          finalNote: Number((candidate.theoryNote + c.practicalNote).toFixed(2))
        }
      }).filter(c => c.practicalNote !== 0);

    const sorted = result.sort((a, b) => b.finalNote - a.finalNote);

    const csvHeader = 'Name,P1,P2,TheoryNote,PracticalNote,FinalNote\n';

    // Create a CSV content by mapping the data array
    const csvContent = sorted
      .map(item => `${item.name},${item.p1},${item.p2},${item.theoryNote},${item.practicalNote},${item.finalNote}`)
      .join('\n');

    // Combine the header and content to form the complete CSV data
    const completeCsvData = csvHeader + csvContent;

    // Write the CSV data to a file
    fs.writeFileSync(`src/files/output/${category}-classification.csv`, completeCsvData, 'utf8');
  } catch (error) {
    console.error('Error reading or parsing the PDF:', error);
  }
};

// Call the async function to read and concatenate the PDF
getFinalClassification();
