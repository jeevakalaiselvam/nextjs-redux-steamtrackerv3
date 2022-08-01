import React from "react";
import styled from "styled-components";
import { openLinkInNewTab } from "../../helpers/browserHelper";

const Container = styled.div`
  display: flex;
  background-color: #0d0c0f;
  align-items: center;
  padding: 1rem;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${(props) => props.profileImageLink});
  width: 70px;
  height: 70px;
  margin-bottom: 0.5rem;
  background-size: contain;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 1.5rem;
`;

const ProfileImage = (props) => {
  const { profileLink, profileImageLink } = props;

  return (
    <Container
      onClick={() => {
        openLinkInNewTab(profileLink);
      }}
    >
      <Image profileImageLink={profileImageLink} />
      <Name>NotRealLogan</Name>
    </Container>
  );
};

export default ProfileImage;
