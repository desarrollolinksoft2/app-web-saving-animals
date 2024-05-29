'use server'
import { getPublicUrl, uploadFile } from '@/data';
import { v4 as uuidv4 } from 'uuid';


 const  uploadImages= async (files, bucketName) => {
        if (files != null) {
            const maxFileSize = 300 * 1024; //200kb
            var listFilesUploaded = [];

            for (let i = 0; i < files.length; i++) {
                let file = files[i];

                if (file.size > maxFileSize) {
                    // notify('error', `el archivo ${file.name} es demasiado grande`)
                    console.log(`el archivo ${file.name} es demasiado grande`)
                    continue;
                }

                const extension = file.name.split('.').pop()
                const idFile = uuidv4();
                const uniqueName = `${idFile}.${extension}`
                const filePath = `tmp/${uniqueName}`;

                let res = await uploadFile(bucketName, filePath,file, {contentType: 'image/*'} )
                var { error: uploadError } = JSON.parse(res)
                if (uploadError) {
                    console.error(uploadError);
                    continue;
                }

                let result = await getPublicUrl(bucketName, filePath)

                var {data, error }= JSON.parse(result)

                if (error) {
                    // console.error(urlError);
                    console.log(result.error)
                    continue;
                }
                let publicUrl = data?.publicUrl
                console.log(publicUrl)

                const fileObject = {
                    path: filePath,
                    publicUrl
                }
                console.log(fileObject)
                listFilesUploaded.push(fileObject);

            }
            // console.log(listFilesUploaded)
            return listFilesUploaded;
        }
    }


export default uploadImages;