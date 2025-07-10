import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Import autoTable separately

export default function exportToPdf(entries = []) 
{
  const doc = new jsPDF();

  // Optional: Add Logo (synchronously or skip if error)
  try {
    const logo = new Image();
    logo.src = '/image.png'; // Should be in /public
    logo.crossOrigin = 'anonymous';
    logo.onload = () => {
      doc.addImage(logo, 'PNG', 10, 5, 60, 15);
      generateContent();
    };
    logo.onerror = () => generateContent();
  } catch {
    generateContent();
  }

  // ⬇️ Core PDF generation logic
  function generateContent() {
    // Title
    doc.setFontSize(20);
    doc.text('Fund Report', 105, 35, { align: 'center' });

    doc.setFontSize(15);
    doc.text('Fund Report', 105, 42, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, 50);

    // Table
    autoTable(doc, {
      startY: 60,
      head: [['S.No.', 'Note', 'Date', 'Amount (₹)']],
      body: entries.map((entry, i) => [
        i + 1,
        entry.note,
        entry.date,
        `₹ ${parseFloat(entry.amount).toFixed(2)}`,
      ]),
      headStyles: { fillColor: [30, 30, 30] },
      styles: { fontSize: 10, cellPadding: 3 },
    });

    // Total
    const total = entries.reduce((sum, e) => sum + parseFloat(e.amount), 0).toFixed(2);
    doc.setFontSize(14);
    doc.text(`Total Amount: ₹ ${total}`, 10, doc.lastAutoTable.finalY + 15);

    // Save
    doc.save('FundMate_Report.pdf');
  }
}
