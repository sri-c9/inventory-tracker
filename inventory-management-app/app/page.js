"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import firestore from "@/firebase";

import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Home() {
  const [inventory, setInventory] = useState([]);

  const [open, setOpen] = useState(false);
  const [itemNames, setItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = collection(firestore, "inventory");
    const docs = await getDocs(snapshot);
    const inventoryList = [];

    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
    console.log(inventoryList);
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const quantity = data.quantity || 0; // Default to 0 if quantity is undefined
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
      gap={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          width={400}
          bgcolor={"white"}
          border={"2px solid black"}
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection={"column"}
          gap={3}
          sx={{ transform: "translate(-50%, -50%)" }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemNames}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemNames);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      {/* <Typography variant="h1">Inventory Management</Typography> */}
      <Button
        variant="contained"
        onClick={() => {
          handleOpen();
        }}
      >
        Add New Item
      </Button>
      <Box border="1px solid #545CA4">
        <Box
          width={"800px"}
          height={"100px"}
          bgcolor={"#6E79A9"}
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Typography variant="h2" color="#212529">
            Inventory Items
          </Typography>
        </Box>

        <Stack width="800px" height="300px" spacing={2} overflow="auto">
          {console.log("inventory", inventory)}
          {inventory.map(({ name, quantity }) => {
            return (
              <Box
                width={"100%"}
                height="150px"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                bgcolor={"white"}
                padding={5}
              >
                <Typography variant="h3" color="black" textAlign={"center"}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant="h3" color="black" textAlign={"center"}>
                  {quantity}
                </Typography>
                <Button
                  onClick={() => {
                    removeItem(name);
                  }}
                >
                  Remove
                </Button>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
