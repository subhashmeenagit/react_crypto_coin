import React from 'react'

import { VStack, Image, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


const CoinCard = ({ name, id, symbol, img, price, currencySymbol = '₹' }) => {
    return (
        <>
            <Link to={`/coin/${id}`} >
                <VStack w={52}
                    shadow={'lg'} p={'8'}
                    borderRadius={'lg'}
                    transition={'all 0.3s'}
                    m={'4'}
                    css={{
                        '&:hover': {
                            transform: 'scale(1.1)',
                        }
                    }}

                >
                    <Image
                        src={img}
                        w={'10'}
                        h={'10'}
                        objectFit={'contain'}
                        alt='' exchanges

                    />
                    <Heading size={'md'} noOfLines={'1'}>{symbol}</Heading>
                    <Text>{name}</Text>
                    <Text>{price ? `${currencySymbol}${price}` : "NA"}</Text>
                </VStack>
            </Link></>
    )
}






export default CoinCard