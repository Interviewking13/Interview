const fileInput = document.querySelector('input[type="file"]');
const fileUploadBtn = document.querySelector('#upload');
const fileDownloadText = document.querySelector('#download');

fileUploadBtn.addEventListener('click', async () => {
  const uploadFile = fileInput.files[0];
  console.log('client uploadFile: ', uploadFile);
  await fileUpload(uploadFile, '/community');
});

fileInput.addEventListener('change', () => {
  alert('파일첨부 완료');
});

fileDownloadText.addEventListener('click', async () => {
  await downloadFile('b4340c822d88e525bc82b8a93731aa6e');
});

//파일업로드
const fileUpload = async (uploadFile, dir) => {

  if (uploadFile) {
    const formData = new FormData();
    formData.append('dir', dir);
    formData.append('file', uploadFile);

    try {
      const response = await fetch('/api/community/detl', {
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

//다운로드
async function downloadFile(fileId) {
  const fileName = '20230609165522_README.md';

  // 서버로 파일 다운로드 요청을 보내고 파일 URL을 받아옴
  const response = await fetch(`/api/community/detl?community_no=`, {
    method: 'GET',
    withCredentials: true,
    body: fileId, fileName
  }).then(response => {
    // 파일 다운로드 링크 생성
    const downloadLink = document.createElement('a');
    downloadLink.href = response.data.url;
    downloadLink.download = response.data.filename;
    downloadLink.click();
  })
  .catch(error => {
    console.error('파일 다운로드 실패:', error);
  });
}
