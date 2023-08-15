import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
        return (
                <HStack p={4} bg={'blackAlpha.900'} shadow={'base'} >
                        <Button variant={'unstyled'} color={'white'} mr={'4'}>

                                <Link to='/'>Home</Link>

                        </Button>
                        <Button variant={'unstyled'} color={'white'} mr={'4'}>

                                <Link to='/exchanges'>Exchanges</Link>

                        </Button>
                        <Button variant={'unstyled'} color={'white'}>

                                <Link to='/coins'>Coins</Link>

                        </Button>
                        <Button variant={'outline'} color={'white'} position={'absolute'} right={'16'}>

                                <a href='https://accounts.google.com/b/0/AddMailService' >Email</a>

                        </Button>

                </HStack>
        )
}

export default Header