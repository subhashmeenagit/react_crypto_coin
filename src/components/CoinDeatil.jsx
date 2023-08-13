import { Box, Container, HStack, Radio, RadioGroup, VStack, Text, Center, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { server } from '../index'
import Loader from './Loader'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Error from './Error'
import MyChart from './MyChart'


const CoinDeatil = () => {

  const btns = ['24h', '7d', '14d', '30d', '60d', '200d', '1y', 'max']

  const parms = useParams()
  const [coin, setcoin] = useState({})
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(false)
  const [currency, setcurrency] = useState('inr')
  const [days, setdays] = useState('24h')
  const [chartarry, setchartarray] = useState([])
  const currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';

  const switchChartstate = (key) => {
    switch (key) {
      case "24h":
        setdays("24h");
        setloading(true);
        break;
      case "7d":
        setdays("7d");
        setloading(true);
        break;
      case "14d":
        setdays("14d");
        setloading(true);
        break;
      case "30d":
        setdays("30d");
        setloading(true);
        break;
      case "60d":
        setdays("60d");
        setloading(true);
        break;
      case "200d":
        setdays("200d");
        setloading(true);
        break;
      case "1y":
        setdays("365d");
        setloading(true);
        break;
      case "max":
        setdays("max");
        setloading(true);
        break;

      default:
        setdays("24h");
        setloading(true);
        break;
    }
  }
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${parms.id}`)
        const { data: chartData } = await axios.get(`${server}/coins/${parms.id}/market_chart?vs_currency=${currency}&days=${days}`)
        setcoin(data)
        setchartarray(chartData.prices)
        console.log(chartData.prices)
        setloading(false)
      } catch (error) {
        seterror(true)
        setloading(false)
      }

    }
    fetchCoin();
  }, [parms.id, currency, days])

  if (error) return <Error message="Error_while_fatching_coin" />

  return (

    <Container maxW={'container.xl'} >

      {
        loading ? <Loader /> : (
          <>
            <Box width={'full'} borderWidth={'1'}>
              <MyChart arr={chartarry} currency={currencySymbol} days={days} />
            </Box>

            <HStack p={'4'} overflowX={'auto'}>

              {
                btns.map((i) => (
                  <Button key={i} onClick={() => switchChartstate(i)}>{i}</Button>
                ))
              }
            </HStack>

            <RadioGroup value={currency} onChange={setcurrency} p={'8'}>
              <HStack spacing={'4'}>

                <Radio value={'inr'}>₹ Rupee</Radio>
                <Radio value={'eur'}>€ Euro</Radio>
                <Radio value={'usd'}>$ us Doller</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
              <Text fontSize={'small'} alignSelf={'center'} opacity={.7} >
                Last upadte date {Date(coin.last_updated).split('G')[0]}
              </Text>
              <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />

              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>{currencySymbol} {coin.market_data.current_price[currency]}</StatNumber>
                <StatHelpText>
                  <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? 'increase' : "decrease"} /> {coin.market_data.price_change_percentage_24h}
                </StatHelpText>

              </Stat>


              <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>
                {
                  `#${coin.market_cap_rank}`
                }
              </Badge>



              <CustomBar low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`} high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`} />
              <Box w={'full'} p={'4'}>
                <Item title={"max supply"} value={coin.market_data.total_supply} />
                <Item title={"circulating supply"} value={coin.market_data.circulating_supply} />
                <Item title={"market Capitial"} value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`} />
                <Item title={"All Time high"} value={`${currencySymbol} ${coin.market_data.ath[currency]}`} />
                <Item title={"All time low"} value={`${currencySymbol} ${coin.market_data.atl[currency]}`} />
              </Box >

            </VStack>
          </>
        )
      }
    </Container>
  )
}


const Item = ({ title, value }) => (
  <HStack w={'full'} justifyContent={'space-between'} my={'4'}>
    <Text letterSpacing={'widest'} >{title}</Text>
    fontFamily={'Bebas Neue'}
    <Text >{value}</Text>
  </HStack>
)
const CustomBar = ({ low, high }) => (
  <VStack w={'full'}>
    <Progress value={'50'} colorScheme='teal' w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}>

      <Badge children={low} colorScheme={'red'} />
      <Text fontSize={'small'}> 24Houre range</Text>
      <Badge children={high} colorScheme={'green'} />


    </HStack>
  </VStack>
)
export default CoinDeatil