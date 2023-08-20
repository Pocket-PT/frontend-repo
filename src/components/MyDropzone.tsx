import { PropsWithChildren, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props extends PropsWithChildren {
  postFile: (file: FormData) => void;
}

function MyDropzone({ children, postFile }: Props) {
  console.log(postFile);

  const onDrop = useCallback((acceptedFiles: (string | Blob)[]) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    console.log(formData.get('file'));
    postFile(formData);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : children}
    </div>
  );
}

export default MyDropzone;
