import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const Certificate = ({ score, formData }) => {
    const certificateRef = useRef(null); // Reference to the certificate div

    const handleGeneratePNG = () => {
        const certificateElement = certificateRef.current;
        
        html2canvas(certificateElement, { useCORS: true }).then(canvas => {
            // Convert the canvas to a PNG URL
            const pngUrl = canvas.toDataURL('image/png');

            // Open the PNG in a new tab
            const newTab = window.open();
            newTab.document.write(`<img src="${pngUrl}" alt="Certificate Image"/>`);

            // Trigger download of the PNG file
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = `certificate_${new Date().toLocaleDateString()}.png`;
            link.click();
        });
    };

    return (
        <div>
                 <div style={{textAlign: 'center', marginBottom: '40px'}}>
                 <button className='btn' onClick={handleGeneratePNG}>Download Certificate</button>
                 </div>
            <div
                ref={certificateRef}
                style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundImage: `url('/cert.jpg')`,
                    backgroundSize: 'cover',  // Ensures the background covers the entire area
                    backgroundPosition: 'center',  // Centers the background image
                    width: '100%',
                    maxWidth: '1123px',
                    margin: '0 auto',
                    border: '5px solid #ddd',
                    position: 'relative',
                    backgroundRepeat: 'no-repeat',
                    height: '790px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <img src="/badge.png" alt="Certificate Logo" style={{ width: '190px', height: 'auto', marginBottom: '20px', marginTop: '30px' }} />
                <img src="/heading.png" alt="Certificate Logo" style={{ marginBottom: '20px', marginTop: '-20px' }} />
                <h3 style={{color: '#fff', textTransform: 'uppercase', fontSize: '20px', marginTop: '-10px', marginBottom: '10px'}}>This certificate is presented to</h3>
                <h3 style={{color: 'rgb(246 220 141)', textTransform: 'uppercase', fontSize: '60px', marginTop: '-10px', marginBottom: '30px'}}>{formData && formData?.name}</h3>
                <h3 style={{color: '#fff', textTransform: 'uppercase', fontSize: '20px', marginTop: '-10px', marginBottom: '10px'}}>for successfully completing</h3>
                <h3 style={{color: '#fff', textTransform: 'uppercase', fontSize: '35px', marginTop: '-10px', marginBottom: '10px'}}>{formData && formData?.position}</h3>

                <h3 style={{color: '#fff', borderBottom: '2px solid #fff', fontSize: '25px', paddingBottom: '6px'}}>Your Score: <span>{score?.score}%</span></h3>
                <h3 style={{color: '#fff', fontSize: '16px', marginTop: '6px'}}>Date: <span>{new Date().toLocaleDateString()}</span></h3>
                
     
          
            </div>

      
        </div>
    );
};

export default Certificate;
