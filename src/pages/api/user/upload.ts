// import { NextApiRequest, NextApiResponse } from "next/types";
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
// import { PutObjectCommand } from '@aws-sdk/client-s3'

// export default async function upload(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'PUT') {
//         throw new Error('401');
//     }

//     const signedUrl = await getSignedUrl(
//         r2,
//         new PutObjectCommand({
//             Bucket: 'teste',
//             Key: 'file.png',
//             ContentType: 'images/png',
//         }),
//         { expiresIn: 600 }
//     )
//     return signedUrl
// }
