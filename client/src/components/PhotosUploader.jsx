import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({photos, onChange}) {
    const [photoLink, setPhotoLink] = useState('');

     async function addPhotoByLink(e) {
        e.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        onChange(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }
    
    function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        axios.post('/upload-by-files', data, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            const { data: filenames } = res;
            onChange(prev => {
                return [...prev, ...filenames];
            });
        });
    }

    function removePhoto(e, filename) {
        e.preventDefault()
        onChange([...photos.filter(p => p !== filename)]);
    }

    function selectAsMainPhoto(e, filename) {
        e.preventDefault()
        onChange([filename, ...photos.filter(p => p !== filename)])
    }

    return (
        <div className="w-full">
            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Photos</h2>
            <div className="flex gap-2">
                <input className="w-full" type="text" placeholder="Add the link of the photo" value={photoLink} onChange={e => setPhotoLink(e.target.value)} />
                <button onClick={addPhotoByLink} className="primary rounded-full px-3 py-2">Add Photo</button>
            </div>
            <p className="text-accent2 text-sm md:text-base font-bold text-center sm:text-left">or Upload Photos</p>
            <div className="flex gap-2">
                {photos.length > 0 && (
                    photos.map((link, index) => (
                        <div key={index} className="flex relative w-[30%] md:w-[25%] aspect-square">
                        <img src={'http://localhost:4000/uploads/'+link} alt="" className="object-cover h-full w-full"/>
                        <button onClick={(e) => removePhoto(e, link)} className="absolute right-2 top-2 danger cursor-pointer rounded-lg py-1 px-1 text-sm lg:py-2">
                            <i className="fi fi-rr-trash-xmark px-1"></i>
                            <span className="hidden lg:inline">Remove</span>
                        </button>
                        <div onClick={(e) => selectAsMainPhoto(e, link)} className="absolute left-2 top-2">
                            {link !== photos[0] && (
                                <button className="primary cursor-pointer rounded-lg py-1 px-1 text-sm lg:py-2">
                                    <i className="fi fi-rr-star px-1"></i>
                                    <span className="hidden lg:inline">Main</span>
                                </button>
                            )}       
                        </div>
                    </div>
                    ))
                )}
                <div className="w-[30%] md:w-[25%] flex aspect-square">
                    <label className="w-full flex items-center justify-center cursor-pointer transparent rounded-md border-2 border-dashed border-accent2 text-sm md:text-2xl lg:text-4xl">
                        <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                        <i className="fi fi-tr-cloud-upload-alt mr-2"></i>Upload
                    </label>
                </div>
            </div>
        </div>
    )
}