const fileInput = document.querySelector('input[type="file"]');
const fileUploadBtn = document.querySelector('button');

const fileUpload = async (uploadFile, dir) => {
  console.log('여기여기');
  
  if (uploadFile) {
    const formData = new FormData();
    formData.append('dir', dir);
    formData.append('file', uploadFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
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
  await fileUpload(uploadFile, '/profile');
});

fileInput.addEventListener('change', () => {
  // 파일 선택 후의 추가 로직
});
