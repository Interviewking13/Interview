import React, { useState } from "react";
interface StudyApplyFormProps {
  onClose: () => void;
}

const StudyApplyForm: React.FC<StudyApplyFormProps> = ({ onClose }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 폼 데이터 처리 및 서버로의 전송 등을 수행하는 함수 작성
    // ...

    // 폼 전송 후 필요한 처리나 화면 전환 등을 수행
    // ...
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Phone:
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudyApplyForm;
