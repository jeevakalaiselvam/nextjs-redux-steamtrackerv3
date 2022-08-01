import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 2px;
  flex-direction: row;
  cursor: pointer;
  background: ${(props) => {
    if (props.hover && !props.click) {
      return "#3049d1";
    } else if (props.hover && props.click) {
      return "#3049d1";
    } else {
      return "#0d0c0f";
    }
  }};
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  text-align: left;
  flex: 2;
  font-size: 1.5rem;
`;

const Icon = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 0.75rem;
  font-size: 1.5rem;
`;

const MenuItem = (props) => {
  const { title, icon, to } = props;
  const router = useRouter();

  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);

  return (
    <Container
      click={click}
      hover={hover}
      onMouseEnter={() => {
        setHover((old) => true);
      }}
      onMouseLeave={() => {
        setHover((old) => false);
        setClick((old) => false);
      }}
      onClick={() => {
        router.push(to);
      }}
    >
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
    </Container>
  );
};

export default MenuItem;
