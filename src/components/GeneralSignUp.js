import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import '../styles/GeneralSignUp.css';

// Reuse your styled-components here
const StyledTable = styled.table`
  border-collapse: collapse;
  width: auto;
  font-family: 'Pretendard', sans-serif;
`;

const Cell = styled.td`
  width: ${(props) => props.width || 'auto'};
  height: 29px;
  border-top: ${(props) => props.borderTop || '1px solid black'};
  border-right: ${(props) => props.borderRight || '1px solid black'};
  border-bottom: ${(props) => props.borderBottom || '1px solid black'};
  border-left: ${(props) => props.borderLeft || '1px solid black'};
  text-align: ${(props) => props.textAlign || 'center'};
  padding: 0px;
  color: #000;
  background-color: ${(props) => props.bgColor || 'none'}; /* Not 'white'*/
  font-family: ${(props) => props.fontFamily || "Pretendard Variable"};
  font-size: ${(props) => props.fontSize || '16px'};
  font-style: ${(props) => props.fontStyle || 'normal'};
  font-weight: ${(props) => props.fontWidth || '900'};
`;

const Input = styled.input`
  width: 95%;
  height: 27px;
  border: none;
  text-align: left;
  background-color: white;
`;

const Button = styled.button`
  width: 95%;
  height: 27px;
  border: none;
  text-align: left;
  background-color: white;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
  text-align: left;
`;

const StartButton = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
  width: 100px;
  cursor: pointer;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end; // Align the button to the right
`;

const GeneralSignUp = () => {
  const [emailValue, setEmailValue] = useState({ email: '' });
  const [isVerified, setIsVerified] = useState(false);
  const [isTimeForVeriCode, setIsTimeForVeriCode] = useState(false);
  const [isWithinTime, setIsWithinTime] = useState(false);
  const [timeCount, setTimeCount] = useState(0);
  const [veriCodeValue, setVeriCodeValue] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [errors, setErrors] = useState({});

  const emailRegExpr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegExpr = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{8,12}$/;

  const onValidEmail = useCallback(
    (e) => {
      e.preventDefault();
      fetch('http://127.0.0.1:8000/mindary/accounts/original/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          email: emailValue.email,
        }),
      }).then((res) => {
        if (res.status === 200) {
          setIsTimeForVeriCode(true);
          setIsWithinTime(true);
          setTimeCount(180);
          alert('인증번호가 이메일로 전송되었습니다.');
        } else if (res.status === 400) {
          setErrors({ email: '※ 유효하지 않은 이메일입니다.' });
        } else {
          setErrors({ email: '※ 오류가 발생했습니다.' });
        }
      });
    },
    [emailValue]
  );

  const handleVeriCode = (e) => {
    setVeriCodeValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!passwordRegExpr.test(e.target.value)) {
      setErrors((prev) => ({
        ...prev,
        password: '※ 8~12 자리 영소문자, 숫자, 특수문자 조합으로 입력해주세요',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: '',
      }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: '',
      }));
    }
  };

  const onValidVeriCode = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/mindary/accounts/original/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        email: emailValue.email,
        code: veriCodeValue,
      }),
    }).then((res) => {
      if (res.status === 200) {
        setIsVerified(true);
        alert('인증 성공');
      } else if (res.status === 400) {
        setErrors({ veriCode: '인증 시간(3분) 초과' });
      } else if (res.status === 401) {
        setErrors({ veriCode: '※ 잘못된 인증 코드입니다.' });
      }
    });
  };

  const onSubmitSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: '※ 비밀번호가 일치하지 않습니다.' });
      return;
    }

    fetch('http://127.0.0.1:8000/mindary/accounts/original/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        email: emailValue.email,
        password: password,
        nickname: nickname,
      }),
    }).then((res) => {
      if (res.status === 201) {
        alert('회원가입 성공');
      } else {
        setErrors({ form: '회원가입에 실패했습니다.' });
      }
    });
  };

  // 오류가 있는지 확인합니다.
  const hasErrors = Object.keys(errors).some((key) => errors[key]);

  return (
    <>
      <StyledTable>
        <tbody>
          <tr>
            <Cell width="497px" colSpan="3" textAlign="left" borderTop="none" borderRight="none" borderLeft="none">
              &nbsp;회원가입
            </Cell>
            <Cell width="395px" borderTop="none" borderRight="none" borderBottom='none' borderLeft="none"></Cell>
          </tr>
          <tr>
            <Cell width="119px" bgColor="#E6EEFA">항목</Cell>
            <Cell colSpan="2" bgColor="#E6EEFA">감정을 기록하고 마음을 정리해요.</Cell>
            <Cell width="395px" borderTop="none" borderRight="none" borderBottom='none' borderLeft="none"></Cell>
          </tr>
          <tr>
            <Cell width="119px" fontSize="14px">이메일</Cell>
            <Cell width="256px" textAlign="left">
              &nbsp;<Input
                // type="email"
                value={emailValue.email}
                onChange={(e) => setEmailValue({ email: e.target.value })}
                placeholder= "이메일을 입력해주세요."
              />
            </Cell>
            <Cell width="119px">
              <Button
                onClick={onValidEmail}
                disabled={!emailRegExpr.test(emailValue.email) || isVerified}
              >
                {isVerified ? '전송 완료' : '인증코드 받기'}
              </Button>
            </Cell>
            <Cell width="395px" borderTop="none" borderRight="none" borderBottom='none' borderLeft="none">
              {errors.email && <ErrorMessage>&nbsp;{errors.email}</ErrorMessage>}
            </Cell>
          </tr>
          <tr>
            <Cell width="119px" fontSize="14px">인증코드</Cell>
            <Cell width="256px" textAlign="left">
              &nbsp;<Input
                name="veriCode"
                value={veriCodeValue}
                placeholder="인증코드를 입력해주세요."
                onChange={handleVeriCode}
                disabled={!isTimeForVeriCode || isVerified}
              />
            </Cell>
            <Cell width="119px">
              <Button
                onClick={onValidVeriCode}
                disabled={!(veriCodeValue && veriCodeValue.length >= 4) || isVerified}
              >
                {isVerified ? '인증 완료' : '인증코드 입력'}
              </Button>
            </Cell>
            <Cell width="395px" borderTop="none" borderRight="none" borderBottom='none' borderLeft="none">
              {errors.veriCode && <ErrorMessage>&nbsp;{errors.veriCode}</ErrorMessage>}
            </Cell>
          </tr>
          <tr>
            <Cell width="119px" fontSize="14px">비밀번호</Cell>
            <Cell colSpan="2" textAlign="left">
              &nbsp;<Input
                // type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="8~12 자리 영소문자, 숫자, 특수문자 조합"
                disabled={!isVerified}
              />
            </Cell>
            <Cell width="395px" borderTop="none" borderRight="none" borderBottom='none' borderLeft="none">
              {errors.password && <ErrorMessage>&nbsp;{errors.password}</ErrorMessage>}
            </Cell>
          </tr>
          <tr>
            <Cell width="119px" fontSize="14px">비밀번호 확인</Cell>
            <Cell colSpan="2" textAlign="left">
              &nbsp;<Input
                // type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="8~12 자리 영소문자, 숫자, 특수문자 조합"
                disabled={!isVerified}
              />
              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword}</ErrorMessage>)}
            </Cell>
            <Cell width="395px" borderTop="none" borderRight="none" borderBottom='none' borderLeft="none">
              {errors.form && <ErrorMessage>&nbsp;{errors.form}</ErrorMessage>}
            </Cell>
          </tr>
          <tr>
            <Cell width="119px" fontSize="14px">닉네임</Cell>
            <Cell colSpan="2" textAlign="left">
              &nbsp;<Input
                // type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요."
                disabled={!isVerified}
              />
            </Cell>
            <Cell width="395px" borderTop="none" borderRight="none" borderBottom='none' borderLeft="none" />
          </tr>
          <tr>
            <Cell colSpan="3">
              <ButtonWrapper>
                <StartButton
                  onClick={onSubmitSignUp}
                  disabled={
                    !password ||
                    !confirmPassword ||
                    !nickname ||
                    password !== confirmPassword ||
                    !isVerified ||
                    hasErrors
                  }
                >
                  시작하기 →
                </StartButton>
              </ButtonWrapper>
            </Cell>
            <Cell width="395px" borderTop="none" borderRight="none" borderBottom='none' borderLeft="none"/>
          </tr>
        </tbody>
      </StyledTable>
    </>
  );
};

export default GeneralSignUp;
