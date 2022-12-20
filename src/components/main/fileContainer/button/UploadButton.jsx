import React from 'react';
import styled from 'styled-components';
import {
  useUploadFile,
  useVisibleModal,
} from '../../../contexts/ContextWrapper';
import { useLoadFile } from '../../hooks/useLoadFile';

const UploadButton = () => {
  const { handleFile } = useLoadFile();
  const { buttonState, setButtonState, fileList } = useUploadFile();
  const { setOnModal, setIsModalUploadButton } = useVisibleModal();

  const ableToConvert = fileList[0]?.size < 15728635 && fileList.length !== 0;

  const buttonStateProps =
    buttonState && fileList.length === 0
      ? {
          type: 'file',
          onChange: e => {
            handleFile(e);
            setButtonState(pre => !pre);
          },
        }
      : {
          type: 'button',
          disabled: !ableToConvert,
          onClick: () => {
            fileList.length !== 0 && setOnModal(pre => !pre);
            setIsModalUploadButton('uploadButton');
          },
        };

  // 15728640byte === 15mb
  console.log(ableToConvert);

  return (
    <FileUpLoadButton>
      <FileButton>
        <FileState>{buttonState ? 'UPLOAD' : 'CONVERT'}</FileState>
        <FileUpLoad {...buttonStateProps} />
      </FileButton>
    </FileUpLoadButton>
  );
};

export default UploadButton;

export const FileUpLoad = styled.input`
  opacity: 0;
`;

const FileState = styled.div`
  height: 100%;
  ${({ theme }) => theme.variables.flex()};
`;

export const FileButton = styled.label`
  width: 95px;
  height: 30px;
  background: black;
  border-radius: 9.5px;
  cursor: pointer;
`;

export const FileUpLoadButton = styled.form`
  ${({ theme }) => theme.variables.rainBowColor};
  ${({ theme }) => theme.variables.flex()};
  margin-top: 20px;
  width: 100px;
  height: 35px;
  font-weight: 800;
  border-radius: 10px;
  cursor: pointer;
`;
