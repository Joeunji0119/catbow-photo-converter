# 🌈  [Catbow-photo-converter](https://catbow.github.io/catbow-photo-converter/)


<br/>

👉 [배포 주소](https://catbow.github.io/catbow-photo-converter/)

<br/>
<br/>
<br/>


## 🏃‍ Catbow-photo-converter 란?

Catbow-library 프로젝트에서 만든 라이브러리 [catbow-library](https://github.com/catbow/react-catbow-scrollview) 사용시 필요한 서브 페이지를 구현하였습니다.<br/>
<br/>
유저는 동영상 업로드 시 해당 동영상을 픽셀 단위로 자른 사진들을 zip 파일로 자동 저장할 수 있습니다.<br/>
<br/>

<br/>


![catbow](https://user-images.githubusercontent.com/95282989/208018289-0624c107-7f1a-4e8d-8aee-440a8e1e47a1.gif)

![catbow2](https://user-images.githubusercontent.com/95282989/208023304-092a45b3-69b7-4c39-a487-40801dc2f47b.gif)

<br/>
<br/>


- [x] 이미지 업로드시 동영상 미리보기, 미리보기 삭제 기능 구현
- [x] 동영상 변환하기 전 / 미리보기 삭제 전 다시 되묻는 모달 구현
- [x] 변환시 로딩 페이지 / 에러 페이지 구현
- [x] 모달 키다운 이벤트 구현
- [x] 파일 자동저장 기능 구현

<br/>

- [x] 라이브러리를 자연스럽게 소개하기 위해 CatBow-Library를 이용해 스크롤 시 배경 동영상 효과 기능 구현
- [x] 카카오 ad 신청 - 승인 후 해당 광고 javascript 코드 양쪽 배너에 첨부

<br/>

- [x] AWS-S3를 사용한 동영상 업로드 구현
- [x] github-aciotn을 사용한 ci/cd 구축, gh-pages 배포




<br/>
<br/>

## ⚒️ Stack ⚒️ 
</br>
</br>

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/CRA-09D3AC?style=for-the-badge&logo=createreactapp&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

<img src="https://img.shields.io/badge/amazons3-69A31?style=for-the-badge&logo=amazons3&logoColor=white"/> <img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=github_actions&logoColor=white"/>

<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/>

</br>
</br>


| 사용 기술 | 기술 결정 이유 |
| --- | --- |
| **`react-hook-form`** | react-hook-form vs SurveyJs<br><br>설문지를 JSON 형식으로 백앤드와 주고 받아야했습니다.survey.js를 활용하면 JSON 형식으로 데이터를 쉽게 만들 수 있고 UI로도 보여줄 수도 있었지만, 비용이 든다는 문제가 있었습니다. 또한 최소 10개 이상의 input이 있는 설문지 제작 페이지에서 렌더링 이슈를 문제를 해결해야 했습니다. 따라서 비제어 컴포넌트 방식을 구현된 react-hook-form을 활용하여 렌더링 이슈와 설문지를 JSON 형식으로 만들기로 했습니다. |
| **`recharts`** | nivo vs Recharts<br><br>내부에서 상업용으로 쓰일 수 있기 때문에 최대한 오픈 소스를 사용하고자 했습니다.이에 차트 라이브러리인 nivo 와 Recharts 고민했고, nivo는combined charts를 제공해주지 않는다는 점을 고려해 가장 많이 쓰이는 Recharts를 사용하기로 결정했습니다. |
| **`Axios`** | Axios vs JS Fetch API<br><br>response timeout (fetch에는 없는 기능) 처리 방법이 존재 Promise 기반으로 만들어졌기 때문에 데이터를 다루기 편리합니다. 브라우저 호환이 fetch보다 뛰어나기 때문에 웹을 염두한 convert-page에 적합하다고 생각했습니다. |
| **`Styled components`** | CSS-in-JS vs CSS-in-CSS<br><br>css를 파일 분리 없이 유지 보수 할 수 있는점이 장점이라 생각했습니다. props나 state에 따른 동적 스타일링이 가능합니다. 그 중 점유율이 높은 styled components를 사용했습니다. |



<br/><br/><br/>




### Context API 전역 상태 관리 

```javascript

  export const FileContext = createContext<FileContextProps>(null);
  export const ModalContext = createContext<ModalContextProps>(null);
  export const LoadingContext = createContext<LoadingContextProps>(null);

    <FileContext.Provider
      value={{
        fileUrl,
        setFileUrl,
        buttonState,
        setButtonState,
        fileList,
        setFileList,
      }}
    >
      <ModalContext.Provider
        value={{
          onModal,
          setOnModal,
          isModalUploadButton,
          setIsModalUploadButton,
          keyEventTarget,
          setKeyEventTarget,
        }}
      >
        <LoadingContext.Provider
          value={{
            mode,
            setMode,
          }}
        >
          {children}
        </LoadingContext.Provider>
      </ModalContext.Provider>
    </FileContext.Provider>
    
  export const useVisibleModal = () => useContext(ModalContext);
  export const useUploadFile = () => useContext(FileContext);
  export const useLoading = () => useContext(LoadingContext);
  
```

</br>
props drilling 을 막고 props를 자유롭게 사용하기 위해 `context Api`를 사용하였습니다. </br>
가독성을 위해 관심사가 비슷한 상태끼리 모아 분리해, 유지 보수가 용이하도록 구현하였습니다.

</br><br/>


### file-saver Library 사용 

<br/>

```javascript

// .../hooks/useS3Download.tsx

import { saveAs } from 'file-saver';

  const saveZipFile = (zipFile: RequestInfo | URL) => {
    fetch(zipFile, { method: 'GET' })
      .then(res => {
        return res.blob();
      })
      .then(blob => {
        saveAs(blob, 'catbow.zip');
        setMode('show');
      })
      .catch(err => {
        if (mode !== 'error') {
          setMode('error');
        }
        console.error('err: ', err);
      });
  };
 
```

서버에서 받아온 zip 파일을 자동 저장하기 위해 file-saver 라이브러리를 사용하였습니다.

</br></br>


### S3-putObject 메서드 사용

<br/>

```javascript

// .../hooks/useS3Download.tsx

import AWS from 'aws-sdk';
import { v1 } from 'uuid';

  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_ACCESS,
    secretAccessKey: process.env.REACT_APP_SECRET,
    region: process.env.REACT_APP_REGION,
  });

   const uploadParams = {
    Bucket: process.env.REACT_APP_BUCKET_NAME,
    Body: fileList[0],
    Key: `image/${v1().toString().replace('-', '')}.${
      fileList[0].type.split('/')[1]
    }`,
    ContentType: fileList[0].type,
  };

   s3.putObject(uploadParams, (data, err) => {
    const fileKey = uploadParams.Key;
    try {
      sendToServer(fileKey);
    } catch (err) {
      setMode('error');
      console.error(`S3 putObject ${err}`);
    }
  });
    
 
```

`uploadParams` : S3 파일 정보 담는 객체, key 값으로 파일명을 쓸 경우 다른 파일명과 겹칠 수 있기 때문에 UUID 를 사용했습니다.</br></br> 
`s3.putObject` : S3에 동영상 올리는 메서드. S3 공식문서를 참고해 aws-sdk 라이브러리, putObject 메서드를 사용했습니다. S3 URL 주소는 버킷명, 폴더, 파일명으로 이루어져있기 때문에 uuid로 만들어진 파일 이름만 백엔드 서버로 보내 서버에서 해당 URL에 접근 가능하도록 했습니다.


</br><br/>





</br><br/><br/>



## 폴더 구조



```
📦src
 ┣ 📂api
 ┃ ┗ 📜axiosApi.ts
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂adContainer
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜SiderLeft.tsx
 ┃ ┃ ┃ ┗ 📜SiderRight.tsx
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┣ 📜Modal.tsx
 ┃ ┃ ┃ ┗ 📜useModal.tsx
 ┃ ┃ ┗ 📂page
 ┃ ┃ ┃ ┣ 📜Error.tsx
 ┃ ┃ ┃ ┗ 📜Loading.tsx
 ┃ ┣ 📂contexts
 ┃ ┃ ┗ 📜ContextWrapper.tsx
 ┃ ┗ 📂main
 ┃ ┃ ┣ 📂fileContainer
 ┃ ┃ ┃ ┣ 📂button
 ┃ ┃ ┃ ┃ ┣ 📜DeleteButton.tsx
 ┃ ┃ ┃ ┃ ┗ 📜UploadButton.tsx
 ┃ ┃ ┃ ┗ 📜FileContainer.tsx
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┣ 📜useLoadFile.tsx
 ┃ ┃ ┃ ┗ 📜useS3Download.tsx
 ┃ ┃ ┗ 📜MainContainer.tsx
 ┣ 📂pages
 ┃ ┗ 📜Home.tsx
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyle.ts
 ┃ ┣ 📜theme.ts
 ┃ ┗ 📜variable.ts
 ┣ 📂utils
 ┃ ┣ 📜theme.d.ts
 ┃ ┗ 📜types.ts
 ┣ 📜App.tsx
 ┣ 📜Catbow.tsx
 ┗ 📜index.tsx

```




## 🏃‍ Catbow-photo-converter Team

<br/>
<br/>

<table>
  <tr>
    <td>
      <a href="https://github.com/Joeunji0119">
            <img src="https://avatars.githubusercontent.com/u/95282989?v=4" width="100px"/>
        </a>
    </td>
    <td>
      <a href="https://github.com/sw1104">
          	<img src="https://avatars.githubusercontent.com/u/105622759?v=4" width="100px" />
        </a>
    </td>
  </tr>
  <tr>
    <td><b>조은지</b></td>
    <td><b>이상우</b></td>
  </tr>
  <tr>
    <td><b>Front-End</b></td>
    <td><b>Back-End</b></td>
  </tr>
</table>

<br/>
<br/>

2022-11-21~2022-12-12 (22일)

<br/>
<br/>



## 🌈🤗 Catbow-library-자료

<br>

[Video Converter Site](https://catbow.github.io/catbow-photo-converter/) <br>
[Catbow Doc](https://catbow.github.io/catbow-docs/) <br>
[CatBow ScrollView Tutorial](https://catbow.github.io/catbow-docs/scrollview) <br>
[NPM Library Site](https://www.npmjs.com/package/react-catbow-scrollview) <br>
[YARN Library Site](https://yarnpkg.com/package/react-catbow-scrollview) <br>
