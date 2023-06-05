import { axios } from 'axios';

const fileUploadBtn = document.querySelector('button');
document.addEventListener('click', async () => {
  
  const upload = async (uploadFile, dir) => {
    console.log('여기여기');
    
    if (uploadFile) {
        const formData = new FormData();
        formData.append('dir', dir);
        formData.append('file', uploadFile);

        await axios
            .post('/api/upload', formData)
            .then((response) => {
                if (response.status === 200) {
                    data = response.data;
                }
            })
            .catch(err => {
              console.log(JSON.stringify(err));
          });
      }
      return data;
    }
  await upload(uploadFile, '/profile');
});