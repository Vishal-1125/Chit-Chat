import {
  Box,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const colors = ["blue", "red"];
const Homepage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <>
      {!JSON.parse(localStorage.getItem("userInfo")) ? (
        <>
          <Container maxW="xl" centerContent>
            <Box
              d="flex"
              justifyContent="center"
              alignItems="center"
              p={3}
              w="100%"
              m="20px 0 15px 0"
            >
              <Heading
                as="h1"
                size="2xl"
                letterSpacing="tight"
                textAlign="center"
                bgGradient="linear(to-r, #0088FF, #FFA500)"
                bgClip="text"
              >
                <Box as="span" color="#41beb0">
                  Chit
                </Box>
                -
                <Box as="span" color="#FFBE08">
                  Chat
                </Box>
              </Heading>
            </Box>
            <Box
              bg="white"
              w="100%"
              p={4}
              borderWidth="thin"
              borderRadius="lg"
              fontFamily="Work Sans"
              boxShadow="xl"
            >
              <Tabs
                isFitted
                variant="line"
                onChange={(index) => setTabIndex(index)}
                colorScheme={colors[tabIndex]}
              >
                <TabList mb=".5rem">
                  <Tab borderRadius="6px 6px 0 0" transition="all .2s ease">
                    Login
                  </Tab>
                  <Tab borderRadius="6px 6px 0 0" transition="all .2s ease">
                    Sign Up
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Login />
                  </TabPanel>
                  <TabPanel>
                    <Signup />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Container>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Homepage;
