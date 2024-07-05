import React, { useEffect, useState } from 'react';
import './FileField.css';

interface Props {
  label: string;
  contentType: string;
  required: boolean;
  onFileChosen: (data: FormData) => void;
}

const FileField: React.FC<Props> = ({ label, contentType, required, onFileChosen }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const prepareChosenFile= ()=>{
        const formData = new FormData();
        if(selectedFile) formData.append('file', selectedFile); 
        onFileChosen(formData);
    }

    useEffect(()=>{
        prepareChosenFile();
    }, [selectedFile]);
    
    return (
    <div className='file-input'>
        <label>{label}</label>
        <input placeholder="Seleccione Cover..." 
                type="file" 
                accept={contentType}
                onChange={(event:any) => setSelectedFile(event?.target?.files[0])}
                required={required}/>
    </div>
  );
};

export default FileField;
