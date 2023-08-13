import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../index'
import { Container, HStack, VStack,Image, Heading ,Text} from '@chakra-ui/react'
import Loader from './Loader'
import Error from  './Error'

const Exchanges = () => {

   
    const [exchanges, setexchanges] = useState([])
    const [loading, setloading] = useState(true)
    const [error,seterror]=useState(false)
    useEffect(() => {
        const fetchExchanges = async () => {
            try{
                const { data } = await axios.get(`${server}/exchanges`)
            setexchanges(data)
            setloading(false)
            } catch(error){
                seterror(true)
                setloading(false)
            }

        }
        fetchExchanges();
    }, [])
    if(error) return <Error/>
    return (
        <Container maxW={'container.xl'}>{loading ? (<Loader />) : (<>

            <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                

                {

                    exchanges.map((i)=>(
                       
                <ExchangeCard key={i.id} name={i.name} img={i.image}
                            rank={i.trust_score_rank}
                            url={i.url}
                        /> 
                        
                      
                         
                    ))
                  
                }
            </HStack>

        </>
        )}
        </Container>
    )
}




const ExchangeCard = ({ name, img, rank, url }) => (
    <a href='{url}' target={'blank'}>
        <VStack w={52} 
        shadow={'lg'} p={'8'} 
        borderRadius={'lg'} 
        transition={'all 0.3s'}
         m={'4'}
         css={{
            '&:hover':{
                transform:'scale(1.1)',
            }
         }}
        
        >
            <Image 
            src={img}
            w={'10'}
            h={'10'}
            objectFit={'contain'}
            alt=''exchanges

            />
            <Heading size={'md'} noOfLines={'1'}>{rank}</Heading>
           <Text>{name}</Text>
        </VStack>
   </a>
)


export default Exchanges