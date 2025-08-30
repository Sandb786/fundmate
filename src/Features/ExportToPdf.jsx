import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Import autoTable separately
import toast from 'react-hot-toast';

export default function exportToPdf(entries = []) 
{
    const doc = new jsPDF();

    if (window.confirm("Are you sure to Export PDF ?")) 
    {

        try 
        {
          // Optional: Add Logo (synchronously or skip if error)
          const logo = new Image();
          logo.src = '/image.png'; // Should be in /public
          logo.crossOrigin = 'anonymous';
          logo.onload = () => {
            doc.addImage(logo, 'PNG', 10, 5, 60, 15);
            generateContent();
          };
          logo.onerror = () => generateContent();
        }
        catch 
        {
          generateContent();
        }

  }

  // ⬇️ Core PDF generation logic
  function generateContent() 
  {
    // Title
    doc.setFontSize(20);
    doc.text('Fund Report', 105, 35, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Name: January Fund 2025', 10, 45);

    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).toLowerCase()}`, 10, 51);


    // Total
    const total = entries.reduce((sum, e) => sum + parseFloat(e.amount), 0).toFixed(2);

    // For color
    const color1 = 30; //R
    const color2 = 30; //G
    const color3 = 30; //B

    autoTable(doc, {
      startY: 60,
      head: [['S.No.', 'Note', 'Date', 'Amount (Rs.)']],
      body: [
        ...entries.map((entry, i) => [
          i + 1,
          entry.note,
          entry.date,
          ` ${parseFloat(entry.amount).toFixed(2)}`,
        ]),
        // Add subtotal row

        [{ content: '', colSpan: 2, styles: { halign: 'right' } }, // Empty columns
        { content: 'Total Amount :', styles: { fontStyle: 'bold', textColor: [255, 255, 255], fontSize: 10, halign: 'right', fillColor: [color1, color2, color3] } },
        { content: `Rs. ${total}`, styles: { fontStyle: 'bold', textColor: [255, 255, 255], fontSize: 10, fillColor: [color1, color2, color3] } }
        ]
      ],
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [30, 30, 30] },
    });



    // Thanks message
    doc.setFontSize(10);
    doc.text('Thank you for using FundMate!', doc.internal.pageSize.getWidth() / 2, doc.lastAutoTable.finalY + 20, { align: 'center' });

    // Save
    doc.save('FundMate_Report.pdf');

    toast.success("PDF Exported Successfuly...");
  }

}
