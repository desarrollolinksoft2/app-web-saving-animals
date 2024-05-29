'use client'
import { createBrowserClient } from '@supabase/ssr'
import { v4 as uuidv4 } from 'uuid';

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function uploadFile(bucketName, filePath, file, type) {

    const res = await supabase.storage.from(bucketName).upload(filePath, file, type)
    return JSON.stringify(res)
}

export async function getPublicUrl(bucketName, filePath) {
    const res = supabase.storage.from(bucketName).getPublicUrl(filePath);
    return JSON.stringify(res)
}

export async function deleteFile(bucketName, filePath) {
    const res = supabase.storage.from(bucketName).remove([filePath]);
    return JSON.stringify(res)
}

export async function deleteImages(files, bucketName) {
    if (files != null) {
        let errors = []
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let error = await deleteFile(bucketName, file.path)
            errors.push(error)
        }
        return errors;
    }

}

export async function uploadImages(files, bucketName) {
    if (files != null) {
        const maxFileSize = 300 * 1024; //300kb
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

            let res = await uploadFile(bucketName, filePath, file, { contentType: 'image/*' })
            var { error: uploadError } = JSON.parse(res)
            if (uploadError) {
                console.error(uploadError);
                continue;
            }

            let result = await getPublicUrl(bucketName, filePath)

            var { data, error } = JSON.parse(result)

            if (error) {
                // console.error(urlError);
                console.log(result.error)
                continue;
            }
            let publicUrl = data?.publicUrl
            // console.log(publicUrl)

            const fileObject = {
                path: filePath,
                publicUrl
            }
            // console.log(fileObject)
            listFilesUploaded.push(fileObject);

        }
        // console.log(listFilesUploaded)
        return listFilesUploaded;
    }
}

export async function uploadStringImages(base64String, bucketName, filePath) {
    const splitString = base64String.split(',');
    const contentType = splitString[0].split(':')[1].split(';')[0];
    const base64 = splitString[1];

    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });

    const res = await uploadFile(bucketName, filePath, blob, { contentType: 'image/*' })
    var { error: uploadError } = JSON.parse(res)
    if (uploadError) {
        console.error(uploadError);
        return null;
    }

    let result = await getPublicUrl(bucketName, filePath)

    var { data, error } = JSON.parse(result)

    if (error) {
        console.log(result.error)
        return null;
    }
    let publicUrl = data?.publicUrl
    // console.log(publicUrl)

    const fileObject = {
        path: filePath,
        publicUrl
    }

    return fileObject;
}