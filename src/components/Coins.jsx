import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../index'
import { Container, HStack, VStack, Image, Heading, Text, Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from './Loader'
import Error from './Error'
import CoinCard from './CoinCard'

const Coins = () => {


    const btnarry = new Array(132).fill(1);
    const [coins, setcoins] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [page, setpage] = useState(1)
    const [currency, setcurrency] = useState('inr')



    const currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';
    const changepage = (page) => {
        setpage(page)
        setloading(true)
    }



    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
                setcoins(data)

                setloading(false)
            } catch (error) {
                seterror(true)
                setloading(false)
            }

        }
        fetchCoins();
    }, [currency, page])
    if (error) return <Error message="Error-while-fatching-coins" />

    return (
        <Container maxW={'container.xl'}>{loading ? (<Loader />) : (
            <>
                <RadioGroup value={currency} onChange={setcurrency} p={'8'}>
                    <HStack spacing={'4'}>

                        <Radio value={'inr'}>₹ Rupee</Radio>
                        <Radio value={'eur'}>€ Euro</Radio>
                        <Radio value={'usd'}>$ us Doller</Radio>
                    </HStack>
                </RadioGroup>
                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>


                    {

                        coins.map((i) => (

                            <CoinCard
                                id={i.id}

                                name={i.name}
                                price={i.current_price}
                                img={i.image}
                                symbol={i.symbol}
                                currencySymbol={currencySymbol}
                            />



                        ))

                    }
                </HStack>
                <HStack w={'full'} overflowX={'auto'} p={8}>
                    {
                        btnarry.map((item, index) => (
                            <Button
                                bgColor={'blackAlpha.900'}
                                color={'white'}
                                onClick={() => changepage(index + 1)}

                            >{index + 1}</Button>
                        ))
                    }
                </HStack>

            </>
        )}
        </Container>
    )
}





export default Coins