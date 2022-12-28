'use client';
import { type NextPage } from 'next';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const Page: NextPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      public_id: 'my-uploads/i4rmshsctnetnv7kvrjd',
    },
  ]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`;

    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData();
      formData.append('file', acceptedFile);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET as string
      );

      const res = await fetch(url, {
        method: 'post',
        body: formData,
        cache: 'no-store',
      });

      const data = await res.json();
      setUploadedFiles((old) => [...old, data]);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? `active` : null}`}
      >
        <input {...getInputProps()} />
        <p>Drop Zone</p>
      </div>
      <ul className="image-list">
        {uploadedFiles.map((file) => (
          <li key={file.public_id}>
            <Image
              cloudName={process.env.NEXT_PUBLIC_CLOUD_NAME}
              publicId={file.public_id}
              alt=""
            >
              <Transformation crop="scale" width="200" angle="10" />
            </Image>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Page;
