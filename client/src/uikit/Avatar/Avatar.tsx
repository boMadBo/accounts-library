import React from 'react';
import style from './Avatar.module.css';

interface UIAvatarProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
}

const Avatar = ({ handleFileChange, selectedFile }: UIAvatarProps) => {
  return (
    <div className={style.avatar_wrap}>
      <input type="file" name="avatar" accept="image/*" id="fileInput" onChange={handleFileChange} className={style.input_date} />
      <div className={style.label_wrap}>
        <div className={style.fake_label}>
          <label htmlFor="fileInput" className={style.label}>
            <span>Choose file</span>
          </label>
          <span>{selectedFile?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Avatar);
