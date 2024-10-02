//THIS IS ACTUALLY ACCOUNT SETTINGS

import { useState } from "react";
import { Button, FormControl, FormLabel, Grid, Input, useToast } from '@chakra-ui/react';

function AccountSettings({ privateData }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    if (newPassword !== verifyPassword) {
      toast({
        title: "Error",
        description: "New password and verified password do not match",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      let token = localStorage.getItem("token")
     if (!token) navigate("/")

      const response = await fetch("http://localhost:4000/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`, // Add the authorization header with the token
        },
        body: JSON.stringify({
          currentpassword: currentPassword,
          newpassword: newPassword,
        }),
      });
  
      console.log(token)
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Success",
          description: "Password updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update password",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {privateData && (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
          <FormControl id="currentPassword">
            <FormLabel>Current Password</FormLabel>
            <Input
              focusBorderColor="brand.blue"
              type="password"
              placeholder="*********"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </FormControl>

          <FormControl id="newPassword">
            <FormLabel>New Password</FormLabel>
            <Input
              focusBorderColor="brand.blue"
              type="password"
              placeholder="More than 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>

          <FormControl id="verifyPassword">
            <FormLabel>Verify New Password</FormLabel>
            <Input
              focusBorderColor="brand.blue"
              type="password"
              placeholder="New password here"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          </FormControl>

          <FormControl id="emailAddress">
        <FormLabel>Email Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="email"
          placeholder={privateData.email}
        />
      </FormControl>
        </Grid>
      )}

      <Button mt={4} onClick={handleSubmit}>Update Password</Button>
    </>
  );
}

export default AccountSettings;

