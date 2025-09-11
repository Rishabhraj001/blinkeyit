import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // fixed typo
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const uploadImageClodinary = async (image) => {
  try {
    if (!image) throw new Error("No image provided");

    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

    const uploadImage = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "binkeyit" }, (error, result) => {
          if (error) return reject(error); // handle error
          resolve(result);
        })
        .end(buffer);
    });

    return uploadImage;
  } catch (err) {
    throw err;
  }
};

export default uploadImageClodinary;
