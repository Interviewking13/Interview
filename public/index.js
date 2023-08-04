const fileInput = document.querySelector('input[type="file"]');
const fileUploadBtn = document.querySelector('#upload');
const fileDownloadText = document.querySelector('#download');
const fileInputModify = document.querySelector('input[id="fileModify"]');
const fileModifyBtn = document.querySelector('#modify');
const fileReadBtn = document.querySelector('#readBtn');
const fileReadText = document.querySelector('#read');

fileUploadBtn.addEventListener('click', async () => {
  const uploadFile = fileInput.files[0];
  await fileUpload(uploadFile, 'community');
});

fileInput.addEventListener('change', () => {
  alert('파일첨부 완료');
});

fileDownloadText.addEventListener('click', async () => {
  await downloadFile();
});

fileReadBtn.addEventListener('click', async () => {
  await readFile();
});

fileModifyBtn.addEventListener('click', async () => {
  const uploadFile = fileInputModify.files[0];
  console.log('client uploadFile: ', uploadFile);
  await fileModify(uploadFile, 'community');
});

/** 파일업로드 */
const fileUpload = async (uploadFile, dir) => {

  if (uploadFile) {
    const formData = new FormData();
    formData.append('dir', dir);
    formData.append('file', uploadFile);
    formData.append('user_id', '648d18ac7015df4b1d73ebc6')

    console.log('formData:', formData);
    try {
      const response = await fetch('/api/community/detl', {
        method: 'POST',
        withCredentials: true,
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('client data: ', data);
      } 
    } catch (err) {
      console.log(err);
    }
  }
};

/** 파일수정 */
const fileModify = async (uploadFile, dir) => {

  if (uploadFile) {
    const formData = new FormData();
    formData.append('dir', dir);
    formData.append('file', uploadFile);

    try {
      const response = await fetch('/api/community/detl?community_no=12', {
        method: 'PUT',
        withCredentials: true,
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('client data: ', data);
      } 
    } catch (err) {
      console.log(err);
    }
  }
};

/** 파일조회 */
async function readFile() {
  try {
    const response = await fetch(`/api/community/detl?community_no=12`, {
      method: 'GET',
      withCredentials: true,
    });

    if (response.ok) {
      const responseData = await response.json();
      const findContent = responseData.data.findContent;
      
      if (findContent) {
        const fileName = findContent[0].fileName;
        fileReadText.innerHTML = ` 파일명 ${fileName}`;
      }
    } 
  } catch (err) {
    console.error('클라이언트 파일 다운로드 실패:', err);
  }
}

/** 파일다운로드 */
async function downloadFile() {
  try {
    const response = await fetch(`/api/community/download?community_no=12`, {
      method: 'GET',
      withCredentials: true,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // 다운로드 링크 생성
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = '면접왕_파일다운로드'; // 파일 이름 설정
      downloadLink.click();

      // 리소스 해제
      URL.revokeObjectURL(url);
    } 
  } catch (err) {
    console.error('클라이언트 파일 다운로드 실패:', err);
  }
}