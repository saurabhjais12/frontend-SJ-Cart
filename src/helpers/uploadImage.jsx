const CLOUD_NAME = "dxnopwbzv"; // Your Cloudinary cloud name
const UPLOAD_PRESET = "mern_product"; // Your unsigned upload preset

const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    const dataResponse = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const result = await dataResponse.json();
    return result;
  } catch (error) {
    console.error("Image upload failed:", error);
    return { error: "Upload failed" };
  }
};

export default uploadImage;
