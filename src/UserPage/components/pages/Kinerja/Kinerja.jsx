import { useState, useRef } from "react";
import TabelKinerja from "./TabelKinerja";
import TabelKeaktifan from "./TabelKeaktifan";
import TabelPelatihan from "./TabelPelatihan";
import TabelPresensi from "./TabelPresensi";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Kinerja = () => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    const handlePrint = () => {
        if (contentRef.current) {
            html2canvas(contentRef.current, { useCORS: true, scale: 2 }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgWidth = 210; 
                const pageHeight = 295;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;
                
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
    
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
    
                pdf.save('Kinerja.pdf');
            });
        }
    };    

    return (
        <div>
            <div className="flex items-center justify-between mb-4 px-5">
                <p className="text-xl font-bold">Kinerja</p>
                <button 
                    onClick={handlePrint}
                    className="px-3 py-1 bg-green-900 text-white rounded text-sm"
                >
                    Print
                </button>
            </div>
            <div ref={contentRef} className="grid grid-cols-1 gap-4 flex-1">
                <div className="grid gap-x-[470px] gap-y-10 p-3">
                    <div>
                        <TabelKinerja isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                    <div>
                        <TabelKeaktifan isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                    <div>
                        <TabelPresensi isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                    <div>
                        <TabelPelatihan isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Kinerja;
