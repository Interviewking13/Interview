const fileInput = document.querySelector('input[type="file"]');
const fileUploadBtn = document.querySelector('button');

const fileUpload = async (uploadFile, dir) => {

  if (uploadFile) {
    const formData = new FormData();
    formData.append('dir', dir);
    formData.append('file', uploadFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        withCredentials: true,
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('client data: ', data);
      } else {
        console.log('파일전송 실패');
      }
    } catch (err) {
      console.log(err);
    }
  }
};

fileUploadBtn.addEventListener('click', async () => {
  const uploadFile = fileInput.files[0];
  console.log('client uploadFile: ', uploadFile);
  await fileUpload(uploadFile, '/community');
});

fileInput.addEventListener('change', () => {
  alert('파일첨부 완료');
});
