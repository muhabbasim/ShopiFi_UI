import axios from 'axios'

const upload = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', "shopifi");
    
    const res = await axios.post('https://api.cloudinary.com/v1_1/basim/image/upload', formData)
    const { url } = res.data
    return url;

  } catch (error) {
    console.log(error)
  }
}

export default upload