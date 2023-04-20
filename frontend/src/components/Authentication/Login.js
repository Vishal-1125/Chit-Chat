import { Button } from "@chakra-ui/button";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { Icon, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { FormHelperText, Text } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
      setUser(data);
      history.push("/chats");
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    try {
      const [emailResult, passwordResult] = await Promise.allSettled([
        setEmail("guest@chit-chat.com"),
        setPassword("1234567"),
      ]);
      if (
        emailResult.status === "rejected" ||
        passwordResult.status === "rejected"
      ) {
        throw new Error("Failed to set email or password");
      }

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email: "guest@chit-chat.com", password: "1234567" },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setGuestLoading(false);
      console.log(data);
      setUser(data);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setGuestLoading(false);
    }
  };

  return (
    <VStack gap=".3rem">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <InputGroup>
          <Input
            type="email"
            placeholder="Enter Email Address"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="true"
            value={email}
            isRequired
          />
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            autoComplete="true"
            placeholder="Enter password"
          />
          <InputRightElement width="3rem" px="4px">
            <Icon
              as={show ? ViewIcon : ViewOffIcon}
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              _hover={{
                opacity: 0.9,
                cursor: "pointer",
              }}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormHelperText textAlign="left">
          <Text color="red.300">* Required</Text>
        </FormHelperText>
      </FormControl>
      <Button
        colorScheme="primary"
        width="100%"
        style={{ marginTop: 20 }}
        isLoading={loading}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="secondary"
        width="100%"
        onClick={handleGuestLogin}
        isLoading={guestLoading}
      >
        Login as Guest
      </Button>
    </VStack>
  );
};

export default Login;
