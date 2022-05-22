import {
  Container,
  Box,
  Flex,
  Spacer,
  Heading,
  Badge,
  IconButton,
  Button,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faHamburger,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { logoutUser } from '../redux/actions/user';

const Navbar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { loading, error, user, isAuth, isReg } = useSelector(
    (state) => state.user
  );
  console.log(user);

  useEffect(() => {}, [dispatch, user]);

  return (
    <>
      <Flex bg='blue.900' pos='fixed' w='100%' zIndex={2} h={'60px'} top='0'>
        <Box p='4'>
          <Heading as='h4' size='md' color='#ccff33'>
            <Link to='/home'>MobiShop</Link>
          </Heading>
        </Box>
        <Spacer />
        <Box display={['none', 'flex']} color='#00bbf9'>
          <Box p='4'>
            <Heading as='h6' size='sm' color='pink'>
              {user?.user?.email ? (
                <Button
                  variant='outline'
                  colorScheme='cyan'
                  onClick={() => {
                    dispatch(logoutUser());
                  }}
                >
                  Signout
                </Button>
              ) : (
                <>
                  <Link to='/signin'>Signin</Link>
                  {!isReg ? (
                    <Link to='/signup' style={{ marginLeft: '10px' }}>
                      Signup
                    </Link>
                  ) : null}
                </>
              )}
            </Heading>
          </Box>

          {user && user?.user?.email ? (
            <>
              <Box p='4'>
                <Heading as='h6' size='sm'>
                  <Link to='/orders'>My Orders</Link>
                </Heading>
              </Box>
              <Box p='4'>
                <Link to='/cart'>
                  <FontAwesomeIcon icon={faCartShopping} />
                  <Badge colorScheme='whatsapp'>{cart.length}</Badge>
                </Link>
              </Box>
            </>
          ) : null}
        </Box>
        <Box display={['flex', 'none']} pr='4' pt='2'>
          <Menu colorScheme='facebook'>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              style={{ outline: '2px solid #ff2575' }}
            />
            <MenuList>
              <MenuItem>
                <Link to='/orders'>My Orders</Link>
              </MenuItem>
              <MenuItem>
                <Link to='/cart'>
                  My Cart <Badge colorScheme='red'>{cart.length}</Badge>{' '}
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to='/'>About</Link>
              </MenuItem>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Setting</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
