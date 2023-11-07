// 자산 탭
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import moneyContainer from '../../assets/img_currency.png';
import walletIcon from '../../assets/ic_wallet.png';

const title = ["코인명", "매입가", "현재가", "대비", "수량"];

const PropertyTab = () => {
  const [money, setMoney] = useState(0);
  const coin = [
    {
      name: "칙촉코인",
      purchasingPrice: 1395,
      presentPrice: 1295,
      quantity: 1,
    },
    {
      name: "마이쮸코인",
      purchasingPrice: 795.00,
      presentPrice: 810.00,
      quantity: 3,
    }
  ]

  return(
    <Container>
      <MoneyContainer>
        <MoneyImg money={money} src={moneyContainer}/>
        <WalletIcon src={walletIcon}/>
        <PossMoney> 보유 화폐 </PossMoney>
        <PossMoney 
          style={{ 
            marginLeft: '205px',
            left: `-${money.toString().length * 9}px`,
        }}> {money} </PossMoney>
        <PossMoney style={{marginLeft: '215px'}}> 원 </PossMoney>
      </MoneyContainer>
      
      <CoinContainer>
        <TitleContainer>
          {title.map((item) => (
            <Title> {item} </Title>
          ))}
        </TitleContainer>
        <Line/>
        <ListContainer>
          {coin.map((item, idx) => {
            const fmPurchasingPrice = (item.purchasingPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            const fmPresentPrice = (item.presentPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            const priceDiff = item.presentPrice - item.purchasingPrice;

            return (
              <CoinList>
                <CoinInfo> {item.name} </CoinInfo>
                <CoinInfo style={{ marginLeft: '15px' }}> 
                  {fmPurchasingPrice}
                </CoinInfo>
                <CoinInfo 
                  style={{ marginLeft: '15px' }}
                  fontColor={priceDiff}
                > 
                  {fmPresentPrice} 
                </CoinInfo>
                <CoinInfo 
                  fontColor={priceDiff}
                >
                  {priceDiff !== 0 ? (
                    <>
                      {priceDiff > 0 ? '▲' : '▼'} {" "}
                      {Math.abs(priceDiff)} 
                    </>) : ('−')
                  } 
                </CoinInfo>
                <CoinInfo> {item.quantity} </CoinInfo>
              </CoinList>
            )})}
        </ListContainer>
      </CoinContainer>
    </Container>
  );
}

const Container = styled.div`
  
`;
const MoneyContainer = styled.div`
  width: auto;
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 120px;
  left: 51px;
`;
const MoneyImg = styled.img`
  width: auto;
  height: 15vh;
`;
const WalletIcon = styled.img`
  position: absolute;
  margin-top: 20px;
  margin-left: 40px;
`;
const PossMoney = styled.text`
  position: absolute;
  margin-top: 23px;
  margin-left: 70px;
  color: #390C0C;
  font-size: 19px;
  font-weight: 700;
`;
const CoinContainer = styled.div`
  position: relative;
  height: 65vh;
  flex-shrink: 0;
  margin: 82px 50px;
  border-radius: 8px;
  background: #E6E6E6;
  box-shadow: 0px 4px 4px 0px #666 inset, 0px 4px 4px 0px #D4D4D4 inset;
  z-index: 99;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 35px;
  justify-content: space-around;
`;
const Title = styled.text`
  color: #121212;
  font-size: 20px;
  font-weight: 700;
`;
const Line = styled.div`
  height: 1px;
  background: #252525;
  margin: 25px 20px;
`;
const ListContainer = styled.div`
`;
const CoinList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const CoinInfo = styled.p`
  color: #121212;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  flex: 1;
  padding-left: 10px;
  color: ${(props) => props.fontColor > 0 ? 
    '#AA1919' : props.fontColor < 0 ? 
    '#1F27D7' : '#121212'
  };
`;

export default PropertyTab;